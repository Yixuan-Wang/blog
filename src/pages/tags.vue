<script setup lang="ts">
const { query } = toRefs(useRoute())
const filter = (article: Article) => article.frontmatter.tags.includes(query.value?.tag as string ?? '')

const tagName = computed(() => `@${query.value.tag}`)

useHead({
  title: computed(() => `${tagName.value} | Pak`),
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
