"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function UpdatesPagination({
  currentPage,
  totalPages,
}: {
  currentPage: number
  totalPages: number
}) {
  const searchParams = useSearchParams()
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  // 表示するページ番号を計算（前後3ページまで表示）
  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...")
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots.filter((page, idx, self) => self.indexOf(page) === idx)
  }

  return (
    <nav className="flex gap-1 justify-center mt-8 flex-wrap">
      {currentPage > 1 && (
        <Link
          href={`?page=${currentPage - 1}`}
          className="px-3 py-2 border border-border rounded-md hover:bg-muted transition-colors"
        >
          ← 前へ
        </Link>
      )}

      {getVisiblePages().map((page) => {
        if (page === "...") {
          return (
            <span key={`dots-${page}`} className="px-2 py-2">
              {page}
            </span>
          )
        }

        const pageNum = page as number
        const isActive = currentPage === pageNum

        return (
          <Link
            key={pageNum}
            href={`?page=${pageNum}`}
            className={`px-3 py-2 border rounded-md transition-colors ${
              isActive
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border hover:bg-muted"
            }`}
          >
            {pageNum}
          </Link>
        )
      })}

      {currentPage < totalPages && (
        <Link
          href={`?page=${currentPage + 1}`}
          className="px-3 py-2 border border-border rounded-md hover:bg-muted transition-colors"
        >
          次へ →
        </Link>
      )}
    </nav>
  )
}
