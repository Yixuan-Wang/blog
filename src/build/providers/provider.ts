import * as Either from "fp-ts/Either";
import { pipe } from "fp-ts/lib/function";
import chalk from "chalk";
import ora from "ora";
import { Status } from "../../utils/meta";
import { parseFrontmatter, parseMarkdown } from "./parser";
import type { Provider, ProviderSource } from "./module";
import type { ConfigPostProvider } from ".";

const PROVIDER_SPINNER = ora();
let PROVIDER_COUNTER = 0;

export async function emitModules(
  providers: Awaitable<Provider<unknown>>[],
  config: ConfigPostProvider,
  modules: Map<string, post.Post>) {
  PROVIDER_SPINNER.start();
  await Promise.all(
    providers.map(async (rawProvider) => {
      const provider = await rawProvider;
      const sources = await provider.generateSource();
      await sources.forEach(emitModuleFromSource(provider, config, modules));
    }),
  );
  PROVIDER_SPINNER.succeed(`Compiled ${chalk.green(PROVIDER_COUNTER)} posts.\n`);
}

export function emitModuleFromSource(
  provider: Provider<unknown>,
  config: ConfigPostProvider,
  modules: Map<string, post.Post>,
): (value: Either.Either<string, ProviderSource<any>>) => void {
  return either => pipe(
    either,
    Either.match(
      err => console.error(err),
      ({ info, slug, source }) => {
        try {
          const moduleName = `post:${slug}.astro`;

          PROVIDER_SPINNER.text = `Fetched ${chalk.bold(slug)} from provider ${chalk.underline(provider.name)}`;

          const { frontmatter, excerpt: excerptRaw, rawContent } = parseFrontmatter(source);
          const excerpt = (excerptRaw as string).trim();
          const meta = provider.generatePostMeta(frontmatter, info);

          if (process.env.POST_DRAFT === "only" && meta.status !== Status.DRAFT)
            return;

          if (process.env.POST_DRAFT !== "true" && meta.status === Status.DRAFT)
            return;

          const { componentImport, jsx, toc } = parseMarkdown(rawContent, {
            componentBase: config.componentBase,
            info: {
              slug,
              excerpt,
              meta,
            },
          });

          const astro = `---\n${componentImport}\n---\n${jsx}`;

          modules.set(moduleName, {
            slug,
            excerpt: excerpt ?? "",
            content: {
              source,
              astro,
            },
            meta,
            toc,
          } satisfies post.Post);

          PROVIDER_COUNTER += 1;
        }
        catch (err) {
          console.error(chalk.bgRed(" ERROR "), ` Compile failed for ${chalk.underline(slug)}`);
          console.error(err);
        }
      },
    ),
  );
}

