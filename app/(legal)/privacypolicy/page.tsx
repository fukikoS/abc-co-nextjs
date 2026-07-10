import type { Metadata } from "next";
import { SITE_NAME } from "@/constants";
import PageTitle from "@/components/PageTitle";

const title = "プライバシーポリシー";
const description = `${SITE_NAME}のプライバシーポリシーです。`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description,
    url: "/privacypolicy",
  },
  twitter: {
    title: `${title} | ${SITE_NAME}`,
    description,
  },
};

export default async function Page() {


  return (
    <main className="container mx-auto w-full max-w-4xl px-4 py-10">
      <PageTitle en="Privacy Policy" ja="プライバシーポリシー" />
      <article className="prose bg-white mt-8 p-6 md:px-10 md:py-12 rounded-2xl prose-neutral max-w-none">
        <p>
          本サイトはポートフォリオ掲載用に制作した架空のコーポレートサイトです。記載されている会社情報、サービス内容はすべてデモ・サンプルとして作成したものであり、実在の企業・団体・サービスとは関係ありません。
        </p>
        <hr />
        <h2>お問い合わせフォームで送信される情報について</h2>
        <p>
          お問い合わせフォームから送信された内容は、コンテンツ管理サービスとして利用している microCMS に登録されるとともに、メール配信サービスの Resend を通じてサイト管理者宛に通知メールが送信されます。
        </p>
        <p>
          送信される主な項目は、お名前、メールアドレス、件名、お問い合わせ内容です。これらの情報は、フォーム動作確認および受信内容の確認のためにのみ利用し、個別の返信は行いません。
        </p>
        <p>
          これらの情報の管理責任は本サイト運営者にあり、microCMS はデータの保存先として、Resend はメール配信の基盤としてそれぞれ利用しています。参考情報として、各サービスのプライバシーポリシー（<a href="https://microcms.io/policy/" target="_blank" rel="noopener noreferrer">microCMS</a> / <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Resend</a>）、および microCMS の<a href="https://microcms.io/security-policy/" target="_blank" rel="noopener noreferrer">情報セキュリティ方針</a>もあわせてご確認いただけます。
        </p>
      </article>
    </main>
  );
}
