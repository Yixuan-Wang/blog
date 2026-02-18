<script lang="ts">
import type { Snippet } from "svelte";

let { target, children }: {
  target: string,
  children?: Snippet,
} = $props();

let root: HTMLElement | null = $state(null);
let visible = $state(false);

/**
 * Find the nearest enclosing elements.
 * Treats all target elements as a sequence in document order, finds the insertion point
 * where the source element would fit, and returns the target elements before and after.
 * 
 * @param source - The source element to find enclosing elements for
 * @param targetSelector - CSS selector for target elements
 * @param container - Container to search within (defaults to document)
 */
function findNearestEnclosingElements(
  source: HTMLElement, 
  targetSelector: string, 
  container: Document | HTMLElement = document
): [HTMLElement | null, HTMLElement | null] {
  // Get all target elements in document order
  const targets = Array.from(container.querySelectorAll(targetSelector)) as HTMLElement[];
  
  if (targets.length === 0) return [null, null];

  // Find insertion point using document position comparison
  let insertionIndex = 0;
  
  for (let i = 0; i < targets.length; i++) {
    const position = source.compareDocumentPosition(targets[i]);
    
    // If target comes after source in document order
    if (position & Node.DOCUMENT_POSITION_FOLLOWING) {
      insertionIndex = i;
      break;
    }
    
    insertionIndex = i + 1;
  }
  
  const prevTarget = insertionIndex > 0 ? targets[insertionIndex - 1] : null;
  const nextTarget = insertionIndex < targets.length ? targets[insertionIndex] : null;
  
  return [prevTarget, nextTarget];
}

$effect(() => {
  if (!root) return;

  let [prevTarget, nextTarget] = findNearestEnclosingElements(root, target, document.getElementById("md")!);
  let nextTargetUseTop = true;
  console.debug("Visible:", root, prevTarget, nextTarget);
  if (!prevTarget) return;

  if (!nextTarget) {
    nextTargetUseTop = false;
    nextTarget = prevTarget.parentElement?.lastElementChild as HTMLElement | null;
    if (!nextTarget) return;
  }

  const handler = () => {
    const vh = window.innerHeight;
    const screenTop = vh * 0.4;
    const screenBottom = vh * 0.6;

    const prevTop = prevTarget.getBoundingClientRect().top;
    const nextTop = nextTargetUseTop ? nextTarget.getBoundingClientRect().top : nextTarget.getBoundingClientRect().bottom;

    visible = prevTop < screenBottom && screenTop < nextTop;
  }

  window.addEventListener("scroll", handler, { passive: true });
  handler();

  return () => {
    window.removeEventListener("scroll", handler);
  }
})
</script>

<div bind:this={root} class="contents">
{#if visible}
  {@render children?.()}
{/if}
</div>
