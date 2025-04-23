import matter from "gray-matter";
import type { Root as MdastRoot } from "mdast";
import path from "node:path";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import rehypeShikiFromHighlighter from "@shikijs/rehype/core";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import type { Processor } from "unified";
import { unified } from "unified";
import highlighter from "../highlights";
import rehypeAstroJsx from "../plugins/rehype-astro-jsx";
import rehypeCallout from "../plugins/rehype-callout";
import rehypeMermaid from "../plugins/rehype-mermaid";
import rehypeExtractToc from "../plugins/rehype-extract-toc";
import rehypeFindComponents from "../plugins/rehype-find-components";
import rehypeRuby from "../plugins/rehype-ruby";
import remarkDirectiveFallback from "../plugins/remark-directive-fallback";
import remarkDirectivePlainContainers from "../plugins/remark-directive-plain-containers";
import remarkRuby from "../plugins/remark-ruby";

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
    .use(remarkDirectivePlainContainers)
    .use(remarkDirectiveFallback),
  compileMarkdownToHtml: unified().use(remarkRehype, {
    allowDangerousHtml: true,
  }),
  transformHtml: unified()
    .use(rehypeRaw)
    .use(rehypeCallout)
    .use(rehypeMermaid)
    .use(rehypeRuby)
    .use(rehypeSlug)
    .use(rehypeKatex, {
      output: "html",
      trust: true,
    })
    .use(rehypeShikiFromHighlighter, await highlighter(), { 
      theme: "css-variables",
      addLanguageClass: true,
      defaultLanguage: "plaintext",
      fallbackLanguage: "plaintext",
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

export async function parseMarkdown(content: string, options: OptionsParseMarkdown) {
  // const { slug, excerpt, meta } = options.info;

  const mdast = await pipeline.transformMarkdown.run(pipeline.parseMarkdown.parse(content));
  const hast = await pipeline.transformHtml.run(
    await pipeline.compileMarkdownToHtml.run(mdast),
  );

  const components = Array.from(pipeline.analyzeComponents.stringify(hast));
  const toc = pipeline.analyzeToc.stringify(hast) as any as [string, string][];
  const getFileNameFromComponent = toGetFileNameFromComponent(
    options.componentBase,
  );
  const componentImport = components
    .filter(c => c !== "Math")
    .map(c => `import ${c} from "${getFileNameFromComponent(c)}";`)
    .join("\n");

  const jsx = pipeline.escapeAstro(pipeline.compileAstro.stringify(pipeline.compileHtmlToAstro.runSync(hast)));

  return {
    componentNames: components,
    componentImport,
    jsx,
    toc,
  };
}
