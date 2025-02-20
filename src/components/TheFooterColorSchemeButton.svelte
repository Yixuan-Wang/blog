<script lang="ts">
  import { colorSchemeSetting } from "~/stores/color-scheme";

  let handleClick = () => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    switch ($colorSchemeSetting) {
      case "auto":
        $colorSchemeSetting = mediaQuery.matches ? "light" : "dark";
        break;
      case "light":
        $colorSchemeSetting = mediaQuery.matches ? "dark" : "auto";
        break;
      case "dark":
        $colorSchemeSetting = mediaQuery.matches ? "auto" : "light";
        break;
    }
  };
</script>

<button onclick={handleClick} aria-label="Color Scheme Toggle">
  {#if $colorSchemeSetting === "auto"}
    <div class="i-mdi-brightness-auto"></div>
  {:else if $colorSchemeSetting === "light"}
    <div class="i-mdi-brightness-7"></div>
  {:else}
    <div class="i-mdi-brightness-4"></div>
  {/if}
</button>
