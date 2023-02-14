import type { Observable } from "rxjs";
import type { Either } from "fp-ts/Either";
import type { HmrContext } from "vite";

import type { AstroComponentMetadata } from "astro";

export interface ProviderSource<Info = any> {
  slug: string;
  source: string;
  info: Info;
}

export interface Provider<Extra = any> {
  name: string;
  hmr: {
    canHandle: (slug: string) => boolean,
    canFallback: boolean,
    accept: (slug: string, ctx: HmrContext) => Awaitable<Either<string, ProviderSource<Extra>>>;
  }
  generateSource: () => Awaitable<Observable<Either<string, ProviderSource<Extra>>>>;
  generatePostMeta: (
    frontmatter: post.FrontmatterRaw,
    extra: Extra
  ) => post.PostMeta;
}
