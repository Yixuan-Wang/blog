import * as Either from "fp-ts/Either";
import { pipe } from "fp-ts/lib/function";
import chalk from "chalk";
import ora from "ora";
import { Status } from "../../logic/status";
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
  await Promise.allSettled(
    providers.map(async (rawProvider) => {
      const provider = await rawProvider;
      const sources = await provider.generateSource();
      await sources.forEach(emitModuleFromSource(provider, config, modules));
    }),
  );
  PROVIDER_SPINNER.succeed(`Found ${chalk.green(PROVIDER_COUNTER)} posts.\n`);
}

const SLUG_FILTER = process.env.POST_SLUG ? new RegExp(process.env.POST_SLUG) : null;

export function emitModuleFromSource(
  provider: Provider<unknown>,
  config: ConfigPostProvider,
  modules: Map<string, post.Post>,
): (value: Either.Either<string, ProviderSource<any>>) => void {
  return either => pipe(
    either,
    Either.match(
      err => console.error(err),
      async ({ info, slug, source }) => {
        try {
          if (SLUG_FILTER && !slug.match(SLUG_FILTER))
            return

          const moduleName = `post:${slug}.astro`;
          
          const { frontmatter, excerpt: excerptRaw, rawContent } = parseFrontmatter(source);
          const excerpt = (excerptRaw as string).trim();
          const meta = provider.generatePostMeta(frontmatter, info);
          
          if (process.env.POST_DRAFT) {
            if (process.env.POST_DRAFT === "only") {
              if (meta.status !== Status.DRAFT) return;
              PROVIDER_SPINNER.text = `${chalk.bgGreen(" SUCC ")} Compiling draft ${chalk.bold(slug)} from provider ${chalk.underline(provider.name)}`;
            }
            PROVIDER_SPINNER.text = `${chalk.bgGreen(" SUCC ")} Compiling ${chalk.bold(slug)} from provider ${chalk.underline(provider.name)}`;
          }
          else {
            if (meta.status === Status.DRAFT) {
              PROVIDER_SPINNER.text = `${chalk.bgYellow(" WARN ")} Skipping draft ${chalk.underline(slug)}`;
              return;
            }
            PROVIDER_SPINNER.text = `${chalk.bgGreen(" SUCC ")} Compiling ${chalk.bold(slug)} from provider ${chalk.underline(provider.name)}`;
          }
          
          PROVIDER_COUNTER += 1;
          const { componentNames, componentImport, jsx, toc } = await parseMarkdown(rawContent, {
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
            componentNames,
          } satisfies post.Post);
        }
        catch (err) {
          console.error(chalk.bgRed(" ERROR "), ` Compile failed for ${chalk.underline(slug)}`);
          console.error(err);
        }
      },
    ),
  );
}

