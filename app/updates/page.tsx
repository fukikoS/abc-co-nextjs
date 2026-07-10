import Link from "next/link"
import { notFound } from "next/navigation"
import UpdatesPagination from "@/components/UpdatesPagination"
import { BlogArticle } from "@/lib/cms-types"
import { client } from "@/lib/microcms-client"
import type { Metadata } from "next";
import { SITE_NAME } from "@/constants";
import PageTitle from "@/components/PageTitle";

const title = "Updates";
const description = "最新のニュースやお知らせをお届けします。";

export const metadata: Metadata = {
  // ルートレイアウトの template により「Updates | ABC Co.」と表示される
  title,
  description,
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description,
    url: "/updates",
  },
  twitter: {
    title: `${title} | ${SITE_NAME}`,
    description,
  },
};


const PAGE_SIZE = 12

export default async function Updates({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const params = await searchParams
  const page = Math.max(1, parseInt(params.page || "1"))

  // 指定ページのお知らせを取得
  let articles: BlogArticle[] = []
  let totalCount = 0

  try {
    const data = await client.getList<BlogArticle>({
      endpoint: "blogs",
      queries: {
        limit: PAGE_SIZE,
        offset: (page - 1) * PAGE_SIZE,
        filters: "category[equals]updates",
      },
    })
    articles = data.contents
    totalCount = data.totalCount
  } catch (error) {
    console.error("Failed to load updates:", error)
  }

  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  // 存在しないページが指定された場合は404にする
  if (page > 1 && page > totalPages) {
    notFound()
  }

  return (
    <main className="container">
      <PageTitle en="Updates" ja="お知らせ" />
      <section className="mt-8 bg-white p-6 md:px-10 md:py-12 rounded-2xl">
        <ul className="space-y-4">
          {articles.map((article) => (
            <li key={article.id} className="">
              <Link href={`/blog/${article.category.id}/${article.id}`} className="block">
                <div className="flex flex-col gap-2">
                  <div className="md:flex items-center gap-4">
                    {article.publishedAt && (
                      <time className="text-sm md:text-md w-30 text-slate-500" dateTime={article.publishedAt}>
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </time>
                    )}
                    <h2 className="md:text-lg font-semibold text-slate-900">{article.title}</h2>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <UpdatesPagination currentPage={page} totalPages={totalPages} />
    </main>
  )
}
