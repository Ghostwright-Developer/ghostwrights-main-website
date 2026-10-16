import type { MetadataRoute } from "next"
import { getSeoPosts } from "notfair-nextjs-blog"
import { BRAND } from "@/lib/brand"

const baseUrl = BRAND.url
const staticRoutes = [
  "/",
  "/about",
  "/services",
  "/pricing",
  "/portfolio",
  "/contact",
  "/faq",
  "/referrals",
  "/blog",
  "/intake",
  "/partner-service-agreement",
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let posts: Array<{ slug: string; updated_at?: string }> = []
  try {
    posts = await getSeoPosts({ revalidate: 3600 })
  } catch {
    posts = []
  }

  return [
    ...staticRoutes.map((route) => ({ url: `${baseUrl}${route}/`, changeFrequency: "monthly" as const, priority: route === "/" ? 1 : 0.7 })),
    ...posts.map((post) => ({ url: `${baseUrl}/blog/${post.slug}/`, changeFrequency: "weekly" as const, priority: 0.8, ...(post.updated_at ? { lastModified: post.updated_at } : {}) })),
  ]
}
