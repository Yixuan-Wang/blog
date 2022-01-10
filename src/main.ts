// register vue composition api globally
import { ViteSSG } from 'vite-ssg'
import { createPinia } from 'pinia'
import generatedRoutes from 'virtual:generated-pages'
import generatedIssuesRoutes from 'virtual:generated-issues-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import type { RouterScrollBehavior } from 'vue-router'
import { useStore } from './stores/store'
import App from './App.vue'

// windicss layers
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
// your custom styles here
import './styles/main.css'
import '~/styles/article.css'
// windicss utilities should be the last style import
import 'virtual:windi-utilities.css'
// windicss devtools support (dev only)
import 'virtual:windi-devtools'

const routes = setupLayouts([...generatedRoutes, ...generatedIssuesRoutes])

const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  if (savedPosition)
    return savedPosition
  else
    return { top: 0 }
}

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes, scrollBehavior },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.globEager('./modules/*.ts')).map(i => i.install?.(ctx))
    const { app, routes } = ctx
    const pinia = createPinia()
    app.use(pinia)

    // if (import.meta.env.SSR)
    //   initialState.pinia = pinia.state.value
    // else
    //   pinia.state.value = initialState.pinia || {}

    const store = useStore(pinia)
    store.generateArticles(routes)
  },
)
