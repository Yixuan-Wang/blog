<script setup lang="ts">
// @ts-ignore
const props = defineProps<{
  friend: Friend
}>()
</script>

<template>
  <img
    class="block col-start-1 w-[2em] h-[2em] rounded-[50%]"
    :src="friend.avatar"
  >
  <span class="col-start-2">{{ friend.name }}</span>
  <span class="col-start-3 flex gap-2 justify-start">
    <a :href="friend.blog" target="_blank"><mdi-home /></a>
    <a :href="friend.link" target="_blank"><mdi-github /></a>
  </span>
</template>
