import { getRecruitments } from "@/lib/microcms-client";
import Link from "next/dist/client/link";
import { MoveRight } from "lucide-react";
import type { Metadata } from "next";
import { SITE_NAME } from "@/constants";
import PageTitle from "@/components/PageTitle";

const title = "Recruit";
const description = `${SITE_NAME}の採用情報・募集職種をご紹介します。`;

export const metadata: Metadata = {
  // ルートレイアウトの template により「Recruit | ABC Co.」と表示される
  title,
  description,
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description,
    url: "/recruit",
  },
  twitter: {
    title: `${title} | ${SITE_NAME}`,
    description,
  },
};

export default async function Recruit() {
  // MicroCMSから募集職種一覧を取得
  const recruitments = await getRecruitments();

  return (
    <main className="container">
      <PageTitle en="Recruit" ja="採用情報" />
      <p className="mt-10 md:mt-0 text-center">ABC Co.では、情熱を持って新しい価値を創造する仲間を募集しています。</p>
      <h2 className="font-bold text-2xl md:text-3xl mt-8 md:mt-12">募集職種</h2>
      <ul className="space-y-6 mt-4 mb-20">
        {recruitments.map((recruitment) => (
          <li key={recruitment.id}>
            <Link href={`/recruit/${recruitment.id}`} className="border p-4 flex justify-between items-center gap-2 card">
              <div className="flex-1">
                <h3 className="heading3 mb-3">{recruitment.jobTitle}</h3>
                <p>{recruitment.summary}</p>
              </div>
              <span className="rounded-full bg-black text-white w-9 h-9 grid place-items-center right-4 bottom-4">
                <MoveRight width={16} height={16} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}   
