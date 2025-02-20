import { defineConfig } from "unocss";
import presetUno from "@unocss/preset-wind3";
import presetIcons from "@unocss/preset-icons";
import presetWebFonts from "@unocss/preset-web-fonts";
import transformerDirectives from "@unocss/transformer-directives";
import transformerVariantGroup from "@unocss/transformer-variant-group";

export default defineConfig({
  theme: {
    fontFamily: {
      sans: "var(--font-sans)",
      serif: "var(--font-serif)",
      mono: "var(--font-mono)",
      "post-heading": "var(--font-post-heading)",
      "post-content": "var(--font-post-content)",
    },
    colors: {
      one: {
        DEFAULT: "var(--color-one)",
        front: "var(--color-one-front)",
        back: "var(--color-one-back)",
      },
      two: {
        DEFAULT: "var(--color-two)",
        front: "var(--color-two-front)",
        back: "var(--color-two-back)",
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
    presetIcons({
      extraProperties: {
        width: "1.25em",
        height: "1.25em",
      },
    }),
    presetWebFonts({
      fonts: {
        _sans: [
          {
            name: 'Inter',
            weights: ['400', '700'],
            italic: true,
          },
          {
            name: 'Noto Sans SC',
            weights: ['400', '700'],
          },
        ],
        _serif: [
          {
            name: 'Source Serif 4',
            weights: ['400', '700'],
            italic: true,
          },
          {
            name: 'Noto Serif SC',
            weights: ['400', '700'],
          },
        ],
        _mono: [
          {
            name: 'JetBrains Mono',
            weights: ['400', '700'],
            italic: true,
          },
        ],
      },
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
    ["chip", ["rounded", "px-1.5", "py-0.75", "text-sm", "font-mono"]],
    ["tip", ["px-1.5", "py-1", "rounded", "text-sm", "bg-one-back", "text-one-front"]],
    ["inline-chip", ["text-sm", "font-mono"]],
    ["card", ["p-4", "rounded"]],
    [
      /^ub(?:-(.*))?$/,
      ([, c]) => `pb-0.5 border-b-1 border-b-${c ?? "current"}`,
    ],
  ],
  rules: [
    ["small-caps", { "font-variant-caps": "small-caps" }]
  ],
  // @ts-ignore
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
