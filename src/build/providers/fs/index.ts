import path from "node:path";
import fs from "node:fs/promises";
import { left, right } from "fp-ts/Either";
import type { Observable } from "rxjs";
import {
  from as rxFrom,
  merge as rxMerge,
  mergeMap as rxMergeMap,
} from "rxjs";
import glob from "fast-glob";
import { formatISO } from "date-fns";
import type { HmrContext } from "vite";
import type { Provider, ProviderSource } from "../module";
import { generatePostMetaCommons, vagueDateToISO } from "../common";
import { Genre } from "../../../utils/meta";
import { Status } from "../../../logic/status";

interface ProviderFsOptions {
  fileSystem?: typeof fs
  baseDir: string
  patterns: (string | string[])[]
}

interface ProviderFsExtra {
  lastModified: string
}

export default function ProviderFs(
  option: ProviderFsOptions,
): Provider {
  const baseDir = path.resolve(option.baseDir);
  const fileSystem = option.fileSystem ?? fs;

  const allSlug = new Set<string>();

  const generateOneSourceFromFilePath = async (filePath: string) => {
    const slug = path.parse(filePath).name;
    allSlug.add(slug);

    let source: string;
    let lastModified: string;
    try {
      [source, lastModified] = await Promise.all([
        fileSystem.readFile(filePath, { encoding: "utf-8" }),
        fileSystem.stat(filePath).then(({ mtime }) => formatISO(mtime)),
      ]);
    }
    catch (error) {
      console.error(error);
      return left(`ProviderFs: Unable to read file ${filePath}.`);
    }

    return right({
      slug,
      source,
      info: {
        lastModified,
      },
    } satisfies ProviderSource<ProviderFsExtra>);
  };

  const generateOneSourceFromFileContent = async (fileContent: { file: string; source: string; timestamp: number }) => {
    const { file, source, timestamp } = fileContent;
    const slug = path.parse(file).name;
    allSlug.add(slug);

    return right({
      slug,
      source,
      info: {
        lastModified: formatISO(timestamp),
      },
    } satisfies ProviderSource<ProviderFsExtra>);
  };

  const generateSource = () => {
    const { patterns } = option;
    const sourceFilePaths = rxMerge(
      ...patterns.map(
        dir =>
          rxFrom(
            glob.stream(dir, {
              cwd: baseDir,
              absolute: true,
            }),
          ) as Observable<string>,
      ),
    );

    return sourceFilePaths.pipe(
      rxMergeMap(generateOneSourceFromFilePath),
    );
  };

  const generatePostMeta = (
    frontmatter: post.FrontmatterRaw,
    info: ProviderFsExtra,
  ) => {
    const created = vagueDateToISO(frontmatter.date);
    const updated = frontmatter.updated
      ? vagueDateToISO(frontmatter.updated)
      : info.lastModified;

    let status: Status = Status.FINISHED;
    if (frontmatter.draft)
      status = Status.DRAFT;
    else if (frontmatter.outdated)
      status = Status.OUTDATED;

    return {
      status,
      timeline: { created, updated },
      ...generatePostMetaCommons(frontmatter),
    } satisfies post.PostMeta;
  };

  const acceptHmr = async (slug: string, ctx: HmrContext) => {
    return await generateOneSourceFromFileContent({
      file: ctx.file,
      source: await ctx.read(),
      timestamp: ctx.timestamp,
    });
  };

  return {
    name: "fs",
    hmr: {
      canHandle: (slug: string) => allSlug.has(slug),
      canFallback: true,
      accept: acceptHmr,
    },
    generateSource,
    generatePostMeta,
  } satisfies Provider<ProviderFsExtra>;
}
