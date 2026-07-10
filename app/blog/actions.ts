"use server"

import { client, EXCLUDED_CATEGORIES_FILTER } from "@/lib/microcms-client"
import type { BlogArticle } from "@/lib/cms-types"

// 指定ページ分の記事を offset で差分取得する Server Action
// category を渡すとそのカテゴリで絞り込む（未指定時はお知らせカテゴリを除外）
export async function fetchBlogPage(
  page: number,
  pageSize: number,
  category?: string,
): Promise<BlogArticle[]> {
  const data = await client.getList<BlogArticle>({
    endpoint: "blogs",
    queries: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
      filters: category ? `category[equals]${category}` : EXCLUDED_CATEGORIES_FILTER,
    },
  })
  return data.contents
}
