<script setup lang="ts">
import { useHead } from "@vueuse/head";
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

const route = useRoute();

if (props.frontmatter.title) {
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
}

if (!import.meta.env.SSR) {
  nextTick(async() => {
    const { unoify } = await import("build/uno");
    const css = await unoify(props.inner);
    useStyleTag(css);
  });
}

if (!import.meta.env.SSR) {
  onMounted(() => {
    if (route.hash) {
      const anchor = route.hash.slice(1);
      const el = document.getElementById(anchor);
      if (el) nextTick(() => el.scrollIntoView());
    }
  });
}
</script>

<template>
  <article class="text-left">
    <header
      v-if="frontmatter.title"
      class="flex flex-col justify-start items-start gap-2 mt-4 mb-8"
    >
      <h1>
        {{ frontmatter.title }}
      </h1>
      <ArticleHeader :article="(route.meta as unknown as Article)" />
    </header>
    <article id="md" v-html="inner">
    </article>
  </article>
</template>
