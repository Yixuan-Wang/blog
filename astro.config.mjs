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
import presetUno from "@unocss/preset-uno";
import presetIcons from "@unocss/preset-icons";
import presetWebFonts from "@unocss/preset-web-fonts";
import transformerDirectives from "@unocss/transformer-directives";
import transformerVariantGroup from "@unocss/transformer-variant-group";

import PostProvider from "./src/build/providers";
import ProviderFs from "./src/build/providers/fs";
import ProviderGh from "./src/build/providers/gh";

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
      theme: {
        fontFamily: {
          sans: "var(--font-sans)",
          serif: "var(--font-serif)",
          mono: "var(--font-mono)",
        },
        colors: {
          one: {
            DEFAULT: "rgb(var(--color-one))",
            front: "rgb(var(--color-one-front))",
            back: "rgb(var(--color-one-back))",
          },
          two: {
            DEFAULT: "rgb(var(--color-two))",
            front: "rgb(var(--color-two-front))",
            back: "rgb(var(--color-two-back))",
          },
          back: "rgb(var(--color-back))",
          front: "rgb(var(--color-front))",
          muted: "rgb(var(--color-muted))",
        },
      },
      presets: [
        presetUno({
          preflight: false,
        }),
        // @ts-ignore
        presetIcons({
          extraProperties: {
            width: "1.25em",
            height: "1.25em",
          },
        }),
        presetWebFonts({
          fonts: {
            sans: ["Inter:400,700", "Noto Sans CJK SC:400,700"],
            mono: ["JetBrains Mono:400"]
          }
        })
      ],
      shortcuts: [
        // ["btn-icon", ["hover:text-acc", "transition-lively"]],
        [
          "transition-lively",
          [
            "transition-all",
            "duration-200",
            "ease-in",
            "hover:duration-300",
            "hover:ease-out",
          ],
        ],
        [
          "chip",
          [
            "rounded",
            "px-1.5",
            "py-0.75",
            "text-sm",
            "font-mono",
          ],
        ],
        [
          "inline-chip",
          [
            "text-sm",
            "font-mono",
          ]
        ],
        ["card", ["p-4", "rounded"]],
        [/^ub(?:-(.*))?$/, ([, c]) => `pb-0.25 border-b-1 border-b-${c ?? "current"}`],
      ],
      rules: [["small-caps", { "font-variant-caps": "small-caps" }]],
      transformers: [transformerDirectives(), transformerVariantGroup()],
    }),
    PostProvider({
      providers: [
        ProviderFs({
          baseDir: path.resolve(_dirname, process.env.CONTENTS_DIR ?? "contents"),
          patterns: [[process.env.POST_FILTER_FS ?? "**/*.md", "!README.md"]],
        }),
        ...(
          process.env.POST_NO_GH === "true"
          ? []
          : [ProviderGh({
            userName: process.env.GITHUB_USER,
            repoName: process.env.GITHUB_REPO,
            accessToken: process.env.GITHUB_ACCESS_TOKEN,
            includedLabels: [process.env.POST_FILTER_GH ?? "+"],
          })]
        ),
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
        "@/": `${path.resolve(
          _dirname,
          process.env.CONTENTS_DIR ?? "contents"
        )}/`,
      },
    },
  }
});
