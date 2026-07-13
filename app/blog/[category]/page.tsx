import BlogLoadMoreList from "@/components/BlogLoadMoreList";
import CategoryList from "@/components/CategoryList";
import PageTitle from "@/components/PageTitle";
import { BlogArticle } from "@/lib/cms-types";
import { client, getCategories } from "@/lib/microcms-client";
import type { Metadata } from "next";
import { SITE_NAME } from "@/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category } = await params;
  const categories = await getCategories();
  const current = categories.find((c) => c.id === category);
  const name = current?.name ?? "Blog";

  const title = `${name}の記事一覧`;
  const description = `${name}に関する記事の一覧です。`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: `/blog/${category}`,
      images: [{ url: "/ogp-blue.png", width: 1200, height: 630 }],
    },
    twitter: {
      title: `${title} | ${SITE_NAME}`,
      description,
      images: ["/ogp-blue.png"],
    },
  };
}


const PAGE_SIZE = 18;

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params;

  // 初期表示分の記事をカテゴリで絞り込んで取得（サーバーコンポーネントのまま）
  let initialArticles: BlogArticle[] = [];
  let totalCount = 0;

  try {
    const data = await client.getList<BlogArticle>({
      endpoint: "blogs",
      queries: {
        limit: PAGE_SIZE,
        offset: 0,
        filters: `category[equals]${category}`,
      },
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
      <CategoryList categories={categories} activeCategory={category} />
      <BlogLoadMoreList
        initialArticles={initialArticles}
        totalCount={totalCount}
        pageSize={PAGE_SIZE}
        category={category}
      />
    </main>
  )
}
