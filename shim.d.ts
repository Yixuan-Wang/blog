declare module "post:*.astro" {
  import type { AstroInstance } from "astro";
  const component: AstroInstance["default"];
  export default component;

  export const excerpt: string;
  export const metadata: post.PostMeta;
  export const toc: [string, string][];
}

declare module "post:info" {
  const _: Record<string, post.PostInfo>;
  export const timeDesc: string[];
  export const allCategory: Record<string, string[]>;
  export const allTag: Record<string, string[]>;
  export const allSeries: Record<string, string[]>;
  export const mapCategoryTag: Record<string, Set<string>>;
  export const mapCategorySeries: Record<string, Set<string>>;
  export default _;
}

declare module "post:import" {
  const _: Record<string, () => Promise<typeof import("post:*.astro")>>;
  export default _;
}

declare module "@/meta/friends.yaml" {
  const friends: friend.Friend[];
  export { friends };
}

declare module "@/meta/category.yaml" {
  const category: Record<string, Category>;
  export { category };
}

declare module "virtual:site-meta" {
  const siteMeta: siteMeta.SiteMeta;
  export default siteMeta;
}
