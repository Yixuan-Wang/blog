import type { ColorOklch, ColorRgb } from "culori/fn";
import {
  convertLabToLch,
  convertLchToLab,
  convertOklabToRgb,
  convertRgbToOklab,
  parseHex,
  serializeHex,
} from "culori/fn";
import type { ColorScheme } from "./color-scheme";

/* export function convertLabToLch(oklab: ColorOklab): ColorOklch {
  const { l, a, b } = oklab;
  return {
    mode: "oklch",
    l,
    c: Math.sqrt(a * a + b * b),
    h: Math.atan2(b, a),
  };
}

export function convertLchToLab(oklch: ColorOklch): ColorOklab {
  const { l, c, h } = oklch;
  return {
    mode: "oklab",
    l,
    a: c * Math.cos(h),
    b: c * Math.sin(h),
  };
} */

export function convertRgbToOklch(rgb: ColorRgb): ColorOklch {
  return convertLabToLch(convertRgbToOklab(rgb));
}

function clipRgbChannel(v: number): number {
  return v > 1 ? 1 : v < 0 ? 0 : v;
}

export function clipRgb(rgb: ColorRgb): ColorRgb {
  return {
    mode: "rgb",
    r: clipRgbChannel(rgb.r),
    g: clipRgbChannel(rgb.g),
    b: clipRgbChannel(rgb.b),
  };
}

export function convertOklchToRgb(oklch: ColorOklch): ColorRgb {
  return clipRgb(convertOklabToRgb(convertLchToLab(oklch)));
}

export function formatRgb(rgb: ColorRgb): [number, number, number] {
  let { r, g, b } = rgb;
  r = Math.round(r * 255000) / 1000;
  g = Math.round(g * 255000) / 1000;
  b = Math.round(b * 255000) / 1000;
  return [r, g, b];
}

export function polyfillOklch(oklch: ColorOklch): string {
  return formatRgb(clipRgb(convertOklabToRgb(convertLchToLab(oklch)))).join(
    ",",
  );
}

const calcColorAccentNormal = (o: ColorOklch): ColorOklch => o;
const calcColorAccentReverse = (o: ColorOklch): ColorOklch => ({
  ...o,
  l: 0.57 + o.l * 0.125,
});
const calcColorFadeReverse = (o: ColorOklch): ColorOklch => ({
  ...o,
  l: 0.72 + o.l * 0.25,
});
const calcColorDimReverse = (o: ColorOklch): ColorOklch => ({
  ...o,
  l: 0.32 + o.l * 0.25,
  c: o.c * 0.25,
});
const calcColorFadeNormal = (o: ColorOklch): ColorOklch => ({
  ...o,
  l: 0.75 + o.l * 0.25,
  c: o.c * 0.25,
});
const calcColorDimNormal = (o: ColorOklch): ColorOklch => ({
  ...o,
  l: 0.35 + o.l * 0.25,
  c: o.c * 0.75,
});

export interface CalcColorFunctions {
  accent: (o: ColorOklch) => ColorOklch
  back: (o: ColorOklch) => ColorOklch
  front: (o: ColorOklch) => ColorOklch
}

const calcColorFunctions: Record<ColorScheme, CalcColorFunctions> = {
  light: {
    accent: calcColorAccentNormal,
    back: calcColorFadeNormal,
    front: calcColorDimNormal,
  },
  dark: {
    accent: calcColorAccentReverse,
    back: calcColorDimReverse,
    front: calcColorFadeReverse,
  },
};

export {
  parseHex,
  convertRgbToOklab,
  convertOklabToRgb,
  serializeHex,
  calcColorFunctions,
};
export type { ColorRgb, ColorOklch };
