<script setup lang="ts">
import { pageTitle } from '~/logic/title'

const router = useRouter()

if (!import.meta.env.SSR)
  pageTitle.value = '404'

useHead({
  meta: [
    { name: 'description', content: '404' },
  ],
})
</script>

<template>
  <base-empty />
  <button
    class="mt-2 text-lg hover:text-acc transition-lively"
    @click="router.back"
  >
    <mdi-arrow-left />
  </button>
</template>

<route lang="yaml">
meta:
  layout: 404
</route>
