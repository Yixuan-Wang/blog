<script setup lang="ts">
import { useArticles } from "~/stores/articles";
// @ts-ignore
const props = withDefaults(
  defineProps<{
    name: string
    filter?: (a: Article) => boolean
    sort?: (a: Article, b: Article) => number
  }>(),
  {
    filter: () => true,
    sort: (a: Article, b: Article) => b.timestamp - a.timestamp,
  },
);

const store = useArticles();
const articles = computed(() =>
  store.articles.filter(props.filter).sort(props.sort),
);
</script>

<template>
  <h1 class="mt-4 mb-8">
    {{ name }}
  </h1>
  <ListArticleCard :articles="articles" compact />
</template>
