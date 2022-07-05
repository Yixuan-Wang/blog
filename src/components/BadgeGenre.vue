<script setup lang="ts">
const props = defineProps<{
  genre: string
}>();

let className: string;
switch (props.genre) {
  case "posts": className = "i-mdi-file"; break;
  case "sheets": className = "i-mdi-table-large"; break;
  case "notes": className = "i-mdi-folder"; break;
  default: className = ""; break;
}
</script>

<template>
  <div :class="className" />
</template>
