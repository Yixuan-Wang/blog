import type { ColorScheme, ColorSchemeSetting } from "src/logic/color-scheme";
import type { ColorPaletteSetting } from "src/logic/color-palette";
import { DEFAULT_COLOR_PALETTE } from "src/logic/color-palette-default";
import { generateColorPaletteStyleTag } from "src/logic/color-palette-style-tag";

/* Color Scheme Init */
const colorSchemeSetting
  = (localStorage.getItem("color-scheme") as unknown as ColorSchemeSetting)
  ?? "auto";
const colorSchemePreference: ColorScheme = window.matchMedia(
  "(prefers-color-scheme: dark)",
).matches
  ? "dark"
  : "light";
const colorScheme
  = colorSchemeSetting === "auto" ? colorSchemePreference : colorSchemeSetting;

if (colorScheme === "dark")
  document.documentElement.classList.add("dark");

/* Color Palette Init */
const colorPaletteSetting = localStorage.getItem("color-palette");
const colorPalette: ColorPaletteSetting = colorPaletteSetting
  ? JSON.parse(colorPaletteSetting)
  : (DEFAULT_COLOR_PALETTE as ColorPaletteSetting);
const colorPaletteStyleTag = generateColorPaletteStyleTag(colorPalette);
document.getElementById("style-color-palette")!.innerHTML
  = colorPaletteStyleTag;

document.body.classList.remove("cloak");
