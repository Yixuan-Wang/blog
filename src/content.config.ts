import { z, defineCollection } from 'astro:content';
import type { Loader } from 'astro/loaders';

import { fs } from '~/build/collections/fs';
import { gh } from '~/build/collections/gh';

interface MergedLoaderContext {
  updatedEntryKeys?: Set<string>,
}

function MergedLoader(
  ...loaders: (((_: MergedLoaderContext) => Loader) | null)[]
): Loader {
  return {
    name: "merged-loader",
    async load(context) {
      const updatedEntryKeys = new Set<string>();
      await Promise.all(loaders
        .filter(loaderFactory => !!loaderFactory)
        .map(async (loaderFactory) => {
          const loader = loaderFactory({ updatedEntryKeys });
          await loader.load(context);
        })
      );
      const untouchedEntryKeys = new Set<string>(context.store.keys()).difference(updatedEntryKeys);
      for (const key of untouchedEntryKeys) {
        context.store.delete(key);
      }
    },
  };
}

const posts = defineCollection({
  // loader: fs({ pattern: '**/*.md', base: import.meta.env.POSTS_DIR }),
  loader: MergedLoader(
    (context) => fs({ pattern: '**/*.md', base: import.meta.env.POSTS_DIR }, context),
    !!process.env.POST_NO_GH ? null : (context) => gh({
      userName: import.meta.env.GITHUB_USER,
      repoName: import.meta.env.GITHUB_REPO,
      accessToken: import.meta.env.GITHUB_ACCESS_TOKEN,
      includedLabels: ['+'],
    }, context),
  ),
  // schema: z.object({
  //   title: z.string(),
  //   date: z.union([z.date(), z.string()]),
  //   updated: z.union([z.date(), z.string()]).optional(),
  //   genre: z.string().optional(),
  //   category: z.string(),
  //   tags: z.array(z.string()),
  //   series: z.tuple([z.string(), z.number()]).optional(),
  //   keywords: z.array(z.string()).optional(),
  //   lang: z.string().optional(),
  //   alias: z.union([z.string(), z.array(z.string())]).optional(),
  //   draft: z.boolean().optional(),
  //   outdated: z.boolean().optional(),
  //   status: z.nativeEnum(Status).optional(),
  // }),
});

// Expose your defined collection to Astro
// with the `collections` export
export const collections = { posts };
