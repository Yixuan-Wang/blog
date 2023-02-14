import type { Root } from "mdast";
import { visit } from "unist-util-visit";
import type { Plugin } from "unified";
import { h } from "hastscript";

const remarkDirectiveFallback: Plugin<[], Root, Root> = function () {
  return (tree: Root) => {
    visit(tree, (node) => {
      if (
        node.type === "textDirective"
        || node.type === "leafDirective"
        || node.type === "containerDirective"
      ) {
        const data = node.data || (node.data = {});
        const hast = h(node.name, node.attributes);

        data.hName = hast.tagName;
        data.hProperties = hast.properties;
      }
    });

    return tree;
  };
};

export default remarkDirectiveFallback;
