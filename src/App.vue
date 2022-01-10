<script setup lang="ts">
import { title } from './logic/title'
import { initLocale } from './logic/locale'
initLocale(useI18n)
useHead({ title: import.meta.env.SSR ? 'Pak' : title.value })
</script>

<template>
  <TheHeader />
  <main class="text-left">
    <router-view />
  </main>
  <TheFooter />
</template>

<style>
#app {
  @apply
    grid grid-rows-[auto,1fr,auto] grid-cols-[100%]
    mx-4 lg:mx-0 h-full
  ;
}
</style>
