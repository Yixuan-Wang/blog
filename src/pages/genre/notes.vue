<script setup lang="ts">
const filter = (article: Article) => article.genre === "notes";

useHead({
  title: "笔记 | Pak",
  meta: [{ name: "description", content: "Notes on Pak" }],
});
</script>

<template>
  <TheTaxonomy name="笔记" :filter="filter" />
</template>

<route lang="yaml">
meta:
  alias:
    - /notes
    - /notes.html
</route>
