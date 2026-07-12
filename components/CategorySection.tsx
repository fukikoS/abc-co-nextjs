import Link from 'next/link'
import ArticlesList from './ArticlesList'
import type { BlogListResponse } from '@/lib/cms-types'
import { ArrowRight } from 'lucide-react'

interface CategorySectionProps {
  id: string
  title: string
  articleListData: BlogListResponse
}

export default function CategorySection({ id, title, articleListData }: CategorySectionProps) {
  return (
    <section>
      <div className="flex justify-between items-center mb-5">
        <h3 className="heading3">{title}</h3>
        <Link href={`/blog/${id}`} className="flex gap-2 items-center border-b border-gray-600">
          すべて見る<ArrowRight width={16} height={16} />
        </Link>
      </div>
      <ArticlesList articleListData={articleListData} />
    </section>
  )
}
