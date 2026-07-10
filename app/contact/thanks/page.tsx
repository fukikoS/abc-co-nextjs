import Link from "next/link"
import PageTitle from "@/components/PageTitle"

export default function Page() {
  return (
    <main className="container">
      <div className="bg-white p-6 md:px-10 md:py-12 rounded-2xl mt-8 flex flex-col gap-6 items-center text-center">
        <PageTitle en="Thank You" ja="送信が完了しました" />
        <p className="text-sm text-gray-700 leading-relaxed">
          お問い合わせいただきありがとうございます。
          <br />
          内容を確認のうえ、担当者より折り返しご連絡いたします。
        </p>
        <Link href="/" className="btn-primary">
          トップへ戻る
        </Link>
      </div>
    </main>
  )
}
