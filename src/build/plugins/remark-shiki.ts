import type { Highlighter } from "shiki";
import type { Plugin } from "unified";
import { map } from "unist-util-map";
import { visit } from "unist-util-visit";
import type { HTML, Root } from "mdast";
import { fromHtml } from "hast-util-from-html";
import { toHtml } from "hast-util-to-html";

interface OptionsRemarkShiki {
  highlighter: Highlighter,
  cssVariables: boolean,
}

const remarkShiki: Plugin<[OptionsRemarkShiki], Root, Root> = function (options: OptionsRemarkShiki) {
  const { highlighter, cssVariables } = options;
  return (tree: Root) => {
    return map(tree, (node) => {
      if (node.type === "code") {
        const lang = node?.lang ?? undefined;
        const code = node.value;
        const rendered = highlighter.codeToHtml(code, { lang });
        return {
          type: "html",
          value: cssVariables ? escapeColors(rendered) : rendered,
        } satisfies HTML;
      }
      return node;
    });
  };
};

const COLORS = {
  "#000001": "foreground",
  "#000002": "background",
  "#000003": "builtin",
  "#000004": "constant",
  "#000005": "string",
  "#000006": "comment",
  "#000007": "keyword",
  "#000008": "parameter",
  "#000009": "function",
  "#000010": "escape",
  "#000011": "punctuation",
  "#000012": "type",
  "#000013": "macro",
  "#000014": "generic",
}

function escapeColors(html: string): string {
  const tree = fromHtml(html, { fragment: true });
  visit(tree, "element", (node) => {
    // @ts-ignore
    if ((node as unknown as Element).properties?.style?.includes("color")) {
      // @ts-ignore
      node.properties.style = node.properties.style.replace(/#[0-9A-F]*/g, m => `var(--shiki-color-var-${COLORS[m] ?? "foreground"})`);
    }
  });
  // @ts-ignore
  const result = toHtml(tree);
  return result;
}

export default remarkShiki;
