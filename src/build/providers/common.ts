import { formatISO, parseISO } from "date-fns";

export function generatePostMetaCommons(frontmatter: post.FrontmatterRaw) {
  const alias = frontmatter.alias
    ? Array.isArray(frontmatter.alias)
      ? frontmatter.alias
      : [frontmatter.alias]
    : [];

  const lang = frontmatter.lang ?? null;

  const keywords = frontmatter.keywords ?? [];

  const series = frontmatter.series ?? null;

  const { category, tags, title } = frontmatter;

  return {
    alias,
    lang,
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
