import { toText } from "hast-util-to-text";
import type { Root } from "hast";
import type { Plugin } from "unified";

const rehypeExtractToc: Plugin<[], Root, [string, string][]> = function (this: Plugin<[], Root, [string, string][]>) {
  function compiler(tree: Root) {
    const headers: [string, string][] = [];
    tree.children.forEach(child => {
      if (child.type !== "element" || child.tagName !== "h2") return;
      
      const h2 = toText(child).trim();
      headers.push([h2, child.properties?.id as string ?? ""]);
    })

    return headers;
  }

  Object.assign(this, { Compiler: compiler });
};

export default rehypeExtractToc;
