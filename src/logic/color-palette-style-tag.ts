import { calcColorFunctions, polyfillOklch as p } from "./color";
import type { ColorPaletteSetting } from "./color-palette";

export function generateColorPaletteStyleTag(
  setting: ColorPaletteSetting,
): string {
  const { one, two } = setting;
  const { light, dark } = calcColorFunctions;

  return `:root:not(.dark){--ca:${p(light.accent(one))};--cb:${p(
    light.front(one),
  )};--cc:${p(light.back(one))};--cd:${p(light.accent(two))};--ce:${p(
    light.front(two),
  )};--cf:${p(light.back(two))};}:root.dark{--ca:${p(
    dark.accent(one),
  )};--cb:${p(dark.front(one))};--cc:${p(dark.back(one))};--cd:${p(
    dark.accent(two),
  )};--ce:${p(dark.front(two))};--cf:${p(dark.back(two))};}`;
}
