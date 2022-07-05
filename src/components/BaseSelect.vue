<script setup lang="ts">
defineProps<{
  modelValue: boolean
}>();
defineEmits<{
  (event: "update:modelValue", value: boolean): void
}>();
</script>

<template>
  <div class="flex flex-rows gap-2 items-center">
    <input
      :checked="modelValue"
      type="checkbox"
      class="h-4 w-4 text-acc border-dim rounded hover:ring-acc hover:ring-2"
      @input="$emit('update:modelValue', !modelValue)"
    />
    <label>
      <slot></slot>
    </label>
  </div>
</template>
