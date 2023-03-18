/// @unocss-include

export enum Genre {
  ARTICLE = "article",
  SHEET = "sheet",
  NOTE = "note",
}

export const GENRE_META: Record<
  Genre,
  {
    title: string
    icon: string
  }
> = {
  [Genre.ARTICLE]: {
    title: "Article",
    icon: "i-mdi-file",
  },
  [Genre.SHEET]: {
    title: "Sheet",
    icon: "i-mdi-table-large",
  },
  [Genre.NOTE]: {
    title: "Note",
    icon: "i-mdi-clipboard-text",
  },
};
