<script setup lang="ts">
// @ts-ignore
const props = defineProps<{
  article: Article
  hide?: Record<keyof Article, boolean>
}>();

const { t, d, locale } = useI18n();
const lang = props.article.frontmatter.lang ?? "zh-Hans";
</script>

<template>
  <div class="flex flex-wrap gap-x-1 gap-y-0.5 justify-start items-center">
    <span v-if="!hide?.genre" class="flex justify-center text-lg">
      <router-link :to="`/${article.genre}`">
        <BadgeGenre
          class="transition-lively hover:text-acc"
          :genre="article.genre"
        />
      </router-link>
    </span>
    <span class="flex gap-1 justify-center items-center">
      <BaseChip class="ring-inset ring-2 ring-fgd">
        <time>{{ d(article.frontmatter.date, "short", "iso") }}</time>
      </BaseChip>
      <BaseChip v-if="lang !== locale" class="ring-inset ring-2 ring-fgd">{{
        lang
      }}</BaseChip>
    </span>
    <span class="flex gap-1 justify-center items-center">
      <BaseChip
        class="ring-inset ring-2 ring-acc text-acc hover:bg-acc hover:text-bgd"
      >
        <router-link :to="`/categories/${article.frontmatter.category}`">
          {{ t(`categories.${article.frontmatter.category}`) }}
        </router-link>
      </BaseChip>
    </span>
    <span class="flex gap-1 justify-center items-center">
      <BaseChip
        v-for="tag in article.frontmatter.tags"
        :key="tag"
        class="ring-inset ring-2 ring-sec text-sec hover:bg-sec hover:text-bgd"
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
        class="text-dim !px-0"
      >
        <span> #{{ keyword }} </span>
      </BaseChip>
    </span>
  </div>
</template>
