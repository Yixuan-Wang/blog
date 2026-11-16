import type { ExpressionSpecification, StyleSpecification } from "maplibre-gl";

const PALETTE_SOURCE = {
  background: "var(--color-one-canvas)",
  green: "color-mix(in oklab, var(--color-one-canvas), var(--color-two) 12%)",
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
  labelRoad: "color-mix(in oklab, var(--color-two-front), rgb(var(--color-front)) 35%)",
} as const;

export type Palette = Record<keyof typeof PALETTE_SOURCE, string>;

/** Resolve CSS color expressions to rgba() strings that MapLibre can parse. */
export function resolvePalette(host: HTMLElement): Palette {
  const probe = document.createElement("span");
  probe.style.display = "none";
  host.appendChild(probe);
  const ctx = document.createElement("canvas").getContext("2d", { willReadFrequently: true })!;

  const palette = {} as Palette;
  for (const [key, expr] of Object.entries(PALETTE_SOURCE)) {
    probe.style.color = expr;
    // Computed value may be oklch()/color(); the canvas normalizes it to sRGB bytes.
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = getComputedStyle(probe).color;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
    palette[key as keyof Palette] = `rgba(${r}, ${g}, ${b}, ${(a / 255).toFixed(3)})`;
  }
  probe.remove();
  return palette;
}

const NAME: ExpressionSpecification = ["coalesce", ["get", "name"], ["get", "name:latin"]];

const width = (stops: [number, number][]): ExpressionSpecification => [
  "interpolate", ["exponential", 1.5], ["zoom"], ...stops.flat(),
];

/**
 * A minimal themed style over OpenFreeMap's OpenMapTiles-schema vector tiles.
 */
export function vectorStyle(palette: Palette, font: string[]): StyleSpecification {
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
        paint: { "line-color": palette.water, "line-width": width([[8, 0.5], [18, 6]]) },
      },
      {
        id: "building", type: "fill", source: "omt", "source-layer": "building", minzoom: 13,
        paint: { "fill-color": palette.building, "fill-outline-color": palette.roadMinor },
      },
      {
        id: "road-minor", type: "line", source: "omt", "source-layer": "transportation",
        filter: ["match", ["get", "class"], ["minor", "service", "track", "path"], true, false],
        layout: { "line-cap": "round", "line-join": "round" },
        paint: { "line-color": palette.roadMinor, "line-width": width([[12, 0.5], [18, 8]]) },
      },
      {
        id: "road-medium", type: "line", source: "omt", "source-layer": "transportation",
        filter: ["match", ["get", "class"], ["secondary", "tertiary"], true, false],
        layout: { "line-cap": "round", "line-join": "round" },
        paint: { "line-color": palette.roadMedium, "line-width": width([[8, 0.5], [18, 10]]) },
      },
      {
        id: "road-major", type: "line", source: "omt", "source-layer": "transportation",
        filter: ["match", ["get", "class"], ["motorway", "trunk", "primary"], true, false],
        layout: { "line-cap": "round", "line-join": "round" },
        paint: { "line-color": palette.roadMajor, "line-width": width([[5, 0.5], [18, 14]]) },
      },
      {
        id: "rail", type: "line", source: "omt", "source-layer": "transportation",
        filter: ["match", ["get", "class"], ["rail", "transit"], true, false],
        paint: { "line-color": palette.rail, "line-width": width([[10, 0.4], [18, 1.2]]) },
      },
      {
        id: "boundary", type: "line", source: "omt", "source-layer": "boundary",
        filter: ["all", ["<=", ["get", "admin_level"], 4], ["!=", ["get", "maritime"], 1]],
        paint: { "line-color": palette.boundary, "line-width": 1, "line-dasharray": [4, 2] },
      },
      {
        id: "water-name-point", type: "symbol", source: "omt", "source-layer": "water_name",
        filter: ["==", ["geometry-type"], "Point"],
        layout: { "text-field": NAME, "text-font": font, "text-size": 12 },
        paint: { "text-color": palette.labelWater, "text-halo-color": palette.water, "text-halo-width": 1.5 },
      },
      {
        id: "water-name-line", type: "symbol", source: "omt", "source-layer": "water_name",
        filter: ["==", ["geometry-type"], "LineString"],
        layout: { "text-field": NAME, "text-font": font, "text-size": 12, "symbol-placement": "line" },
        paint: { "text-color": palette.labelWater, "text-halo-color": palette.water, "text-halo-width": 1.5 },
      },
      {
        id: "road-name", type: "symbol", source: "omt", "source-layer": "transportation_name", minzoom: 13,
        layout: {
          "text-field": NAME, "text-font": font, "symbol-placement": "line",
          "text-size": ["match", ["get", "class"], ["motorway", "trunk", "primary"], 13, ["secondary", "tertiary"], 12, 11],
        },
        paint: { "text-color": palette.labelRoad, "text-halo-color": palette.background, "text-halo-width": 1.5 },
      },
      {
        id: "poi-name", type: "symbol", source: "omt", "source-layer": "poi", minzoom: 15,
        filter: ["<=", ["get", "rank"], 2],
        layout: {
          "text-field": NAME, "text-font": font, "text-max-width": 8,
          "text-size": ["interpolate", ["linear"], ["get", "rank"], 1, 11, 2, 10],
          "symbol-sort-key": ["get", "rank"],
        },
        paint: { "text-color": palette.labelMuted, "text-halo-color": palette.background, "text-halo-width": 1.5 },
      },
      {
        id: "place-name", type: "symbol", source: "omt", "source-layer": "place",
        filter: ["match", ["get", "class"], ["continent", "country", "state", "province"], false, true],
        layout: {
          "text-field": NAME, "text-font": font, "text-max-width": 8,
          "text-size": ["match", ["get", "class"], "city", 16, "town", 14, 12],
        },
        paint: { "text-color": palette.labelMuted, "text-halo-color": palette.background, "text-halo-width": 1.5 },
      },
      {
        id: "country-name", type: "symbol", source: "omt", "source-layer": "place", maxzoom: 8,
        filter: ["match", ["get", "class"], ["country", "state", "province"], true, false],
        layout: { "text-field": NAME, "text-font": font, "text-size": 13, "text-max-width": 8 },
        paint: { "text-color": palette.label, "text-halo-color": palette.background, "text-halo-width": 1.5 },
      },
    ],
  };
}
