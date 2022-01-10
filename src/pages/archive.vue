<script setup lang="ts">
import { pageTitle } from '~/logic/title'

const { t } = useI18n()
const selection = reactive({
  posts: true,
  sheets: true,
  notes: true,
})
const filter = computed(() => (a: Article) => selection?.[a.genre as keyof typeof selection])

const pageName = computed(() => t('archive'))

if (!import.meta.env.SSR)
  syncRef(pageName, pageTitle)

useHead({
  meta: [
    { name: 'description', content: 'All articles on Pak.' },
  ],
})
</script>

<template>
  <TheTimeline
    :name="pageName"
    :filter="filter"
  />
</template>
