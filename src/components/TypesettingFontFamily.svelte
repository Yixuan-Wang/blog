<script lang="ts">
  import {
    fontFamily,
  } from "~/stores/typesetting";
</script>

<div class="grid w-full grid-cols-[auto_1fr] gap-2 items-center">
  <label>
      <div class="i-mdi-newspaper-variant"></div>
      <span>Sans-serif</span>
  </label>
  <input class="w-full" bind:value={$fontFamily.sans} placeholder="Inter, 'Noto Sans SC'" />
  <label>
      <div class="i-mdi-newspaper"></div>
      <span>Serif</span>
  </label>
  <input class="w-full" bind:value={$fontFamily.serif} placeholder="'Source Serif 4', 'Noto Serif SC'"/>
  <label>
      <div class="i-mdi-terminal"></div>
      <span>Monospace</span>
  </label>
  <input class="w-full" bind:value={$fontFamily.mono} placeholder="'JetBrains Mono', 'Noto Sans SC'" />
</div>

<style>
label {
  @apply inline-flex flex-row items-center gap-1;
}
</style>