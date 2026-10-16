import type { Metadata } from "next"
import Link from "next/link"

import { InlineContactForm } from "@/components/inline-contact-form"
import { Reveal } from "@/components/reveal"
import { BRAND } from "@/lib/brand"

export const metadata: Metadata = {
  title: `Cancellation and Ownership | ${BRAND.short}`,
  description: "Cancel any site anytime. Clients keep their domain and content, Ghostwright keeps the source code, and a buyout is available.",
  openGraph: {
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Ghostwright Web Development. Websites built under your name." }],
    title: `Cancellation and Ownership | ${BRAND.short}`,
    description: "Cancel any site anytime. Clients keep their domain and content, Ghostwright keeps the source code, and a buyout is available.",
  },
}

export default function CancellationPage() {
  return (
    <div className="w-full">
      <div className="flex flex-col min-h-screen max-w-7xl mx-auto px-6 md:px-12">
        <section className="container py-20 md:py-28">
          <Reveal as="div" className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">
              Cancellation and ownership
            </h1>
          </Reveal>
        </section>

        <section className="container pb-20">
          <div className="max-w-3xl mx-auto space-y-12">
            <Reveal as="div">
              <h2 className="text-2xl font-bold mb-4">Cancel any site anytime</h2>
              <p className="text-muted-foreground leading-relaxed">
                Send written notice. Cancellation takes effect at the end of that calendar month. The site stays
                online through that day, then goes offline. It isn&apos;t invoiced for later months. The current
                month has already been invoiced and isn&apos;t refunded. Setup fees aren&apos;t refunded.
              </p>
            </Reveal>

            <Reveal as="div">
              <h2 className="text-2xl font-bold mb-4">What your client keeps</h2>
              <p className="text-muted-foreground leading-relaxed">Their domain and their own content.</p>
            </Reveal>

            <Reveal as="div">
              <h2 className="text-2xl font-bold mb-4">What {BRAND.short} keeps</h2>
              <p className="text-muted-foreground leading-relaxed">
                The source code. After cancellation we keep a backup for 45 days (or until a buyout is delivered),
                then remove your client&apos;s identifying content from our retained copy.
              </p>
            </Reveal>

            <Reveal as="div">
              <h2 className="text-2xl font-bold mb-4">Buying the source code</h2>
              <p className="text-muted-foreground leading-relaxed">
                You can buy a site&apos;s source code for $3,000 per site while the site is active. For a cancelled
                site, you have 30 days from your cancellation notice to complete the buyout. Buying the code
                doesn&apos;t cancel hosting; you cancel separately. Pricing and steps are in your{" "}
                <Link href="/partner-service-agreement" className="text-primary hover:underline">
                  Partner Service Agreement
                </Link>
                .
              </p>
            </Reveal>

            <Reveal as="div">
              <h2 className="text-2xl font-bold mb-4">Ending the partnership</h2>
              <p className="text-muted-foreground leading-relaxed">
                You can end the Partner Service Agreement on 30 days&apos; written notice.
              </p>
            </Reveal>
          </div>
        </section>

        <InlineContactForm />
      </div>
    </div>
  )
}
