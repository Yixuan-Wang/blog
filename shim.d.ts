declare module "post:*.astro" {
  import type { AstroInstance } from "astro";
  const component: AstroInstance["default"];
  export default component;

  export const excerpt: string;
  export const metadata: post.PostMeta;
}

declare module "post:info" {
  const _: Record<string, post.PostInfo>;
  export const timeDesc: string[];
  export const allCategory: Record<string, string[]>;
  export const allTag: Record<string, string[]>;
  export const allSeries: Record<string, string[]>;
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