import { createClient } from 'microcms-js-sdk';
import type { Category, Job } from './cms-types';

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY!,
});

// 表示対象から除外するカテゴリ（「お知らせ」など）
const EXCLUDED_CATEGORY_IDS = ['updates'];

// /blog の一覧から除外カテゴリを取り除くための microCMS filters 文字列
// （お知らせは /updates で表示するため）
export const EXCLUDED_CATEGORIES_FILTER = EXCLUDED_CATEGORY_IDS
  .map((id) => `category[not_equals]${id}`)
  .join('[and]');

// カテゴリ一覧を取得する共通関数
// categories エンドポイントから取得し、除外対象を取り除いて返す
export async function getCategories(): Promise<Category[]> {
  try {
    const data = await client.getList<Category>({
      endpoint: 'categories',
      queries: { limit: 100 },
    });
    return data.contents.filter(
      (category) => !EXCLUDED_CATEGORY_IDS.includes(category.id),
    );
  } catch (error) {
    console.error('Failed to load categories:', error);
    return [];
  }
}

// 募集職種一覧（recruitments）を取得する共通関数
export async function getRecruitments(): Promise<Job[]> {
  try {
    const data = await client.getList<Job>({
      endpoint: 'recruitments',
      queries: { limit: 100 },
    });
    return data.contents;
  } catch (error) {
    console.error('Failed to load recruitments:', error);
    return [];
  }
}