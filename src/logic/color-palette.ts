import { persistentAtom } from "@nanostores/persistent";
import type { ColorOklch } from "culori/fn";
import ColorPaletteDefault from "./color-palette-default.json";

export interface ColorPaletteSetting {
  one: ColorOklch;
  two: ColorOklch;
}

export const colorPalette = persistentAtom<ColorPaletteSetting>(
  "color-palette",
  ColorPaletteDefault as ColorPaletteSetting,
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);
