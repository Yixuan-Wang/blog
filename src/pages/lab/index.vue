<script setup lang="ts">
const { t } = useI18n();

useHead({
  title: computed(() => `${t("lab")} | Pak`),
  meta: [
    { name: "description", content: "Experiments on Pak" },
  ],
});
</script>

<template>
  <h1 class="mt-4 mb-8">
    {{ t('lab') }}
  </h1>

  <div class="flex flex-rows gap-2">
    <article
      class="flex items-start gap-2 items-center rounded"
    >
      <span><mdi-typewriter /></span>
      <h2 class="transition-lively">
        <router-link to="/lab/typesetting">
          {{ t('typesetting.typesetting') }}
        </router-link>
      </h2>
    </article>
  </div>
</template>
