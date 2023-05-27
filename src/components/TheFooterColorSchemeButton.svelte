<script lang="ts">
  import { onMount } from "svelte";
  import type { ColorSchemeSetting } from "~/stores/color-scheme";

  let colorSchemeSetting: ColorSchemeSetting = "auto";
  let handleClick = () => {};

  onMount(async () => {
    const {
      colorSchemeSetting: store,
      registerPreference,
      colorScheme,
    } = await import("~/stores/color-scheme");
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    colorSchemeSetting = store.get();

    handleClick = () => {
      switch (colorSchemeSetting) {
        case "auto":
          store.set(mediaQuery.matches ? "light" : "dark");
          break;
        case "light":
          store.set(mediaQuery.matches ? "dark" : "auto");
          break;
        case "dark":
          store.set(mediaQuery.matches ? "auto" : "light");
          break;
      }
    };
    const [register, _] = registerPreference(mediaQuery);
    register();
    store.listen((value) => (colorSchemeSetting = value));
    colorScheme.listen((value) =>
      value === "dark"
        ? document.documentElement.classList.add("dark")
        : document.documentElement.classList.remove("dark")
    );
  });
</script>

<button on:click={handleClick} aria-label="Color Scheme Toggle">
  {#if colorSchemeSetting === "auto"}
    <div class="i-mdi-brightness-auto" />
  {:else if colorSchemeSetting === "light"}
    <div class="i-mdi-brightness-7" />
  {:else}
    <div class="i-mdi-brightness-4" />
  {/if}
</button>
