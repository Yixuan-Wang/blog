import path from "node:path";
import { exit } from "node:process";
import chalk from "chalk";
import type { AstroIntegration } from "astro";
import type { Plugin } from "vite";
import { compareDesc } from "date-fns";
import { Collector } from "../../utils/collector";
import { decideTimeFromStatus } from "../../utils/time";
import { emitModuleFromSource, emitModules } from "./provider";
import type { Provider } from "./module";

export interface ConfigPostProvider {
  providers: Provider<any>[]
  componentBase: string
}

const VFILE_POST_INFO = "post:info";
const VFILE_POST_IMPORT = "post:import";

export interface PluginPostProvider {
  getPosts: () => Map<string, post.Post>
  getProviders: () => Provider<any>[]
  getSlugs: () => {
    timeDesc: string[]
  }
}

export default function PostProvider(
  config: ConfigPostProvider,
): AstroIntegration {
  const providers = config.providers;
  const modules = new Map<string, post.Post>();
  let astroBuilder: Plugin | null = null;

  let timeDesc: string[] = [];

  const vitePostProvider = function (): Plugin & PluginPostProvider {
    return {
      name: "post-provider",
      enforce: "pre",
      getPosts() {
        return modules;
      },
      getProviders() {
        return providers;
      },
      getSlugs() {
        return {
          timeDesc,
        };
      },
      configResolved(resolvedConfig) {
        astroBuilder
          = resolvedConfig.plugins
            .filter(({ name }) => name === "astro:build")
            .at(0) ?? null;
      },
      resolveId(id) {
        if (id === VFILE_POST_INFO || id === VFILE_POST_IMPORT)
          return id;
        if (modules.has(id))
          return id;
      },
      load(id) {
        if (id === VFILE_POST_INFO) {
          const info: Record<string, post.PostInfo> = {};
          const time: Record<string, Date> = {};
          const allCategory = new Collector<string, string[], string>(
            () => [],
            (container, slug) => container.push(slug),
          );
          const allTag = new Collector<string, string[], string>(
            () => [],
            (container, slug) => container.push(slug),
          );
          const allSeries = new Collector<string, string[], [number, string]>(
            () => [],
            (container, [index, slug]) => container.splice(index, 0, slug),
          );

          for (const { slug, excerpt, meta } of modules.values()) {
            info[slug] = {
              slug,
              excerpt,
              meta,
            };
            time[slug] = decideTimeFromStatus(meta);
            allCategory.add(meta.taxonomy.category, slug);
            meta.taxonomy.tags.forEach(tag => allTag.add(tag, slug));
            if (meta.taxonomy.series) {
              allSeries.add(meta.taxonomy.series[0], [
                meta.taxonomy.series[1],
                slug,
              ]);
            }
          }

          timeDesc.splice(0, timeDesc.length);
          timeDesc = Object.keys(info).sort((a, b) =>
            compareDesc(time[a]!, time[b]!),
          );

          allCategory.collector.forEach(collection =>
            collection.sort((a, b) => compareDesc(time[a]!, time[b]!)),
          );
          allTag.collector.forEach(collection =>
            collection.sort((a, b) => compareDesc(time[a]!, time[b]!)),
          );

          const code = `
const _ = ${JSON.stringify(info)};
export const timeDesc = ${JSON.stringify(timeDesc)};
export const allCategory = ${JSON.stringify(
            Object.fromEntries(allCategory.collector),
          )};
export const allTag = ${JSON.stringify(Object.fromEntries(allTag.collector))};
export const allSeries = ${JSON.stringify(
            Object.fromEntries(allSeries.collector),
          )};
export default _;`;

          return {
            code,
            map: "",
            meta: {
              vite: {
                lang: "js",
              },
            },
          };
        }

        if (id === VFILE_POST_IMPORT) {
          const components: string[] = [];
          for (const [fileName, { slug }] of modules.entries())
            components.push(`"${slug}": () => import("${fileName}")`);

          const code = `const _ = {${components.join(",")}};export default _;`;

          return {
            code,
            map: "",
            meta: {
              vite: {
                lang: "js",
              },
            },
          };
        }

        if (modules.has(id)) {
          const module = modules.get(id)!;
          return {
            code: module.content.astro,
            map: null,
          };
        }
      },
      async handleHotUpdate(ctx) {
        const slug = path.parse(ctx.file).name;
        const id = `post:${slug}.astro`;
        if (!astroBuilder) {
          console.error(
            chalk.bgRed(" FATAL "),
            " The `astro:build` plugin is gone",
          );
          exit(1);
        }

        if (modules.has(id)) {
          // console.log(chalk.bgGray(" DEBUG "), ` update: ${id}`);
          const node = ctx.server.moduleGraph.idToModuleMap.get(id)!;

          const hmrProvider
            = providers.find(provider => provider.hmr.canHandle(slug))
            ?? providers.find(provider => provider.hmr.canFallback);

          if (!hmrProvider) {
            console.error(
              chalk.bgYellow(" WARNING "),
              ` Cannot handle HMR of ${chalk.underline(slug)}`,
            );
            return [];
          }

          emitModuleFromSource(
            hmrProvider,
            config,
            modules,
          )(await hmrProvider.hmr.accept(slug, ctx));

          ctx.server.reloadModule(node);
          ctx.server.moduleGraph.onFileChange(id);
          (
            ((astroBuilder.handleHotUpdate as any)?.handler
              ?? astroBuilder.handleHotUpdate) as (_: typeof ctx) => any
          )({
            ...ctx,
            file: id,
            read: () => modules.get(id)!.content.astro,
          });

          ctx.server.ws.send({
            type: "full-reload",
            path: "*",
          });

          const postImport
            = ctx.server.moduleGraph.idToModuleMap.get(VFILE_POST_IMPORT);
          if (postImport)
            ctx.server.reloadModule(postImport);

          const postInfo
            = ctx.server.moduleGraph.idToModuleMap.get(VFILE_POST_INFO);
          if (postInfo)
            ctx.server.reloadModule(postInfo);

          return [];
          /* ctx.server.moduleGraph.invalidateModule(node);
          await Promise.all(Array.from(node.importers).map(importer => {
            console.log(`reload ${importer.id}`)
            return ctx.server.reloadModule(importer);
          })); */
          // await ctx.server.reloadModule(node);
        }
        else { return []; }
      },
    };
  };

  const vitePostProviderPost = function (): Plugin {
    return {
      name: "vite:post-provider-post",
      enforce: "post",
      transform(code, id) {
        if (modules.has(id)) {
          const { meta, excerpt, toc } = modules.get(id)!;
          code += `
export const metadata = ${JSON.stringify(meta)};
export const excerpt = ${JSON.stringify(excerpt)};
export const toc = ${JSON.stringify(toc)};
`;

          return {
            code,
            map: null,
          };
        }
      },
    };
  };

  let emitModulesJoinHandle: Promise<any> = Promise.resolve();

  return {
    name: "astro:content-provider",
    hooks: {
      "astro:config:setup": function ({ updateConfig }) {
        if (process.env.npm_lifecycle_event === "preview")
          return;
        // No SSR mode.

        emitModulesJoinHandle = emitModules(providers, config, modules);
        updateConfig({
          vite: {
            plugins: [vitePostProvider(), vitePostProviderPost()],
          },
        });
      },
      "astro:config:done": async function () {
        if (process.env.npm_lifecycle_event === "preview")
          return;
        await emitModulesJoinHandle;
      },
    },
  };
}
