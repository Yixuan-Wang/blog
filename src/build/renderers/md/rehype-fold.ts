import type { Root, Node, Element } from "hast";
import type { Plugin } from "unified";
import { h, type Properties } from "hastscript";
import { toText } from "hast-util-to-text";
import { parse as parseYaml } from "@std/yaml";

import { wrapSection, wrapSectionHandlerExtractYaml } from "./utils/wrap-section";

const rehypeFold: Plugin<[], Root> = () => {
  return (tree: Root, file) => {
    if (!file.data.fold) return tree;

    if (file.data?.fold === "fold") {
      return wrapSection(tree)
    } else if (file.data?.fold === "extract-yaml") {
      return wrapSection(tree, wrapSectionHandlerExtractYaml); 
    } else {
      return tree;
    }
  }
}

export default rehypeFold;
