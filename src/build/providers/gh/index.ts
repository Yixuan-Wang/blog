import { left, right } from "fp-ts/Either";
import { type Option, getOrElse, none, some } from "fp-ts/Option";
import { pipe } from "fp-ts/function";
import {
  from as rxFrom,
  mergeMap as rxMergeMap,
} from "rxjs";
import { Genre } from "../../../utils/meta";
import { Status } from "../../../logic/status";
import { generatePostMetaCommons, vagueDateToISO } from "../common";
import type { Provider, ProviderSource } from "../module";
import api, { type GhComment, type GhIssue } from "./api";

interface ProviderGhOptions {
  userName: string
  repoName: string
  accessToken: string
  includedLabels: string[]
}

interface ProviderGhExtra {
  status: Option<Status>
  updatedAt: string
}

const FRIEND_PAGE = 2;

function parseGhIssueLabels(labels: string[]) {
  let status: Option<Status> = none;

  for (const label of labels) {
    if (label.startsWith("%")) {
      switch (label) {
        case "%tbc":
          status = some(Status.TBC);
          break;
        case "%stale":
          status = some(Status.STALE);
          break;
        case "%outdated":
          status = some(Status.OUTDATED);
          break;
      }
    }
  }
  return {
    status,
  };
}

const QUERY_ALL_ISSUE_WINDOW_SIZE = 50;
const QUERY_ALL_COMMENT_WINDOW_SIZE = 50;

function processGhIssue(options: ProviderGhOptions, allSlug: Set<string>) {
  const { accessToken } = options;
  return async function (
    issue: GhIssue,
  ): Promise<ProviderSource<ProviderGhExtra>> {
    const parsedLabels = parseGhIssueLabels(
      issue.labels.nodes.map(({ name }) => name),
    );

    const allComment: GhComment[] = [];
    try {
      let after: string | null = null;
      let hasNextPage = true;
      do {
        const comment = await api.queryAllComment({
          accessToken,
          variables: {
            repo: options.repoName,
            owner: options.userName,
            number: issue.number,
            after,
            limit: QUERY_ALL_COMMENT_WINDOW_SIZE,
          },
        });
        hasNextPage
          = comment.data.repository.issue.comments.pageInfo.hasNextPage;
        after = comment.data.repository.issue.comments.pageInfo.endCursor;

        allComment.push(
          ...comment.data.repository.issue.comments.nodes.filter(
            ({ authorAssociation }) => authorAssociation === "OWNER",
          ),
        );
      } while (hasNextPage);
    }
    catch {
      throw new Error(`Request of \`${issue.title}\`(${issue.number}) failed`);
    }

    const source
      = `${issue.body}\n${
       allComment
        .map(comment => comment.body)
        .join("\n\n<div entry-sep></div>\n\n")}`;

    const updatedAt = issue.updatedAt;

    allSlug.add(issue.title);
    return {
      slug: issue.title,
      source,
      info: {
        ...parsedLabels,
        updatedAt,
      },
    } satisfies ProviderSource<ProviderGhExtra>;
  };
}

export default function ProviderGh(
  options: ProviderGhOptions,
): Provider<ProviderGhExtra> {
  const { accessToken } = options;
  const repoInfo = {
    owner: options.userName,
    repo: options.repoName,
  };

  const allSlug = new Set<string>();

  const generateSource = async () => {
    const allIssues: GhIssue[] = [];
    {
      let after: string | null = null;
      let hasNextPage = true;
      do {
        const issues = await api.queryAllIssue({
          accessToken,
          variables: {
            ...repoInfo,
            labels: options.includedLabels,
            after,
            limit: QUERY_ALL_ISSUE_WINDOW_SIZE,
          },
        });
        hasNextPage = issues.data.repository.issues.pageInfo.hasNextPage;
        after = issues.data.repository.issues.pageInfo.endCursor;

        allIssues.push(...issues.data.repository.issues.nodes);
      } while (hasNextPage);
    } // fill `allIssues`

    const processGhIssueWithOptions = processGhIssue(options, allSlug);
    return rxFrom(allIssues.filter(issue => issue.number !== FRIEND_PAGE).map(processGhIssueWithOptions)).pipe(
      rxMergeMap(p =>
        p.then(v => right(v)).catch(r => left(`ProviderGh: ${r}`)),
      ),
    );
  };

  const generatePostMeta = (
    frontmatter: post.FrontmatterRaw,
    extra: ProviderGhExtra,
  ): post.PostMeta => {
    const status = pipe(
      extra.status,
      getOrElse<Status>(() => {
        if (frontmatter.draft)
          return Status.DRAFT;
        else if (frontmatter.outdated)
          return Status.OUTDATED;
        else return Status.FINISHED;
      }),
    );

    const created = vagueDateToISO(frontmatter.date);
    const updated = frontmatter.updated ? vagueDateToISO(frontmatter.updated) : extra.updatedAt;

    return {
      status,
      timeline: { created, updated },
      ...generatePostMetaCommons(frontmatter),
    } satisfies post.PostMeta;
  };

  return {
    name: "gh",
    hmr: {
      canHandle: (_slug: string) => false,
      canFallback: false,
      accept: () => left("ProviderGh: Cannot handle HMR"),
    },
    generateSource,
    generatePostMeta,
  };
}
