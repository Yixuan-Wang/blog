import type { Plugin } from "unified";
import type { Root } from "mdast";
import { visit } from "unist-util-visit";
import type { ContainerDirective } from "mdast-util-directive";
import { h } from "hastscript";

const remarkDirectivePlainContainers: Plugin<[], Root, Root> = function () {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === "containerDirective"
        && (node.name === "details" || node.name === "card")
      ) {
        node as ContainerDirective;

        const data = node.data || (node.data = {});
        data.hProperties = h("div", node.attributes).properties;

        if (node.name === "details") {
          data.hName = "details";
          if (node?.children?.at(0)?.data?.directiveLabel) {
            const summary = node.children.shift()!;
            node.children.unshift({
              type: "unknown",
              children: (summary as any).children,
              data: {
                hName: "summary",
              },
            } as any);
          }
        }
        else {
          data.hName = "div";
          (data.hProperties as any).class = (data.hProperties as any).class ?? [];
          ((data.hProperties as any).class as any[]).push("card");
        }
      }
    });
  };
};

export default remarkDirectivePlainContainers;
