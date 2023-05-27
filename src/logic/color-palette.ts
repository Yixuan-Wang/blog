import { persistentAtom } from "@nanostores/persistent";
import type { ColorOklch } from "culori/fn";
import { DEFAULT_COLOR_PALETTE } from "./color-palette-default";

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
