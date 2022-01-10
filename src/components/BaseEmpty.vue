<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div>
    <mdi-broom class="text-4xl" /><br />
    <span class="text-lg">{{ t('empty') }}</span><br />
    <span class="text-dim whitespace-pre">{{ t('empty-aphorism') }}</span>
  </div>
</template>
