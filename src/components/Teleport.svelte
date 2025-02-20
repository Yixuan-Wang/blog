<script lang="ts">
  import { onMount } from "svelte";
  interface Props {
    target: string;
    children?: import('svelte').Snippet;
  }

  let { target, children }: Props = $props();
  let sourceElement = $state<Element>();

  onMount(() => {
    const targetElement = document.querySelector(target);
    if (targetElement && sourceElement) {
      for (let child of sourceElement.childNodes) {
        targetElement.appendChild(child)
      }
    }
  })
</script>

<div bind:this={sourceElement} style="display: none;">{@render children?.()}</div>
