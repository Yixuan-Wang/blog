import { getHighlighter, bundledLanguages } from "shiki/bundle/full";
import { createCssVariablesTheme } from "shiki";

// @ts-ignore
const langs = Object.values(import.meta.glob("./languages/*.tmLanguage.json", { query: "?raw", eager: true, import: "default" })).map(JSON.parse);

// const fetchGrammar = (lang: string) => JSON.parse(readFileSync(`src/build/renderers/md/highlights/languages/${lang}.tmLanguage.json`, { encoding: "utf-8" }))

// // const theme = JSON.parse(readFileSync(resolve(__dirname, "theme.json"), { encoding: "utf-8" }))

// const langs = [
//   fetchGrammar("coq"),
//   // SOURCE: https://github.com/coq-community/vscoq/blob/main/client/syntax/coq.tmLanguage.json
//   fetchGrammar("koka"),
//   // SOURCE: https://github.com/koka-lang/koka/blob/dev/support/vscode/koka.language-koka/syntaxes/koka.json
// ];

// Create a custom CSS variables theme, the following are the default values
const theme = createCssVariablesTheme({ 
  name: 'css-variables',
  variablePrefix: '--shiki-',
  variableDefaults: {},
  fontStyle: false, 
})

export default async function getMyHighlighter() {
  const highlighter = await getHighlighter({
    themes: [theme],
    langs: [...Object.keys(bundledLanguages).filter(lang => lang !== "mermaid"), ...langs],
  });
  return highlighter;
}
