<script lang="ts">
import ColorPlayer from "./ColorPlayer.svelte";
import { colorPalette } from "../stores/color-palette";

const setColors = (oneOrTwo: "one" | "two", { h, c }: { h: number; c: number }) => {
  colorPalette.set({ ...$colorPalette, [oneOrTwo]: { h, c, l: 0.5, mode: "oklch" } });
};

</script>

<div id="palette-player" class="grid grid-cols-2 gap-4 w-full items-stretch">
  <ColorPlayer colorChange={(color) => setColors("one", color)} hue={$colorPalette.one.h} chroma={$colorPalette.one.c}></ColorPlayer>
  <ColorPlayer colorChange={(color) => setColors("two", color)} hue={$colorPalette.two.h} chroma={$colorPalette.two.c}></ColorPlayer>
</div>
