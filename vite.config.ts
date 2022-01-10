import path from 'path'
import fs from 'fs'
import { loadEnv, defineConfig } from 'vite'
import dotenv from 'dotenv'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import loadVersion from 'vite-plugin-package-version'
import Layouts from 'vite-plugin-vue-layouts'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Markdown from 'vite-plugin-md'
import yaml from '@rollup/plugin-yaml'
import WindiCSS from 'vite-plugin-windicss'
import VueI18n from '@intlify/vite-plugin-vue-i18n'

import Shiki from 'markdown-it-shiki'
import Katex from '@iktakahiro/markdown-it-katex'
import LinkAttributes from 'markdown-it-link-attributes'
// @ts-ignore
import Footnote from 'markdown-it-footnote'
// @ts-ignore
import Anchor from 'markdown-it-anchor'
// @ts-ignore
import uslug from 'uslug'

import type { RouteRecordRaw } from 'vue-router'
import { isString } from '@vueuse/core'

import IssuesPagesPlugin from './generated/issues/issues'
import { getMeta } from './generated/markdown-meta'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const markdownWrapperClasses = '' // 'prose prose-sm m-auto text-left'

function escapeHTML(unsafe: string) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export default defineConfig(({ mode }) => ({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    IssuesPagesPlugin({
      usedLabels: [loadEnv(mode, process.cwd()).VITE_ENV === 'development' ? '++' : '+'],
    }),

    loadVersion(),

    Vue({
      include: [/\.vue$/, /\.md$/],
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ['vue', 'md'],
      pagesDir: [
        { dir: 'src/pages', baseRoute: '' },
        { dir: 'contents/posts/**', baseRoute: 'posts/' },
        { dir: 'contents/others', baseRoute: '' },
      ],
      extendRoute(route) {
        if (route.name?.includes('_')) {
          route.name = route.name.replace(/.+_/, '')
          route.path = route.path.replace(/\/[^/]+_/, '/')
          const md = fs.readFileSync(path.resolve(__dirname, route.component.slice(1)), 'utf-8')
          const meta = getMeta(md, { name: route.name, path: route.path, genre: 'posts' })
          route.meta = Object.assign(route.meta ?? {}, meta) // To avoid copy
        }
        // console.log(route)
        // if (!route.path.match(/(posts|sheets|notes)\/.+/)) {
        //   route.meta = Object.assign(route.meta ?? {}, {
        //     path: route.path,
        //   })
        // // console.log(route)
        // }
        // else {
        //
        //   route.name = route.path.split('_')[1]
        //   route.path = `/posts/${route.name}`
        //
        //
        // }
        if ((route?.meta?.frontmatter as Frontmatter)?.alias) {
          const alias = (route?.meta?.frontmatter as Frontmatter).alias!;
          (route as unknown as RouteRecordRaw).alias
            = (isString(alias)
              ? [alias]
              : alias
            ).map(al => `/${route!.meta!.genre}/${al}`)
        }

        if (route?.meta?.alias)
          (route as unknown as RouteRecordRaw).alias = route!.meta!.alias as string

        return route
      },
      // extendRoute(route) {
      //   console.log(route)
      //   if (route.component.startsWith('/contents/')) {
      //     const md = fs.readFileSync(path.resolve(__dirname, route.component.slice(1)), 'utf-8')
      //     const meta = getMeta(md)
      //     console.log(meta)
      //   //   route.meta = Object.assign(route.meta ?? {}, meta)
      //   }
      //   return route
      // },
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
        '@vueuse/head',
        '@vueuse/core',
      ],
      dts: true,
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],

      dts: true,

      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],

      // custom resolvers
      resolvers: [
        // auto import icons
        // https://github.com/antfu/unplugin-icons
        IconsResolver({
          componentPrefix: '',
          // enabledCollections: ['carbon']
        }),
      ],
    }),

    // https://github.com/antfu/unplugin-icons
    Icons(),

    yaml({
      safe: false,
      exclude: ['locales/**'],
    }),

    // https://github.com/antfu/vite-plugin-windicss
    WindiCSS({
      safelist: markdownWrapperClasses,
    }),

    // https://github.com/antfu/vite-plugin-md
    // Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite
    Markdown({
      wrapperClasses: markdownWrapperClasses,
      markdownItSetup(md) {
        // https://prismjs.com/
        // md.use(Prism as any)
        const uslugify = (s: string) => uslug(s)
        md.use(Anchor, {
          slugify: uslugify,
        })
        md.use(Shiki as any, {
          theme: {
            dark: 'nord',
            light: 'github-light',
          },
        })
        md.use(Katex)
        md.use(LinkAttributes as any, {
          pattern: /^https?:\/\//,
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        })
        md.use(Footnote)
      },
      transforms: {
        after(code) {
          code = `<TheArticle :frontmatter="frontmatter" inner="${escapeHTML(code)}"></TheArticle>`
          return code
        },
      },
      exclude: ['README.md'],
    }),

    // https://github.com/antfu/vite-plugin-pwa
    /* VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'safari-pinned-tab.svg'],
      manifest: {
        name: 'Pak',
        short_name: 'Pak',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }), */

    // https://github.com/intlify/vite-plugin-vue-i18n
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [path.resolve(__dirname, 'locales/**')],
    }),
  ],

  server: {
    fs: {
      strict: true,
    },
  },

  // https://github.com/antfu/vite-ssg
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
  },

  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@vueuse/core',
    ],
    exclude: [
      'vue-demi',
    ],
  },
}))
