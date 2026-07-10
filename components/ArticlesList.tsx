import ArticleCard from "./ArticleCard"
import type { BlogListResponse } from "@/lib/cms-types"

export default function ArticlesList({
  articleListData,
  limit = 6,
  displayDate = false,
}: {
  articleListData: BlogListResponse
  limit?: number
  displayDate?: boolean
}) {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {articleListData.contents.slice(0, limit).map((article) => (
        <ArticleCard key={article.id} article={article} displayDate={displayDate} />
      ))}
    </div>
  )
}
