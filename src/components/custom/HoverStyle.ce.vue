<script setup lang="ts">
const el = ref();
const host = computed(() => (el.value?.parentNode as ShadowRoot)?.host);
const visible = useElementVisibility(computed(() => host.value?.parentElement));

const css = computed(() => host.value?.innerHTML);
const { load, unload } = useStyleTag(css, { manual: true });
watch(visible, val => val ? load() : unload());
</script>

<template>
  <div ref="el" hidden>
    <slot></slot>
  </div>
</template>
