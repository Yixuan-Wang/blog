import type { DataStore, Loader } from "astro/loaders";
import { Status } from "~/logic/status";
import api, { type GhComment, type GhIssue } from "./api";
import type { AstroIntegrationLogger } from "astro";
import { parseFrontmatter } from "~/build/renderers/md";
import { vagueDateToISO, generatePostMetaCommons } from "../common";
import pLimit from "p-limit";

interface GhOptions {
  userName: string
  repoName: string
  accessToken: string
  includedLabels: string[]
}

const QUERY_ALL_ISSUE_WINDOW_SIZE = 50;
const QUERY_ALL_COMMENT_WINDOW_SIZE = 50;

function parseGhIssueLabels(labels: string[]) {
  let status: Status | undefined = undefined;

  for (const label of labels) {
    if (label.startsWith("%")) {
      const statusStr = label.slice(1);
      if (Object.values(Status).includes(statusStr as Status)) {
        status = statusStr as Status;
      }
    }
  }
  return {
    status,
  };
}

/// Process a single GitHub issue's comments.
async function processGhIssueComments(issue: GhIssue, options: GhOptions, context: { logger: AstroIntegrationLogger }) {
  const { accessToken, repoName, userName } = options;
  const { logger } = context;
  const parsedLabels = parseGhIssueLabels(
    issue.labels.nodes.map(({ name }) => name),
  );
  const allComment: GhComment[] = [];
  try {
    let after: string | null = null;
    let hasNextPage = true;
    do {
      const response = await api.queryAllComment({
        accessToken,
        variables: {
          repo: repoName,
          owner: userName,
          number: issue.number,
          after,
          limit: QUERY_ALL_COMMENT_WINDOW_SIZE,
        },
      });
      allComment.push(...response.data.repository.issue.comments.nodes);
      after = response.data.repository.issue.comments.pageInfo.endCursor;
      hasNextPage = response.data.repository.issue.comments.pageInfo.hasNextPage;
    } while (hasNextPage);
  } catch (error) {
    logger.error(`Error fetching comments for issue #${issue.number}: ${(error as Error).message}`);
  }

  const source = `${issue.body}\n\n${
    allComment
      .map((comment) => comment.body)
      .join("\n\n<div entry-sep></div>\n\n")
  }`;

  return source;
}

function generatePostMeta(
  frontmatter: post.FrontmatterRaw,
  issue: GhIssue,
){
  const created = frontmatter.date ? vagueDateToISO(frontmatter.date) : issue.createdAt;
  const updated = frontmatter.updated ? vagueDateToISO(frontmatter.updated) : issue.updatedAt;

  let status: Status = Status.FINISHED;
  if (frontmatter.draft)
    status = Status.DRAFT;
  else if (frontmatter.outdated)
    status = Status.OUTDATED;
  
  if (frontmatter.status)
    status = Status[frontmatter.status.toUpperCase() as keyof typeof Status];

  const parsedLabels = parseGhIssueLabels(
    issue.labels.nodes.map(({ name }) => name),
  );
  if (parsedLabels.status) {
    status = parsedLabels.status;
  }

  return {
    status,
    timeline: { created, updated },
    ...generatePostMetaCommons(frontmatter),
  };
}

async function processGhIssue(
  options: GhOptions,
  context: {
    updatedEntryKeys?: Set<string>,
    logger: AstroIntegrationLogger,
    store: DataStore,
    generateDigest: (data: string | Record<string, unknown>) => string,
  }) {
  const { accessToken, repoName, userName, includedLabels } = options;
  const { logger, store, generateDigest, updatedEntryKeys } = context;

  const allIssues: GhIssue[] = [];
  try {
    let after: string | null = null;
    let hasNextPage = true;
    do {
      const response = await api.queryAllIssue({
        accessToken,
        variables: {
          repo: repoName,
          owner: userName,
          labels: includedLabels,
          after,
          limit: QUERY_ALL_ISSUE_WINDOW_SIZE,
        },
      });
      after = response.data.repository.issues.pageInfo.endCursor;
      hasNextPage = response.data.repository.issues.pageInfo.hasNextPage;
      allIssues.push(...response.data.repository.issues.nodes);
    } while (hasNextPage);
  } catch (error) {
    logger.error(`Error fetching issues of ${userName}/${repoName}: ${(error as Error).message}`);
  }

  async function processOneIssue(issue: GhIssue) {
    const rawContent = await processGhIssueComments(issue, options, { logger });
    const slug = issue.title;

    const rawData = parseFrontmatter(rawContent);
    const data = {
      excerpt: rawData.excerpt,
      ...generatePostMeta(rawData.frontmatter, issue),
    } satisfies post.PostMeta;


    const body = rawData.rawContent;
    const digest = generateDigest({
      content: body,
      data,
    });
    

    store.set({
      id: slug,
      body,
      data,
      digest,
    });
    updatedEntryKeys?.add(slug);
  }

  const limit = pLimit(32);
  await Promise.all(
    allIssues.map(issue => limit(() => processOneIssue(issue)))
  );
}

export function gh(loaderOptions: GhOptions, loaderContext?: {
  updatedEntryKeys?: Set<string>,
}): Loader {
  const updatedEntryKeys = loaderContext?.updatedEntryKeys;
  return {
    name: "gh-loader",
    async load({ config, logger, watcher, parseData, store, generateDigest }) {
      await processGhIssue(loaderOptions, {
        updatedEntryKeys,
        logger,
        store,
        generateDigest,
      });
    }
  }
}