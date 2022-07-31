<script setup lang="ts">
const filter = (article: Article) => article.genre === "posts";

useHead({
  title: "文章 | Pak",
  meta: [{ name: "description", content: "Posts on Pak" }],
});
</script>

<template>
  <TheTaxonomy name="文章" :filter="filter" />
</template>

<route lang="yaml">
meta:
  alias:
    - /posts
    - /posts.html
</route>
