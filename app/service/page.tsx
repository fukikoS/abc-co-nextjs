import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/constants";
import PageTitle from "@/components/PageTitle";

const title = "Service";
const description = "ニュースサイトの運営・コンテンツ制作・広告事業の3つの柱でメディアの価値を提供します。";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description,
    url: "/service",
  },
  twitter: {
    title: `${title} | ${SITE_NAME}`,
    description,
  },
};

type Service = {
  number: string;
  en: string;
  ja: string;
  description: string;
  features: string[];
};

const services: Service[] = [
  {
    number: "01",
    en: "News Site Operation",
    ja: "ニュースサイトの運営",
    description:
      "政治・経済・社会・テクノロジーなど幅広い分野の最新情報を、迅速かつ正確に届けるニュースサイトを運営しています。独自の取材ネットワークと経験豊富な編集チームが、読者にとって本当に価値ある情報を日々発信し続けています。",
    features: ["24時間リアルタイム更新", "独自取材・調査報道", "マルチデバイス対応"],
  },
  {
    number: "02",
    en: "Content Production",
    ja: "コンテンツ制作",
    description:
      "企業・団体のブランド価値を高めるオリジナルコンテンツを制作します。記事・動画・インフォグラフィックなど多様なフォーマットに対応し、ターゲット読者に刺さるストーリーを設計から公開まで一貫してサポートします。",
    features: ["記事・コラム執筆", "動画コンテンツ制作", "インフォグラフィック作成"],
  },
  {
    number: "03",
    en: "Advertising Business",
    ja: "広告事業",
    description:
      "ニュースサイトの高品質な読者基盤を活かした広告ソリューションを提供します。バナー広告からタイアップ記事、メールマガジン広告まで、クライアントの目標に合わせた最適なプランをご提案します。",
    features: ["バナー・ディスプレイ広告", "タイアップ記事広告", "メールマガジン広告"],
  },
];

export default function Page() {
  return (
    <main className="container">
      <PageTitle en="Service" ja="サービス紹介" />

      {/* リード文 */}
      {/* <div className="bg-white rounded-2xl px-6 py-8 md:px-10 md:py-10 mb-8 text-center"> */}
        <p className="leading-relaxed max-w-2xl mt-10 md:mt-0 mx-auto text-center">
          私たちは「信頼できる情報を、すべての人へ」をミッションに、ニュースメディアを核とした3つの事業を展開しています。
          それぞれの強みを掛け合わせ、パートナーとともに情報社会の発展に貢献します。
        </p>
      {/* </div> */}

      {/* サービス一覧 */}
      <div className="space-y-8 mt-6">
        {services.map((service) => (
          <div
            key={service.number}
            className="bg-white rounded-2xl p-6 md:px-10 md:py-10"
          >
            <div className="md:flex md:gap-10">
              {/* 番号 */}
              <div className="mb-4 md:mb-0 md:shrink-0">
                <span
                  className="font-josefin block font-bold text-6xl leading-none text-blue-100 tracking-[0.05em]"
                  aria-hidden="true"
                >
                  {service.number}
                </span>
              </div>

              {/* 本文 */}
              <div className="flex-1">
                <p className="font-josefin text-xs tracking-widest text-slate-400 mb-1">
                  {service.en}
                </p>
                <h2 className="text-2xl md:text-4xl font-bold text-slate-800 mb-4">{service.ja}</h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* 特徴リスト */}
                <ul className="flex flex-wrap gap-2 md:gap-6">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-slate-700"
                    >
                      <span
                        className="inline-block w-2 h-2 rounded-full shrink-0 leading-none"
                        style={{ background: "linear-gradient(135deg, #468dfe, #9ac0fe)" }}
                        aria-hidden="true"
                      />
                      <span className="leading-none">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTAセクション */}
      <div className="mt-10 bg-white rounded-2xl px-6 py-10 md:px-10 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">お気軽にご相談ください</h2>
        <p className="text-slate-600 mb-6">
          サービスの詳細や料金など、まずはお問い合わせフォームよりご連絡ください。
        </p>
        <Link href="/contact" className="btn-primary">
          お問い合わせ
        </Link>
      </div>
    </main>
  );
}
