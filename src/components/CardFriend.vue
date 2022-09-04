<script setup lang="ts">
// @ts-ignore
defineProps<{
  friend: Friend
}>();
</script>

<template>
  <img
    class="block col-start-1 w-[2em] h-[2em] rounded-[50%]"
    :alt="friend.name"
    :src="friend.avatar"
  />
  <span class="col-start-2">{{ friend.name }}</span>
  <span class="col-start-3 flex gap-2 justify-start">
    <a title="Homepage" :href="friend.blog" target="_blank"><div i-mdi-home btn-icon /></a>
    <a title="GitHub" :href="friend.link" target="_blank"><div i-mdi-github btn-icon /></a>
  </span>
</template>
