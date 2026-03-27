import { client } from "@/lib/microcms-client";
import { notFound } from "next/navigation";
import styles from '../legal.module.css'

type TermsPageData = {
  terms?: string;
  contents?: Array<{
    terms: string;
  }>;
};

export default async function TermsPage() {
  const data = (await client.get({
    endpoint: "pages",
  })) as TermsPageData;

  const content = data.terms ?? data.contents?.[0]?.terms;

  if (!content) {
    notFound();
  }

  return (
    <main className={`${styles.legal} mx-auto w-full max-w-4xl px-4 py-10`}>
      <article className="prose prose-neutral max-w-none dark:prose-invert">
        <h1>利用規約</h1>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    </main>
  );
}