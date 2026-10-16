import type { Metadata } from "next"
import Link from "next/link"

import { InlineContactForm } from "@/components/inline-contact-form"
import { Reveal } from "@/components/reveal"
import { BRAND } from "@/lib/brand"
import { OFFER } from "@/lib/offer"

export const metadata: Metadata = {
  title: `Support and Content Edits | ${BRAND.short}`,
  description: "Content edits in 2 to 3 business days, plus hosting, SSL, and technical support for every active site.",
  openGraph: {
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Ghostwright Web Development. Websites built under your name." }],
    title: `Support and Content Edits | ${BRAND.short}`,
    description: "Content edits in 2 to 3 business days, plus hosting, SSL, and technical support for every active site.",
  },
}

export default function SupportPage() {
  return (
    <div className="w-full">
      <div className="flex flex-col min-h-screen max-w-7xl mx-auto px-6 md:px-12">
        <section className="container py-20 md:py-28">
          <Reveal as="div" className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">
              Support and content edits
            </h1>
          </Reveal>
        </section>

        <section className="container pb-16">
          <div className="max-w-3xl mx-auto space-y-12">
            <Reveal as="div">
              <h2 className="text-2xl font-bold mb-4">Included with every active site</h2>
              <p className="text-muted-foreground leading-relaxed">
                Hosting, SSL, infrastructure, technical support, and content edits.
              </p>
            </Reveal>

            <Reveal as="div">
              <h2 className="text-2xl font-bold mb-4">Content edits</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Content edits are changes to text, images, hours, service areas, and contact information.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Content edits are usually done in {OFFER.editTurnaround}.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Simple tracking tags, like Google Ads, Google Analytics, or a Meta Pixel, are included.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Requests come from your authorized contacts. With the web-team option, your client can send them to your team&apos;s address.
              </p>
            </Reveal>

            <Reveal as="div">
              <h2 className="text-2xl font-bold mb-4">Contact forms</h2>
              <p className="text-muted-foreground leading-relaxed">
                Every contact form uses EmailJS. Your client owns the EmailJS account, and we help set it up. It has
                free and paid plans, and your client is responsible for the plan and its limits. If a form stops
                working, tell us right away.
              </p>
            </Reveal>

            <Reveal as="div">
              <h2 className="text-2xl font-bold mb-4">Quoted separately</h2>
              <p className="text-muted-foreground leading-relaxed">
                New major service pages, new features and integrations, redesigns.
              </p>
            </Reveal>

            <Reveal as="div">
              <h2 className="text-2xl font-bold mb-4">Uptime</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use commercially reasonable efforts to keep every site online. We don&apos;t guarantee uptime.
              </p>
            </Reveal>

            <p className="text-sm text-muted-foreground">
              Looking for revisions during the build? See{" "}
              <Link href="/how-it-works" className="text-primary hover:underline">
                How It Works
              </Link>
              .
            </p>
          </div>
        </section>

        <InlineContactForm />
      </div>
    </div>
  )
}
