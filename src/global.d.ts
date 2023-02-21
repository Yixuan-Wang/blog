import type { Option } from "fp-ts/lib/Option";
import type { Genre, Status } from "./utils/meta";

declare global {
  type Like<T, N> = T & { readonly __tag: N };
  type Awaitable<T> = T | PromiseLike<T>;

  namespace post {
    /**
     * A post.
     */
    interface Post {
      slug: string;
      excerpt: string;
      content: PostContent;
      meta: PostMeta;
      toc: [string, string][];
    }

    interface PostInfo {
      slug: string;
      excerpt: string;
      meta: PostMeta;
    }

    interface PostContent {
      /**
       * Markdown source.
       */
      source: string;

      /**
       * Parsed content as an Astro component.
       */
      astro: string;
    }

    interface FrontmatterRaw {
      title: string;
      date: Date | string;
      updated?: Date | string;
      genre?: string;
      category: string;
      tags: string[];
      series?: [string, number];
      keywords?: string[];
      lang?: string;
      alias?: string | string[];
      draft?: boolean;
      outdated?: boolean;
    }

    interface PostMeta {
      title: string;
      genre: Genre;
      taxonomy: meta.Taxonomy;
      timeline: meta.Timeline;
      status: Status;
      lang: string | null;
      alias: string[];
    }

    namespace meta {
      interface Taxonomy {
        category: string;
        tags: string[];
        series: [string, number] | null;
        keywords: string[];
      }

      interface Timeline {
        created: string;
        updated: string;
      }
    }
  }

  namespace friend {
    interface Friend {
      name: string;
      avatar: string;
      link: Link;
    }

    interface Link {
      github: string;
      blog?: string;
      homepage?: string;
    }
  }

  namespace siteMeta {
    interface SiteMeta {
      version: string;
      buildTimestamp: string;
    }
  }
}

export {};
