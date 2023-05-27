import { defineConfig } from "unocss";
import presetUno from "@unocss/preset-uno";
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
        mono: ["JetBrains Mono:400"],
      },
    }),
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
    ["inline-chip", ["text-sm", "font-mono"]],
    ["card", ["p-4", "rounded"]],
    [
      /^ub(?:-(.*))?$/,
      ([, c]) => `pb-0.25 border-b-1 border-b-${c ?? "current"}`,
    ],
  ],
  rules: [["small-caps", { "font-variant-caps": "small-caps" }]],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
