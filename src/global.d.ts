import type { Option } from "fp-ts/lib/Option";
import type { Genre } from "./logic/genre";
import type { Status } from "./logic/status";

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
      componentNames: string[];
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
      status?: Status;
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
      link: {
        github?: string;
        blog?: string;
        homepage?: string;
        [key: string]: string;
      };
    }
  }

  interface Category {
    name: string;
    description: string;
  }

  namespace siteMeta {
    interface SiteMeta {
      version: string;
      buildTimestamp: string;
    }
  }
}

export {};
