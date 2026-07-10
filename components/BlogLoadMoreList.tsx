"use client"

import { useState, useTransition } from "react"
import ArticlesList from "./ArticlesList"
import LoadMoreButton from "./LoadMoreButton"
import { fetchBlogPage } from "@/app/blog/actions"
import type { BlogArticle } from "@/lib/cms-types"

export default function BlogLoadMoreList({
  initialArticles,
  totalCount,
  pageSize,
  category,
}: {
  initialArticles: BlogArticle[]
  totalCount: number
  pageSize: number
  category?: string
}) {
  const [articles, setArticles] = useState<BlogArticle[]>(initialArticles)
  const [currentPage, setCurrentPage] = useState(1)
  const [isPending, startTransition] = useTransition()

  const handleLoadMore = () => {
    if (isPending) return
    startTransition(async () => {
      const nextPage = currentPage + 1
      const newArticles = await fetchBlogPage(nextPage, pageSize, category)
      setArticles((prev) => [...prev, ...newArticles])
      setCurrentPage(nextPage)
    })
  }

  return (
    <>
      <ArticlesList
        limit={articles.length}
        articleListData={{
          contents: articles,
          totalCount,
          limit: pageSize,
          offset: 0,
        }}
      />
      <LoadMoreButton
        totalCount={totalCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onLoadMore={handleLoadMore}
        isLoading={isPending}
      />
    </>
  )
}
