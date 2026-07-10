import { cache } from 'react'
import { client } from '@/lib/microcms-client'
import { notFound } from 'next/navigation'
import type { BlogArticle } from "@/lib/cms-types"
import ArticlesList from '@/components/ArticlesList';
import Link from 'next/link'
import type { Metadata } from 'next'
import { SITE_NAME } from '@/constants';

type Props = {
  params: Promise<{ category: string; id: string }>
}

// HTMLタグを除去してプレーンテキストのdescriptionを作る
function toDescription(html: string, max = 120): string {
  const text = html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
  return text.length > max ? `${text.slice(0, max)}…` : text
}

// generateMetadata と Page の両方から呼ばれるため cache で重複取得を防ぐ
const getArticle = cache(async (id: string) => {
  try {
    return await client.getListDetail<BlogArticle>({
      endpoint: 'blogs',
      contentId: id,
    })
  } catch {
    return null
  }
})

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const { category, id } = await params
  const article = await getArticle(id)

  if (!article) {
    return { title: '記事が見つかりません' }
  }

  const description = article.description ?? toDescription(article.content)
  const ogImage = article.eyecatch?.url

  return {
    title: article.title,
    description,
    openGraph: {
      title: `${article.title} | ${SITE_NAME}`,
      description,
      type: 'article',
      url: `/blog/${category}/${id}`,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${article.title} | ${SITE_NAME}`,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  }
}

export async function generateStaticParams(): Promise<{ category: string; id: string }[]> {
  const data = await client.getList<BlogArticle>({
    endpoint: 'blogs',
    queries: { limit: 10 },
  })

  return data.contents.map((article) => ({
    category: article.category.id,
    id: article.id,
  }))
}

export default async function Page({
  params,
}: {
  params: Promise<{ category: string; id: string }>
}) {
  const { category, id } = await params
  const [article, relatedData] = await Promise.all([
    getArticle(id),
    client.getList<BlogArticle>({
      endpoint: 'blogs',
      queries: { filters: `category[equals]${category}`, limit: 4 },
    }),
  ])

  // 記事が存在しない、またはURLと実際のカテゴリが一致しない場合は404
  if (!article || article.category.id !== category) {
    notFound()
  }

  const relatedArticles = relatedData.contents.filter((a) => a.id !== id).slice(0, 3)

  return (
    <main className='container'>
      <article className='blog-contents bg-white px-4 py-8 md:px-10 md:py-12 rounded-2xl prose mx-auto max-w-5xl'>
        <div className='border-b pb-8'>
          <Link
            href={`/blog/${article.category.id}`}
            className='inline-block px-3 py-1 rounded bg-[#2a65bd] text-white text-sm no-underline'
          >
            {article.category.name ?? article.category.id}
          </Link>
          <h1 className='heading1 mt-3'>{article.title}</h1>
          <time dateTime={article.publishedAt}>
            {new Date(article.publishedAt!).toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }).replaceAll('/', '.')}
          </time>
        </div>
        <div className=' '>
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>
      </article>
      {relatedArticles.length > 0 && (
        <nav className='mt-10 md:mt-16'>
          <h2 className='heading2'>関連記事</h2>
          <div className='mt-5'> 
            <ArticlesList articleListData={{ contents: relatedArticles, totalCount: relatedArticles.length, limit: relatedArticles.length, offset: 0 }} />
          </div>
        </nav>
      )}
    </main>
  )
}