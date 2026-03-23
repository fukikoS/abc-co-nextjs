import { client } from '@/lib/microcms-client'
import ArticleCard from './ArticleCard'
import type { BlogListResponse } from "@/lib/blog-types"

export default async function ArticlesList() {
  const data = (await client.get({
    endpoint: 'blogs',
    // contentId: 'bq4--4f90v',
    // queries: {
    //   limit: 10,
    // },
  })) as unknown as BlogListResponse
  console.log(data)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch justify-center">
      {data.contents.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  )
}
