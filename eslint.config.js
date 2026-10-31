import antfu from "@antfu/eslint-config";

export default antfu(
  {
    typescript: true,
    astro: true,
    svelte: true,
    stylistic: {
      semi: true,
      quotes: "double",
    },
    ignores: [
      "**/*.yaml",
      "**/*.yml",
      "contents",
      "dist",
      ".astro",
    ],
  },
  {
    rules: {
      "style/semi": ["warn", "always"],
      "style/quotes": ["warn", "double"],
      "no-undef": "off",
    },
  },
);
