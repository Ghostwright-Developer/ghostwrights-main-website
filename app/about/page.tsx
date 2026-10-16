import type { Metadata } from "next"
import Link from "next/link"

import { Target, DollarSign, Zap, Award } from "lucide-react"
import { InlineContactForm } from "@/components/inline-contact-form"
import { BRAND } from "@/lib/brand"
import { OFFER } from "@/lib/offer"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Reveal } from "@/components/reveal"

export const metadata: Metadata = {
  title: `About ${BRAND.name}`,
  description: "Ghostwright is the fulfillment team behind agency-branded contractor websites.",
  openGraph: {
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Ghostwright Web Development. Websites built under your name." }],
    title: `About ${BRAND.name}`,
    description: "Ghostwright is the fulfillment team behind agency-branded contractor websites.",
  },
}

const values = [
  {
    title: "Built from scratch",
    description: "Every site starts from zero. No templates, page builders, or reused starter code.",
    icon: Award,
  },
  {
    title: "Fair partner pricing",
    description: `$${OFFER.setupFee} setup per site, then $${OFFER.monthlyFee}/month per active site. You set the retail price and keep the spread.`,
    icon: DollarSign,
  },
  {
    title: "Speed and simplicity",
    description: `Send us the intake and greenlight the build. The first version arrives in ${OFFER.firstVersion}.`,
    icon: Zap,
  },
  {
    title: "Long-term support",
    description: "We keep every site updated, secure, and online.",
    icon: Target,
  },
]

export default function AboutPage() {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
      <div className="flex flex-col min-h-screen">
        {/* Hero */}
        <section className="container py-20 md:py-28">
          <Reveal as="div" className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">
              Built for agencies that <span className="text-primary">serve contractors</span>
            </h1>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed mt-8">
              <p>
                A ghostwriter writes under someone else&apos;s name. We build websites the same way. {BRAND.short} is
                the fulfillment team behind agency-branded websites for contractors. You sell and own the client
                relationship. We design, build, host, and maintain the site behind the scenes.
              </p>
            </div>
            <Button size="lg" className="mt-10" asChild>
              <Link href="/contact">Become a Partner</Link>
            </Button>
            <Button size="lg" variant="outline" className="mt-10 ml-4 bg-transparent" asChild>
              <Link href="/portfolio">See the Work</Link>
            </Button>
          </Reveal>
        </section>

        {/* Philosophy */}
        <section className="bg-muted/30 py-20">
          <div className="container">
            <Reveal as="h2" className="text-3xl font-bold tracking-tighter text-center mb-12 text-primary">
              Our Philosophy
            </Reveal>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <Reveal as="div" key={index} index={index}>
                  <Card className="border-border/50 bg-card/50">
                    <CardContent className="p-6 text-center">
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <value.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="container py-20 md:py-28">
          <Reveal as="div" className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tighter mb-6 text-primary">Our Mission</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              To help agencies that serve contractors add premium websites to their offer without building a web
              department.
            </p>
          </Reveal>
        </section>

        {/* CTA */}
        <section className="container pb-20">
          <Reveal as="div" className="rounded-3xl bg-gradient-to-r from-primary/20 to-secondary/20 p-8 md:p-12 text-center border border-primary/20">
            <h2 className="text-3xl font-bold mb-4">Ready to expand what you offer?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Add premium, custom-coded websites to your offer. Partner pricing is ${OFFER.setupFee} setup per site, then
              ${OFFER.monthlyFee}/month per active site.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">Become a Partner</Link>
            </Button>
          </Reveal>
        </section>

        {/* Contact Form */}
        <InlineContactForm />
      </div>
    </div>
  )
}
