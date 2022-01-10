import matter from 'gray-matter'

export function getMeta(raw: string, mixin: {
  name: string
  path: string
  genre: string
  date?: string
}): Article {
  const result = matter(raw, { excerpt_separator: '<!-- more -->' })
  result.excerpt = result.excerpt?.trim()
  const date = mixin?.date ?? result.data.date

  return {
    name: mixin.name,
    path: mixin.path,
    frontmatter: {
      ...result.data as Frontmatter,
      date,
    },
    excerpt: result.excerpt ?? '',
    genre: mixin.genre,
    timestamp: new Date(date).getTime(),
  }
}
