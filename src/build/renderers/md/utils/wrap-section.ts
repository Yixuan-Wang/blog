import type { Element, Root, RootContent, Node, ElementContent } from "hast";
import { h, type Properties } from "hastscript";
import { parse as parseYaml } from "@std/yaml";
import { toText } from "hast-util-to-text";

const isPlainObject = (val: any): val is Record<string, unknown> => {
  if (typeof val !== 'object' || val === null) return false;
  const proto = Object.getPrototypeOf(val);
  return proto === Object.prototype || proto === null;
};


/**
 * Wraps all children in a `<section>` element.
 *
 * @param children
 * @returns A `<section>` element containing the children.
*/
export function wrapSectionHandlerDefault(
  children: ElementContent[],
): Element {
  // @ts-ignore
  return h("section", {}, ...children);
}

/**
 * Wraps all children in a `<section>` element and extracts YAML metadata from the first `<pre><code class="language-yaml">` block.
 *
 * @param children
 * @returns A `<section>` element containing the children, with properties extracted from the YAML metadata.
 */
export function wrapSectionHandlerExtractYaml(children: ElementContent[]): Element {
  const properties: Properties = {};
  let metadataChildrenIndex: number | null = null;
  for (const [idx, child] of children.entries()) {
    if (
      child.type === "element"
      && child.tagName === "pre"
      && child.children?.[0]?.type === "element"
      && child.children[0].tagName === "code"
      && child.children[0].properties?.className?.includes("language-yaml")
    ) {
      metadataChildrenIndex = idx;
      // @ts-ignore
      const metadataText = toText(child);
      try {
        const metadata = parseYaml(metadataText);
        if (isPlainObject(metadata)) {
          Object.assign(properties, Object.fromEntries(Object.entries(metadata).map(([key, val]) => [`data-${key}`, val])));
        } else {
          console.warn("Parsed YAML metadata is not a plain object", metadataText, metadata);
        }
      } catch (err) {
        console.warn("Failed to parse YAML metadata", metadataText, err);
      }
    }
  }

  if (metadataChildrenIndex !== null) {
    children.splice(metadataChildrenIndex, 1);
  }

  // @ts-ignore
  return h("section", properties, ...children);
}

/**
 * A helper function that groups content by sections based on `<h2>` headings.
 *
 * Content will be treated as top-level content and not wrapped in a section.
 * - before the first <h2>
 * - between <hr> and the next <h2>
 * 
 * @param tree The root node to process.
 * @param wrapSectionHandler The function to use for wrapping sections.
 * @returns An array of nodes containing the wrapped sections.
 */
export function wrapSection(
  tree: Root,
  wrapSectionHandler: (children: ElementContent[]) => Element = wrapSectionHandlerDefault,
) {
  let allSections: ElementContent[] = [];
  let currentSectionChildren: ElementContent[] | null = null;

  function concludeCurrentSection() {
    if (currentSectionChildren && currentSectionChildren.length > 0) {
      const currentSection = wrapSectionHandler(currentSectionChildren);
      allSections.push(currentSection);
    }
  }

  for (const child of tree.children as ElementContent[]) {
    if (child.type === "element" && child.tagName === "h2") {
      concludeCurrentSection();
      currentSectionChildren = [child];
    } else if (child.type === "element" && child.tagName === "hr") {
      // Conclude the current section and force following content to be trailing top-level content or a new section
      concludeCurrentSection();
      currentSectionChildren = null;
      allSections.push(child);
    } else if (currentSectionChildren === null) {
      // Use top-level content if there's no current section being built
      allSections.push(child);
    } else {
      currentSectionChildren.push(child);
    }
  }

  if (currentSectionChildren && currentSectionChildren.length > 0) {
    concludeCurrentSection();
  }

  tree.children = allSections;
  return tree;
}
