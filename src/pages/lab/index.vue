<script setup lang="ts">
useHead({
  title: "实验室 | Pak",
  meta: [
    { name: "description", content: "Experiments on Pak" },
  ],
});
</script>

<template>
  <h1 class="mt-4 mb-8">
    实验室
  </h1>

  <div class="flex flex-rows gap-2">
    <article
      class="flex items-start gap-2 items-center rounded"
    >
      <span><div i-mdi-typewriter /></span>
      <h2 class="transition-lively">
        <router-link to="/lab/typesetting">
          排版
        </router-link>
      </h2>
    </article>
  </div>
</template>
