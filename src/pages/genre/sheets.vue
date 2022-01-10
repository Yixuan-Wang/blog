<script setup lang="ts">
import { pageTitle } from '~/logic/title'
const filter = (article: Article) => article.genre === 'sheets'
const { t } = useI18n({ useScope: 'global' })

const genreName = computed(() => t('genre.sheets'))
syncRef(genreName, pageTitle)

useHead({
  meta: [
    { name: 'description', content: 'Sheets on Pak' },
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
  alias: /sheets
</route>
