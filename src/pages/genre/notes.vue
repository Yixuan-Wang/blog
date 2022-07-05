<script setup lang="ts">
const { t } = useI18n();
const filter = (article: Article) => article.genre === "notes";

const genreName = computed(() => t("genre.notes"));

useHead({
  title: computed(() => `${genreName.value} | Pak`),
  meta: [{ name: "description", content: "Talks on Pak" }],
});
</script>

<template>
  <TheTaxonomy :name="genreName" :filter="filter" />
</template>

<route lang="yaml">
meta:
  alias: /notes
</route>
