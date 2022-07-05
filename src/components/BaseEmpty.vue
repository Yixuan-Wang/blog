<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div class="flex flex-col gap-1">
    <div i-mdi-broom class="text-4xl" />
    <h2 class="text-lg">
      {{ t("empty") }}
    </h2>
    <p class="text-dim whitespace-pre-wrap">
      {{ t("empty-aphorism") }}
    </p>
  </div>
</template>
