import { getCollection, getEntry } from "astro:content";
import pl from "nodejs-polars";
import { Status } from "./status";

let DATASET: pl.DataFrame | null = null;

export async function getDataset(): Promise<pl.DataFrame> {
  if (DATASET) {
    return DATASET;
  }

  const posts = await getCollection('posts');
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