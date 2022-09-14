<script setup lang="ts">

defineProps<{
  article: Article
  hide?: Record<keyof Article, boolean>
}>();
</script>

<template>
  <span class="flex gap-0.5 justify-center items-center">
    <BaseChip
      class="text-acc hover:bg-acc hover:text-bgd"
    >
      <router-link :to="`/categories/${article.frontmatter.category}`">
        {{ article.frontmatter.category }}
      </router-link>
    </BaseChip>
  </span>
  <span class="flex gap-0.5 justify-center items-center">
    <BaseChip
      v-for="tag in article.frontmatter.tags"
      :key="tag"
      class="text-sec hover:bg-sec hover:text-bgd"
    >
      <router-link :to="{ path: '/tags', query: { tag } }">
        @{{ tag }}
      </router-link>
    </BaseChip>
  </span>
  <BaseChip v-if="article.frontmatter.lang" class="text-fgd">
    <span>:{{ article.frontmatter.lang }}</span>
  </BaseChip>
  <span class="flex gap-0.5 justify-center items-center">
    <BaseChip
      v-for="keyword in article.frontmatter.keywords"
      :key="keyword"
      class="text-dim"
    >
      <span> #{{ keyword }} </span>
    </BaseChip>
  </span>
</template>
