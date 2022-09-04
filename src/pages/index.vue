<script setup lang="ts">
import { useStore } from "~/stores/store";
import { friends } from "/others/friends.yaml";
import { actualColorMode } from "~/logic/dark";
import { ACCENT_COLORS } from "~/logic/typesetting";

useHead({
  title: "Pak",
  meta: [
    { name: "description", content: "Yixuan Wang's personal blog" },
  ],
});

const store = useStore();

const selection = reactive<Record<string, boolean>>({
  posts: true,
  sheets: true,
  notes: true,
});
const selectionOthers = reactive<Record<string, boolean>>({
  friends: true,
});

const filter = computed(() => (a: Article) => selection?.[a.genre as keyof typeof selection]);
const articles = computed(() => store.articles.filter(filter.value));

const colors = [[ACCENT_COLORS["light-accent"], ACCENT_COLORS["light-secondary"], ACCENT_COLORS["dark-accent"], ACCENT_COLORS["dark-secondary"]], ["#de1c31", "#c21f30", "#ee3f4d", "#ed5a65"], ["#f86b1d", "#f5391c", "#f86b1d", "#fa7e23"], ["#f9a633", "#fb8b05", "#f9a633", "#fcb70a"], ["#229453", "#207f4c", "#229453", "#41b349"], ["#29b7cb", "#1491a8", "#29b7cb", "#51c4d3"], ["#1177b0", "#0f59a4", "#1177b0", "#2983bb"], ["#983680", "#681752", "#983680", "#a35c8f"]];
const resetColors = (color: string[]) => {
  store.accentColors["light-accent"] = color[0];
  store.accentColors["light-secondary"] = color[1];
  store.accentColors["dark-accent"] = color[2];
  store.accentColors["dark-secondary"] = color[3];
};
</script>

<template>
  <h1 class="mt-4">
    Pak
  </h1>
  <p class="font-bold text-lg">
    Yixuan Wang's Blog
  </p>
  <p class="mb-8 italic">
    This is a blоg, not a blοg.
  </p>
  <div class="flex flex-col gap-6">
    <div
      class="p-2 flex gap-1 rounded hover:bg-$color transition-lively self-start items-center"
      style="--color: rgba(var(--color-accent), 0.125)"
    >
      <div class="text-acc transition-lively mr-1">
        <div i-mdi-palette />
      </div>
      <div
        v-for="color, idx in colors"
        :key="color[0]"
        class="cursor-pointer bg-$accent hover:bg-$secondary transition-lively"
        :style="{ '--accent': actualColorMode === 'light' ? color[0] : color[2], '--secondary': actualColorMode === 'light' ? color[1] : color[3] } as any"
        :class="{ 'i-mdi-circle-outline': idx === 0, 'i-mdi-circle': idx !== 0 }"
        @click="resetColors(color)"
      />
    </div>
    <div
      class="self-start rounded flex gap-2 p-2 rounded hover:bg-$color transition-lively"
      style="--color: rgba(var(--color-accent), 0.125)"
    >
      <div class="text-acc transition-lively">
        <div i-mdi-filter />
      </div>
      <button
        v-for="genre of Object.keys(selection)"
        :key="genre"
        class="transition-lively"
        @click="selection[genre] = !selection[genre]"
      >
        <BadgeGenre :class="{ 'genre-hide': !selection[genre] }" :genre="genre" />
      </button>
      <button
        @click="selectionOthers.friends = !selectionOthers.friends"
      >
        <div i-mdi-account-multiple :class="{ 'genre-hide': !selectionOthers.friends }" />
      </button>
    </div>
    <ListArticleCard
      :articles="articles.slice(0, 10)"
    />
    <button
      v-if="articles.length >= 10 && Object.values(selection).every(v => v)"
    >
      <router-link
        to="/archive"
        class="flex gap-1 items-center transition-lively p-2 rounded bg-none hover:bg-$color"
        style="--color: rgba(var(--color-accent), 0.125)"
      >
        <div i-mdi-text-box class="text-lg" />
        <span>归档……</span>
      </router-link>
    </button>
    <div
      v-if="selectionOthers.friends"
      class="px-2 py-4 flex flex-row gap-2 rounded hover:bg-$color transition-lively"
      style="--color: rgba(var(--color-accent), 0.125)"
    >
      <li class="px-2 grid grid-cols-[auto_auto_1fr] gap-3 items-center">
        <CardFriend
          v-for="friend in friends"
          :key="friend.name"
          :friend="friend"
        />
      </li>
    </div>
  </div>
</template>

<style scoped>
button:hover {
  color: rgba(var(--color-accent));
}
.genre-hide {
  color: rgba(var(--color-dim));
  opacity: 0.75;
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
