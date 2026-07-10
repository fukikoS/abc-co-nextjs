"use server"

import { Resend } from "resend"
import { client } from "@/lib/microcms-client"

export type ContactFormState = {
  ok: boolean
  message: string
}

const resend = new Resend(process.env.RESEND_API_KEY)

// お問い合わせ内容を microCMS の「contact」エンドポイントに登録し、
// あわせて Resend 経由で運営者宛に通知メールを送信する Server Action
// API キー・サービスドメインはサーバー内に隠蔽され、ブラウザには露出しない
export async function submitContact(
  formData: FormData,
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const subject = String(formData.get("subject") ?? "").trim()
  const message = String(formData.get("message") ?? "").trim()

  if (!name || !email || !subject || !message) {
    return { ok: false, message: "入力内容に不足があります。" }
  }

  const results = await Promise.allSettled([
    client.create({
      endpoint: "contact",
      content: { name, email, subject, message },
    }),
    resend.emails.send({
      from: "ABC Co. Next <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL!,
      replyTo: email,
      subject: `【お問い合わせ】${subject}`,
      text: `お名前: ${name}\nメールアドレス: ${email}\n件名: ${subject}\n\n${message}`,
    }),
  ])

  const [cmsResult, emailResult] = results
  if (cmsResult.status === "rejected") {
    console.error("Error saving contact to microCMS:", cmsResult.reason)
  }
  if (emailResult.status === "rejected") {
    console.error("Error sending contact notification email:", emailResult.reason)
  }

  if (cmsResult.status === "rejected" && emailResult.status === "rejected") {
    return {
      ok: false,
      message: "送信に失敗しました。時間をおいて再度お試しください。",
    }
  }

  return { ok: true, message: "お問い合わせを送信しました。" }
}
