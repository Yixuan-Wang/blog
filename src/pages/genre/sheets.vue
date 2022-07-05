<script setup lang="ts">
const filter = (article: Article) => article.genre === "sheets";
const { t } = useI18n({ useScope: "global" });

const genreName = computed(() => t("genre.sheets"));

useHead({
  title: computed(() => `${genreName.value} | Pak`),
  meta: [{ name: "description", content: "Sheets on Pak" }],
});
</script>

<template>
  <TheTaxonomy :name="genreName" :filter="filter" />
</template>

<route lang="yaml">
meta:
  alias: /sheets
</route>
