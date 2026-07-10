import type { MicroCMSListResponse, MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk"

export interface BlogCategory {
  id: string
  name?: string
}

export interface BlogEyecatch {
  url: string
}

export interface BlogArticle extends MicroCMSContentId, MicroCMSDate {
  description?: string
  title: string
  content: string
  category: BlogCategory
  eyecatch: BlogEyecatch
}

export type BlogListResponse = MicroCMSListResponse<BlogArticle>

export interface Category {
  id: string
  name: string
}

export interface Job {
  id: string
  jobTitle: string
  summary: string
  jobDescription: string
  requirements: string
  salary: string
  employmentType: string
  remoteWork: string
}