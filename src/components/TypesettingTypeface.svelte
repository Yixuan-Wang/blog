<script lang="ts">
  import {
    typeface,
    type Typeface,
    type StoreTypeface,
  } from "~/stores/typesetting";
  import BaseHoverSv from "./BaseHoverSv.svelte";

  const { handle, content } = $props();

  const nextTypeface = (current: Typeface) => {
    switch (current) {
      case "sans":
        return "serif";
      case "serif":
        return "sans";
    }
  };

  const handleClick = (key: string) => (event: MouseEvent) => {
    typeface.setKey(
      key as keyof StoreTypeface,
      nextTypeface(typeface.get()[key as keyof StoreTypeface])
    );
  };
</script>

<div class="grid w-fit grid-cols-[auto_1fr] gap-x-2 gap-y-1 items-center">
  {#each Object.entries($typeface) as [key, value]}
    <div>
      {#if key === "postHeading"}
        <span>Heading</span>
      {:else if key === "postContent"}
        <span>Contents</span>
      {/if}
    </div>
    <button class="contents" onclick={handleClick(key)}>
      {#if value === "sans"}
        <BaseHoverSv>
          {#snippet handle()}
            <div class="i-mdi-newspaper-variant"></div>
          {/snippet}
          {#snippet content()}
            <div class="tip">
              <span>Sans Serif</span>
            </div>
          {/snippet}
        </BaseHoverSv>
      {:else if value === "serif"}
        <BaseHoverSv>
          {#snippet handle()}
            <div class="i-mdi-newspaper"></div>
          {/snippet}
          {#snippet content()}
                        <div class="tip">
              <span>Serif</span>
            </div>
                      {/snippet}
        </BaseHoverSv>
      {/if}
    </button>
  {/each}
</div>
