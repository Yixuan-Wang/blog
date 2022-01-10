<script setup lang="ts">
// @ts-ignore
const props = defineProps<{
  article: Article
  hide?: Record<keyof Article, boolean>
}>()

const { d } = useI18n()
const lang = props.article.frontmatter.lang ?? 'zh-Hans'
</script>

<template>
  <article
    class="flex items-start gap-2 rounded"
    :lang="lang"
  >
    <time class="font-mono">{{ d(article.frontmatter.date, 'monthDay', 'iso') }}</time>
    <h2 class="transition-lively">
      <router-link :to="article.path">
        {{ article.frontmatter.title }}
      </router-link>
    </h2>
  </article>
</template>

<style scoped>
article:hover h2 {
  @apply text-acc;
}

.card-article-text:hover h2 {
  @apply text-sec;
}
</style>
