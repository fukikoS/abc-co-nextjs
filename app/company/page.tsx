import type { Metadata } from "next";
import { SITE_NAME } from "@/constants";
import PageTitle from "@/components/PageTitle";

const title = "Company";
const description = "会社情報や沿革、アクセス情報などを掲載しています。";

export const metadata: Metadata = {
  // ルートレイアウトの template により最終的に「会社概要 | ABC Co.」になる
  title,
  description,
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description,
    url: "/company",
  },
  twitter: {
    title: `${title} | ${SITE_NAME}`,
    description,
  },
};

export default async function Page() {

  return (
    <main className="container">
      <PageTitle en="Company" ja="会社概要" />
      <div className="space-y-10 md:space-y-16 mt-8 bg-white p-6 md:px-10 md:py-12 rounded-2xl">
        <section>
          <dl className="space-y-4">
            <div className="md:flex md:gap-8">
              <dt className="md:w-32 md:shrink-0 font-semibold">会社名</dt>
              <dd>ABC Co.</dd>
            </div>
            <div className="md:flex md:gap-8">
              <dt className="md:w-32 md:shrink-0 font-semibold">設立</dt>
              <dd>2020年1月1日</dd>
            </div>
            <div className="md:flex md:gap-8">
              <dt className="md:w-32 md:shrink-0 font-semibold">所在地</dt>
              <dd>東京都xxxxxxxxxxx xxxxxxxx</dd>
            </div>
            <div className="md:flex md:gap-8">
              <dt className="md:w-32 md:shrink-0 font-semibold">事業内容</dt>
              <dd>ニュースサイトの運営、コンテンツ制作、広告事業</dd>
            </div>
          </dl>
        </section>

        <section className="">
          <h2 className="heading2 mb-4">沿革</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>2020年1月 - ABC Co.設立</li>
            <li>2020年3月 - ニュースサイトの運営開始</li>
            <li>2021年5月 - 広告事業を開始</li>
            <li>2022年7月 - コンテンツ制作部門を設立</li>
          </ul>
        </section>

        <section className="">
          <h2 className="heading2 mb-4">アクセス</h2>
          <p>〒XXX-XXXX 東京都xxxxxxxxxxx xxxxxxxx</p>
          <p>最寄り駅: XX駅 徒歩5分</p>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6483.495597683874!2d139.74285797570855!3d35.6585848312178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188bbd9009ec09%3A0x481a93f0d2a409dd!2z5p2x5Lqs44K_44Ov44O8!5e0!3m2!1sja!2sjp!4v1782533785083!5m2!1sja!2sjp" width="600" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="mt-4 w-full max-w-3xl mx-auto"></iframe>
        </section>
      </div>
    </main>
  );
} 
