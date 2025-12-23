import path from "node:path";
import matter from "gray-matter";
import { renderJSX, type AstroComponentFactory } from "astro/runtime/server/index.js";
import { renderSlotToString } from "astro/runtime/server/render/slot.js";
import { chunkToString } from "astro/runtime/server/render/common.js";
import { jsx, jsxs, jsxDEV, Fragment } from "astro/jsx-runtime";
import type { Root as MdastRoot } from "mdast";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import rehypeShikiFromHighlighter from "@shikijs/rehype/core";
import rehypeSlug from "rehype-slug";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import type { Processor } from "unified";
import { unified } from "unified";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";

import highlighter from "./highlights";
import rehypeTransformAstro from "./rehype-transform-astro";
import rehypeCallout from "./rehype-callout";
import rehypeMermaid from "./rehype-mermaid";
import rehypeExtractToc from "./rehype-extract-toc";
import rehypeFindFeatures, { type Features } from "./rehype-find-features";
import rehypeRuby from "./rehype-ruby";
import remarkDirectiveFallback from "./remark-directive-fallback";
import remarkDirectivePlainContainers from "./remark-directive-plain-containers";
import remarkRuby from "./remark-ruby";

import { slotName } from "~/utils/stub";
import { RenderTemplateResult } from "astro/runtime/server/render/astro/render-template.js";
import { tr } from "date-fns/locale";
import { visit } from "unist-util-visit";

/** Parse and strip the frontmatter from a markdown source string.
 * @param source The markdown source string.
 */
export function parseFrontmatter(source: string) {
  const { data, excerpt, content } = matter(source, {
    excerpt: true,
    excerpt_separator: "<!-- more -->",
  });

  return {
    frontmatter: data as post.FrontmatterRaw,
    excerpt: excerpt ?? "",
    rawContent: content,
  };
}

const HIGHLIGHTER = null;
const loadHighlighter = async () => {
  if (HIGHLIGHTER) return HIGHLIGHTER;
  const highlighterInstance = await highlighter();
  return highlighterInstance;
};
const getHighlighter = async () => {
  return await loadHighlighter();
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
    .use(rehypeShikiFromHighlighter, await getHighlighter(), {
      theme: "css-variables",
      addLanguageClass: true,
      defaultLanguage: "plaintext",
      fallbackLanguage: "plaintext",
    }),
  analyzeFeatures: unified().use(rehypeFindFeatures),
  analyzeToc: unified().use(rehypeExtractToc),
  transformAstro: unified().use(rehypeTransformAstro),
  // compileAstro: unified().use(rehypeStringify, {
  //   collapseEmptyAttributes: true,
  //   closeSelfClosing: true,
  //   allowDangerousCharacters: true,
  //   allowDangerousHtml: true,
  // }),
  // escapeAstro: (s: string) => s.replaceAll("\u001B#", "&#"),
};

// const toGetFileNameFromComponent = (basePath: string) => {
//   return (componentName: string) => {
//     return path.join(basePath, `${componentName}.astro`);
//   };
// };

const allRuntimeComponentLoader = Object.fromEntries(Object.entries(import.meta.glob("~/components/runtime/*.astro", {
  eager: false,
  import: "default",
})).map(([key, value]) => {
  const name = path.basename(key, ".astro");
  return [name, value] as const;
}));

const allRuntimeComponents: Record<string, AstroComponentFactory> = {};

async function loadRuntimeComponent(
  componentNames: string[],
) {
  return Object.fromEntries(
    await Promise.all(componentNames.map(async (name) => {
      if (allRuntimeComponents[name]) {
        return [name, allRuntimeComponents[name]];
      } else {
        const componentImport = (await allRuntimeComponentLoader[name]()) as AstroComponentFactory;
        allRuntimeComponents[name] = componentImport;
        return [name, componentImport];
      }
    }))
  );
}



export async function render(content: string) {
  const mdast = await pipeline.transformMarkdown.run(pipeline.parseMarkdown.parse(content));
  const hast = await pipeline.transformHtml.run(
    await pipeline.compileMarkdownToHtml.run(mdast),
  );

  const { components, features } = pipeline.analyzeFeatures.stringify(hast) as any as Features;
  const toc = pipeline.analyzeToc.stringify(hast) as any as [string, string][];

  const componentTree = await pipeline.transformAstro.run(hast);
  const astroComponent: AstroComponentFactory = async (result, props, slots) => {
    const runtimeComponents = components ? await loadRuntimeComponent(Array.from(components)) : {};

    const transformedSlots: Record<string, any> = {};
    for (const [name, slot] of Object.entries(slots)) {
      transformedSlots[slotName(name)] = chunkToString(
        result,
        await renderSlotToString(result, slot as any)
      )
    }

    for (const node of componentTree.children) {
      if (node.type !== "element") continue;
      if (node.tagName === "slot") {
        const name = slotName(node.properties?.name?.toString() ?? "default");
        if (transformedSlots[name]) {
          node.tagName = "Fragment";
          delete node.properties?.name;
          node.properties["set:html"] = transformedSlots[name];
        }
      }
    }

    const { type, props: { children } } = toJsxRuntime(componentTree, {
      Fragment,
      jsx,
      jsxs,
      jsxDEV,
      components: runtimeComponents,
    });
    return renderJSX(result, jsx(type, { ...props, children }))
  }
  Object.assign(astroComponent, {
    isAstroComponentFactory: true,
  });

  return {
    Content: astroComponent,
    features,
    toc,
  };
}
