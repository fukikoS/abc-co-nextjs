import { client } from '@/lib/microcms-client'
import { notFound } from 'next/navigation'
import type { BlogArticle, BlogListResponse } from "@/lib/blog-types"

export async function generateStaticParams(): Promise<{ category: string; id: string }[]> {
  const data = (await client.get({
    endpoint: 'blogs',
    queries: { limit: 10 },
  })) as unknown as BlogListResponse

  return data.contents.map((article) => ({
    category: article.category.id,
    id: article.id,
  }))
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ category: string; id: string }>
}) {
  const { category, id } = await params
  const article = (await client.get({
    endpoint: 'blogs',
    contentId: id,
  })) as unknown as BlogArticle

  // URLと実際のカテゴリが一致するかチェック（重要）
  if (article.category.id !== category) {
    notFound()
  }

  return (
    <main className=''>
      <article>
        <h1 className='text-2xl font-bold'>{article.title}</h1>
        {/* <div dangerouslySetInnerHTML={{ __html: article.contents.content }} /> */}
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </article>
    </main>
  )
}