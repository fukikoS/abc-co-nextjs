"use client"

import { useMemo, useTransition } from "react"
import { useRouter, usePathname } from "next/navigation"

export default function LoadMoreButton({
  totalCount,
  pageSize,
  currentPage,
  onLoadMore,
  isLoading: externalIsLoading,
}: {
  totalCount: number
  pageSize: number
  currentPage: number
  onLoadMore?: () => void
  isLoading?: boolean
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const isLoading = externalIsLoading ?? isPending

  const canLoadMore = useMemo(
    () => currentPage * pageSize < totalCount,
    [currentPage, pageSize, totalCount],
  )

  const loadNextPage = () => {
    if (!canLoadMore || isLoading) return

    if (onLoadMore) {
      onLoadMore()
      return
    }

    startTransition(() => {
      router.push(`${pathname}?page=${currentPage + 1}`, { scroll: false })
    })
  }

  if (!canLoadMore) return null

  return (
    <div className="flex justify-center mt-0 border-t border-border px-4 py-6">
      <button
        type="button"
        className="rounded-md border border-border bg-background px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        onClick={loadNextPage}
        disabled={isLoading}
      >
        {isLoading ? "読み込み中..." : "次の記事を読み込む"}
      </button>
    </div>
  )
}

