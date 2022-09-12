<script setup lang="ts">
import { groupBy } from "lodash-es";
import { useArticles } from "~/stores/articles";

const props = defineProps<{
  name: string
  filter: (a: Article) => boolean
}>();
const storeArticles = useArticles();

const getYear = (timestamp: number) => new Date(timestamp).getFullYear();

const articleGroups = computed(() =>
  groupBy(storeArticles.articles.filter(props.filter), (article: Article) =>
    getYear(article.timestamp),
  ),
);
const years = computed(() =>
  Object.keys(articleGroups.value).sort((a, b) => Number(b) - Number(a)),
);
</script>

<template>
  <h1 class="mt-4 mb-8">
    {{ name }}
  </h1>
  <div class="flex flex-col gap-8">
    <section v-for="year in years" :key="year" class="flex flex-col gap-2">
      <div>
        <h2 class="font-bold text-xl mb-1">
          {{ year }}
        </h2>
        <p class="font-mono">
          {{ articleGroups[year].length }}
        </p>
      </div>
      <ListArticleCard :articles="articleGroups[year]" :compact="true" />
    </section>
  </div>
  <!-- <ListArticleCard :filter="filter" /> -->
</template>
