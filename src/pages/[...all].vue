<script setup lang="ts">
const router = useRouter();

useHead({
  title: "404 | Pak",
  meta: [
    { name: "description", content: "404" },
  ],
});
</script>

<template>
  <base-empty />
  <button
    class="mt-2 text-lg hover:text-acc transition-lively"
    @click="router.back"
  >
    <div i-mdi-arrow-left />
  </button>
</template>

<route lang="yaml">
meta:
  layout: 404
</route>
