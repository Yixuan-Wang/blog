import { createGenerator } from "@unocss/core";
import type { VitePluginConfig } from "unocss/vite";
import { presetUno } from "@unocss/preset-uno";
import presetAttributify from "@unocss/preset-attributify";

export const uno = createGenerator({
  presets: [presetUno(), presetAttributify()],
  rules: [
    ["small-caps", { "font-variant-caps": "small-caps" }],
  ]
});

export async function unoify(html: string) {
  const { css } = await uno.generate(html);
  return css;
}
