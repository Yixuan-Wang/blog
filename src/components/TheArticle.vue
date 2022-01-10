<script setup lang="ts">
// @ts-ignore
const props = defineProps<{
  frontmatter: {
    title: string
    date: string
    category: string
    tags: string[]
    keywords?: string[]
  }
  inner: string
}>()
</script>

<template>
  <article
    v-if="props.frontmatter.title"
    class="text-left"
  >
    <TheArticleFull
      :frontmatter="props.frontmatter"
      :inner="inner"
    />
  </article>
  <div v-else v-html="inner"></div>
</template>
