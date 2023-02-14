import type { AstroIntegration } from "astro";
import type { FeedOptions, Item } from "feed";
import { Feed } from "feed";
import type { Plugin } from "vite";
import { decideTimeFromStatus } from "../utils/time";
import type { PluginPostProvider } from "./providers";

export interface ConfigIntergrationFeed {
  feedConfig: FeedOptions
}

function convertPostToFeedItem(site: string, { slug, meta, excerpt }: post.Post): Item {
  const link = new URL(`/post/${slug}`, site).toString();
  return {
    title: meta.title,
    id: slug,
    description: excerpt,
    link,
    date: decideTimeFromStatus(meta),
    content: `<p>${excerpt}</p><p><a href="${link}">Full Article...</a></p>`,
    category: meta.taxonomy.tags.map(tag => ({ name: tag, domain: meta.taxonomy.category })),
  };
}

export default function IntergrationFeed(config: ConfigIntergrationFeed): AstroIntegration {
  interface ConfigPluginFeed {
    site: string
    feedConfig: FeedOptions
  }

  function PluginFeed({ site, feedConfig }: ConfigPluginFeed): Plugin {
    let pluginPostProvider: (Plugin & PluginPostProvider) | null = null;
    const feed = new Feed(feedConfig);
    let feedEmitted = false;

    function emitFeed() {
      feedEmitted = true;
      const posts = pluginPostProvider?.getPosts() ?? new Map<string, post.Post>();
      const timeDesc = pluginPostProvider?.getSlugs().timeDesc ?? [];

      timeDesc.slice(0, 30).map(post => posts.get(`post:${post}.astro`)).map(post => convertPostToFeedItem(site, post!)).forEach(feed.addItem);
    }
    /* const feedItems: Item[] = [];
    function generateFeed(article: Article) {
      const link = `https://blog.yixuan-wang.site${article.path}.html`;
      const item: Item = {
        title: article.frontmatter.title,
        id: `${article.path.slice(1).replaceAll("/", "_")}_${dayjs(article.timestamp).format()}`,
        link,
        date: dayjs.tz(article.timestamp).toDate(),
        content: `<p>${article.excerpt}</p><p><a href="${link}">Full Article...</a></p>`,
        category: article.frontmatter.tags.map(tag => ({ name: tag, domain: article.frontmatter.category })),
      };
      feedItems.push(item);
    } */
    return {
      name: "feed",
      enforce: "post",
      configResolved(resolvedConfig) {
        pluginPostProvider
          = resolvedConfig.plugins
            .filter(({ name }) => name === "post-provider")
            .at(0) as (Plugin & PluginPostProvider) ?? null;
      },
      configureServer(server) {
        server.middlewares.use("/feed.xml", (_, res) => {
          if (!feedEmitted)
            emitFeed();
          res.end(feed.rss2());
        });
        server.middlewares.use("/feed.atom", (_, res) => {
          if (!feedEmitted)
            emitFeed();
          res.end(feed.atom1());
        });
      },
      generateBundle() {
        if (!feedEmitted)
          emitFeed();
        this.emitFile({
          type: "asset",
          fileName: "feed.xml",
          source: feed.rss2(),
        });
        this.emitFile({
          type: "asset",
          fileName: "feed.atom",
          source: feed.atom1(),
        });
      },
    };
  }

  return {
    name: "feed",
    hooks: {
      "astro:config:setup": function ({ config: astroConfig, updateConfig }) {
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
              plugins: [PluginFeed({ site, feedConfig })],
            },
          });
        }
      },
    },
  };
}
