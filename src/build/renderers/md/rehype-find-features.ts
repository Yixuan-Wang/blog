import { visit } from "unist-util-visit";
import type { Element, Root } from "hast";
import type { Plugin } from "unified";
import { kebabCaseToCamelCase } from "~/utils/stub";

export interface Features {
  components: Set<string>;
  features: Set<string>;
}

const rehypeFindFeatures: Plugin<[], Root, Features> = function (this: any) {
  function compiler(tree: Root) {
    const components = new Set<string>();
    const features = new Set<string>();
    visit(tree, "element", (node: Element) => {
      if (node.tagName === "component" && node.properties?.is) {
        const component = kebabCaseToCamelCase(node.properties.is as string);
        components.add(component);
      }

      if ((node.properties?.className as string[])?.includes("katex")) {
        features.add("math");
      }
    });

    return { components, features };
  }

  Object.assign(this, { Compiler: compiler });
};

export default rehypeFindFeatures;
