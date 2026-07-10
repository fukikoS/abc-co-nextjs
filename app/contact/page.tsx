"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { submitContact } from "./actions"
import PageTitle from "@/components/PageTitle"
import Link from "next/dist/client/link"

export default function Page() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)

  // フォーム送信を Server Action 経由で microCMS の「contact」へ登録する
  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    setSubmitting(true)
    try {
      const result = await submitContact(formData)
      if (result.ok) {
        form.reset()
        router.push("/contact/thanks")
        return
      }
      alert(result.message)
    } catch (error) {
      console.error("Error submitting contact form:", error)
      alert("送信中にエラーが発生しました。時間をおいて再度お試しください。")
    } finally {
      setSubmitting(false)
    }
  }


  return (
    <main className="container">
      <PageTitle en="Contact" ja="お問い合わせ" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-white p-6 md:px-10 md:py-12 rounded-2xl mt-8">

        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            お名前 <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="山田 太郎"
            required
            autoComplete="name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            メールアドレス <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="example@email.com"
            required
            autoComplete="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="subject" className="text-sm font-medium text-gray-700">
            件名 <span className="text-red-500">*</span>
          </label>
          <input
            id="subject"
            type="text"
            name="subject"
            placeholder="お問い合わせの件名"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="message" className="text-sm font-medium text-gray-700">
            お問い合わせ内容 <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="お問い合わせ内容をご記入ください"
            required
            rows={8}
            maxLength={1000}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition resize-none"
          ></textarea>
        </div>
        <p className="text-xs text-gray-500 text-center">
          送信前に<Link href="/privacypolicy" className="hover:text-gray-400 transition underline">プライバシーポリシー</Link>をご確認ください。
        </p>

        <div>
          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? "送信中..." : "送信する"}
          </button>
        </div>

      </form>
    </main>
  )
}