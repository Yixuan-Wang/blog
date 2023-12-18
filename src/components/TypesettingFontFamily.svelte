<script lang="ts">
  import {
    fontFamily,
  } from "~/stores/typesetting";
</script>

<div class="grid w-full grid-cols-1 gap-2 items-center">
  <input class="w-full" bind:value={$fontFamily.sans} placeholder="Inter, 'Noto Sans SC'" />
  <input class="w-full" bind:value={$fontFamily.serif} placeholder="'Source Serif 4', 'Noto Serif SC'"/>
  <input class="w-full" bind:value={$fontFamily.mono} placeholder="'JetBrains Mono', 'Noto Sans SC'" />
</div>
