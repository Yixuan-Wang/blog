/* eslint-disable import/no-duplicates */

declare interface Window {
  // extend the window
}

declare module "virtual:generated-pages" {
  import type { RouteRecordRaw } from "vue-router";
  const routes: RouteRecordRaw[];
  export default routes;
}

declare module "*.vue" {
  import type { ComponentOptions } from "vue";
  const component: ComponentOptions;
  export default component;
}

// with vite-plugin-md, markdowns can be treat as Vue components
declare module "*.md" {
  import type { ComponentOptions } from "vue";
  const component: ComponentOptions;
  export default component;
}

declare module "@iktakahiro/markdown-it-katex" {
  const Katex: any;
  export = Katex;
}

declare module "@yixuan-wang/component-leipzig" {
  const _: any;
  export = _;
}
