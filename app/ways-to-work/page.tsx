import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { InlineContactForm } from "@/components/inline-contact-form"
import { Reveal } from "@/components/reveal"

const title = "Ways to Work With Us | Ghostwright"
const description =
  "Stay fully white-label, or let us work with your clients directly as your web team. Choose how hands-on you want to be, at the same price."

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Ghostwright Web Development. Websites built under your name." }],
    title,
    description,
  },
}

const options = [
  {
    title: "Fully white-label",
    description:
      "You are our only contact. Your client completes the intake, gives feedback, and requests edits through you. We never contact them.",
    isDefault: true,
  },
  {
    title: "As your web team",
    description:
      "You create an email address on your own domain, such as developer@youragency.com, and give us access. We work directly with your client on the intake, revisions, DNS, and edits, as part of your team. They only ever see your name. You can see the mailbox and revoke access any time.",
    isDefault: false,
  },
]

const neverChanges = [
  "Your clients only ever see your name.",
  "You bill your client. We bill only you.",
  "While we work together, we never solicit, market to, or upsell your clients.",
  "Scope changes and extra charges are quoted to you, not your client.",
  "Timelines stay the same.",
  "You can switch options any time by written notice.",
]

const mailboxSteps = [
  {
    title: "You create the mailbox",
    description: "A real mailbox on your domain, for example developer@youragency.com.",
  },
  {
    title: "You give us delegated access",
    description: "We never need your password. You can see everything and revoke access any time.",
  },
  {
    title: "We work with your client from it",
    description: "Every message comes from your domain, in your name.",
  },
]

const fit = [
  { want: "Stay in the loop on every message", choose: "Fully white-label" },
  { want: "Have your client deal with your web team without you doing the back-and-forth", choose: "As your web team" },
]

export default function WaysToWorkPage() {
  return (
    <div className="w-full">
      <div className="flex flex-col min-h-screen max-w-7xl mx-auto px-6 md:px-12">
        <section className="container py-20 md:py-28">
          <Reveal as="div" className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6 text-balance">
              Choose how hands-on you want to be
            </h1>
            <p className="text-lg leading-8 text-muted-foreground text-pretty">
              Most partners start fully white-label. If you&apos;d rather not be the go-between, we can work with your
              clients directly as your web team, from an email address on your domain. Your client only ever sees your
              name. It&apos;s your choice, per client, at the same price.
            </p>
          </Reveal>
        </section>

        <section className="container pb-20">
          <div className="grid gap-4 md:grid-cols-2">
            {options.map((option, index) => (
              <Reveal as="div" key={option.title} index={index}>
                <Card className="h-full bg-card/50">
                  <CardContent className="p-6">
                    <div className="mb-3 flex items-center gap-3">
                      <h2 className="text-xl font-semibold">{option.title}</h2>
                      {option.isDefault && <Badge>Default</Badge>}
                    </div>
                    <p className="text-sm leading-6 text-muted-foreground">{option.description}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="container pb-20">
          <Reveal as="div" className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">What never changes</h2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {neverChanges.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="leading-6">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section className="container pb-20">
          <Reveal as="div">
            <h2 className="text-3xl font-bold mb-8 text-center">How the mailbox works</h2>
          </Reveal>
          <ol className="grid gap-4 md:grid-cols-3">
            {mailboxSteps.map((step, index) => (
              <Reveal as="li" key={step.title} index={index} className="relative rounded-2xl border border-border/70 bg-card p-5 list-none">
                <span className="text-sm font-bold text-primary">0{index + 1}</span>
                <p className="mt-6 text-sm font-semibold leading-6">{step.title}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.description}</p>
              </Reveal>
            ))}
          </ol>
        </section>

        <section className="container pb-20">
          <Reveal as="div" className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Which one fits?</h2>
            <div className="overflow-hidden rounded-2xl border border-border/70 bg-card">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/40">
                  <tr>
                    <th scope="col" className="px-5 py-4 font-semibold">You want to...</th>
                    <th scope="col" className="px-5 py-4 font-semibold">Choose</th>
                  </tr>
                </thead>
                <tbody>
                  {fit.map((row) => (
                    <tr key={row.want} className="border-t border-border/70">
                      <td className="px-5 py-4 leading-6 text-muted-foreground">{row.want}</td>
                      <td className="px-5 py-4 font-semibold text-primary whitespace-nowrap">{row.choose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>

        <section className="container pb-20">
          <Reveal as="div" className="rounded-3xl bg-gradient-to-r from-primary/20 to-secondary/20 p-8 md:p-12 text-center border border-primary/20">
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
