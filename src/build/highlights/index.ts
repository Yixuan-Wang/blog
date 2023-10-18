import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { ILanguageRegistration } from "shiki";

const __dirname = dirname(fileURLToPath(import.meta.url));

const fetchGrammar = (lang: string) => JSON.parse(readFileSync(resolve(__dirname, `languages/${lang}.tmLanguage.json`), { encoding: "utf-8" }))

const theme = JSON.parse(readFileSync(resolve(__dirname, "theme.json"), { encoding: "utf-8" }))

const languages: ILanguageRegistration[] = [
  {
    id: "coq",
    scopeName: "source.coq",
    grammar: fetchGrammar("coq"),
    // SOURCE: https://github.com/coq-community/vscoq/blob/main/client/syntax/coq.tmLanguage.json
  },
  {
    id: "koka",
    scopeName: "source.koka",
    grammar: fetchGrammar("koka"),
    // SOURCE: https://github.com/koka-lang/koka/blob/dev/support/vscode/koka.language-koka/syntaxes/koka.json
  },
  {
    id: "zig",
    scopeName: "source.zig",
    grammar: fetchGrammar("zig"),
    // SOURCE: https://github.com/ziglang/vscode-zig/blob/master/syntaxes/zig.tmLanguage.json
  },
] satisfies Omit<ILanguageRegistration, "path">[] as ILanguageRegistration[];

export {
  languages,
  theme,
};
