import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
const timestamp = Date.now();

import { defineConfig, envField } from "astro/config";

import Inspect from "vite-plugin-inspect";
import Yaml from "@rollup/plugin-yaml";

import Svelte from "@astrojs/svelte";

import Unocss from "unocss/astro";

import Pagefind from "astro-pagefind";

import Feed from "./src/build/feed";
import SiteMeta from "./src/build/site-meta";
import { formatISO } from "date-fns";

const _dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: process.env.PUBLIC_BUILD_SITE_URL,
  base: process.env.PUBLIC_BUILD_BASE_URL,
  build: {
    format: "file",
  },
  env: {
    schema: {
      POSTS_DIR: envField.string({ context: "server" , access: "secret" }), 
      GITHUB_USER: envField.string({ context: "server", access: "secret" }),
      GITHUB_REPO: envField.string({ context: "server", access: "secret" }),
      GITHUB_ACCESS_TOKEN: envField.string({ context: "server", access: "secret" }),
    },
  },
  integrations: [
    Unocss({
      mode: "dist-chunk",
      injectEntry: process.env.NODE_ENV === "development",
      injectReset: "@unocss/reset/tailwind.css",
    }),
    Svelte(),
    Feed({
      feedConfig: {
        title: "Pak",
        id: "blog-yixuan-wang-v4",
        copyright: "CC BY-NC-SA 4.0 © Yixuan Wang",
        description: "Yixuan Wang's personal blog.",
        favicon: new URL(`${process.env.PUBLIC_BUILD_BASE_URL}favicon.svg`, process.env.PUBLIC_BUILD_SITE_URL).toString(),
        author: {
          name: "Yixuan Wang",
        },
      }
    }),
    Pagefind()
],
  vite: {
    plugins: [
      Inspect(),
      Yaml(),
      SiteMeta({
        version: process.env.npm_package_version ?? "4",
        buildTimestamp: formatISO(timestamp),
      }),
    ],
    resolve: {
      alias: {
        "~/": `${path.resolve(_dirname, "src")}/`,
        "@/": `${path.resolve(_dirname,"data")}/`,
      },
    },
  }
});