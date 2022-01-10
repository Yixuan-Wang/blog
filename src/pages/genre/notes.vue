<script setup lang="ts">
import { pageTitle } from '~/logic/title'

const { t } = useI18n()
const filter = (article: Article) => article.genre === 'notes'

const genreName = computed(() => t('genre.notes'))
syncRef(genreName, pageTitle)

useHead({
  meta: [
    { name: 'description', content: 'Talks on Pak' },
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
  alias: /notes
</route>
