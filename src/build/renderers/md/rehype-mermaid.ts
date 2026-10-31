import type { Element, Root } from "hast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";
import { toText } from "hast-util-to-text";
import { PeleError, render } from "pele";

interface Options {
}

const rehypeMermaid: Plugin<[Options?], Root> = (_options) => {
  return (tree) => {
    let count = 0;
    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "pre") return;

      const enclosedCode = node.children?.[0];

      if (
        !enclosedCode
        || enclosedCode.type !== "element"
        || enclosedCode.tagName !== "code"
        || !((enclosedCode.properties?.className as string[])?.includes("language-mermaid"))
      ) return;

      const content = toText(enclosedCode, {
        whitespace: "pre-wrap",
      });

      let svg: string;
      try {
        ({ svg } = render(content, { idPrefix: `mermaid-${count++}-` }));
      } catch (e) {
        if (e instanceof PeleError) {
          console.warn(`[rehype-mermaid] ${e.code} at ${e.line}:${e.column}: ${e.message}`);
          return;
        }
        throw e;
      }

      node.tagName = "div";
      node.properties = { className: ["pele-container"] };
      node.children = [
        {
          type: "element",
          tagName: "Fragment",
          properties: { "set:html": svg },
          children: [],
        },
      ];
    });
  };
};

export default rehypeMermaid;
