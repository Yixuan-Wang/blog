<script setup lang="ts">
defineProps<{
  genre: string
}>()
</script>

<template>
  <IconPosts v-if="genre === 'posts'" />
  <IconSheets v-else-if="genre === 'sheets'" />
  <IconNotes v-else-if="genre === 'notes'" />
</template>
