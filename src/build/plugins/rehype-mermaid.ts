import type { Element, Root, Text } from "hast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";
import { kebabCaseToCamelCase } from "../../utils/stub";
import { is } from "date-fns/locale";
import { toText } from "hast-util-to-text";

interface Options {
}

const rehypeMermaid: Plugin<[Options?], Root> = (_options) => {
  return (tree) => {
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
      const textNode: Element = {
        type: "element",
        tagName: "pre",
        properties: {
          className: ["mermaid", "is:raw"],
        },
        children: [
          {
            type: "text",
            value: content,
          } as Text,
        ],
      };

      node.tagName = "component";
      node.properties = {
        ...node.properties,
        is: "mermaid",
      };
      node.children = [textNode];
    });
  };
};

export default rehypeMermaid;
