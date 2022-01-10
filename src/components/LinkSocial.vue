<script setup lang="ts">
defineProps<{
  href: string
  title: string
}>()
</script>

<template>
  <a rel="noreferrer" :href="href" target="_blank" :title="title">
    <slot></slot>
  </a>
</template>
