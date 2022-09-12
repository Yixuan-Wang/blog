import { acceptHMRUpdate, defineStore, skipHydrate } from "pinia";
import type { RouteRecordRaw } from "vue-router";

export const useArticles = defineStore("articles", () => {
  const articles = skipHydrate(ref<Article[]>([]));

  const generateArticles = (routes: RouteRecordRaw[]) => {
    articles.value = routes
      .filter(({ path }) => path.match(/(posts|sheets|notes)\/.+/))
      ?.map(route => route!.children![0]!.meta! as unknown as Article)
      .sort((a: Article, b: Article) => b.timestamp - a.timestamp);
  };

  return {
    articles,
    generateArticles,
  };
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useArticles, import.meta.hot));
