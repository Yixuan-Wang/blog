<script setup lang="ts">
import { pageTitle } from '~/logic/title'

const { params } = toRefs(useRoute())
const { t } = useI18n()
const filter = (article: Article) => article.frontmatter.category === params.value?.category as string ?? ''

const categoryName = computed(() => t(`categories.${params.value.category}`, params.value.category as string))
syncRef(categoryName, pageTitle)

useHead({
  meta: [
    { name: 'description', content: `Articles about ${categoryName.value} on Pak` },
  ],
})
</script>

<template>
  <TheTaxonomy
    :name="categoryName"
    :filter="filter"
  />
</template>
