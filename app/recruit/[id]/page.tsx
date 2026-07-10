import { client } from "@/lib/microcms-client"
import Link from "next/link"

export async function generateStaticParams() {
  const data = await client.getList({
    endpoint: 'recruitments',
    queries: { limit: 100 },
  })

  return data.contents.map((job) => ({
    id: job.id,
  }))
}

export default async function JobDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const job = await client.get({
    endpoint: 'recruitments',
    contentId: id,
  })

  return (
    <main className="container">
      <div className="bg-white px-4 py-8 md:px-10 md:py-12 rounded-2xl">
        <h1 className="page-title">{job.jobTitle}</h1>
        <hr />
        <h2 className="heading2 mt-8">業務内容</h2>
        <div className="prose mt-4" dangerouslySetInnerHTML={{ __html: job.jobDescription }} />
        <h2 className="heading2 mt-8">応募資格</h2>
        <div className="prose mt-4" dangerouslySetInnerHTML={{ __html: job.requirements }} />
        <h2 className="heading2 mt-8">給与</h2>
        <p className="mt-4">{job.salary}</p>
        <h2 className="heading2 mt-8">雇用形態</h2>
        <p className="mt-4">{job.employmentType}</p>
        <h2 className="heading2 mt-8">出社/リモートワーク</h2>
        <p className="mt-4">{job.remoteWork}</p>
      </div>
      <div className="my-8">
        <Link href="/recruit" className="btn-primary">
          募集職種一覧に戻る
        </Link>
      </div>
    </main>
  )
}