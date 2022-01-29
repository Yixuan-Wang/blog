<script setup lang="ts">
import { initLocale } from './logic/locale'
initLocale(useI18n)
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
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 100%;
  margin-left: 1rem; /* 16px */
  margin-right: 1rem; /* 16px */
  height: 100%;
}

@media (min-width: 1024px) {
  #app {
    margin-left: 0px;
    margin-right: 0px;
  }
}
</style>
