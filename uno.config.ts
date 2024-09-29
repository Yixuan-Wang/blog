import { defineConfig } from "unocss";
import presetUno from "@unocss/preset-uno";
import presetIcons from "@unocss/preset-icons";
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
    presetIcons({
      extraProperties: {
        width: "1.25em",
        height: "1.25em",
      },
      collections: {
        custom: {
          travelling: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M 12 2.7890625 C 7.5800039 2.7890625 3.6240234 3.2895544 3.6240234 6.7895508 L 3.6240234 15.789551 C 3.6240234 17.722546 5.5670053 19.289062 7.5 19.289062 L 6 20.789062 L 6 21.290039 L 18 21.290039 L 18 20.789062 L 16.5 19.289062 C 18.432995 19.289063 20.375977 17.722546 20.375977 15.789551 L 20.375977 6.7895508 C 20.375977 3.2895544 16.419995 2.7890625 12 2.7890625 z M 6.375 6.75 L 17.625 6.75 L 17.625 12 L 6.375 12 L 6.375 6.75 z M 12 13.875 A 1.5000002 1.5000002 0 0 1 13.5 15.375 A 1.5000002 1.5000002 0 0 1 12 16.875 A 1.5000002 1.5000002 0 0 1 10.5 15.375 C 10.5 14.5425 11.167501 13.875 12 13.875 z" /></svg>`
        }
      }
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
