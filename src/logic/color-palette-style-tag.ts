import { calcColorFunctions, polyfillOklch as p } from "./color";
import type { ColorPaletteSetting } from "../stores/color-palette";

export function generateColorPaletteStyleTag(
  setting: ColorPaletteSetting,
): string {
  const { one, two } = setting;
  return `:root {
  --color-original-one: oklch(${one.l} ${one.c} ${one.h});
  --color-original-two: oklch(${one.l} ${two.c} ${two.h});
}`;
}
