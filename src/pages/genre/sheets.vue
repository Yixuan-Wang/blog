<script setup lang="ts">
const filter = (article: Article) => article.genre === "sheets";

useHead({
  title: "清单 | Pak",
  meta: [{ name: "description", content: "Sheets on Pak" }],
});
</script>

<template>
  <TheTaxonomy name="清单" :filter="filter" />
</template>

<route lang="yaml">
meta:
  alias: /sheets
</route>
