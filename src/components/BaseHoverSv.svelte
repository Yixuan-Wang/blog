<script lang="ts">
  interface Props {
    style?: string;
    handle?: import('svelte').Snippet;
    content?: import('svelte').Snippet;
  }

  let { style = "", handle, content }: Props = $props();
  let isPinned: boolean = false;
  let isOpen: boolean = $state(false);

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
  class="hover-component-container"
  {style}
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
>
  <div class="hover-component-handle" onclick={handleClick} onkeypress={handleClick}>
    {@render handle?.()}
  </div>
  {#if isOpen}
  <div class="hover-component-content">
    {@render content?.()}
  </div>
  {/if}
</div>
