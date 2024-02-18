import type { Element, Root, Text } from "hast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";
import { kebabCaseToCamelCase } from "../../utils/stub";
import { is } from "date-fns/locale";

interface Options {
  hookEscape: ((_: Element) => boolean | undefined)[]
}

const rehypeCallout: Plugin<[Options?], Root> = (_options) => {
  return (tree) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "blockquote") return;

      const firstChildren = node.children.filter(node => node.type === "element" && node.tagName === "p")?.[0];
      if (!firstChildren) return;

      const firstText = (firstChildren as Element).children?.[0];
      if (firstText.type !== "text") return;

      const text = firstText.value;
      const match = text.match(/^\s*\[!(.+)\]/);

      if (!match) return;
      const kind = match[1].toLowerCase();
      firstText.value = text.replace(/^\s*\[!.+\]/, "");

      node.tagName = "component";
      node.properties = {
        ...node.properties,
        is: "callout",
        kind,
      };
    });
  };
};

export default rehypeCallout;
