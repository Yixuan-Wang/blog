<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { darkMode, DarkMode, toggleDarkMode } from '~/logic/dark'
import { useToggleLocales } from '~/logic/locale'

const toggleLocales = useToggleLocales(useI18n)!

const { t, locale } = useI18n()
const version = import.meta.env.PACKAGE_VERSION
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
          <LinkSocial href="https://www.zhihu.com/people/tom-wang-19-44" title="Zhihu">
            <ant-design-zhihu-circle-filled />
          </LinkSocial>
        </button>
        <button>
          <LinkSocial href="https://twitter.com/tom_yixuan_wang" title="Twitter">
            <mdi-twitter />
          </LinkSocial>
        </button>
        <button class="button_container">
          <div class="button_prompt !top-[-500%]">
            <div
              class="block px-1.5 py-1 rounded bg-acc text-bgd text-sm font-mono"
            >
              @chan-tomw
              <svg
                overflow="visible"
                version="1.2"
                viewBox="0 0 258 258"
                xml:space="preserve"
                xmlns="http://www.w3.org/2000/svg"
                style="width:129px;height:129px;fill:currentColor;"
              ><g>
                <path id="p_00000113320509662258543970000016648864952334421124_" d="m237 213.2h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm0-24h8v8h-8zm0-32h8v8h-8zm0-32h8v8h-8zm0-24h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm-8 216h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-24h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-32h8v8h-8zm0-32h8v8h-8zm0-24h8v8h-8zm0-16h8v8h-8zm0-48h8v8h-8zm-8 224h8v8h-8zm0-16h8v8h-8zm0-16h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-48h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-16h8v8h-8zm-8 216h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-24h8v8h-8zm0-8h8v8h-8zm0-40h8v8h-8zm0-32h8v8h-8zm0-16h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-16h8v8h-8zm-8 224h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm0-24h8v8h-8zm0-8h8v8h-8zm0-24h8v8h-8zm0-8h8v8h-8zm0-24h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-16h8v8h-8zm-8 224h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-16h8v8h-8zm0-32h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-24h8v8h-8zm0-24h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-16h8v8h-8zm0-48h8v8h-8zm-8 208h8v8h-8zm0-16h8v8h-8zm0-16h8v8h-8zm0-16h8v8h-8zm0-24h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-24h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm-8 216h8v8h-8zm0-24h8v8h-8zm0-32h8v8h-8zm0-16h8v8h-8zm0-24h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm-8 152h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm0-24h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm-8 184h8v8h-8zm0-24h8v8h-8zm0-8h8v8h-8zm0-24h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm0-24h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-24h8v8h-8zm0-16h8v8h-8zm0-16h8v8h-8zm-8 224h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-24h8v8h-8zm0-24h8v8h-8zm0-16h8v8h-8zm0-24h8v8h-8zm0-16h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-24h8v8h-8zm0-16h8v8h-8zm0-32h8v8h-8zm-8 224h8v8h-8zm0-32h8v8h-8zm0-16h8v8h-8zm0-16h8v8h-8zm0-24h8v8h-8zm0-8h8v8h-8zm0-48h8v8h-8zm0-40h8v8h-8zm0-32h8v8h-8zm0-8h8v8h-8zm-8 224h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm0-24h8v8h-8zm0-8h8v8h-8zm0-16h8v8h-8zm0-16h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-24h8v8h-8zm-8 224h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-16h8v8h-8zm0-16h8v8h-8zm0-16h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-32h8v8h-8zm0-16h8v8h-8zm0-16h8v8h-8zm-8 208h8v8h-8zm0-24h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-24h8v8h-8zm0-16h8v8h-8zm0-16h8v8h-8zm0-40h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-16h8v8h-8zm0-16h8v8h-8zm-8 200h8v8h-8zm0-8h8v8h-8zm0-72h8v8h-8zm0-24h8v8h-8zm0-8h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm0-40h8v8h-8zm0-8h8v8h-8zm-8 200h8v8h-8zm0-16h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm0-16h8v8h-8zm0-24h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm0-16h8v8h-8zm0-24h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-16h8v8h-8zm0-24h8v8h-8zm-8 216h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-48h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-48h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-56h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm-8 192h8v8h-8zm0-40h8v8h-8zm0-56h8v8h-8zm0-16h8v8h-8zm0-24h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-16h8v8h-8zm-8 208h8v8h-8zm0-24h8v8h-8zm0-8h8v8h-8zm0-16h8v8h-8zm0-40h8v8h-8zm0-8h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-40h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm-8 224h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm0-24h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm0-24h8v8h-8zm0-16h8v8h-8zm0-16h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm0-16h8v8h-8zm0-16h8v8h-8zm-8 144h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-32h8v8h-8zm0-8h8v8h-8zm0-24h8v8h-8zm0-8h8v8h-8zm-8 160h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-16h8v8h-8zm0-16h8v8h-8zm0-16h8v8h-8zm0-16h8v8h-8zm0-16h8v8h-8zm0-16h8v8h-8zm0-16h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm-8 224h8v8h-8zm0-48h8v8h-8zm0-32h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-32h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm0-24h8v8h-8zm0-48h8v8h-8zm-8 224h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-16h8v8h-8zm0-16h8v8h-8zm0-24h8v8h-8zm0-8h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-16h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-16h8v8h-8zm-8 224h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-16h8v8h-8zm0-56h8v8h-8zm0-8h8v8h-8zm0-24h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-16h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-16h8v8h-8zm-8 224h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-16h8v8h-8zm0-80h8v8h-8zm0-8h8v8h-8zm0-24h8v8h-8zm0-16h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-16h8v8h-8zm-8 224h8v8h-8zm0-48h8v8h-8zm0-40h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-16h8v8h-8zm0-16h8v8h-8zm0-16h8v8h-8zm0-16h8v8h-8zm0-48h8v8h-8zm-8 224h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-32h8v8h-8zm0-32h8v8h-8zm0-16h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8zm0-8h8v8h-8z" />
              </g>
              </svg>
            </div>
          </div>
          <ic-outline-wechat />
        </button>
        <button class="button_container">
          <div class="button_prompt">
            <p class="inline-block px-1.5 py-0.5 rounded bg-acc text-bgd text-sm font-mono">
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
            <span class="inline-block px-1.5 py-0.5 rounded bg-acc text-bgd text-sm font-mono">{{ locale }}</span>
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
        <button
          :title="t('button.toggleDark')"
          @click="toggleDarkMode()"
        >
          <mdi-brightness-auto v-if="darkMode === DarkMode.Auto " />
          <mdi-brightness-7 v-else-if="darkMode === DarkMode.Light " />
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
