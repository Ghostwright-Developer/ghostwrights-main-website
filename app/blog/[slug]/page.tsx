import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getSeoPost } from "notfair-nextjs-blog"
import { NotFairPostHero } from "notfair-nextjs-blog/react"
import { sanitizeNotFairArticleHtml } from "@/src/lib/notfair-article"
import styles from "../notfair-article.module.css"
import { BRAND } from "@/lib/brand"

export const revalidate = 3600

type BlogPostProps = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params
  let post = null
  try {
    post = await getSeoPost(slug, { revalidate })
  } catch {
    post = null
  }
  if (!post) return { title: `Article not found | ${BRAND.short}` }
  return { title: `${post.title} | ${BRAND.short}`, description: post.meta_description ?? undefined, openGraph: { title: post.title, description: post.meta_description ?? undefined, images: [post.image_url] } }
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params
  let post = null
  try {
    post = await getSeoPost(slug, { revalidate })
  } catch {
    post = null
  }
  if (!post) notFound()

  return (
    <main className="flex-1">
        <article className="container mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-20">
          <NotFairPostHero post={post} className="mb-10" titleClassName="font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl" sizes="(max-width: 768px) 100vw, 960px" />
          <div className="mx-auto max-w-3xl">
            <div className={styles.articleContent} dangerouslySetInnerHTML={{ __html: sanitizeNotFairArticleHtml(post.content_html) }} />
          </div>
        </article>
    </main>
  )
}
