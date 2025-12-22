import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { Status } from './logic/status';

import { fs } from '~/build/collections/fs';

const posts = defineCollection({
  loader: fs({ pattern: '**/*.md', base: 'data/posts' }),
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
