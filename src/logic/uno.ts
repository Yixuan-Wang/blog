import { createGenerator } from "@unocss/core";
import { presetUno } from "@unocss/preset-uno";
// @ts-ignore
import UnoConfig from "../../.uno.config";

export const uno = createGenerator({
  ...UnoConfig,
  presets: [presetUno()],
});

export async function unoify(html: string) {
  const { css } = await uno.generate(html);
  return css;
}
