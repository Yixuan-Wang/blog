<script lang="ts">
  import {
    parseHex,
    convertRgbToOklch,
    convertOklchToRgb,
    polyfillOklch,
    serializeHex,
    calcColorFunctions,
  } from "src/logic/color";
  import type { ColorRgb, ColorOklch } from "src/logic/color";
  import { onMount } from "svelte";
  import type { ColorScheme } from "~/stores/color-scheme";

  const colors = [
    "#e1545a",
    "#bf4d3f",
    "#e1612f",
    "#e16626",
    "#e1791e",
    "#e1981a",
    "#7f8523",
    "#609e28",
    "#3e8e35",
    "#2d8c45",
    "#1eac66",
    "#1a9a83",
    "#15afcf",
    "#19a0e1",
    "#2389e1",
    "#3187e1",
    "#4572e1",
    "#656ee1",
    "#9167e1",
    "#bd5ee1",
    "#e15be1",
    "#e155ac",
    "#e1537e",
  ];

  function formatOklch(oklch: ColorOklch) {
    let { l, c, h } = oklch;
    l = Math.round(l * 1000) / 10;
    c = Math.round(c * 1000) / 1000;
    h = Math.round((h * 180000) / Math.PI) / 1000;
    return `${l}% ${c} ${h}`;
  }

  /*   function chroma(oklch: ColorOklch) {
    return {
      ...oklch,
      c: oklch.c * 0.75,
    }
  }

  function lighten(oklch: ColorOklch) {
    return {
      ...oklch,
      l: oklch.l * 1.25,
      c: oklch.c * 0.5,
    };
  }

  function darken(oklch: ColorOklch) {
    return {
      ...oklch,
      l: oklch.l * 0.75,
      c: oklch.c * 0.5,
    };
  } */

  let { accent, back, front } = calcColorFunctions.light;

  const setColorFunc = (val: ColorScheme) => {
    const funcs = calcColorFunctions[val];
    accent = funcs.accent;
    back = funcs.back;
    front = funcs.front;
  };

  const oklch = colors.map((color) => convertRgbToOklch(parseHex(color)));
  onMount(async () => {
    const { colorScheme } = await import("~/stores/color-scheme");
    colorScheme.listen(setColorFunc);
    setColorFunc(colorScheme.get());
    /* const L = oklch.map(lighten);
    const D = oklch.map(darken);
    const Ac = oklch.map(chroma);
    const Lc = Ac.map(lighten);
    const Dc = Ac.map(darken); */
    /* let all = [];
    for (let [key, val] of oklch.entries()) {
      all.push({
        name: `${key}`,
        colors: [val, normal_light(val), normal_dark(val), reverse_acc(val), reverse_light(val), reverse_dark(val)]
          .map(convertOklchToRgb)
          .map(serializeHex),
      });
    }

    console.log(
      JSON.stringify({
        name: "Pak",
        hues: all,
        tones: all[0]!.colors.map((_, idx) => `${idx}`),
      })
    ); */
  });
</script>

<div class="flex flex-col gap-2 mb-10">
  {#each colors as color, key}
    <div
      class="p-2 rounded-2"
      style={`background: rgb(${polyfillOklch(back(oklch[key]))})`}
    >
      <h2
        class="flex flex-row gap-1 items-center"
        style={`color: rgb(${polyfillOklch(front(oklch[key]))})`}
      >
        <div
          class="i-mdi-circle"
          style={`color: rgb(${polyfillOklch(accent(oklch[key]))})`}
        />
        <span class="font-bold font-mono">#{key}</span>
      </h2>
    </div>
  {/each}
</div>

<!-- <div class="grid w-[6em] grid-cols-2 gap-1">
  {#each colors as color, key}
    <span style={`color: rgb(${polyfillOklch(reverse_acc(oklch[key]))})`}
      >{key}</span
    >
    <span style={`color: rgb(${polyfillOklch(reverse_light(oklch[key]))})`}
      >d-{key}</span
    >
  {/each}
</div> -->

<!-- <div class="flex">
  {#each colors as color, index}
  <div class="w-full flex align-center justify-around" style={`color: ${color};`}><span>{index}</span></div>
  {/each}
</div>
<div class="w-full p-4" style={`background: linear-gradient(to right, ${colors.join(",")})`}></div> -->
