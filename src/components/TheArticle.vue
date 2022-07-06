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

const toc = reactive<[string, string][]>([]);
if (!import.meta.env.SSR) {
  onMounted(() => {
    if (route.fullPath.startsWith("/notes")) {
      const anchors = Array.from(document.querySelectorAll("#md article[note] h2:first-child"));
      const tocs = anchors.map(anchor => [anchor.id, (anchor as HTMLElement).innerText]) as [string, string][];
      toc.push(...tocs);
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
    <nav v-if="toc" m="t-4 b-8">
      <ul>
        <li
          v-for="item in toc"
          :key="item[0]"
          font="serif bold"
        >
          <a :href="`#${item[0]}`">
            :: {{ item[1] }}
          </a>
        </li>
      </ul>
    </nav>
    <article id="md" v-html="inner">
    </article>
  </article>
</template>
