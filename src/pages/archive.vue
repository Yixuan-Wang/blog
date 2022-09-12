<script setup lang="ts">
const selection = reactive({
  posts: true,
  sheets: true,
  notes: true,
});
const filter = computed(() => (a: Article) => selection?.[a.genre as keyof typeof selection]);

useHead({
  title: "归档 | Pak",
  meta: [
    { name: "description", content: "All articles on Pak." },
  ],
});
</script>

<template>
  <TheTimeline
    name="归档"
    :filter="filter"
  />
</template>

<route lang="yaml">
meta:
  alias:
    - /archive.html
  taxonomy: true
</route>
