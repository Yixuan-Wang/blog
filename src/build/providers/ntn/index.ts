import type { Provider, ProviderSource } from "../module";
import { Client } from "@notionhq/client";
import type { PageObjectResponse, RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionToMarkdown } from "notion-to-md";
import { from as rxFrom, mergeMap as rxMergeMap } from "rxjs";
import { left, right } from "fp-ts/Either";
import { generatePostMetaCommons, vagueDateToISO } from "../common";
import { Status } from "../../../logic/status";
import { Genre } from "../../../logic/genre";
import chalk from "chalk";
import { formatISO, parseISO } from "date-fns";

export interface ProviderNtnOptions {
  accessToken: string;
  databaseId: string;
}

export interface ProviderNtnExtra {
  properties: Record<string, any>;
}

export default function ProviderNtn(
  options: ProviderNtnOptions,
): Provider<ProviderNtnExtra> {
  const { accessToken, databaseId } = options;

  const NOTION = new Client({
    auth: accessToken,
    fetch: fetch,
  })
  const NOTION_TO_MD = new NotionToMarkdown({ notionClient: NOTION });

  const generateSource = async () => {
    const pageIds = (await NOTION.databases.query({ database_id: databaseId })).results.map(res => res.id);

    const fetchPage = async (pageId: string) => {
      const mdBlocks = await NOTION_TO_MD.pageToMarkdown(pageId);
      const md = Object.values(NOTION_TO_MD.toMarkdownString(mdBlocks)).join("\n\n");

      const properties: Record<string, any> = (await NOTION.pages.retrieve({ page_id: pageId }) as PageObjectResponse).properties;

      const slug = (properties.Slug.rich_text as Array<RichTextItemResponse>).map(item => item.plain_text).join("");

      const title = properties.Name.title[0].plain_text;
      const date: string = properties.Created.created_time;
      const category: string = properties.Category.select.name;
      const tags: string = (properties.Tags?.rich_text as Array<RichTextItemResponse>)?.map(item => item.plain_text).join("") ?? "";

      const source = `---
title: "${title}"
date: ${date}
category: "${category}"
tags: [${tags}]
---\n
${md}`;

      return {
        slug,
        source,
        info: { properties },
      } satisfies ProviderSource<ProviderNtnExtra>;
    };

    return rxFrom(pageIds.map(fetchPage)).pipe(rxMergeMap(p => p.then(right).catch(err => left(`ProviderNtn: ${err}`))));
  };

  const generatePostMeta = (
    frontmatter: post.FrontmatterRaw,
    extra: ProviderNtnExtra,
  ): post.PostMeta => {
    const meta = generatePostMetaCommons(frontmatter);
    const { properties } = extra;

    const keywords: string[] = properties.Keywords.rich_text[0]?.plain_text.split(",").map((str: string) => str.trim()).filter((str: string) => !!str) ?? [];
    meta.taxonomy.keywords = keywords;

    const seriesRaw = properties.Series.rich_text[0]?.plain_text.match(/(.+)\((\d+)\)/);
    const series: [string, number] | null = seriesRaw ? [seriesRaw[1], Number(seriesRaw[2])] : null;
    meta.taxonomy.series = series;

    let status: Status = Status.FINISHED;
    const statusRaw: string | null = properties.Status?.select?.name ?? null;
    if (statusRaw === "draft") {
      status = Status.DRAFT;
    } else if (statusRaw === "outdated") {
      status = Status.OUTDATED;
    } else if (statusRaw === "stale") {
      status = Status.STALE;
    } else if (statusRaw === "tbc") {
      status = Status.TBC;
    }
    
    let genre: Genre = Genre.ARTICLE;
    const genreRaw: string | null = properties.Genre?.select?.name ?? null;
    if (genreRaw === "article") {
      genre = Genre.ARTICLE;
    } else if (genreRaw === "note") {
      genre = Genre.NOTE;
    } else if (genreRaw === "sheet") {
      genre = Genre.SHEET;
    }

    const created = vagueDateToISO(frontmatter.date as string);
    const updated = vagueDateToISO(properties.Updated.last_edited_time);

    const lang: string | null = properties.Lang.rich_text[0]?.plain_text ?? null;

    //! Does not support aliasing.

    return {
      ...meta,
      status,
      timeline: { created, updated },
      genre,
      lang,
    } satisfies post.PostMeta;
  };

  return {
    name: "ntn",
    hmr: {
      canHandle: (_slug: string) => false,
      canFallback: false,
      accept: () => left("ProviderNtn: Cannot handle HMR"),
    },
    generateSource,
    generatePostMeta,
  };
}