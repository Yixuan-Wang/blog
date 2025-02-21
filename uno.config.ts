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
      collections: {
        custom: {
          /* https://github.com/Remix-Design/RemixIcon */
          bluesky: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 11.388c-.906-1.761-3.372-5.044-5.665-6.662c-2.197-1.55-3.034-1.283-3.583-1.033C2.116 3.978 2 4.955 2 5.528c0 .575.315 4.709.52 5.4c.68 2.28 3.094 3.05 5.32 2.803c-3.26.483-6.157 1.67-2.36 5.898c4.178 4.325 5.726-.927 6.52-3.59c.794 2.663 1.708 7.726 6.444 3.59c3.556-3.59.977-5.415-2.283-5.898c2.225.247 4.64-.523 5.319-2.803c.205-.69.52-4.825.52-5.399c0-.575-.116-1.55-.752-1.838c-.549-.248-1.386-.517-3.583 1.033c-2.293 1.621-4.76 4.904-5.665 6.664"/></svg>`,
          /* Font Awesome 6 */
          "google-scholar": `<svg viewBox="0 0 512 512"><path fill="currentColor" d="m 357.175,287.875 c 0,0 0,0.075 0.075,0.075 6.9,14.55 10.8,30.825 10.8,48 C 367.975,397.825 317.875,448 256,448 194.125,448 144.025,397.825 144.025,336.025 c 0,-17.175 3.9,-33.45 10.8,-48 1.275,-2.7 2.7,-5.4 4.2,-8.025 q 4.95,-8.55 11.25,-15.975 c 20.55,-24.45 51.375,-39.975 85.8,-39.975 25.2,0 48.45,8.325 67.2,22.425 6.825,5.175 13.05,11.025 18.6,17.625 4.2,4.95 7.95,10.35 11.25,15.975 1.5,2.55 2.85,5.25 4.125,7.875 z m 19.8,-14.1 c -22.575,-43.8 -68.25,-73.8 -120.975,-73.8 -52.725,0 -98.4,30 -120.975,73.8 L 64,216.025 256,64 448,216.025 376.975,273.85 Z"/></svg>`,
          arxiv: `<svg viewBox="0 0 32 32"><path fill="currentColor" d="M 6.571429,4 C 5.151786,4 4,5.151786 4,6.571429 V 25.428571 C 4,26.848214 5.151786,28 6.571429,28 H 25.428571 C 26.848214,28 28,26.848214 28,25.428571 V 6.571429 C 28,5.151786 26.848214,4 25.428571,4 Z m 3.838392,3.428786 c 0.302036,0.0072 0.587733,0.35416 0.587733,0.35416 l 4.81591,4.62 3.493232,-3.167464 0.0066,-0.006 0.007,-0.0057 a 0.98571431,0.98571431 0 0 1 0.630857,-0.280715 l 1.87e-4,-6.44e-4 q 0.05496,0 0.109447,0.0073 a 1.2498214,1.2498214 0 0 1 0.817286,0.634875 c 0.138857,0.341679 0.01002,0.611197 -0.259286,0.961072 l -0.0036,0.0048 -0.004,0.0046 -3.013714,3.5595 0.872946,0.837321 c 0.590786,0.539893 0.587679,1.471447 -0.0068,2.007322 l -0.797089,0.741053 4.451035,5.357786 a 0.885,0.885 0 0 1 0.224036,0.818732 0.95571431,0.95571431 0 0 1 -0.635946,0.656357 0.87321431,0.87321431 0 0 1 -0.253554,0.0383 0.9375,0.9375 0 0 1 -0.636536,-0.263036 l -5.066625,-4.825178 -3.287625,3.056571 a 0.69910712,0.69910712 0 0 1 -0.527035,0.260411 0.78428569,0.78428569 0 0 1 -0.733019,-0.485893 c -0.119892,-0.287947 0.01296,-0.689089 0.227572,-0.917679 l 2.764178,-3.39525 -0.990696,-0.943553 c -0.66675,-0.66659 -0.635946,-1.628411 0.08089,-2.34509 l 0.850875,-0.796285 c 0,0 -3.844821,-4.616893 -4.222714,-5.172965 C 9.653335,8.373959 9.568853,8.175906 9.686496,7.893584 a 0.76767856,0.76767856 0 0 1 0.723321,-0.464785 m 9.541286,1.77 v 8.06e-4 a 0.75214287,0.75214287 0 0 0 -0.472125,0.225857 l -3.479732,3.155732 1.412946,1.355465 3.003161,-3.547394 c 0.278572,-0.362035 0.302464,-0.517124 0.224839,-0.707946 a 1.0125,1.0125 0 0 0 -0.612375,-0.477322 0.58928571,0.58928571 0 0 0 -0.07671,-0.0051 m -5.642036,4.904678 -0.851089,0.796339 c -0.582643,0.58259 -0.673125,1.377964 -0.07462,1.976464 l 7.608964,7.247411 a 0.68410713,0.68410713 0 0 0 0.459483,0.192161 0.61071429,0.61071429 0 0 0 0.178714,-0.02705 0.69964287,0.69964287 0 0 0 0.465268,-0.485197 c 0.06364,-0.210696 -0.02973,-0.397661 -0.179036,-0.584571 z" /></svg>` // @author: Simple Icons
        }
      }
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
    ["card", ["p-4", "rounded-2"]],
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
