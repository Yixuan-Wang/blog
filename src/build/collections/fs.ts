import { promises as node_fs, existsSync } from "node:fs";
import path from "node:path";

import glob from "fast-glob";
// @ts-ignore
import match from "micromatch";
import pLimit from "p-limit";
import type { Loader } from "astro/loaders";
import { parseFrontmatter } from "../renderers/md";

import { Status } from "~/logic/status";
import { vagueDateToISO, generatePostMetaCommons } from "./common";

type FsOptions = {
  /** The glob pattern to match files, relative to the base directory */
  pattern: string | Array<string>;
  /** The base directory to resolve the glob pattern */
  base: string;
};

const generatePostMeta = (
  frontmatter: post.FrontmatterRaw,
  fsInfo: import("fs").Stats,
) => {
  const created = vagueDateToISO(
    frontmatter.date
      ? frontmatter.date
      : fsInfo.ctime
  );
  const updated = vagueDateToISO(
    frontmatter.updated
      ? frontmatter.updated
      : fsInfo.mtime
  );

  let status: Status = Status.FINISHED;
  if (frontmatter.draft)
    status = Status.DRAFT;
  else if (frontmatter.outdated)
    status = Status.OUTDATED;
  else if (frontmatter.status)
    status = Status[frontmatter.status.toUpperCase() as keyof typeof Status];

  return {
    status,
    timeline: { created, updated },
    ...generatePostMetaCommons(frontmatter),
  };
};

export function fs(loaderOptions: FsOptions, loaderContext?: {
  updatedEntryKeys?: Set<string>;
}): Loader {
  const patterns = Array.isArray(loaderOptions.pattern)
    ? loaderOptions.pattern
    : [loaderOptions.pattern];

  const updatedEntryKeys = loaderContext?.updatedEntryKeys;

  return {
    name: "fs-loader",
    async load({ config, logger, watcher, parseData, store, generateDigest }) {
      const baseDir = loaderOptions.base;
      const isBaseDirExists = existsSync(baseDir);

      if (!isBaseDirExists) {
        // Quit early if base directory does not exist
        // The watcher will always monitor an existing directory
        logger.error(`Base directory "${baseDir}" does not exist.`);
        return;
      }

      async function loadEntry(
        filePath: string,
      ) {
        const rawContent = await node_fs.readFile(filePath, "utf-8").catch((err) => {
          logger.error(`Failed to read file at ${filePath}: ${err.message}`);
          return;
        });

        if (!rawContent && rawContent !== "") {
          logger.warn(`No content found at ${filePath}`);
          return;
        }

        const slug = path.parse(filePath).name;


        const rawData = parseFrontmatter(rawContent);
        const fsInfo = await node_fs.stat(filePath);
        const data = {
          excerpt: rawData.excerpt,
          ...generatePostMeta(rawData.frontmatter, fsInfo),
        } satisfies post.PostMeta;

        if (data.status === Status.DRAFT) {
          logger.info(`Skipping draft file: ${filePath}`);
          if (store.has(slug)) {
            store.delete(slug);
          }
          return;
        }

        const content = rawData.rawContent;
        const digest = generateDigest({
          content,
          data,
        });
        const result = {
          id: slug,
          body: content,
          data,
          digest,
        };
        store.set(result);
        updatedEntryKeys?.add(slug);
      }

      const allFilePaths = await glob.glob(patterns, { cwd: baseDir, absolute: true });
      logger.info(`Found ${allFilePaths.length} matching files.`);

      const limit = pLimit(10); // Limit concurrency to 10
      await Promise.all(allFilePaths.map((filePath) => (
        limit(() => loadEntry(filePath))
      )));

      if (!watcher) {
        return;
      }
      watcher.add(baseDir);

      async function onFileChange(filePath: string) {
        const isMatch = match.isMatch(path.relative(baseDir, filePath), patterns);

        if (!isMatch) {
          return;
        }
        await loadEntry(filePath);
        logger.info(`File reloaded: ${filePath}`);
      }

      watcher.on("add", onFileChange);
      watcher.on("change", onFileChange);
      watcher.on("unlink", (filePath: string) => {
        const slug = path.parse(filePath).name;
        if (store.has(slug)) {
          store.delete(slug);
          logger.info(`File removed: ${filePath}`);
        }
      });
    },
  };
}