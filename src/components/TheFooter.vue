<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { darkMode, toggleDarkMode } from "~/logic/dark";
import { useToggleLocales } from "~/logic/locale";

const toggleLocales = useToggleLocales(useI18n)!;

const { t, locale } = useI18n();
const version = import.meta.env.PACKAGE_VERSION;
</script>

<template>
  <client-only>
    <footer class="flex justify-between items-center py-4">
      <nav class="flex justify-between items-center gap-2">
        <!-- <button>
          <router-link to="/" :title="t('button.home')">
            <carbon-campsite />
          </router-link>
        </button> -->
        <button>
          <LinkSocial href="https://github.com/Yixuan-Wang" title="GitHub">
            <mdi-github />
          </LinkSocial>
        </button>
        <button>
          <LinkSocial
            href="https://www.zhihu.com/people/tom-wang-19-44"
            title="Zhihu"
          >
            <ant-design-zhihu-circle-filled />
          </LinkSocial>
        </button>
        <button>
          <LinkSocial
            href="https://twitter.com/tom_yixuan_wang"
            title="Twitter"
          >
            <mdi-twitter />
          </LinkSocial>
        </button>
        <button class="button_container">
          <div class="button_prompt">
            <p
              class="inline-block px-1.5 py-0.5 rounded bg-acc text-bgd text-sm font-mono"
            >
              v{{ version }}
            </p>
          </div>
          <router-link to="/about">
            <mdi-information />
          </router-link>
        </button>
      </nav>
      <nav class="flex justify-between items-center gap-2">
        <button class="button_container">
          <div class="button_prompt">
            <span
              class="inline-block px-1.5 py-0.5 rounded bg-acc text-bgd text-sm font-mono"
            >{{ locale }}</span>
          </div>
          <a :title="t('button.toggleLocale')" @click="toggleLocales()">
            <mdi-earth />
          </a>
        </button>
        <!-- <button>
          <router-link to="/about" :title="t('button.about')">
            <mdi-information />
          </router-link>
        </button> -->
        <button :title="t('button.toggleDark')" @click="toggleDarkMode()">
          <mdi-brightness-auto v-if="darkMode === 'auto'" />
          <mdi-brightness-7 v-else-if="darkMode === 'light'" />
          <mdi-brightness-4 v-else />
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
