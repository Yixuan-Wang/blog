<script lang="ts">
  import { onMount } from "svelte";


  interface Props {
    targetSelector: string;
    filled?: boolean;
    class?: string | null;
    storage?: import('svelte').Snippet;
    handle?: import('svelte').Snippet;
  }

  let {
    targetSelector,
    filled = $bindable(false),
    class: className = null,
    storage,
    handle
  }: Props = $props();
  

  let storageElement: Element | null = $state(null);
  let targetElement: Element | null = null;
  let handleElement: Element | null = $state(null);

  const content: Node[] = [];

  function init() {
    targetElement = document.querySelector(targetSelector);
    if (storageElement) content.push(...storageElement.childNodes);

    content.forEach(node => {
      if (node instanceof Element) listen(node);
    });
    if (handleElement) listen(handleElement);
    if (targetElement) listen(targetElement);
  }

  function pop() {
    filled = false;
    content.forEach(node => targetElement?.append(node));
  }

  function push() {
    filled = true;
    content.forEach(node => storageElement?.append(node));
  }

  function toggle() {
    filled ? pop() : push();
  }

  function listen(element: Element) {
    element.addEventListener("component-storage:pop", pop);
    element.addEventListener("component-storage:push", push);
    element.addEventListener("component-storage:toggle", toggle);
  }

  onMount(() => {
    init();
    if (!filled) pop();
  })
</script>

<div bind:this={storageElement} style="display:none;">
  {@render storage?.()}
</div>
<div class={className} bind:this={handleElement} style="display:contents;">
  {@render handle?.()}
</div>
