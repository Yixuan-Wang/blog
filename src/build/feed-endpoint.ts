import type { APIRoute, GetStaticPaths } from "astro";
import type { Item } from "feed";
import { Feed } from "feed";
import feedConfig from "virtual:feed-config";
import { getDataset, getPosts } from "~/logic/dataset";
import { decideTimeFromStatus } from "~/utils/time";

const FORMATS = {
  xml: { render: (feed: Feed) => feed.rss2(), contentType: "application/rss+xml" },
  atom: { render: (feed: Feed) => feed.atom1(), contentType: "application/atom+xml" },
};

export const getStaticPaths: GetStaticPaths = () => Object.keys(FORMATS).map(format => ({ params: { format } }));

function convertPostToFeedItem(base: URL, { id, data }: post.PostInfo): Item {
  const link = new URL(`post/${id}`, base).toString();
  return {
    title: data.title,
    // feed v6 requires Atom ids to be URLs; RSS keeps the slug as guid
    id: link,
    guid: id,
    description: data.excerpt,
    link,
    date: decideTimeFromStatus(data),
    content: `<p>${data.excerpt}</p><p><a href="${link}">Full Article...</a></p>`,
    category: data.taxonomy.tags.map(tag => ({ name: tag, term: tag, domain: data.taxonomy.category })),
  };
}

export const GET: APIRoute = async ({ params, site }) => {
  const format = FORMATS[params.format as keyof typeof FORMATS];
  const base = new URL(import.meta.env.BASE_URL, site);

  const dataset = await getDataset();
  const timeDesc = await getPosts(dataset.sort("date", true).slice(0, 30).select("id").toSeries());

  const feed = new Feed(feedConfig);
  timeDesc.map(post => convertPostToFeedItem(base, post!)).forEach(item => feed.addItem(item));

  return new Response(format.render(feed), {
    headers: { "Content-Type": `${format.contentType}; charset=utf-8` },
  });
};
