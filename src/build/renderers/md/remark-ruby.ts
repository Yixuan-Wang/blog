import type { Root } from "mdast";
import { visit } from "unist-util-visit";
import type { Plugin } from "unified";

const remarkRuby: Plugin<[], Root, Root> = function () {
  return (tree: Root) => {
    visit(tree, (node) => {
      if (node.type === "link" && node.url.startsWith("-")) {
        const data = node.data || (node.data = {});
        (node as any).type = "unknown";
        data.hName = "ruby";
        node.children.push({
          type: "html",
          value: `<rt>${node.url.slice(1)}</rt>`,
        } as any);
        /*
        node.type ===
        const hast = h(node.name, node.attributes);

        data.hName = hast.tagName;
        data.hProperties = hast.properties; */
      }
    });

    return tree;
  };
};

export default remarkRuby;
