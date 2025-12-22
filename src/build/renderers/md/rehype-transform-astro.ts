import type { Element, Root, Text } from "hast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";
import { kebabCaseToCamelCase } from "~/utils/stub";
import { unoConfig } from '~/../uno.config'


const rehypeTransformAstro: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName === "style" || node.tagName === "script") {
        node.properties = node.properties ?? {};
        node.properties["is:inline"] = true;
      } else if (node.tagName === "component") {
        const component = kebabCaseToCamelCase(
          (node.properties?.is as string) ?? "fragment",
        );
        node.tagName = component;

        if (node.properties?.is) {
          delete node.properties.is;
        }
      }
    });

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

    // visit(tree, "text", (node, _, parent) => {
    //   if (parent?.type === "element" && parent?.tagName === "style")
    //     return;
    //   (node as Text).value = (node as unknown as Text).value
    //     .replaceAll("{", "\u001B#x7B;")
    //     .replaceAll("}", "\u001B#x7D;");
    // });
    
    return tree;
  };
};

export default rehypeTransformAstro;
