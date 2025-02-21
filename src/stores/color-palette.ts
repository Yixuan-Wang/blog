import { persistentAtom } from "@nanostores/persistent";
import { DEFAULT_COLOR_PALETTE } from "src/logic/color-palette-default";

export type ColorOklch = {
  h: number
  c: number
  l: number
  mode: "oklch"
}

export interface ColorPaletteSetting {
  one: ColorOklch
  two: ColorOklch
}

export const colorPalette = persistentAtom<ColorPaletteSetting>(
  "color-palette",
  DEFAULT_COLOR_PALETTE as ColorPaletteSetting,
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  },
);
