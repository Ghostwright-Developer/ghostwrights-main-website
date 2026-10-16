import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { getSeoPosts } from "notfair-nextjs-blog"
import { Reveal } from "@/components/reveal"
import { BRAND } from "@/lib/brand"
export const revalidate = 3600

export const metadata: Metadata = {
  title: `${BRAND.short} Blog | Website Growth Insights`,
  description: "Practical website, SEO, and conversion insights for service-based businesses.",
}

export default async function BlogIndex() {
  let posts = []
  try {
    posts = await getSeoPosts({ revalidate })
  } catch {
    // Keep the public site buildable when the hosting environment has not populated the key yet.
    posts = []
  }

  return (
    <main className="flex-1">
        <section className="border-b border-border/40 bg-gradient-to-b from-primary/10 to-transparent">
          <Reveal as="div" className="container mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">{BRAND.short} insights</p>
            <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Ideas that help your business <span className="text-primary">get noticed.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Clear guidance on websites, search visibility, and turning more visitors into clients.
            </p>
          </Reveal>
        </section>
        <section className="container mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          {posts.length === 0 ? (
            <p className="text-muted-foreground">New articles are on the way.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <Reveal as="article" key={post.slug} index={index} className="card-surface group overflow-hidden">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <Image src={post.image_url} alt={post.title} width={1600} height={900} className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="p-6">
                      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                        {post.reading_time_minutes ? `${post.reading_time_minutes} min read` : `${BRAND.short} SEO`}
                      </p>
                      <h2 className="text-xl font-bold leading-tight text-foreground transition-colors group-hover:text-primary">{post.title}</h2>
                      {post.meta_description && <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{post.meta_description}</p>}
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </section>
    </main>
  )
}
