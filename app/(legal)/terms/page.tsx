import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SITE_NAME } from "@/constants";
import PageTitle from "@/components/PageTitle";

const title = "利用規約";
const description = `${SITE_NAME}の利用規約です。`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description,
    url: "/terms",
    images: [{ url: "/ogp-blue.png", width: 1200, height: 630 }],
  },
  twitter: {
    title: `${title} | ${SITE_NAME}`,
    description,
    images: ["/ogp-blue.png"],
  },
};


export default async function Page() {


  return (
    <main className="container mx-auto w-full max-w-4xl px-4 py-10">
      <PageTitle en="Terms of Service" ja="利用規約" />
      <article className="prose bg-white p-6 md:px-10 md:py-12 rounded-2xl prose-neutral max-w-none">
        <p>
          本サイトはポートフォリオ掲載用に制作した架空のコーポレートサイトです。記載されている会社情報、サービス内容、各種規約はすべてデモ・サンプルとして作成したものであり、実在の企業・団体・サービスとは関係ありません。
        </p>
        <p>
          このページはデザインおよびページ構成の再現を目的としたサンプルです。実際の利用規約としての効力はなく、いかなる契約条件も定めるものではありません。
        </p>
      </article>
    </main>
  );
}