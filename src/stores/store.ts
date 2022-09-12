import { acceptHMRUpdate, defineStore, skipHydrate } from "pinia";
import { WEBFONTS, ACCENT_COLORS } from "~/logic/typesetting";
import { mapTo } from "~/logic/helpers";

export const useStore = defineStore("store", () => {
  const title = skipHydrate(ref(""));

  const webfont = ref<Record<string, boolean>>(mapTo(WEBFONTS, false));
  const accentColors = ref<Record<string, string>>(ACCENT_COLORS);

  // const init = (routes: RouteRecordRaw[]) => {
  //   articles.value = routes.filter(({ path }) => path.match(/(posts|sheets|notes)\/.+/))?.map(route => route!.children![0]!.meta! as unknown as Article).sort((a, b) => b.timestamp - a.timestamp)
  //   // for (const genre of ['posts', 'sheets', 'notes'])
  //   //   articles[genre as 'posts'|'sheets'|'notes'].push(...(routes.filter(({ path }) => path.startsWith(`/${genre}/`)).map(route => route!.children![0]!.meta! as unknown as Article)).sort((a, b) => b.timestamp - a.timestamp))
  // }
  // watch(router, generateArticles)

  const setTitle = (text?: string) => {
    title.value = text ? `${text} | Pak` : "Pak";
  };

  return {
    title,
    webfont,
    accentColors,
    setTitle,
  };
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot));
