<script lang="ts">
  import { DEFAULT_COLOR_PALETTE } from "src/logic/color-palette-default";
  import {
    colorPalette,
    type ColorPaletteSetting,
  } from "src/stores/color-palette";
  import { generateColorPaletteStyleTag } from "src/logic/color-palette-style-tag";

  interface Props {
    palette?: ColorPaletteSetting;
    title?: string;
  }

  let { palette = DEFAULT_COLOR_PALETTE as ColorPaletteSetting, title = "Color Palette" }: Props = $props();

  function setPalette() {
    colorPalette.set(palette);
    const colorPaletteStyleTag = generateColorPaletteStyleTag(palette);
    document.getElementById("style-color-palette")!.innerHTML =
      colorPaletteStyleTag;
  }

  let style: string = $derived(`width:1.125rem;height:1.125rem;border-radius:50%;background:linear-gradient(to right,oklch(65% ${palette.one.c} ${palette.one.h}) 50%,oklch(65% ${palette.two.c} ${palette.two.h}) 0);`);
</script>

<button class="flex gap-1" {title} onclick={setPalette} aria-label={title}>
  <div {style}></div>
</button>
