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

const { t, locale } = useI18n()
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

const chromiumBugNotice = ref(false)
const chromiumVersion = ref('')
if (!import.meta.env.SSR) {
  chromiumBugNotice.value = /Chrome/.test(navigator.userAgent)
  if (chromiumBugNotice.value)
    chromiumVersion.value = navigator.userAgent.match(/Chrome\/(.+?)(\s|$)/)![1]
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
    <ClientOnly>
      <div
        v-if="chromiumBugNotice && locale === 'zh-Hans'"
        class="rounded bg-acc text-bgd p-3"
      >
        <h2 class="text-xl">
          <mdi-bug />
          <span class="font-bold pl-1">不是你的锅，也不是我的锅</span>
        </h2>
        <p class="m-2">
          你似乎在使用 <mdi-google-chrome /> Chromium 系浏览器，版本 {{ chromiumVersion }}。<br />
          我们观察到 100 版本的 Chromium 在<strong>过渡动效渲染</strong>方面似乎存在问题，请刷新以解决颜色错误的问题。若影响阅读，请考虑使用 Firefox 或 Safari。
        </p>
      </div>
    </ClientOnly>
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
