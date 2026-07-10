import Link from "next/link"
import { ArrowRight } from "lucide-react"

const services = [
  {
    number: "01",
    en: "News Site Operation",
    ja: "ニュースサイトの運営",
    description: "政治・経済・社会・テクノロジーなど幅広い分野の最新情報を、迅速かつ正確に届けるニュースサイトを運営しています。",
  },
  {
    number: "02",
    en: "Content Production",
    ja: "コンテンツ制作",
    description: "企業・団体のブランド価値を高めるオリジナルコンテンツを、記事・動画・インフォグラフィックなど多様なフォーマットで制作します。",
  },
  {
    number: "03",
    en: "Advertising Business",
    ja: "広告事業",
    description: "ニュースサイトの高品質な読者基盤を活かし、バナー広告からタイアップ記事まで最適な広告ソリューションを提供します。",
  },
]

export default function ServiceSection() {
  return (
    <section>
      <h2 className="text-2xl md:text-5xl text-center font-bold">Service</h2>
      <Link href="/service" className="w-fit ml-auto flex gap-2 items-center border-b border-gray-600">
        詳しく見る<ArrowRight width={16} height={16} />
      </Link>
      <ul className="mt-5 grid gap-4 sm:grid-cols-3">
        {services.map((service) => (
          <li key={service.number} className="bg-white rounded-2xl p-6 flex flex-col gap-3">
            <span
              className="font-josefin block font-bold text-5xl leading-none text-blue-100 tracking-[0.05em]"
              aria-hidden="true"
            >
              {service.number}
            </span>
            <div>
              <p className="font-josefin text-xs tracking-widest text-slate-400">{service.en}</p>
              <h3 className="font-bold text-lg text-slate-800 mt-0.5">{service.ja}</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{service.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
