<script setup lang="ts">
defineProps<{
  articles: Article[]
  compact?: boolean
}>();
</script>

<template>
  <section v-if="articles.length">
    <div v-if="compact" class="flex flex-col gap-2">
      <CardArticleCompact
        v-for="(article, index) in articles"
        :key="index"
        :article="article"
      />
    </div>
    <div v-else class="flex flex-col gap-2">
      <CardArticleDetailed
        v-for="(article, index) in articles"
        :key="index"
        :article="article"
      />
    </div>
  </section>
  <section v-else>
    <BaseEmpty />
  </section>
</template>
