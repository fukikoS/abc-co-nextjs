import Link from "next/link"

import { client } from "@/lib/microcms-client"
import type { BlogCategory, BlogListResponse } from "@/lib/blog-types"

export default async function Navbar() {
  const data = (await client.get({
    endpoint: "blogs",
    queries: { limit: 100 },
  })) as unknown as BlogListResponse

  // `article.category.id` を元に、カテゴリを重複なく取り出す
  const categories: BlogCategory[] = Array.from(
    new Map(data.contents.map((article) => [article.category.id, article.category]))
      .values()
  )

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-base font-semibold">
          News Site
        </Link>

        <nav aria-label="カテゴリナビ" className="flex items-center gap-4 text-sm">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/${category.id}`}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {category.name ?? category.id}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
