import { toText } from "hast-util-to-text";
import type { Root } from "hast";
import type { Plugin } from "unified";


interface Waypoint {
  title: string;
  id: string;
  lat: number;
  lng: number;
}

const rehypeExtractWaypoint: Plugin<[], Root, Waypoint[]> = function (this: Plugin<[], Root, Waypoint[]>) {
  function compiler(tree: Root) {
    const waypoints: Waypoint[] = [];

    tree.children.forEach((child) => {
      if (child.type !== "element") return;

      if (child.tagName === "section" && child.properties.dataLat !== undefined && child.properties.dataLng !== undefined) {
        const h2 = child.children.find(node => node.type === "element" && node.tagName === "h2"); 
        const title = h2 ? toText(h2 as any).trim() : "";
        const id = (h2 as any)?.properties?.id as string ?? "";
        const lat = child.properties.dataLat;
        const lng = child.properties.dataLng;
        waypoints.push({ title, id, lat, lng });
      }
    });

    return waypoints;
  }

  Object.assign(this, { Compiler: compiler });
};

export default rehypeExtractWaypoint;
