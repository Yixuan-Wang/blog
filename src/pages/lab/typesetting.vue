<script setup lang="ts">
import { useStore } from "~/stores/store";
import { ACCENT_COLORS } from "~/logic/typesetting";
const store = useStore();

const resetColors = (key: keyof typeof ACCENT_COLORS) => {
  store.accentColors[key] = ACCENT_COLORS[key];
};

useTitle("排版 | Pak");
</script>

<template>
  <h1 class="mt-4 mb-8">
    排版
  </h1>

  <article id="md">
    <ClientOnly>
      <section>
        <h2>字体</h2>

        <h3>网络字体</h3>
        <div>
          <div
            v-for="key in Object.keys(store.webfont)"
            :key="key"
          >
            <base-select v-model="store.webfont[key]">
              {{ key }}
            </base-select>
          </div>
        </div>

        <h2>色彩</h2>
        <h3>主题色</h3>
        <div>
          <div
            v-for="key in Object.keys(store.accentColors)"
            :key="key"
            :label="key"
            class="flex flex-cols gap-2"
          >
            <input v-model="store.accentColors[key]" class="bg-transparent w-[2em] h-[1.5em]" type="color">
            <span class="font-mono">{{ store.accentColors[key].toUpperCase() }}</span>
            <span @click="resetColors(key as keyof typeof ACCENT_COLORS)"><div i-mdi-restore /></span>
          </div>
        </div>
      </section>
    </ClientOnly>
  </article>
</template>
