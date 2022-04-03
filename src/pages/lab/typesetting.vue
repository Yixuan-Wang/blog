<script setup lang="ts">
import { useStore } from '~/stores/store'
import { ACCENT_COLORS } from '~/logic/typesetting'
const store = useStore()
const { t } = useI18n()

const resetColors = (key: keyof typeof ACCENT_COLORS) => {
  store.accentColors[key] = ACCENT_COLORS[key]
}

useTitle(computed(() => `${t('typesetting.typesetting')} | Pak`))
</script>

<template>
  <h1 class="mt-4 mb-8">
    {{ t('typesetting.typesetting') }}
  </h1>

  <article id="md">
    <ClientOnly>
      <section>
        <h2>{{ t('typesetting.typography') }}</h2>

        <h3>{{ t('typesetting.webfont') }}</h3>
        <div>
          <div
            v-for="key in Object.keys(store.webfont)"
            :key="key"
          >
            <base-select v-model="store.webfont[key]">
              {{ key }}
            </base-select>
          </div>
        </div>

        <h2>{{ t('typesetting.colors') }}</h2>
        <h3>{{ t('typesetting.accent') }}</h3>
        <div>
          <div
            v-for="key in Object.keys(store.accentColors)"
            :key="key"
            :label="key"
            class="flex flex-cols gap-2"
          >
            <input v-model="store.accentColors[key]" class="bg-transparent w-[2em] h-[1.5em]" type="color">
            <span class="font-mono">{{ store.accentColors[key].toUpperCase() }}</span>
            <span @click="resetColors(key as keyof typeof ACCENT_COLORS)"><mdi-restore /></span>
          </div>
        </div>
      </section>
    </ClientOnly>
  </article>
</template>
