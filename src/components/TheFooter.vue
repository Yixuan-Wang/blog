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
        <button btn-icon title="RSS">
          <a href="/feed.xml">
            <div i-mdi-rss-box />
          </a>
        </button>
        <base-dropdown container-class="justify-center">
          <button btn-icon title="关于">
            <div i-mdi-information />
          </button>
          <template #dropdown>
            <p
              class="inline-block px-1.5 py-0.5 rounded bg-acc text-bgd text-sm font-mono"
            >
              <router-link to="/about">
                v{{ version }}
              </router-link>
            </p>
          </template>
        </base-dropdown>
        <!-- <button btn-icon class="button_container">
          <div class="button_prompt">

          </div>
          <router-link to="/about">
            <div i-mdi-information />
          </router-link>
        </button> -->
      </nav>
      <nav class="flex justify-between items-center gap-2">
        <button btn-icon title="排版">
          <router-link to="/lab/typesetting">
            <div i-mdi-typewriter />
          </router-link>
        </button>
        <button btn-icon title="颜色模式" @click="nextColorMode()">
          <div v-if="colorMode === 'auto'" i-mdi-brightness-auto />
          <div v-else-if="colorMode === 'light'" i-mdi-brightness-7 />
          <div v-else i-mdi-brightness-4 />
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
  color: rgba(var(--color-foreground));
}

button:hover {
  color: rgba(var(--color-accent));
}
</style>
