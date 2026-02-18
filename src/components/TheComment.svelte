<!-- Credit: cworld1/astro-theme-pure src/components/waline/Comment.astro -->

<script lang="ts">
  import { onMount } from "svelte";
  import { init as walineInit } from "@waline/client";
  import "@waline/client/style";

  let container: HTMLDivElement;
  const baseURL: string = import.meta.env.BASE_URL;

  onMount(() => {
    // Prevent Vue log errors (Waline dependency)
    // We cast to 'any' here for brevity, or you can define an interface for the global scope
    const globalScope = globalThis as any;
    globalScope.__VUE_OPTIONS_API__ = true;
    globalScope.__VUE_PROD_DEVTOOLS__ = false;
    globalScope.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false;

    let path = window.location.pathname.replace(new RegExp("^" + baseURL), "");
    if (path === "") {
      path = "/";
    }

    const walineInstance = walineInit({
      el: container,
      serverURL: "blog-comments.yixuan-wang.site",
      dark: "html.dark",
      path,
      // reaction: ['/icons/heart-item.svg'],
    });

    // Cleanup callback
    return () => {
      walineInstance.destroy?.();
    };
  });
</script>

<div id="waline" bind:this={container}>
  Comment fails to load, refresh the page to try again🥲.
</div>

<style>
  :global {
    #waline {
      --waline-theme-color: var(--color-one);
      --waline-active-color: var(--color-two);
    
      --waline-badge-color: var(--color-one);
      --waline-color: rgba(var(--color-front));
      --waline-bg-color: rgba(var(--color-back));
      --waline-bg-color-light: rgba(var(--color-back));
      --waline-bg-color-hover: rgba(var(--color-back));
      --waline-border-color: rgba(var(--color-back));
      --waline-disable-bg-color: rgba(var(--color-muted));
      --waline-disable-color: rgba(var(--color-front));
      --waline-code-bg-color: var(--color-one-back);
    }
    
    #waline
      :is(.wl-content, .wl-text, .wl-comment-text, .wl-item, .wl-card-item, a) {
      max-width: 100%;
    }
    #waline :is(.wl-meta, .wl-content, .wl-text, .wl-comment-text) {
      word-wrap: break-word;
      word-break: break-word;
      overflow-wrap: anywhere;
    }
    #waline a {
      display: inline-block;
  }
}
</style>
