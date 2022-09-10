import path from "path";
import fs from "fs";
import { loadEnv, defineConfig } from "vite";
import dotenv from "dotenv";
import Vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import loadVersion from "vite-plugin-package-version";
import Layouts from "vite-plugin-vue-layouts";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import Markdown from "vite-plugin-vue-markdown";
import yaml from "@rollup/plugin-yaml";
import Unocss from "unocss/vite";

import MdShiki from "markdown-it-shiki";
import MdKatex from "@iktakahiro/markdown-it-katex";
import MdLinkAttributes from "markdown-it-link-attributes";
// @ts-ignore
import MdFootnote from "markdown-it-footnote";
// @ts-ignore
import MdAnchor from "markdown-it-anchor";
// @ts-ignore
import MdContainer from "markdown-it-container";
// @ts-ignore
import MdAttrs from "markdown-it-attrs";
// @ts-ignore
import MdSpan from "markdown-it-bracketed-spans";
// @ts-ignore
import uslug from "uslug";

import type { RouteRecordRaw } from "vue-router";
import { isString } from "@vueuse/core";

import IssuesPagesPlugin from "./generated/issues/issues";
import { FeedPlugin, FsMetaPlugin } from "./generated/feed";
import { getMeta } from "./generated/markdown-meta";
// @ts-ignore
import MdRuby from "./generated/markdown-it-ruby";

// @ts-ignore
import { UnoConfig } from "./uno.config.js";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const markdownWrapperClasses = ""; // 'prose prose-sm m-auto text-left'

function escapeHTML(unsafe: string) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default defineConfig(({ mode }) => ({
  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "src")}/`,
      "build/": `${path.resolve(__dirname, "build")}/`,
    },
  },
  plugins: [
    IssuesPagesPlugin({
      usedLabels: [loadEnv(mode, process.cwd()).VITE_ENV === "development" ? "++" : "+"],
    }),

    FsMetaPlugin({
      files: {
        posts: "contents/posts/**/*.md",
      },
    }),

    FeedPlugin(),

    loadVersion(),

    Vue({
      include: [/\.vue$/, /\.md$/],
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ["vue", "md"],
      pagesDir: [
        { dir: "src/pages", baseRoute: "" },
        { dir: "contents/posts/**", baseRoute: "posts/" },
        { dir: "contents/others", baseRoute: "" },
      ],
      extendRoute(route) {
        if (route.name?.includes("_")) {
          route.name = route.name.replace(/.+_/, "");
          route.path = route.path.replace(/\/[^/]+_/, "/");
          const md = fs.readFileSync(path.resolve(__dirname, route.component.slice(1)), "utf-8");
          const meta = getMeta(md, { name: route.name, path: route.path, genre: "posts" });
          route.meta = Object.assign(route.meta ?? {}, meta); // To avoid copy
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
            ).map(al => `/${route!.meta!.genre}/${al}`);
        }

        if (route?.meta?.alias)
          (route as unknown as RouteRecordRaw).alias = route!.meta!.alias as string;
        return route;
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
        "vue",
        "vue-router",
        "vue-i18n",
        "@vueuse/head",
        "@vueuse/core",
      ],
      dts: true,
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ["vue", "md"],

      dts: true,

      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],

      exclude: [/\.custom\.vue$/],
    }),

    yaml({
      safe: false,
      exclude: ["locales/**"],
    }),

    // https://github.com/antfu/vite-plugin-windicss
    /* WindiCSS({
      safelist: markdownWrapperClasses,
    }), */
    Unocss(UnoConfig),

    // https://github.com/antfu/vite-plugin-md
    // Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite
    Markdown({
      wrapperClasses: markdownWrapperClasses,
      markdownItSetup(md) {
        const uslugify = (s: string) => uslug(s);
        md.use(MdSpan);
        md.use(MdContainer, "~");
        md.use(MdContainer, "%");
        md.use(MdContainer, "+", {
          render: (tokens: any, idx: any) => {
            const m = tokens[idx].info.trim().match(/^\+\s+\[(.*)\]$/);

            if (tokens[idx].nesting === 1)
              return `<details><summary>${m[1]}</summary>\n`;
              // return `<details><summary>${md.utils.escapeHtml(m[1])}</summary>\n`
            else
              return "</details>\n";
          },
        });
        md.use(MdAttrs);
        md.use(MdShiki as any, {
          theme: "one-dark-pro",
        });
        md.use(MdKatex);
        md.use(MdRuby);
        md.use(MdLinkAttributes as any, {
          pattern: /^https?:\/\//,
          attrs: {
            target: "_blank",
            rel: "noopener",
          },
        });
        md.use(MdAnchor, {
          slugify: uslugify,
        });
        md.use(MdFootnote);
      },
      transforms: {
        after(code) {
          code = code.replaceAll("<!-- $note -->", "<article note>").replaceAll("<!-- $endnote -->", "</article>");
          code = `<TheArticle :frontmatter="frontmatter" inner="${escapeHTML(code)}"></TheArticle>`;
          return code;
        },
      },
      exclude: ["README.md"],
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
  ],

  server: {
    fs: {
      strict: true,
    },
  },

  ssr: {
    noExternal: ["build/uno"],
  },

  // https://github.com/antfu/vite-ssg
  ssgOptions: {
    script: "async",
    formatting: "minify",
  },

  optimizeDeps: {
    include: [
      "vue",
      "vue-router",
      "@vueuse/core",
    ],
    exclude: [
      "vue-demi",
    ],
  },
}));
