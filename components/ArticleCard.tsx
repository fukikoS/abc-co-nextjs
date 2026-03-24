import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import type { BlogArticle } from "@/lib/blog-types"

export default function ArticleCard({ article }: { article: BlogArticle }) {
  const articleContent = article.content.replace(/<[^>]*>?/g, '')
  const slicedArticleContent = articleContent.slice(0, 80) + '...'
  return (
    <Card className="h-full flex flex-col justify-between p-0 gap-4">
      <CardContent className="p-0 rounded-t-xl">
        <Image
          src={article.eyecatch && article.eyecatch.url ? article.eyecatch.url : require("@/public/img/image1.png")}
          alt={article.title}
          width={100}
          height={100}
          className="w-full aspect-video object-cover rounded-t-xl"
        />
        <div className="px-5">
          <CardTitle className="mt-4 text-line2">{article.title}</CardTitle>
          <CardDescription className="mt-3">{slicedArticleContent}</CardDescription>
        </div>
      </CardContent>
      <CardFooter className="pb-4">
        <Button variant="outline" className="ml-auto"><Link href={`/${article.category.id}/${article.id}`}>記事を読む</Link></Button>
      </CardFooter>
    </Card>
  )
}
