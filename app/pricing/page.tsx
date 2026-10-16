import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { BRAND } from "@/lib/brand"
import { OFFER } from "@/lib/offer"
import { InlineContactForm } from "@/components/inline-contact-form"
import { PartnerCalculator } from "@/components/partner-calculator"
import { Reveal } from "@/components/reveal"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: `Partner Pricing: $149 Setup, $25/Month | ${BRAND.short}`,
  description: "Pay $149 per site when you greenlight the build, then $25/month per active site once it's live. No long-term contracts.",
  openGraph: {
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Ghostwright Web Development. Websites built under your name." }],
    title: `Partner Pricing: $149 Setup, $25/Month | ${BRAND.short}`,
    description: "Pay $149 per site when you greenlight the build, then $25/month per active site once it's live. No long-term contracts.",
  },
}

const tiles = [
  { title: `$${OFFER.setupFee} Setup`, desc: "Per site. Invoiced when the intake arrives. Work starts once it's paid." },
  { title: `$${OFFER.monthlyFee}/Month`, desc: "Per active site. Starts on the 1st of the month after go-live. The launch month is free." },
  { title: "No Long-Term Contracts", desc: "Cancel any site anytime. It goes offline at the end of that month." },
  { title: `${OFFER.firstVersion}`, desc: "To the first version, from your greenlight." },
]

const checklist = [
  `$${OFFER.setupFee} setup per site`,
  `$${OFFER.monthlyFee}/month per active site`,
  "A dedicated page for each major service, with related smaller services grouped on the same page",
  "Hosting and SSL included",
  "Contact forms, set up with a free EmailJS account that your client owns",
  "Two rounds of revisions during the build",
  `Content edits are usually done in ${OFFER.editTurnaround}.`,
  "New service pages, features, integrations, and redesigns are quoted separately",
  "Designed and coded from scratch, never a template",
  "Modern design and animations",
  "SEO-ready structure",
  "Choose how hands-on you want to be, at no extra cost",
  "No long-term contracts. Cancel anytime.",
]

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen max-w-7xl mx-auto px-4">
      {/* Hero */}
      <section className="container py-20 text-center">
        <Reveal as="div">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-8">
            <span className="text-primary">Simple partner pricing</span>
          </h1>
          <p className="mt-8 text-xl text-muted-foreground max-w-2xl mx-auto">
            Pay ${OFFER.setupFee} when you greenlight each build, then ${OFFER.monthlyFee}/month per active site once it&apos;s live. You set the retail price and keep the spread.
          </p>
        </Reveal>
      </section>

      {/* Tiles */}
      <section className="container pb-8">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {tiles.map((tile, index) => (
            <Reveal as="div" key={tile.title} index={index}>
              <Card className="border-primary/50 bg-white/5">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-primary">{tile.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">{tile.desc}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Checklist */}
      <section className="container pb-20">
        <Reveal as="div" className="max-w-2xl mx-auto">
          <Card className="border-primary/40 shadow-[0_0_50px_-10px_rgba(23,158,199,0.3)]">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl text-primary mb-4">What&apos;s included</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-8 pb-8">
              <div className="grid gap-4 md:grid-cols-2">
                {checklist.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
              <Button size="lg" className="w-full h-14 mt-8 text-lg" asChild>
                <Link href="/contact">Become a Partner</Link>
              </Button>
            </CardContent>
          </Card>
        </Reveal>
      </section>

      {/* Link card to /billing */}
      <section className="container pb-20">
        <Reveal as="div" className="max-w-2xl mx-auto">
          <Link href="/billing" className="block">
            <Card className="border-primary/50 bg-white/5 transition-colors hover:border-primary">
              <CardContent className="flex items-center justify-between px-8 py-6">
                <span className="text-lg font-medium text-foreground">See exactly how billing works</span>
                <ArrowRight className="h-5 w-5 text-primary" />
              </CardContent>
            </Card>
          </Link>
        </Reveal>
      </section>

      {/* Calculator */}
      <section className="container pb-20">
        <Reveal as="div" className="max-w-4xl mx-auto">
          <PartnerCalculator />
        </Reveal>
      </section>

      <InlineContactForm />
    </div>
  )
}
