<script setup lang="ts">
import dayjs from "dayjs";
const props = defineProps<{
  article: Article
  hide?: Record<keyof Article, boolean>
}>();

const lang = props.article.frontmatter.lang ?? "zh-Hans";

const titleEl = ref();
const isHovered = useElementHover(titleEl);
</script>

<template>
  <article class="flex items-start gap-2 rounded transition-lively" :lang="lang">
    <time class="font-mono py-1 lg:py-0.5">{{
      dayjs(article.frontmatter.date).format("MM/DD")
    }}</time>
    <h2 ref="titleEl" class="inline-flex lg:items-center flex-col lg:flex-row gap-0.5 px-1 py-1 lg:py-0.5 rounded hover:bg-$color transition-lively" style="--color: rgba(var(--color-accent), 0.125)">
      <router-link class="pl-0.5 pr-1" :to="article.path">
        {{ article.frontmatter.title }}
      </router-link>
      <span v-show="isHovered" class="inline-flex lg:gap-0.5">
        <ArticleHeaderChips :article="article" :hide="hide" />
      </span>
    </h2>
  </article>
</template>

<style scoped>
article:hover h2 {
  color: rgba(var(--color-accent));
}

.card-article-text:hover h2 {
  color: rgba(var(--color-secondary));
}
</style>
