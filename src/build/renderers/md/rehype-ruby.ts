import { visit } from "unist-util-visit";
import type { Element, Root } from "hast";
import type { Plugin } from "unified";

const rehypeRuby: Plugin<Array<void>, Root> = () => {
  return (tree) => {
    visit(tree, "element", (node: Element) => {
      if (
        node.tagName === "a"
        && node.properties?.href
        && (node.properties.href as string)?.startsWith?.("-")
      ) {
        node.tagName = "ruby";
        const rt = (node.properties.href as string).slice(1);
        delete node.properties.href;
        node.children.push({
          type: "element",
          tagName: "rt",
          properties: {},
          children: [
            {
              type: "text",
              value: rt,
            },
          ],
        });
      }
    });

    return tree;
  };
};

export default rehypeRuby;
