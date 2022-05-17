<script setup lang="ts">
import { useStore } from '~/stores/store'
import { friends } from '/others/friends.yaml'

useHead({
  title: 'Pak',
  meta: [
    { name: 'description', content: 'Yixuan Wang\'s personal blog' },
  ],
})

const store = useStore()

const { t } = useI18n()
const selection = reactive<Record<string, boolean>>({
  posts: true,
  sheets: true,
  notes: true,
})
const selectionOthers = reactive<Record<string, boolean>>({
  friends: true,
})

const filter = computed(() => (a: Article) => selection?.[a.genre as keyof typeof selection])
const articles = computed(() => store.articles.filter(filter.value))

const colors = [['#ee3f4d', '#bf3553'], ['#f86b1d', '#fb8b05'], ['#f9a633', '#fcb70a'], ['#229453', '#41b349'], ['#12aa9c', '#57c3c2'], ['#1177b0', '#0f59a4'], ['#813c85', '#ad6598']]
const resetColors = (color: [string, string]) => {
  store.accentColors['light-accent'] = color[0]
  store.accentColors['light-secondary'] = color[1]
  store.accentColors['dark-accent'] = color[0]
  store.accentColors['dark-secondary'] = color[1]
}
</script>

<template>
  <h1 class="mt-4">
    Pak
  </h1>
  <p class="mb-8 italic">
    This is a blоg, not a blοg.
  </p>
  <div class="flex flex-col gap-8">
    <div class="flex gap-1">
      <div
        v-for="color in colors"
        :key="color"
        :style="{ backgroundColor: color[0] }"
        class="w-4 h-4 rounded"
        @click="resetColors(color)"
      />
    </div>
    <div
      class="flex gap-2"
    >
      <button
        v-for="genre of Object.keys(selection)"
        :key="genre"
        @click="selection[genre] = !selection[genre]"
      >
        <BadgeGenre :class="{ 'genre-hide': !selection[genre] }" :genre="genre" />
      </button>
      <button
        @click="selectionOthers.friends = !selectionOthers.friends"
      >
        <mdi-account-multiple :class="{ 'genre-hide': !selectionOthers.friends }" />
      </button>
    </div>
    <ListArticleCard
      :articles="articles.slice(0, 10)"
    />
    <button v-if="articles.length >= 10 && Object.values(selection).every(v => v)">
      <router-link
        to="/archive"
        class="flex gap-1 items-center"
      >
        <mdi-text-box class="text-lg" />
        <span>{{ t('archive') }}</span>
      </router-link>
    </button>
    <div
      v-if="selectionOthers.friends"
      class="flex flex-col gap-2"
    >
      <h2 class="text-xl font-bold">
        {{ t('friends') }}
      </h2>
      <li class="grid grid-cols-[auto_auto_1fr] gap-2 items-center">
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
  color: var(--color-accent);
}
.genre-hide {
  color: var(--color-dim);
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
