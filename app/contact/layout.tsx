import type { Metadata } from "next";
import { SITE_NAME } from "@/constants";

// contact/page.tsx は "use client" のため metadata を export できない。
// メタデータはサーバーコンポーネントである layout に置く。
const title = "Contact";
const description = "お問い合わせはこちらのフォームよりお願いいたします。";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description,
    url: "/contact",
  },
  twitter: {
    title: `${title} | ${SITE_NAME}`,
    description,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
