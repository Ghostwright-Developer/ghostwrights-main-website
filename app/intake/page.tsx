import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { InlineContactForm } from "@/components/inline-contact-form"
import { Reveal } from "@/components/reveal"
import { OFFER } from "@/lib/offer"

const DEMO_URL = "https://intake.ghostwrightweb.com"

const title = "The Client Intake Form | Ghostwright"
const description =
  "A neutral, adaptive intake form on your own subdomain. Your client answers in about 10 minutes, and we get everything we need to start the build."

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Ghostwright Web Development. Websites built under your name." }],
    title,
    description,
  },
}

const howItWorks = [
  {
    title: "You send one link",
    description: "A neutral intake form on a subdomain of your website, like start.youragency.com. Nothing on it points to us.",
  },
  {
    title: "Your client answers in about 10 minutes",
    description: "Short sections, saved as they go, so they can stop and come back.",
  },
  {
    title: "The form adapts to them",
    description: "Questions appear only when they apply.",
  },
  {
    title: "We get a complete brief",
    description: "Their answers, their files, and a readiness check that flags anything we still need.",
  },
]

const adapts = [
  {
    title: "Offers 24/7 emergency service?",
    description: "We ask how fast they respond and plan an emergency call button.",
  },
  {
    title: "Mostly commercial work?",
    description: "The materials list switches to commercial systems.",
  },
  {
    title: "Reviews on Google and Yelp?",
    description: "We ask for a link to each one, and only those.",
  },
  {
    title: "Picked their services?",
    description: "They choose their main ones, and we ask what to highlight about each.",
  },
]

const trades = ["Roofing", "Remodeling", "Plumbing", "HVAC", "Electrical", "Landscaping", "Septic", "Other trades"]

const collects = [
  "Business and contact details",
  "Service area and hours",
  "Licenses, insurance, and warranties",
  "Services and what sets them apart",
  "Logo, colors, and photos",
  "Reviews to feature",
  "How customers should reach them",
  "Domain and email setup",
  "Timing and approvals",
]

const neverAsks = ["Passwords", "Payment or card details"]

const afterSubmit = [
  "We review the answers, and a readiness check flags anything we still need.",
  `We send your $${OFFER.setupFee} setup invoice.`,
  `Work starts when it's paid, and the first version arrives in ${OFFER.firstVersion}.`,
  "Want a copy of each submission? Just ask.",
]

export default function IntakePage() {
  return (
    <div className="w-full">
      <div className="flex flex-col min-h-screen max-w-7xl mx-auto px-6 md:px-12">
        <section className="container py-20 md:py-28">
          <Reveal as="div" className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6 text-balance">
              A client intake that gets the build started
            </h1>
            <p className="text-lg leading-8 text-muted-foreground text-pretty">
              When your client says yes, you send one link. They answer questions about their business, upload a
              logo and photos, and we get everything we need to start building. No chasing details by email.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <a href={DEMO_URL} target="_blank" rel="noopener noreferrer">
                  Try the demo
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Become a Partner</Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">The demo sends nothing and saves nothing.</p>
          </Reveal>
        </section>

        <section className="container pb-20">
          <Reveal as="div">
            <h2 className="text-3xl font-bold mb-8 text-center">How it works</h2>
          </Reveal>
          <ol className="grid gap-4 md:grid-cols-4">
            {howItWorks.map((step, index) => (
              <Reveal
                as="li"
                key={step.title}
                index={index}
                className="relative rounded-2xl border border-border/70 bg-card p-5 list-none"
              >
                <span className="text-sm font-bold text-primary">0{index + 1}</span>
                <p className="mt-6 text-sm font-semibold leading-6">{step.title}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.description}</p>
              </Reveal>
            ))}
          </ol>
        </section>

        <section className="container pb-20">
          <Reveal as="div" className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-3">The form adapts to your client</h2>
            <p className="text-muted-foreground mb-8">Nobody wades through questions that don&apos;t fit their business.</p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {adapts.map((item, index) => (
              <Reveal as="div" key={item.title} index={index}>
                <Card className="h-full bg-card/50">
                  <CardContent className="p-6">
                    <p className="text-sm font-semibold leading-6">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="container pb-20">
          <Reveal as="div" className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-3">Built for eight trades</h2>
            <p className="text-muted-foreground mb-8">Each trade has its own questions on top of the basics.</p>
            <div className="flex flex-wrap justify-center gap-3">
              {trades.map((trade) => (
                <span
                  key={trade}
                  className="inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary"
                >
                  {trade}
                </span>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="container pb-20">
          <Reveal as="div" className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">What it collects</h2>
            <div className="grid gap-8 sm:grid-cols-2">
              <ul className="grid gap-3">
                {collects.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="leading-6">{item}</span>
                  </li>
                ))}
              </ul>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-3">
                  Never asks for
                </p>
                <ul className="grid gap-3">
                  {neverAsks.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-muted-foreground">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" aria-hidden="true" />
                      <span className="leading-6">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="container pb-20">
          <div className="grid gap-4 md:grid-cols-2">
            <Reveal as="div">
              <Card className="h-full bg-card/50">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-3">Neutral by design</h2>
                  <p className="text-sm leading-6 text-muted-foreground">
                    The form carries no Ghostwright branding and no logos. It lives on a subdomain of your website,
                    so your client sees your address. If you like, it can show your agency&apos;s name at the top.
                  </p>
                </CardContent>
              </Card>
            </Reveal>
            <Reveal as="div" index={1}>
              <Card className="h-full bg-card/50">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-3">Setup is one DNS record</h2>
                  <p className="text-sm leading-6 text-muted-foreground">
                    You add a record for a subdomain such as start.youragency.com. We add it on our side and test
                    it. The change itself takes a few minutes, though DNS can take longer to update.
                  </p>
                </CardContent>
              </Card>
            </Reveal>
            <Reveal as="div" index={2}>
              <Card className="h-full bg-card/50">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-3">Private by default</h2>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Files your client uploads are stored privately and deleted about 90 days after launch.
                  </p>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </section>

        <section className="container pb-20">
          <Reveal as="div" className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">What happens after they submit</h2>
            <ol className="grid gap-4">
              {afterSubmit.map((item, index) => (
                <li key={item} className="flex items-start gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/5 text-sm font-bold text-primary">
                    {index + 1}
                  </span>
                  <span className="leading-6 pt-0.5">{item}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </section>

        <section className="container pb-20">
          <Reveal
            as="div"
            className="rounded-3xl bg-gradient-to-r from-primary/20 to-secondary/20 p-8 md:p-12 text-center border border-primary/20"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Become a Partner <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="mt-4 text-sm">
              <Link href="/how-it-works" className="text-primary hover:underline">
                See how a build works
              </Link>
            </div>
          </Reveal>
        </section>

        <InlineContactForm />
      </div>
    </div>
  )
}
