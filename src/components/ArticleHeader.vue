<script setup lang="ts">
import dayjs from "dayjs";

defineProps<{
  article: Article
  hide?: Record<keyof Article, boolean>
}>();
</script>

<template>
  <div class="flex flex-wrap gap-x-1 gap-y-0.5 justify-start items-center">
    <span v-if="!hide?.genre" class="flex justify-center">
      <button btn-icon>
        <router-link :to="`/${article.genre}`">
          <BadgeGenre
            :genre="article.genre"
          />
        </router-link>
      </button>
    </span>
    <span class="flex gap-1 justify-center items-center">
      <BaseChip>
        <time>{{ dayjs(article.timestamp).format("YYYY/MM/DD") }}</time>
      </BaseChip>
    </span>
    <span class="flex gap-1 justify-center items-center">
      <BaseChip
        class="text-acc hover:bg-acc hover:text-bgd"
      >
        <router-link :to="`/categories/${article.frontmatter.category}`">
          {{ article.frontmatter.category }}
        </router-link>
      </BaseChip>
    </span>
    <span class="flex gap-1 justify-center items-center">
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
    <span class="flex gap-1 justify-center items-center">
      <BaseChip
        v-for="keyword in article.frontmatter.keywords"
        :key="keyword"
        class="text-dim"
      >
        <span> #{{ keyword }} </span>
      </BaseChip>
    </span>
  </div>
</template>
