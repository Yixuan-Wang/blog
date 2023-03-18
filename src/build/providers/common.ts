import { formatISO, parseISO } from "date-fns";
import { Genre } from "../../logic/genre";

export function generatePostMetaCommons(frontmatter: post.FrontmatterRaw) {
  const alias = frontmatter.alias
    ? Array.isArray(frontmatter.alias)
      ? frontmatter.alias
      : [frontmatter.alias]
    : [];

  const lang = frontmatter.lang ?? null;

  const keywords = frontmatter.keywords ?? [];

  const series = frontmatter.series ?? null;

  let genre = Genre.ARTICLE;
  if (frontmatter.genre) {
    const rawGenre = frontmatter.genre.toUpperCase();
    if (rawGenre in Genre)
      genre = Genre[rawGenre as keyof typeof Genre];
  }

  const { category, tags, title } = frontmatter;

  return {
    alias,
    lang,
    genre,
    taxonomy: {
      category,
      keywords,
      series,
      tags,
    },
    title,
  };
}

export function vagueDateToISO(dateOrString: Date | string): string {
  return dateOrString instanceof Date ? formatISO(dateOrString) : formatISO(parseISO(dateOrString));
}
