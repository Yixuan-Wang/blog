<script lang="ts">
  export let style: string = "";
  let isPinned: boolean = false;
  let isOpen: boolean = false;

  const handleMouseEnter = () => {
    if (window.matchMedia("(pointer: fine)").matches) {
      isOpen = true;
    }
  };

  const handleMouseLeave = () => {
    if (window.matchMedia("(pointer: fine)").matches) {
      if (!isPinned) isOpen = false;
    }
  };

  const handleClick = () => {
    if (isPinned) isPinned = false;
    else {
      isPinned = true;
      isOpen = true;
    }
  };
</script>

<div
  class="relative inline-flex justify-start"
  {style}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
>
  <div class="contents" on:click={handleClick} on:keypress={handleClick}>
    <slot name="handle" />
  </div>
  {#if isOpen}
  <div class="absolute w-max bottom-[calc(100%+0.5rem)]">
    <slot name="content" />
  </div>
  {/if}
</div>
