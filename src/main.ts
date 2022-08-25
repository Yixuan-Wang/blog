// register vue composition api globally
import { ViteSSG } from "vite-ssg";
import { createPinia } from "pinia";
import generatedRoutes from "virtual:generated-pages";
import generatedIssuesRoutes from "virtual:generated-issues-pages";
import { setupLayouts } from "virtual:generated-layouts";
import type { RouterScrollBehavior } from "vue-router";
import { useStore } from "./stores/store";
import App from "./App.vue";

// windicss layers
import "@unocss/reset/tailwind.css";
import "./styles/reset.css";
import "uno.css";
// import 'virtual:windi-base.css'
// import 'virtual:windi-components.css'
// your custom styles here
import "./styles/shiki.css";
import "./styles/main.css";
import "./styles/article.css";
import { initTypesetting } from "./logic/typesetting";
// windicss utilities should be the last style import
// import 'virtual:windi-utilities.css'
// windicss devtools support (dev only)
// import 'virtual:windi-devtools'

// console.log(Component)

const rawRoutes = setupLayouts([...generatedRoutes, ...generatedIssuesRoutes]);
const routes = rawRoutes.map((i) => {
  const paths = [i.path, ...(i.alias ?? [])];
  return {
    ...i,
    alias: paths.map(path =>
      path.endsWith("/")
        ? `${i.path}index.html`
        : `${i.path}.html`,
    ),
  };
});

const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) return savedPosition;
  else return { top: 0 };
};

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes, scrollBehavior },
  async(ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.globEager("./modules/*.ts")).map(i =>
      i.install?.(ctx),
    );
    const { app, routes, router } = ctx;
    const pinia = createPinia();
    app.use(pinia);

    if (!import.meta.env.SSR && !import.meta.env.DEV) {
      router.beforeEach((to) => {
        if (to.fullPath.match(/\/(posts|sheets|notes)\//) && !to.path.endsWith(".html")) {
          const path = to.path.endsWith("/")
            ? `${to.path}index.html`
            : `${to.path}.html`;
          const { query, hash, params } = to;
          return { path, query, params, hash };
        }
      });
    }

    // if (import.meta.env.SSR)
    //   initialState.pinia = pinia.state.value
    // else
    //   pinia.state.value = initialState.pinia || {}

    if (!import.meta.env.SSR) {
      // @ts-nocheck
      await import("@yixuan-wang/component-leipzig");
    }

    const store = useStore(pinia);
    store.generateArticles(routes);
    if (!import.meta.env.SSR) initTypesetting(store);
  },
);
