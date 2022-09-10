import type Mitt from "mitt";

export declare global {
  interface Frontmatter {
    title: string
    date: string
    category: string
    tags: string[]
    keywords?: string[]
    lang?: string
    alias?: string | string[]
    novue?: boolean
  }

  interface Article {
    name: string
    path: string
    genre: string
    frontmatter: Frontmatter
    excerpt: string
    timestamp: number
  }

  interface Friend {
    name: string
    avatar: string
    blog: string
    link: string
  }

  // eslint-disable-next-line vars-on-top, no-var
  var mitt: ReturnType<typeof Mitt>;
}
