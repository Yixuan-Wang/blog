import type { Root } from "hast";
import { h } from "hastscript";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import type { Plugin } from "unified";
import { unified } from "unified";

function splitGloss(str: string) {
  const parts = str.split(/([\-\.=_;:\\>~\[\]\(\)<>])/);
  return parts.map((part) => {
    if ("-.=_;:\\>~[]()<>".includes(part))
      return { value: part };
    if (part.match(/^\d?[A-Z]+$/))
      return { value: part, label: true };
    else return { value: part };
  });
}

const rehypeLeipzig: Plugin<Array<void>, Root> = () => {
  return (tree) => {
    let lineIndex = 0;
    let maxColumnCount = 1;
    const newRootChildren = tree.children.flatMap((line) => {
      if (line.type !== "element" || line.tagName !== "p")
        return [];

      lineIndex += 1;

      const align = Object.hasOwn(line.properties ?? {}, "align");
      const gloss = Object.hasOwn(line.properties ?? {}, "gloss");

      delete line.properties?.align;
      delete line.properties?.gloss;

      if (!align) {
        line.properties = {
          style: "",
          ...line.properties,
        };
        line.data = {
          shouldSpanToEnd: true,
          ...line.data,
        };
        line.properties.style += `grid-row-start:${lineIndex};grid-column-start:1;`;
        return [line];
      }

      return line.children
        .flatMap((children) => {
          if (children.type === "element") {
            children.properties = {
              style: "",
              ...children.properties,
              ...line.properties,
            };
            return [children];
          }
          else if (children.type === "text") {
            return children.value
              .split(/(?<!\\)\s/)
              .map(tok => tok.replace(/\\(\s)/g, "$1"))
              .filter(tok => !!tok)
              .map(tok =>
                h(
                  "span",
                  {
                    style: "",
                    ...line.properties,
                  },
                  tok,
                ),
              );
          }
          else {
            return [];
          }
        })
        .map((tokenElement) => {
          if (!gloss)
            return tokenElement;
          const newChildren = tokenElement.children.flatMap((child) => {
            if (child.type !== "text")
              return [child];
            return splitGloss(child.value).map(({ value, label }) =>
              label
                ? h("span", { style: "font-variant-caps:all-small-caps;" }, [
                  value,
                ])
                : h("span", [value]),
            );
          });
          tokenElement.children.splice(
            0,
            tokenElement.children.length,
            ...newChildren,
          );
          return tokenElement;
        })
        .map((tokenElement, index) => {
          (tokenElement.properties!
            .style as string) += `grid-row-start:${lineIndex};grid-column-start:${
            index + 1
          };`;
          if (index === maxColumnCount)
            maxColumnCount = index + 1;
          return tokenElement;
        });
    });
    tree.children.splice(0, tree.children.length, ...newRootChildren);

    tree.children.forEach((line) => {
      if (line.type !== "element")
        return;

      if (line.data?.shouldSpanToEnd)
        line.properties!.style! += `grid-column-end:${maxColumnCount};`;
    });

    return tree;
  };
};

const PARSER = unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypeLeipzig)
  .use(rehypeStringify);

export default function parse(input: string): string {
  return PARSER.processSync(input).toString();
}
