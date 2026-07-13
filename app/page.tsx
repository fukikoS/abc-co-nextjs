import { client, getCategories } from '@/lib/microcms-client'
import type { BlogArticle } from "@/lib/cms-types"
import { formatDate } from "@/lib/format-date"
import CategorySection from '@/components/CategorySection'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import TopHero from '@/components/top-hero/TopHero'
import ServiceSection from '@/components/ServiceSection'

const fetchBlogs = (category: string) =>
  client.getList<BlogArticle>({
    endpoint: "blogs",
    queries: { filters: `category[equals]${category}`, limit: 6 },
  })

export default async function Home() {
  // updates を除いたカテゴリ一覧を取得
  const categories = await getCategories()

  // updates と、それ以外の各カテゴリのブログ一覧を並行取得
  const [updatesArticleListData, categoryArticleLists] = await Promise.all([
    fetchBlogs("updates"),
    Promise.all(categories.map((category) => fetchBlogs(category.id))),
  ])

  const categorySections = categories.map((category, index) => ({
    id: category.id,
    name: category.name,
    articles: categoryArticleLists[index],
  }))

  return (
    <div className='flex flex-col'>
      <TopHero />
      <main className='container space-y-20 md:space-y-32'>
        <ServiceSection />
        <section>
          <h2 className="text-2xl md:text-5xl font-bold text-center">Updates</h2>
          <Link href="/updates" className="w-fit ml-auto flex gap-2 items-center border-b border-gray-600 mt-4">
            すべて見る<ArrowRight width={16} height={16} />
          </Link>
          <div className='p-4 md:py-8 md:px-16 mt-5 border rounded-2xl bg-white'>
            <ul className='list-none flex flex-col gap-3'>
              {updatesArticleListData.contents.map((article) => (
                <li key={article.id} className="">
                  <Link href={`/blog/${article.category.id}/${article.id}`} className="block">
                    {/* <div className="flex flex-col gap-2"> */}
                      <div className="md:flex items-center gap-4">
                        {article.publishedAt && (
                          <time className="text-sm md:text-md w-30 text-slate-500" dateTime={article.publishedAt}>
                            {formatDate(article.publishedAt)}
                          </time>
                        )}
                        <h2 className="md:text-lg font-semibold text-slate-900">{article.title}</h2>
                      </div>
                    {/* </div> */}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="mt-10">
          <h2 className="text-2xl md:text-5xl font-bold text-center">Blog</h2>
          <div className="space-y-20 mt-8">
            {categorySections.map((category) => (
              <CategorySection
                key={category.id}
                id={category.id}
                title={category.name}
                articleListData={category.articles}
              />
            ))}
          </div>
        </section>
        <section className="rounded-2xl bg-slate-900 px-6 py-12 md:py-16 text-center text-white">
          <h2 className="text-2xl md:text-4xl font-bold">Recruit</h2>
          <p className="mt-4 text-sm md:text-base text-slate-300">
            私たちと一緒に新しい価値を創造する仲間を募集しています。
          </p>
          <Link href="/recruit" className="btn-secondary mt-8">
            採用情報を見る<ArrowRight width={16} height={16} className="inline ml-2" />
          </Link>
        </section>
      </main>
    </div>
  )
}
