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
  const slicedArticleContent = articleContent.slice(0, 100) + '...'
  return (
    <div>
      <Card>
        <CardContent>
          <Image src={article.eyecatch.url} alt={article.title} width={100} height={100} className="w-full aspect-video object-cover" />
          <CardTitle>{article.title}</CardTitle>
          <CardDescription>{slicedArticleContent}</CardDescription>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="ml-auto"><Link href={`/${article.category.id}/${article.id}`}>記事を読む</Link></Button>
        </CardFooter>
      </Card>
    </div>
  )
}
