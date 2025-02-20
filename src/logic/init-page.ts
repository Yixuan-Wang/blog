import type { ColorScheme, ColorSchemeSetting } from "src/stores/color-scheme";
import type { ColorPaletteSetting } from "src/stores/color-palette";
import { generateColorPaletteStyleTag } from "src/logic/color-palette-style-tag";

import { fontFamily, typeface } from "src/stores/typesetting";
import { colorPalette } from "src/stores/color-palette";
import { colorScheme, registerPreference } from "src/stores/color-scheme";

/* Color Scheme Init */
const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
const [register, _] = registerPreference(colorSchemeQuery);
register();
colorScheme.subscribe(state => {
  if (state == "dark")
    document.documentElement.classList.add("dark");
  else
    document.documentElement.classList.remove("dark");
})

/* Color Palette Init */
colorPalette.subscribe(state => {
  document.getElementById("style-color-palette")!.innerHTML = generateColorPaletteStyleTag(state);
})


/* Typeface Init */

typeface.subscribe(state => {
  document.documentElement.dataset.fontPostHeading = state.postHeading;
  document.documentElement.dataset.fontPostContent = state.postContent;
});

/* Fontfamily Init */

fontFamily.subscribe(state => {
  if (!!state.sans) document.documentElement.style.setProperty("--font-custom-sans", state.sans);
  else document.documentElement.style.removeProperty("--font-custom-sans");
  
  if (!!state.serif) document.documentElement.style.setProperty("--font-custom-serif", state.serif);
  else document.documentElement.style.removeProperty("--font-custom-serif");

  if (!!state.mono) document.documentElement.style.setProperty("--font-custom-mono", state.mono);
  else document.documentElement.style.removeProperty("--font-custom-mono");
})

document.body.classList.remove("cloak");
