import { visit } from "unist-util-visit";
import type { Element, Root } from "hast";
import type { Plugin } from "unified";
import { kebabCaseToCamelCase } from "../../utils/stub";

const rehypeFindComponents: Plugin<[], Root, Set<string>> = function (this: Plugin<[], Root, Set<string>>) {
  function compiler(tree: Root) {
    const components = new Set<string>();
    visit(tree, "element", (node: Element) => {
      if (node.tagName === "component") {
        const component = kebabCaseToCamelCase(
          (node.properties?.is as string) ?? "fragment",
        );
        components.add(component);
      }
    });

    return components;
  }

  Object.assign(this, { Compiler: compiler });
};

export default rehypeFindComponents;
