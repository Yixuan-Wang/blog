<script lang="ts">
  import { onMount } from "svelte";
  export let target: string;
  let sourceElement: Element;

  onMount(() => {
    const targetElement = document.querySelector(target);
    if (targetElement && sourceElement) {
      for (let child of sourceElement.childNodes) {
        targetElement.appendChild(child)
      }
    }
  })
</script>

<div bind:this={sourceElement} style="display: none;"><slot /></div>
