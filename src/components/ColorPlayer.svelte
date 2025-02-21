<script lang="ts">
  import { onMount, tick } from "svelte";

  let {
    colorChange = ({ l, c, h }) => {},
    hue = 253.92,
    chroma = 0.138,
  } = $props<{
    colorChange: (color: { h: number; c: number; l: number }) => void;
    hue: number;
    chroma: number;
  }>();

  const MAX_CHROMA = 0.5;

  let slider: HTMLElement;

  let pointerX = $state(0);
  let pointerY = $state(0);
  let showPointer = $state(false);
  let isDragging = $state(false);

  let luminance = 0.65;
  // let gradient = $derived([0, 45, 90, 135, 180, 225, 270, 315, 360].map(h => `oklch(${luminance} ${chroma} ${h}deg)`).join(', '));

  const updateColor = (x: number, y: number) => {
  	hue = (x / slider.clientWidth) * 360;
  	chroma = MAX_CHROMA * (1 - (y / slider.clientHeight)) // * 100;
  	// Emit an event with the new color values instead of updating the store directly
  	colorChange({ h: hue, c: chroma, l: luminance });
  };

  const handlePointer = (e: MouseEvent) => {
    const rect = slider.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, slider.clientWidth));
    const y = Math.max(0, Math.min(e.clientY - rect.top, slider.clientHeight));
    pointerX = x;
    pointerY = y;
    updateColor(x, y);
  };

  function pointerDown(e: MouseEvent) {
    isDragging = true;
    handlePointer(e);
  }

  function pointerMove(e: MouseEvent) {
    if (isDragging) handlePointer(e);
  }

  function pointerUp() {
    isDragging = false;
  }

  onMount(() => {
    window.addEventListener('load', () => {
      tick().then(() => {
        pointerX = Math.max(0, Math.min(hue / 360 * slider.clientWidth, slider.clientWidth));
        pointerY = Math.max(0, Math.min((1 - chroma / MAX_CHROMA) * slider.clientHeight, slider.clientHeight));
        showPointer = true;
      });
    });
  });
</script>

<div class="flex flex-col items-stretch gap-2">
  <div
    class="slider rounded-lg"
    bind:this={slider}
    style="min-width: 64px; min-height: 96px; position: relative; background: oklch({luminance} {chroma} {hue});"
    onmousedown={pointerDown}
    onmousemove={pointerMove}
    onmouseup={pointerUp}
    onmouseleave={pointerUp}
  >
    <div
      class="pointer"
      style="display: { showPointer ? "unset" : "none" }; position: absolute; left: {pointerX - 5}px; top: {pointerY -
        5}px; width: 10px; height: 10px; background: oklch({luminance} {chroma} {hue}); border: 1px solid #000; border-radius: 50%;"
    ></div>
  </div>

  <div class="flex w-full justify-stretch gap-4">
    <input class="ring-none inline" type="number" min="0" max="360" bind:value={hue} oninput={() => colorChange({ h: hue, c: chroma, l: luminance })} />
    <input class="ring-none inline" type="number" min="0" max={MAX_CHROMA} step="0.01" bind:value={chroma} oninput={() => colorChange({ h: hue, c: chroma, l: luminance })} />
  </div>
</div>

<style>
  .slider {
    user-select: none;
    cursor: pointer;
    @apply cursor-pointer b-solid b-2;
  }
</style>
