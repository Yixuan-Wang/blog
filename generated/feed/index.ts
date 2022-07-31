import { readFile } from "node:fs/promises";
import { writeFileSync } from "node:fs";
import path from "node:path";
import fg from "fast-glob";
import { Feed } from "feed";
import type { Item } from "feed";
import { Plugin } from "vite";
import dayjs from "../day";
import { getMeta } from "../markdown-meta";

const AUTHOR = {
  name: "Yixuan Wang",
  link: "https://yixuan-wang.site",
};

const feed = new Feed({
  title: "Pak",
  description: "This is a blоg, not a blog.",
  id: "https://blog.yixuan-wang.site/",
  link: "https://blog.yixuan-wang.site/",
  language: "zh-CN",
  image: "https://blog.yixuan-wang.site/favicon.svg",
  favicon: "https://blog.yixuan-wang.site/favicon.svg",
  copyright: "CC BY-NC-SA 4.0 © Yixuan Wang",
  feedLinks: {
    atom: "https://blog.yixuan-wang.site/feed.atom",
    rss: "https://blog.yixuan-wang.site/feed.xml",
  },
  author: AUTHOR,
});

export function FsMetaPlugin(option: { files: Record<string, string> }): Plugin {
  const articleMeta: Article[] = [];
  return {
    name: "fs-meta-plugin",
    async buildStart() {
      for (const [genre, pathglob] of Object.entries(option.files)) {
        const paths = await fg(pathglob, {
          followSymbolicLinks: true,
        });
        paths.map(async(p) => {
          const md = await readFile(p, "utf-8");
          const name = path.basename(p, ".md").replace(/.+_/, "");
          const meta = getMeta(md, {
            name,
            path: `/${genre}/${name}`,
            genre,
          });
          articleMeta.push(meta);
        });
      }
    },
    resolveId(id) {
      if (id === "virtual:generated-fs-meta")
        return id;
    },
    load(id) {
      if (id === "virtual:generated-fs-meta")
        return JSON.stringify(articleMeta);
    },
  };
}

export function FeedPlugin(): Plugin {
  const feedItems: Item[] = [];
  function generateFeed(article: Article) {
    const link = `https://blog.yixuan-wang.site${article.path}.html`;
    const item: Item = {
      title: article.frontmatter.title,
      id: article.path,
      link,
      date: dayjs.tz(article.timestamp).toDate(),
      content: `<p>${article.excerpt}</p><p><a href="${link}">Full Article...</a></p>`,
      category: article.frontmatter.tags.map(tag => ({ name: tag, domain: article.frontmatter.category })),
    };
    feedItems.push(item);
  }

  return {
    name: "feed-plugin",
    enforce: "post",
    async buildEnd() {
      const generatedIssuesMeta: Article[] = JSON.parse((await this.load({ id: "virtual:generated-issues-meta" })).code ?? "[]");
      generatedIssuesMeta.forEach(generateFeed);
      const generatedFsMeta: Article[] = JSON.parse((await this.load({ id: "virtual:generated-fs-meta" })).code ?? "[]");
      generatedFsMeta.forEach(generateFeed);
    },
    writeBundle() {
      feedItems.sort(({ date: a }, { date: b }) => +b - +a).forEach(item => feed.addItem(item));

      writeFileSync("public/feed.atom", feed.atom1());
      writeFileSync("public/feed.xml", feed.rss2());
    },
  };
}
