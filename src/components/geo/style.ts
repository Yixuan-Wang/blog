import type { ExpressionSpecification, StyleSpecification } from "maplibre-gl";

const PALETTE_RAW_DEFINITION = {
  background: "var(--color-one-canvas)",
  green: "color-mix(in oklab, var(--color-one-canvas), var(--color-two) 5%)",
  water: "color-mix(in oklab, var(--color-one-canvas), var(--color-one) 30%)",
  building: "color-mix(in oklab, var(--color-one-canvas), rgb(var(--color-front)) 10%)",
  roadMinor: "color-mix(in oklab, var(--color-one-canvas), var(--color-one) 14%)",
  roadMedium: "color-mix(in oklab, var(--color-one-canvas), var(--color-one) 32%)",
  roadMajor: "color-mix(in oklab, var(--color-one-canvas), var(--color-one) 50%)",
  rail: "color-mix(in oklab, var(--color-one-canvas), var(--color-two) 32%)",
  boundary: "color-mix(in oklab, var(--color-one-canvas), rgb(var(--color-front)) 35%)",
  label: "color-mix(in oklab, var(--color-one-canvas), rgb(var(--color-front)) 88%)",
  labelMuted: "color-mix(in oklab, var(--color-one-canvas), rgb(var(--color-front)) 64%)",
  labelWater: "color-mix(in oklab, var(--color-one-front), rgb(var(--color-front)) 25%)",
  labelRoad: "color-mix(in oklab, var(--color-one-canvas), rgb(var(--color-front)) 64%)",
} as const;

export type Palette = Record<keyof typeof PALETTE_RAW_DEFINITION, string>;

/** Inline CSS custom property declarations that coerce each palette color to sRGB. */
export const PALETTE_STYLE = Object.entries(PALETTE_RAW_DEFINITION)
  .map(([key, expr]) => `--geo-${key}: rgb(from ${expr} r g b / alpha)`)
  .join("; ");

let registered = false;

/** Register palette custom properties as `<color>` so `getComputedStyle` resolves them. */
export function registerPaletteProperties() {
  if (registered)
    return;
  registered = true;
  for (const key of Object.keys(PALETTE_RAW_DEFINITION)) {
    try {
      CSS.registerProperty({
        name: `--geo-${key}`,
        syntax: "<color>",
        inherits: false,
        initialValue: "transparent",
      });
    }
    catch {
      // Already registered (e.g. HMR).
    }
  }
}

function convertToRGBA(cssColor: string): string {
  if (cssColor.startsWith("rgb"))
    return cssColor;
  const m = cssColor.match(/^color\(srgb\s+([\d.eE+-]+)\s+([\d.eE+-]+)\s+([\d.eE+-]+)(?:\s*\/\s*([\d.eE+-]+))?\)$/);
  if (!m)
    return cssColor;
  const ch = (s: string) => Math.round(Math.min(1, Math.max(0, Number(s))) * 255);
  const a = m[4] === undefined
    ? 1
    : Math.min(1, Math.max(0, Number(m[4])));
  return `rgba(${ch(m[1])}, ${ch(m[2])}, ${ch(m[3])}, ${Number(a.toFixed(3))})`;
}

/** Read computed palette custom properties from `host` as `rgba()` strings for MapLibre. */
export function resolvePaletteAsRGBA(host: HTMLElement): Palette {
  const style = getComputedStyle(host);
  const palette = {} as Palette;
  for (const key of Object.keys(PALETTE_RAW_DEFINITION) as (keyof Palette)[]) {
    palette[key] = convertToRGBA(style.getPropertyValue(`--geo-${key}`).trim());
  }
  return palette;
}

const LAYOUT_TEXTFIELD: ExpressionSpecification = ["coalesce", ["get", "name"], ["get", "name:latin"]];

/**
  * Convert stops from `[zoomLevel, widthInPixels]` to a MapLibre GL expression for `line-width`.
*/
const convertStopsToLineWidth = (stops: [number, number][]): ExpressionSpecification => [
  "interpolate", ["exponential", 1.5], ["zoom"], ...stops.flat(),
];

const RAIL_WIDTH = convertStopsToLineWidth([[10, 0.8], [18, 3.5]]);
const RAIL_DASH_WIDTH = convertStopsToLineWidth([[12, 0.4], [18, 1.8]]);
const RAIL_BRIDGE_CASING_WIDTH = convertStopsToLineWidth([[10, 1.6], [18, 6]]);
const IS_RAIL: ExpressionSpecification = ["match", ["get", "class"], ["rail", "transit"], true, false];

/**
 * A minimal themed style over OpenFreeMap's OpenMapTiles-schema vector tiles.
 */
export function getStyleSpec(palette: Palette, font: string[]): StyleSpecification {
  return {
    version: 8,
    sources: {
      omt: { type: "vector", url: "https://tiles.openfreemap.org/planet" },
    },
    layers: [
      { id: "background", type: "background", paint: { "background-color": palette.background } },
      {
        id: "landcover", type: "fill", source: "omt", "source-layer": "landcover",
        filter: ["match", ["get", "class"], ["wood", "grass", "farmland", "wetland"], true, false],
        paint: { "fill-color": palette.green, "fill-opacity": 0.6 },
      },
      {
        id: "park", type: "fill", source: "omt", "source-layer": "park",
        paint: { "fill-color": palette.green },
      },
      {
        id: "water", type: "fill", source: "omt", "source-layer": "water",
        paint: { "fill-color": palette.water },
      },
      {
        id: "waterway", type: "line", source: "omt", "source-layer": "waterway",
        filter: ["!=", ["get", "brunnel"], "tunnel"],
        paint: { "line-color": palette.water, "line-width": convertStopsToLineWidth([[8, 0.5], [18, 6]]) },
      },
      {
        id: "aeroway-apron", type: "fill", source: "omt", "source-layer": "aeroway", minzoom: 11,
        filter: ["==", ["get", "class"], "apron"],
        paint: { "fill-color": palette.building },
      },
      {
        id: "aeroway-taxiway", type: "line", source: "omt", "source-layer": "aeroway", minzoom: 12,
        filter: ["==", ["get", "class"], "taxiway"],
        paint: { "line-color": palette.roadMinor, "line-width": convertStopsToLineWidth([[12, 0.5], [18, 8]]) },
      },
      {
        id: "aeroway-runway", type: "line", source: "omt", "source-layer": "aeroway", minzoom: 10,
        filter: ["==", ["get", "class"], "runway"],
        paint: { "line-color": palette.roadMedium, "line-width": convertStopsToLineWidth([[10, 1.5], [18, 24]]) },
      },
      {
        id: "rail-tunnel", type: "line", source: "omt", "source-layer": "transportation",
        filter: ["all", IS_RAIL, ["==", ["get", "brunnel"], "tunnel"]],
        layout: { "line-join": "round" },
        paint: { "line-color": palette.rail, "line-width": RAIL_WIDTH, "line-dasharray": [2, 2], "line-opacity": 0.5 },
      },
      {
        id: "building", type: "fill", source: "omt", "source-layer": "building", minzoom: 13,
        paint: { "fill-color": palette.building, "fill-outline-color": palette.roadMinor },
      },
      {
        id: "road-path", type: "line", source: "omt", "source-layer": "transportation", minzoom: 12,
        filter: ["match", ["get", "class"], ["track", "path"], true, false],
        layout: { "line-join": "round" },
        paint: { "line-color": palette.roadMinor, "line-width": convertStopsToLineWidth([[12, 1], [18, 4]]), "line-dasharray": [2, 2] },
      },
      {
        id: "road-minor", type: "line", source: "omt", "source-layer": "transportation",
        filter: ["match", ["get", "class"], ["minor", "service"], true, false],
        layout: { "line-cap": "round", "line-join": "round" },
        paint: { "line-color": palette.roadMinor, "line-width": convertStopsToLineWidth([[12, 0.5], [18, 8]]) },
      },
      {
        id: "road-medium", type: "line", source: "omt", "source-layer": "transportation",
        filter: ["match", ["get", "class"], ["secondary", "tertiary"], true, false],
        layout: { "line-cap": "round", "line-join": "round" },
        paint: { "line-color": palette.roadMedium, "line-width": convertStopsToLineWidth([[8, 0.5], [18, 10]]) },
      },
      {
        id: "road-major", type: "line", source: "omt", "source-layer": "transportation",
        filter: ["match", ["get", "class"], ["motorway", "trunk", "primary"], true, false],
        layout: { "line-cap": "round", "line-join": "round" },
        paint: { "line-color": palette.roadMajor, "line-width": convertStopsToLineWidth([[5, 0.5], [18, 14]]) },
      },
      {
        id: "rail", type: "line", source: "omt", "source-layer": "transportation",
        filter: ["all", IS_RAIL, ["!=", ["get", "brunnel"], "tunnel"], ["!=", ["get", "brunnel"], "bridge"]],
        layout: { "line-join": "round" },
        paint: { "line-color": palette.rail, "line-width": RAIL_WIDTH },
      },
      {
        id: "rail-dash", type: "line", source: "omt", "source-layer": "transportation", minzoom: 12,
        filter: ["all", IS_RAIL, ["!=", ["get", "brunnel"], "tunnel"], ["!=", ["get", "brunnel"], "bridge"]],
        layout: { "line-join": "round" },
        paint: { "line-color": palette.background, "line-width": RAIL_DASH_WIDTH, "line-dasharray": [3, 3] },
      },
      {
        id: "rail-bridge-casing", type: "line", source: "omt", "source-layer": "transportation",
        filter: ["all", IS_RAIL, ["==", ["get", "brunnel"], "bridge"]],
        layout: { "line-cap": "butt", "line-join": "round" },
        paint: { "line-color": palette.background, "line-width": RAIL_BRIDGE_CASING_WIDTH },
      },
      {
        id: "rail-bridge", type: "line", source: "omt", "source-layer": "transportation",
        filter: ["all", IS_RAIL, ["==", ["get", "brunnel"], "bridge"]],
        layout: { "line-join": "round" },
        paint: { "line-color": palette.rail, "line-width": RAIL_WIDTH },
      },
      {
        id: "rail-bridge-dash", type: "line", source: "omt", "source-layer": "transportation", minzoom: 12,
        filter: ["all", IS_RAIL, ["==", ["get", "brunnel"], "bridge"]],
        layout: { "line-join": "round" },
        paint: { "line-color": palette.background, "line-width": RAIL_DASH_WIDTH, "line-dasharray": [3, 3] },
      },
      {
        id: "boundary", type: "line", source: "omt", "source-layer": "boundary",
        filter: ["all", ["<=", ["get", "admin_level"], 4], ["!=", ["get", "maritime"], 1]],
        paint: { "line-color": palette.boundary, "line-width": 1, "line-dasharray": [4, 2] },
      },
      {
        id: "water-name-point", type: "symbol", source: "omt", "source-layer": "water_name",
        filter: ["==", ["geometry-type"], "Point"],
        layout: { "text-field": LAYOUT_TEXTFIELD, "text-font": font, "text-size": 12 },
        paint: { "text-color": palette.labelWater, "text-halo-color": palette.water, "text-halo-width": 1.5 },
      },
      {
        id: "water-name-line", type: "symbol", source: "omt", "source-layer": "water_name",
        filter: ["==", ["geometry-type"], "LineString"],
        layout: { "text-field": LAYOUT_TEXTFIELD, "text-font": font, "text-size": 12, "symbol-placement": "line" },
        paint: { "text-color": palette.labelWater, "text-halo-color": palette.water, "text-halo-width": 1.5 },
      },
      {
        id: "road-name", type: "symbol", source: "omt", "source-layer": "transportation_name", minzoom: 13,
        layout: {
          "text-field": LAYOUT_TEXTFIELD, "text-font": font, "symbol-placement": "line",
          "text-size": ["match", ["get", "class"], ["motorway", "trunk", "primary"], 12, ["secondary", "tertiary"], 11, 10],
        },
        paint: { "text-color": palette.labelRoad, "text-halo-color": palette.background, "text-halo-width": 1.5 },
      },
      {
        id: "poi-name", type: "symbol", source: "omt", "source-layer": "poi", minzoom: 15,
        filter: ["<=", ["get", "rank"], 2],
        layout: {
          "text-field": LAYOUT_TEXTFIELD, "text-font": font, "text-max-width": 8,
          "text-size": ["interpolate", ["linear"], ["get", "rank"], 1, 13, 2, 12],
          "symbol-sort-key": ["get", "rank"],
        },
        paint: { "text-color": palette.labelMuted, "text-halo-color": palette.background, "text-halo-width": 1.5 },
      },
      {
        id: "place-name", type: "symbol", source: "omt", "source-layer": "place",
        filter: ["match", ["get", "class"], ["continent", "country", "state", "province"], false, true],
        layout: {
          "text-field": LAYOUT_TEXTFIELD, "text-font": font, "text-max-width": 8,
          "text-size": ["match", ["get", "class"], "city", 16, "town", 14, 12],
        },
        paint: { "text-color": palette.labelMuted, "text-halo-color": palette.background, "text-halo-width": 1.5 },
      },
      {
        id: "country-name", type: "symbol", source: "omt", "source-layer": "place", maxzoom: 8,
        filter: ["match", ["get", "class"], ["country", "state", "province"], true, false],
        layout: { "text-field": LAYOUT_TEXTFIELD, "text-font": font, "text-size": 13, "text-max-width": 8 },
        paint: { "text-color": palette.label, "text-halo-color": palette.background, "text-halo-width": 1.5 },
      },
    ],
  };
}
