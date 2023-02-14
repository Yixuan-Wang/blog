import type { Highlighter } from "shiki";
import type { Plugin } from "unified";
import { map } from "unist-util-map";
import type { HTML, Root } from "mdast";

interface OptionsRemarkShiki {
  highlighter: Highlighter
}

const remarkShiki: Plugin<[OptionsRemarkShiki], Root, Root> = function (options: OptionsRemarkShiki) {
  const { highlighter } = options;
  return (tree: Root) => {
    return map(tree, (node) => {
      if (node.type === "code") {
        const lang = node?.lang ?? undefined;
        const code = node.value;
        const rendered = highlighter.codeToHtml(code, { lang });
        return {
          type: "html",
          value: rendered,
        } satisfies HTML;
      }
      return node;
    });
  };
};

export default remarkShiki;
