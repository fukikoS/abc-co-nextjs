export type BlogCategory = {
  id: string
  name?: string
}

export type BlogEyecatch = {
  url: string
}

export type BlogArticle = {
  id: string
  title: string
  content: string
  category: BlogCategory
  eyecatch: BlogEyecatch
}

export type BlogListResponse = {
  contents: BlogArticle[]
}

