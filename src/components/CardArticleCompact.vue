<script setup lang="ts">
import dayjs from "dayjs";
const props = defineProps<{
  article: Article
  hide?: Record<keyof Article, boolean>
}>();

const lang = props.article.frontmatter.lang ?? "zh-Hans";
</script>

<template>
  <article class="flex items-start gap-2 items-center rounded" :lang="lang">
    <time class="font-mono">{{
      dayjs(article.frontmatter.date).format("MM/DD")
    }}</time>
    <h2 class="transition-lively">
      <router-link :to="article.path">
        {{ article.frontmatter.title }}
      </router-link>
    </h2>
  </article>
</template>

<style scoped>
article:hover h2 {
  color: var(--color-accent);
}

.card-article-text:hover h2 {
  color: var(--color-secondary);
}
</style>
