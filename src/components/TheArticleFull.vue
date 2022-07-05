<script setup lang="ts">
import { useHead } from "@vueuse/head";
const props = defineProps<{
  frontmatter: {
    title: string
    date: string
    category: string
    tags: string[]
    keywords?: string[]

    // data: {
    //   summary: string
    // }
  }
  inner: string
}>();

const route = useRoute();

useHead({
  title: `${props.frontmatter.title} | Pak`,
  meta: [
    {
      name: "description",
      content: (route.meta as unknown as Article).excerpt,
    },
  ],
  link: [
    {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.18/dist/katex.min.css",
      integrity:
        "sha384-zTROYFVGOfTw7JV7KUu8udsvW2fx4lWOsCEDqhBreBwlHI4ioVRtmIvEThzJHGET",
      crossorigin: "anonymous",
    } as any,
  ],
});

if (!import.meta.env.SSR) {
  onMounted(() => {
    if (route.hash) {
      const anchor = route.hash.slice(1);
      const el = document.getElementById(anchor);
      if (el)
        nextTick(() => el.scrollIntoView());
    }
  });
}
</script>

<template>
  <header class="flex flex-col justify-start items-start gap-2 mt-4 mb-8">
    <h1>
      {{ props.frontmatter.title }}
    </h1>
    <ArticleHeader :article="(route.meta as unknown as Article)" />
  </header>
  <section id="md" v-html="inner" />
  <!-- <slot></slot> -->
  <!-- </section> -->
</template>
