import { client } from "@/lib/microcms-client";
import { notFound } from "next/navigation";
import styles from '../legal.module.css'

type PrivacyPolicyPageData = {
  privacy_policy?: string;
  contents?: Array<{
    privacy_policy?: string;
  }>;
};

export default async function PrivacyPolicyPage() {
  const data = (await client.get({
    endpoint: "pages",
  })) as PrivacyPolicyPageData;

  const content = data.privacy_policy ?? data.contents?.[0]?.privacy_policy;

  if (!content) {
    notFound();
  }

  return (
    <main className={`${styles.legal} mx-auto w-full max-w-4xl px-4 py-10`}>
      <article className="prose prose-neutral max-w-none dark:prose-invert">
        <h1>Privacy Policy</h1>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    </main>
  );
}