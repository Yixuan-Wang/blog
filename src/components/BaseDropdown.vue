<script setup lang="ts">
import { OnClickOutside } from "@vueuse/components";
const props = defineProps<{
  containerClass?: string;
}>();
/* 
const emit = defineEmits(['update:modelValue'])

const dropdownOpen = useVModel(props, 'modelValue', emit) */
const dropdownOpen = ref(false);
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};
</script>

<template>
  <span btn>
    <span class="relative inline-flex" :class="props.containerClass">
      <button btn @click="toggleDropdown()">
        <slot></slot>
      </button>
      <div v-if="dropdownOpen" class="dropdown-inner">
        <OnClickOutside @trigger="toggleDropdown()">
          <slot name="dropdown"></slot>
        </OnClickOutside>
      </div>
    </span>
  </span>
</template>

<style scoped>
.dropdown-inner {
  position: absolute;
  width: max-content;
  bottom: calc(100% + 0.5em);
}
</style>
