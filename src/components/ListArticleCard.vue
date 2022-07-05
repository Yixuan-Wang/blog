<script setup lang="ts">
defineProps<{
  articles: Article[]
  compact?: boolean
}>();
</script>

<template>
  <section v-if="articles.length">
    <ul v-if="compact" class="flex flex-col gap-2">
      <CardArticleCompact
        v-for="(article, index) in articles"
        :key="index"
        :article="article"
      />
    </ul>
    <ul v-else class="flex flex-col gap-6">
      <CardArticleDetailed
        v-for="(article, index) in articles"
        :key="index"
        :article="article"
      />
    </ul>
  </section>
  <section v-else>
    <BaseEmpty />
  </section>
</template>
