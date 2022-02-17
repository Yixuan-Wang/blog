<script setup lang="ts">
import { useStore } from '~/stores/store'
const store = useStore()
const { t } = useI18n()
</script>

<template>
  <h1 class="mt-4 mb-8">
    {{ t('typography.typography') }}
  </h1>

  <article id="md">
    <ClientOnly>
      <section>
        <h2>{{ t('typography.font') }}</h2>

        <h2>{{ t('typography.webfont') }}</h2>
        <div
          v-for="key in Object.keys(store.webfont)"
          :key="key"
        >
          <base-select v-model="store.webfont[key]">
            {{ key }}
          </base-select>
        </div>
      </section>
    </ClientOnly>
  </article>
</template>
