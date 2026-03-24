import Link from "next/link"

import { client } from "@/lib/microcms-client"
import type { BlogCategory, BlogListResponse } from "@/lib/blog-types"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

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

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="w-40">
                {categories.map((category) => (
                  <li key={category.id} className="w-full">
                    <Link
                      href={`/${category.id}`}
                      className="text-muted-foreground transition-colors hover:text-foreground w-full"
                    >
                      {category.name ?? category.id}
                    </Link>
                  </li>
                ))}

                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/docs">Docs</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
            

      </div>
    </header>
  )
}

// function ListItem({
//   title,
//   children,
//   href,
//   ...props
// }: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
//   return (
//     <li {...props}>
//       <NavigationMenuLink asChild>
//         <Link href={href}>
//           <div className="flex flex-col gap-1 text-sm">
//             <div className="leading-none font-medium">{title}</div>
//             <div className="line-clamp-2 text-muted-foreground">{children}</div>
//           </div>
//         </Link>
//       </NavigationMenuLink>
//     </li>
//   )
// }
