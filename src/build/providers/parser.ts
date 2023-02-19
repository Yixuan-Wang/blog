import path from "node:path";
import { unified } from "unified";

import type { Processor } from "unified";

import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";

import type { Root as HastRoot } from "hast";
import type { Root as MdastRoot } from "mdast";

import remarkRehype from "remark-rehype";

import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";

import matter from "gray-matter";
import shiki from "shiki";
import rehypeAstroJsx from "../plugins/rehype-astro-jsx";
import rehypeExtractToc from "../plugins/rehype-extract-toc";
import rehypeFindComponents from "../plugins/rehype-find-components";
import rehypeRuby from "../plugins/rehype-ruby";
import remarkDirectiveFallback from "../plugins/remark-directive-fallback";
import remarkDirectivePlainContainers from "../plugins/remark-directive-plain-containers";
import remarkRuby from "../plugins/remark-ruby";
import remarkShiki from "../plugins/remark-shiki";

export function parseFrontmatter(source: string) {
  const { data, excerpt, content } = matter(source, {
    excerpt: true,
    excerpt_separator: "<!-- more -->",
  });

  return {
    frontmatter: data as post.FrontmatterRaw,
    excerpt,
    rawContent: content,
  };
}

/* [`unified` workflow](https://github.com/unifiedjs/unified#description). */
const pipeline = {
  parseMarkdown: unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkDirective)
    .use(remarkMath) as Processor<
    MdastRoot,
    MdastRoot,
    MdastRoot,
    never
  >,
  transformMarkdown: unified()
    .use(remarkRuby)
    .use(remarkShiki, {
      highlighter: await shiki.getHighlighter({
        theme: "one-dark-pro",
      }),
    })
    .use(remarkDirectivePlainContainers)
    .use(remarkDirectiveFallback),
  compileMarkdownToHtml: unified().use(remarkRehype, null, {
    allowDangerousHtml: true,
  }) as Processor<MdastRoot, HastRoot, HastRoot, never>,
  transformHtml: unified()
    .use(rehypeRaw)
    .use(rehypeRuby)
    .use(rehypeSlug)
    .use(rehypeKatex, {
      output: "html",
      trust: true,
    }),
  analyzeComponents: unified().use(rehypeFindComponents),
  analyzeToc: unified().use(rehypeExtractToc),
  compileHtmlToAstro: unified().use(rehypeAstroJsx, {
    hookEscape: [
      element => (element.properties?.className as string[])?.includes("math"),
    ],
  }),
  compileAstro: unified().use(rehypeStringify, {
    collapseEmptyAttributes: true,
    closeSelfClosing: true,
    allowDangerousCharacters: true,
    allowDangerousHtml: true,
  }),
  escapeAstro: (s: string) => s.replaceAll("\u001B#", "&#"),
};

interface OptionsParseMarkdown {
  componentBase: string
  info: post.PostInfo
}

const toGetFileNameFromComponent = (basePath: string) => {
  return (componentName: string) => {
    return path.join(basePath, `${componentName}.astro`);
  };
};

export function parseMarkdown(content: string, options: OptionsParseMarkdown) {
  // const { slug, excerpt, meta } = options.info;

  const mdast = pipeline.transformMarkdown.runSync(pipeline.parseMarkdown.parse(content));
  const hast = pipeline.transformHtml.runSync(
    pipeline.compileMarkdownToHtml.runSync(mdast),
  );

  const components = Array.from(pipeline.analyzeComponents.stringify(hast));
  const toc = pipeline.analyzeToc.stringify(hast);
  const getFileNameFromComponent = toGetFileNameFromComponent(
    options.componentBase,
  );
  const componentImport = components
    .map(c => `import ${c} from "${getFileNameFromComponent(c)}";`)
    .join("\n");

  const jsx = pipeline.escapeAstro(pipeline.compileAstro.stringify(pipeline.compileHtmlToAstro.runSync(hast)));

  return {
    componentImport,
    jsx,
    toc,
  };
}
