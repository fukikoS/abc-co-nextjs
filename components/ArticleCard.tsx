// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardTitle,
// } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import type { BlogArticle } from "@/lib/cms-types"
import defaultEyecatch from "@/public/img/image1.png"

export default function ArticleCard({ article, displayDate = false }: { article: BlogArticle; displayDate?: boolean }) {
  const articleDescription = (article.description ?? '').replace(/<[^>]*>?/g, '')
  const slicedArticleDescription = articleDescription
    ? articleDescription.slice(0, 80) + '...'
    : ''
  return (
    <div className="card h-full flex flex-col justify-between p-0! gap-4">
      <Link href={`/blog/${article.category.id}/${article.id}`}>
        <Image
          src={
            article.eyecatch && article.eyecatch.url
              ? article.eyecatch.url
              : defaultEyecatch
          }
          alt={article.title}
          width={100}
          height={100}
          className="w-full aspect-video object-cover rounded-t-lg"
        />
        <div className="p-5">
          <p className="text-line2 font-bold">{article.title}</p>
          <p className="mt-3 text-sm md:text-base">{slicedArticleDescription}</p>
          {displayDate && article.publishedAt && (
            <p className="text-sm text-muted-foreground mt-2">
              {new Date(article.publishedAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </Link>
    </div>
  )
}
