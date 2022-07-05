<script setup lang="ts">
const { params } = toRefs(useRoute());
const filter = (article: Article) =>
  article.frontmatter.category === (params.value?.category as string) ?? "";

const categoryName = params.value.category as string;

useHead({
  title: computed(() => `${categoryName} | Pak`),
  meta: [
    {
      name: "description",
      content: `Articles about ${categoryName} on Pak`,
    },
  ],
});
</script>

<template>
  <TheTaxonomy :name="categoryName" :filter="filter" />
</template>
