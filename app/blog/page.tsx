import BlogLoadMoreList from "@/components/BlogLoadMoreList";
import CategoryList from "@/components/CategoryList";
import PageTitle from "@/components/PageTitle";
import { BlogArticle } from "@/lib/cms-types";
import { client, getCategories, EXCLUDED_CATEGORIES_FILTER } from "@/lib/microcms-client";
import type { Metadata } from "next";
import { SITE_NAME } from "@/constants";

const title = "Blog";
const description = "記事やコラムを一覧でお届けします。";

export const metadata: Metadata = {
  // ルートレイアウトの template により「Blog | ABC Co.」と表示される
  title,
  description,
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description,
    url: "/blog",
    images: [{ url: "/ogp-blue.png", width: 1200, height: 630 }],
  },
  twitter: {
    title: `${title} | ${SITE_NAME}`,
    description,
    images: ["/ogp-blue.png"],
  },
};


const PAGE_SIZE = 18;

export default async function Blog() {
  // 初期表示分の記事を取得（サーバーコンポーネントのまま）
  let initialArticles: BlogArticle[] = [];
  let totalCount = 0;

  try {
    const data = await client.getList<BlogArticle>({
      endpoint: "blogs",
      queries: { limit: PAGE_SIZE, offset: 0, filters: EXCLUDED_CATEGORIES_FILTER },
    });
    initialArticles = data.contents;
    totalCount = data.totalCount;
  } catch (error) {
    console.error("Failed to load articles:", error);
  }

  // カテゴリ一覧を共通関数で取得
  const categories = await getCategories();

  return (
    <main className='container'>
      <PageTitle en="Blog" ja="ブログ" />
      <CategoryList categories={categories} />
      <BlogLoadMoreList
        initialArticles={initialArticles}
        totalCount={totalCount}
        pageSize={PAGE_SIZE}
      />
    </main>
  )
}
