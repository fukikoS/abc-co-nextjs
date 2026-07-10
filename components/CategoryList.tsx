import Link from "next/link";

import type { BlogCategory } from "@/lib/cms-types";

type CategoryListProps = {
  categories: BlogCategory[];
  // 現在表示中のカテゴリ id（該当リンクを強調表示する）
  activeCategory?: string;
  // 「All」リンクを表示するか
  showAll?: boolean;
};

const baseClass = "px-4 py-2 rounded";
const activeClass = "bg-[#2a65bd] text-white";
const inactiveClass = "bg-white text-gray-700";

// カテゴリへのリンク一覧を表示する共通コンポーネント
export default function CategoryList({
  categories,
  activeCategory,
  showAll = true,
}: CategoryListProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mt-10 mb-10">
      {showAll && (
        <Link
          href="/blog"
          className={`${baseClass} ${activeCategory ? inactiveClass : activeClass}`}
        >
          All
        </Link>
      )}
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/blog/${category.id}`}
          className={`${baseClass} ${
            activeCategory === category.id ? activeClass : inactiveClass
          }`}
        >
          {category.name ?? category.id}
        </Link>
      ))}
    </div>
  );
}
