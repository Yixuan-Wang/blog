import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
const timestamp = Date.now();

import { defineConfig } from "astro/config";

import Inspect from "vite-plugin-inspect";
import Yaml from "@rollup/plugin-yaml";

import Svelte from "@astrojs/svelte";

import Unocss from "unocss/astro";

import PostProvider from "./src/build/providers";
import ProviderFs from "./src/build/providers/fs";
import ProviderGh from "./src/build/providers/gh";
// import ProviderNtn from "./src/build/providers/ntn";

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
  integrations: [
    Unocss({
      mode: "dist-chunk",
      injectEntry: process.env.NODE_ENV === "development",
      injectReset: "@unocss/reset/tailwind.css",
    }),
    PostProvider({
      providers: [
        ProviderFs({
          baseDir: path.resolve(_dirname, process.env.POSTS_DIR ?? "data/posts"),
          patterns: [[process.env.POST_FILTER_FS ?? "**/*.md", "!README.md"]],
        }),
        ...(
          process.env.POST_NO_GH === "true"
          ? []
          : [ProviderGh({
            userName: process.env.GITHUB_USER!,
            repoName: process.env.GITHUB_REPO!,
            accessToken: process.env.GITHUB_ACCESS_TOKEN!,
            includedLabels: [process.env.POST_FILTER_GH ?? "+"],
          })]
        ),
        // ...(
        //   process.env.POST_NO_NTN === "true"
        //   ? []
        //   : [ProviderNtn({
        //     accessToken: process.env.NOTION_ACCESS_TOKEN,
        //     databaseId: process.env.NOTION_DATABASE_ID,
        //   })]
        // )
      ],
      componentBase: "~/components/runtime",
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
