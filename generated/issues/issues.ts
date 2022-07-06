import type { Plugin } from "vite";
import { getMeta } from "../markdown-meta";
import { getIssues, getComments, parseLabel } from "./query";

interface SourceIssues {
  key: string
  genre: string
  isData: boolean
  path: string
  format: string
  content: string
  timestamp?: string // <- will be undefined if has %tbc
}

const mapSourceIssues = new Map<string, SourceIssues>();
const generatedRoutes: string[] = [];

async function fetchSourceIssues(usedLabels: string[]) {
  const configSourceIssues = {
    owner: "Yixuan-Wang",
    repo: "blog-contents",
    labels: usedLabels,
  };

  await getIssues(configSourceIssues)
    .then(issuesFetched =>
      issuesFetched.map(async(issue): Promise<SourceIssues> => {
        const { genre, format, directives } = parseLabel(issue.labels);

        let content: string;

        if (format === "md") {
          const comments = await getComments(configSourceIssues, issue.number);
          content = `${issue.body}\n${comments
            .map(comment => genre === "notes" ? `\n\n<!-- $note -->\n\n ${comment.body} \n\n<!-- $endnote -->\n\n` : comment.body)
            .join("\n<hr class=\"talk-separator\" />\n\n")}`;
        }
        else {
          content = issue.body;
        }

        if (format !== "md") {
          content = content.substring(
            content.indexOf("\n") + 1,
            content.lastIndexOf("\n"),
          );
        }

        return {
          key: issue.title,
          genre,
          isData: format !== "md",
          path: `/${genre}/${issue.title}`,
          format,
          content,
          timestamp: directives.tbc ? issue.updatedAt : undefined,
        };
      }),
    )
    .then(promises => Promise.allSettled(promises))
    .then((promisesSettled) => {
      (
        promisesSettled.filter(
          promise => promise.status === "fulfilled",
        ) as PromiseFulfilledResult<SourceIssues>[]
      ).forEach(({ value }) => {
        const virtualFilePath = `${value.path}.${value.format}`;
        mapSourceIssues.set(virtualFilePath, value);
        if (!value.isData) {
          const meta = getMeta(value.content, {
            name: value.key,
            path: value.path,
            genre: value.genre,
            date: value.timestamp,
          });
          generatedRoutes.push(`{
name: ${JSON.stringify(value.key)},
path: ${JSON.stringify(value.path)},
component: () => import(${JSON.stringify(virtualFilePath)}),
meta: ${JSON.stringify(meta)},
props: true,
            },`);
        }
      });
    });
}

interface IssuesPagesPluginConfig {
  usedLabels: string[]
}

export default function IssuesPagesPlugin({
  usedLabels,
}: IssuesPagesPluginConfig): Plugin {
  return {
    enforce: "pre",
    name: "issues-pages-plugin", // 必须的，将会在 warning 和 error 中显示
    async buildStart() {
      await fetchSourceIssues(usedLabels);
    },
    resolveId(id) {
      if (id === "virtual:generated-issues-pages" || mapSourceIssues.has(id))
        return id;
    },
    load(id) {
      if (id === "virtual:generated-issues-pages") {
        return `const routes = [${generatedRoutes.join("\n")}]
        export default routes
        `;
      }
      if (mapSourceIssues.has(id)) return mapSourceIssues.get(id)!.content;
    },
  };
}
