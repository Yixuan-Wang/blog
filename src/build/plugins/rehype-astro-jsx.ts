import type { Element, Root, Text } from "hast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";
import { kebabCaseToCamelCase } from "../../utils/stub";

interface Options {
  hookEscape: ((_: Element) => boolean | undefined)[]
}

const rehypeAstroJsx: Plugin<[Options?], Root> = (_options) => {
  return (tree) => {
    // console.log(tree);
    visit(tree, "element", (node: Element) => {
      /* if (options?.hookEscape.some((p) => p(node))) {
        node.properties = node.properties || {};
        node.properties["is:raw"] = true;
      } */

      if (node.tagName === "style") {
        node.properties = node.properties ?? {};
        node.properties["is:global"] = true;
      }

      if (node.tagName === "leipzig-gloss" || node.tagName === "hover-style") {
        node.tagName = "div";
        node.properties = {};
        node.children = [];
      }
    });

    /* tree.children.forEach((node, index) => {
      if (node.type === "comment") {
        if (node.value.trim() === "more") {

        }
      }
    }); */
    const foldoutInsert = tree.children.findIndex(node => node.type === "comment" && node.value.trim() === "more");
    if (foldoutInsert >= 0) {
      tree.children.splice(foldoutInsert, 0, {
        type: "element",
        tagName: "slot",
        children: [],
        properties: {
          name: "foldout",
        },
      });
    }

    /* const hasComponent = (node: Element) =>
      node.tagName === "component"
        ? true
        : (
            node.children.filter(({ type }) => type === "element") as Element[]
          ).some(hasComponent);
    tree.children.forEach((rootContent) => {
      if (rootContent.type === "element") {
        rootContent as Element;
        if (!hasComponent(rootContent)) {
          rootContent.properties = rootContent.properties ?? {};
          rootContent.properties["is:raw"] = true;
        }
      }
    }); */

    visit(tree, "element", (node: Element) => {
      if (node.tagName === "component") {
        const component = kebabCaseToCamelCase(
          (node.properties?.is as string) ?? "fragment",
        );
        node.tagName = component;

        if (node.properties?.is)
          delete node.properties.is;
      }
    });

    visit(tree, "text", (node, _, parent) => {
      if (parent?.type === "element" && parent?.tagName === "style")
        return;
      (node as Text).value = (node as unknown as Text).value
        .replaceAll("{", "\u001B#x7B;")
        .replaceAll("}", "\u001B#x7D;");
    });
    return tree;
  };
};

export default rehypeAstroJsx;
