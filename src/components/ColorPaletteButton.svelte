<script lang="ts">
  import {
    polyfillOklch,
    calcColorFunctions,
    type ColorOklch,
  } from "src/logic/color";
  import { DEFAULT_COLOR_PALETTE } from "src/logic/color-palette-default";
  import {
    colorPalette,
    type ColorPaletteSetting,
  } from "src/stores/color-palette";
  import { colorScheme } from "src/logic/color-scheme";
  import { generateColorPaletteStyleTag } from "src/logic/color-palette-style-tag";

  export let palette: ColorPaletteSetting =
    DEFAULT_COLOR_PALETTE as ColorPaletteSetting;
  export let title: string = "Color Palette";

  function setPalette() {
    colorPalette.set(palette);
    const colorPaletteStyleTag = generateColorPaletteStyleTag(palette);
    document.getElementById("style-color-palette")!.innerHTML =
      colorPaletteStyleTag;
  }

  let accent: (_: ColorOklch) => ColorOklch;
  $: accent = calcColorFunctions[$colorScheme].accent;

  let colorOne: string;
  let colorTwo: string;
  let style: string;
  $: colorOne = polyfillOklch(accent(palette.one));
  $: colorTwo = polyfillOklch(accent(palette.two));
  $: style = `width:1.125rem;height:1.125rem;border-radius:50%;background:linear-gradient(to right,rgb(${colorOne}) 50%,rgb(${colorTwo}) 0);`;
</script>

<button class="flex gap-1" {title} on:click={setPalette}>
  <div {style} />
</button>
