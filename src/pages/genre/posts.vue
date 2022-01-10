<script setup lang="ts">
import { pageTitle } from '~/logic/title'
const { t } = useI18n()
const filter = (article: Article) => article.genre === 'posts'

const genreName = computed(() => t('genre.posts'))

if (!import.meta.env.SSR)
  syncRef(genreName, pageTitle)

useHead({
  meta: [
    { name: 'description', content: 'Posts on Pak' },
  ],
})
</script>

<template>
  <TheTaxonomy
    :name="genreName"
    :filter="filter"
  />
</template>

<route lang="yaml">
meta:
  alias: /posts
</route>
