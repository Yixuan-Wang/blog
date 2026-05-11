import { getCollection, getEntry } from "astro:content";
import pl from "nodejs-polars";
import { Status } from "./status";

function zipToRecord<K extends PropertyKey, V>(keys: K[], values: V[]): Record<K, V> {
  const result = {} as Record<K, V>;
  const length = Math.min(keys.length, values.length);

  for (let i = 0; i < length; i++) {
    result[keys[i]] = values[i];
  }

  return result;
}

let DATASET: pl.DataFrame | null = null;
export async function getDataset(): Promise<pl.DataFrame> {
  if (DATASET) {
    return DATASET;
  }

  const posts = await getCollection("posts", ({ data }) => (
    import.meta.env.PROD ? data.status !== Status.DRAFT : true
  ));
  const dataset = pl.DataFrame(
      posts.map(post => ({
        id: post.id,
        ...post.data,
        ...post.data.taxonomy,
    })),
    { 
      orient: 'row',
      schemaOverrides: {
        series: pl.Struct({
          name: pl.Utf8,
          index: pl.Int32,
        }),
      }
    }
  ).withRowIndex().withColumns(
    pl.struct([
      pl.col("timeline").struct.field("created").str.strptime(pl.Datetime, "%Y-%m-%dT%H:%M:%S%#z"),
      pl.col("timeline").struct.field("updated").str.strptime(pl.Datetime, "%Y-%m-%dT%H:%M:%S%#z"),
    ]),
  ).withColumns(
    pl
      .when(pl.col("status").isIn([Status.DRAFT, Status.FINISHED]))
      .then(pl.col("timeline").struct.field("created"))
      .otherwise(pl.col("timeline").struct.field("updated"))
      .alias("date")
  ).sort("date", true);

  DATASET = dataset;
  return dataset;
}

export async function getPosts(ids: pl.Series | string[]) {
  if (!Array.isArray(ids)) {
    ids = ids.toArray() as string[];
  }
  return await Promise.all(ids.map(id => getEntry('posts', id)!));
}

let TAGS: Record<string, string[]> | null = null;
export async function getTagsRecord(): Promise<Record<string, string[]>> {
  if (TAGS) {
    return TAGS;
  }

  const dataset = await getDataset();

  const { tags, id } = dataset.explode("tags").groupBy("tags").agg(
    pl.col("id")
  ).toObject() as any as { tags: string[]; id: string[][] };

  TAGS = zipToRecord(tags, id);
  return TAGS;
}

let CATEGORIES: Record<string, string[]> | null = null;
export async function getCategoriesRecord(): Promise<Record<string, string[]>> {
  if (CATEGORIES) {
    return CATEGORIES;
  }

  const dataset = await getDataset();

  const { category, id } = dataset.groupBy("category").agg(
    pl.col("id")
  ).toObject() as any as { category: string[]; id: string[][] };

  CATEGORIES = zipToRecord(category, id);
  return CATEGORIES;
}

let SERIES: Record<string, string[]> | null = null;
export async function getSeriesRecord(): Promise<Record<string, string[]>> {
  if (SERIES) {
    return SERIES;
  }

  const dataset = await getDataset();

  const { series_name, id } = dataset.filter(pl.col("series").isNotNull()).withColumns(
    pl.col("series").struct.field("name").alias("series_name"),
    pl.col("series").struct.field("index").alias("series_index"),
  ).groupBy("series_name").agg(
    pl.col("id").sortBy("series_index"),
  ).toObject() as any as { series_name: string[]; id: string[][] };

  SERIES = zipToRecord(series_name, id);
  return SERIES;
}

interface TaxonomyRecord {
  total: number;
  tags: {
    name: string;
    count: number;
  }[];
  series: {
    name: string;
    count: number;
  }[];
}
let TAXONOMY: Record<string, TaxonomyRecord> | null = null;
export async function getTaxonomyRecord(): Promise<Record<string, TaxonomyRecord>> {
  if (TAXONOMY) {
    return TAXONOMY;
  }

  const dataset = await getDataset();
  const allCategory = dataset.select(
    pl.col("category"),
    pl.col("tags"),
    pl.col("series").struct.field("name").alias("series"),
  );
  const allTaxonomy = allCategory.explode("tags").groupBy("tags").agg(
    pl.len().alias("count_tags"),
    pl.col("category").first().alias("category"),
  ).groupBy("category").agg(
    pl.cols("tags", "count_tags").sortBy("count_tags", true),
    pl.col("count_tags").sum().alias("total"),
  ).sort("category").join(
    allCategory.groupBy("series").agg(
      pl.len().alias("count_series"),
      pl.col("category").first().alias("category"),
    ).sort("count_series", true).filter(pl.col("series").isNotNull()).groupBy("category").agg(
      pl.cols("series", "count_series").sortBy("count_series", true),
    ),
    { on: "category", how: "left" }
  ).toObject() as unknown as {
    category: string[];
    tags: string[][];
    count_tags: number[][];
    total: number[];
    series?: string[][];
    count_series?: number[][];
  };
  const result: Record<string, TaxonomyRecord> = {};
  for (let i = 0; i < allTaxonomy.category.length; i++) {
    const category = allTaxonomy.category[i];
    const tags = allTaxonomy.tags[i].map((name, j) => ({
      name,
      count: allTaxonomy.count_tags[i][j],
    }));
    const series = (allTaxonomy.series?.[i] || []).map((name, j) => ({
      name,
      count: allTaxonomy.count_series?.[i][j] || 0,
    }));
    result[category] = {
      total: allTaxonomy.total[i],
      tags,
      series,
    };
  }

  TAXONOMY = result;
  return TAXONOMY;
}