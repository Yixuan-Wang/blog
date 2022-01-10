<script setup lang="ts">
import { pageTitle } from '~/logic/title'

const { query } = toRefs(useRoute())
const filter = (article: Article) => article.frontmatter.tags.includes(query.value?.tag as string ?? '')

const tagName = computed(() => `@${query.value.tag}`)
syncRef(tagName, pageTitle)

useHead({
  meta: [
    { name: 'description', content: `Articles with tag ${tagName.value} on Pak` },
  ],
})
</script>

<template>
  <TheTaxonomy
    :name="`@${query.tag}`"
    :filter="filter"
  />
</template>
