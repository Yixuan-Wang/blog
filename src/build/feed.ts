import type { AstroIntegration } from "astro";
import type { FeedOptions } from "feed";
import type { Plugin } from "vite";

export interface ConfigIntergrationFeed {
  feedConfig: FeedOptions
}

export default function IntergrationFeed(config: ConfigIntergrationFeed): AstroIntegration {
  function PluginFeedConfig(feedConfig: FeedOptions): Plugin {
    const MODULE_ID = "virtual:feed-config";
    return {
      name: "feed-config",
      resolveId(id) {
        if (id === MODULE_ID)
          return id;
      },
      load(id) {
        if (id === MODULE_ID)
          return `const feedConfig=${JSON.stringify(feedConfig)};export default feedConfig;`;
      },
    };
  }

  return {
    name: "feed",
    hooks: {
      "astro:config:setup": function ({ config: astroConfig, updateConfig, injectRoute }) {
        if (astroConfig.site) {
          const site = astroConfig.site + astroConfig.base;
          const atom = new URL("/feed.atom", site).toString();
          const rss = new URL("/feed.xml", site).toString();
          const feedConfig: FeedOptions = {
            link: site,
            feedLinks: {
              atom,
              rss,
            },
            ...config.feedConfig,
          };
          updateConfig({
            vite: {
              plugins: [PluginFeedConfig(feedConfig)],
            },
          });
          // Feed entries come from the content collection, which is only available inside Astro's runtime
          injectRoute({
            pattern: "/feed.[format]",
            entrypoint: new URL("./feed-endpoint.ts", import.meta.url),
            prerender: true,
          });
        }
      },
    },
  };
}
