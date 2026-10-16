import type { Metadata } from "next"
import Link from "next/link"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { InlineContactForm } from "@/components/inline-contact-form"
import { Reveal } from "@/components/reveal"
import { BRAND } from "@/lib/brand"
import { OFFER } from "@/lib/offer"

export const metadata: Metadata = {
  title: `Websites for Your New Contractor Clients | ${BRAND.short}`,
  description: "Add a white-label website service for the contractors you insure. You sell and bill it; Ghostwright builds and maintains it.",
  openGraph: {
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Ghostwright Web Development. Websites built under your name." }],
    title: `Websites for Your New Contractor Clients | ${BRAND.short}`,
    description: "Add a white-label website service for the contractors you insure. You sell and bill it; Ghostwright builds and maintains it.",
  },
}

const steps = [
  {
    title: "You offer the website",
    description: "Present it as your service, at the price you set.",
  },
  {
    title: "Your client completes a short intake",
    description: "A short form for their trade, on a subdomain of your website. About 10 minutes.",
  },
  {
    title: "We build and maintain it under your brand",
    description: `First version in ${OFFER.firstVersion} from your greenlight. You bill your client and keep the spread.`,
  },
]

export default function ForInsuranceAgenciesPage() {
  return (
    <div className="w-full">
      <div className="flex flex-col min-h-screen max-w-7xl mx-auto px-6 md:px-12">
        <section className="container py-20 md:py-28">
          <Reveal as="div" className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6 text-balance">
              The moment a new contractor is insured, they need a website.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Your contractor clients are getting licensed, insured, and ready for work. A professional website is
              often the next thing they need. With {BRAND.short}, you offer it as your own service without hiring
              developers.
            </p>
          </Reveal>
        </section>

        <section className="container pb-16">
          <div className="grid gap-4 sm:grid-cols-3">
            {steps.map((step, index) => (
              <Reveal as="div" key={step.title} index={index}>
                <Card className="bg-card/50">
                  <CardContent className="p-6">
                    <span className="text-sm font-bold text-primary">{`0${index + 1}`}</span>
                    <p className="mt-4 text-sm font-semibold leading-6">{step.title}</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="container pb-16">
          <div className="max-w-3xl mx-auto space-y-12">
            <Reveal as="div">
              <h2 className="text-2xl font-bold mb-4">What you keep</h2>
              <p className="text-muted-foreground leading-relaxed">
                The client relationship, the retail price, and the margin. Example: at a $249 setup and $59 a
                month, you keep $100 on setup and $34 a month per site.
              </p>
            </Reveal>

            <Reveal as="div">
              <h2 className="text-2xl font-bold mb-4">What stays with you</h2>
              <p className="text-muted-foreground leading-relaxed">
                Billing your clients, talking to them, and complying with the rules that apply to your agency,
                including insurance-department rules on advertising, referral fees, and inducements. We don&apos;t
                give legal or insurance advice.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="container pb-20">
          <Reveal as="div" className="rounded-3xl bg-gradient-to-r from-primary/20 to-secondary/20 p-8 md:p-12 text-center border border-primary/20">
            <h2 className="text-3xl font-bold mb-4">See how it fits your agency</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              First version in {OFFER.firstVersion} from your greenlight.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Become a Partner <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-center sm:gap-4 text-sm">
              <Link href="/pricing" className="text-primary hover:underline">
                See pricing
              </Link>
              <Link href="/faq" className="text-primary hover:underline">
                See the FAQ
              </Link>
            </div>
          </Reveal>
        </section>

        <InlineContactForm />
      </div>
    </div>
  )
}
