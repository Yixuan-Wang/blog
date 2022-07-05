<script setup lang="ts">
import { colorMode, nextColorMode } from "~/logic/dark";

const version = import.meta.env.PACKAGE_VERSION;
</script>

<template>
  <client-only>
    <footer class="flex justify-between items-center py-4">
      <nav class="flex justify-between items-center gap-2">
        <button btn-icon>
          <LinkSocial href="https://github.com/Yixuan-Wang" title="GitHub">
            <div i-mdi-github />
          </LinkSocial>
        </button>
        <button btn-icon>
          <LinkSocial
            href="https://www.zhihu.com/people/tom-wang-19-44"
            title="Zhihu"
          >
            <div i-extra-zhihu />
          </LinkSocial>
        </button>
        <button btn-icon>
          <LinkSocial
            href="https://twitter.com/tom_yixuan_wang"
            title="Twitter"
          >
            <div i-mdi-twitter />
          </LinkSocial>
        </button>
        <button btn-icon class="button_container">
          <div class="button_prompt">
            <p
              class="inline-block px-1.5 py-0.5 rounded bg-acc text-bgd text-sm font-mono"
            >
              v{{ version }}
            </p>
          </div>
          <router-link to="/about">
            <div i-mdi-information />
          </router-link>
        </button>
      </nav>
      <nav class="flex justify-between items-center gap-2">
        <button btn-icon title="颜色模式" @click="nextColorMode()">
          <div i-mdi-brightness-auto v-if="colorMode === 'auto'" />
          <div i-mdi-brightness-7 v-else-if="colorMode === 'light'" />
          <div i-mdi-brightness-4 v-else />
        </button>
      </nav>
    </footer>
  </client-only>
</template>

<style scoped>
button {
  padding: 0.125rem;
  font-size: 1.125rem; /* 18px */
  line-height: 1.75rem;
  color: var(--color-foreground);
}

button:hover {
  color: var(--color-accent);
}

.button_container {
  position: relative;
}
.button_container .button_prompt {
  position: absolute;
  left: -4em;
  right: -4em;
  top: -100%;
  text-align: center;
  visibility: hidden;
}

.button_container:hover .button_prompt {
  visibility: visible;
}
</style>
