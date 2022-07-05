<script setup lang="ts">
import { unoify } from "~/logic/uno";

// @ts-ignore
const props = defineProps<{
  frontmatter: {
    title: string
    date: string
    category: string
    tags: string[]
    keywords?: string[]
  }
  inner: string
}>();

if (!import.meta.env.SSR) {
  onBeforeMount(async() => {
    useStyleTag(await unoify(props.inner));
  });
}
</script>

<template>
  <article v-if="props.frontmatter.title" class="text-left">
    <TheArticleFull :frontmatter="props.frontmatter" :inner="inner" />
  </article>
  <div v-else v-html="inner"></div>
</template>
