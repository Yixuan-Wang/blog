<script setup lang="ts">
// @ts-ignore
const props = defineProps<{
  article: Article
  hide?: Record<keyof Article, boolean>
}>();

const lang = props.article.frontmatter.lang ?? "zh-Hans";
</script>

<template>
  <article class="p-3 rounded flex flex-col items-start gap-1 transition-lively" :lang="lang">
    <div>
      <router-link class="card-article-text" :to="`${article.path}`">
        <h2 class="mb-0.5 text-xl font-bold transition-lively">
          {{ article.frontmatter.title }}
        </h2>
        <p>
          {{ article.excerpt }}
        </p>
      </router-link>
    </div>
    <ArticleHeader :article="article" :hide="hide" />
  </article>
</template>

<style scoped>
article:hover {
  background-color: rgba(var(--color-accent), 0.125);
}

article:hover h2 {
  color: rgba(var(--color-secondary));
}

.card-article-text:hover h2 {
  color: rgba(var(--color-accent));
}
</style>
