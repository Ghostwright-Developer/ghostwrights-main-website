import type { Metadata } from "next"
import Link from "next/link"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { InlineContactForm } from "@/components/inline-contact-form"
import { Reveal } from "@/components/reveal"
import { BRAND } from "@/lib/brand"
import { OFFER } from "@/lib/offer"

export const metadata: Metadata = {
  title: `Partner Service Agreement | ${BRAND.short}`,
  description:
    "Read, sign, and return the Partner Service Agreement to get started. We start work and turn on your intake form once we have your signed copy.",
  openGraph: {
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Ghostwright Web Development. Websites built under your name." }],
    title: `Partner Service Agreement | ${BRAND.short}`,
    description:
      "Read, sign, and return the Partner Service Agreement to get started. We start work and turn on your intake form once we have your signed copy.",
  },
}

const steps = [
  {
    title: "Download it",
    description: "Read it through. It's written in plain language.",
  },
  {
    title: "Fill in the blanks",
    description: "Your legal name, entity type, contact emails, and how you want us to work with your clients.",
  },
  {
    title: "Sign it",
    description: "By hand or with any e-signature tool. The person signing must be authorized to sign for your company.",
  },
  {
    title: "Email it back",
    description: `Send the signed copy to ${BRAND.contactEmail}. We confirm receipt by email.`,
  },
]

const terms = [
  {
    topic: "Intake form",
    summary:
      "A form for your client's business, on a subdomain of your website. Sending a client to it is your order. You have 2 business days to flag one you didn't authorize.",
  },
  {
    topic: "Setup fee",
    summary: `$${OFFER.setupFee} per site, invoiced when the intake arrives, non-refundable once work begins.`,
  },
  {
    topic: "Monthly fee",
    summary: `$${OFFER.monthlyFee} per active site, starting the 1st of the month after the Billing Start Date. That date is go-live, or day 15 after approval if launch is delayed for reasons outside our control. No charge for that partial month.`,
  },
  {
    topic: "First version",
    summary: `${OFFER.firstVersion} from greenlight.`,
  },
  {
    topic: "Revisions",
    summary: "Two rounds, 3-business-day turnaround, $75 per extra round.",
  },
  {
    topic: "Edits",
    summary: `Content edits are usually done in ${OFFER.editTurnaround}.`,
  },
  {
    topic: "Defects",
    summary: "We fix our own errors at no charge. Defects reported within 30 days of go-live are fixed under the agreement.",
  },
  {
    topic: "Contact forms",
    summary: "Each form uses a free-to-start EmailJS account owned by your client.",
  },
  {
    topic: "Images",
    summary: "Stock and AI-assisted images only if your client allows them, never to show their work, team, or reviews.",
  },
  {
    topic: "Billing",
    summary: `One bundled invoice on the ${OFFER.invoiceDay}, due by the ${OFFER.dueDay}, $${OFFER.lateFee} late fee after the ${OFFER.lateAfterDay}.`,
  },
  {
    topic: "Unpaid clients",
    summary: "Report the site before the due date; its fee is removed and it follows the 30/60-day schedule.",
  },
  {
    topic: "Ownership",
    summary: `Clients keep their domain and content. ${BRAND.short} keeps the source code.`,
  },
  {
    topic: "Non-solicitation",
    summary: "While the agreement is in effect, we never solicit, market to, or upsell your clients.",
  },
  {
    topic: "Communication options",
    summary:
      "Fully white-label (default), or we work with your clients directly as your web team from an email address on your domain. Change any time by written notice.",
  },
  {
    topic: "Cancellation",
    summary: "Any site, anytime, effective at the end of the month.",
  },
  {
    topic: "Ending the agreement",
    summary:
      "You can end it on 30 days' written notice. We can end it without cause on 60 days' written notice; you can complete a buyout during that notice period and for 30 days after it ends.",
  },
  {
    topic: "Buyout",
    summary: "Active site: any time. Cancelled site: we must receive your written buyout request, signed buyout terms, and $3,000 in cleared funds within 30 days after receiving your cancellation notice. Delivery is within 10 business days after signed terms and cleared payment. Buying an active site's code does not cancel hosting or its monthly fee. See the agreement.",
  },
  {
    topic: "Fee changes",
    summary: `${OFFER.feeChangeNoticeDays} days' written notice.`,
  },
  {
    topic: "Governing law",
    summary: "Arizona.",
  },
]

export default function PartnerServiceAgreementPage() {
  return (
    <div className="w-full">
      <div className="flex flex-col min-h-screen max-w-7xl mx-auto px-6 md:px-12">
        <section className="container py-20 md:py-28">
          <Reveal as="div" className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">
              Partner Service Agreement
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Every partner signs our Partner Service Agreement once, before we start. We don&apos;t countersign.
              Version 1.1 takes effect when we confirm receipt of your signed copy by email.
            </p>
            <div className="mt-8">
              <Button size="lg" asChild>
                <a
                  href="/partner-service-agreement.pdf"
                  download
                  aria-label="Download the Partner Service Agreement PDF"
                >
                  Download the Partner Service Agreement (PDF) <Download className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </Reveal>
        </section>

        <section className="container pb-16">
          <Reveal as="div" className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">How to sign</h2>
            <ol className="grid gap-4 sm:grid-cols-2">
              {steps.map((step, index) => (
                <Reveal
                  as="li"
                  key={step.title}
                  index={index}
                  className="group relative list-none rounded-2xl border border-primary/40 bg-primary/[0.06] p-5 shadow-[0_12px_40px_-26px_rgba(23,158,199,0.9)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-primary/80 hover:bg-primary/[0.1] hover:shadow-[0_0_36px_rgba(23,158,199,0.28)]"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-sm font-bold text-primary transition-all duration-300 group-hover:scale-110 group-hover:border-primary group-hover:bg-primary/20 group-hover:shadow-[0_0_24px_rgba(23,158,199,0.35)]">
                    {index + 1}
                  </span>
                  <p className="mt-6 text-sm font-semibold leading-6 text-primary">{step.title}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.description}</p>
                </Reveal>
              ))}
            </ol>
          </Reveal>
        </section>

        <section className="container pb-16">
          <div className="grid gap-4 md:grid-cols-2 max-w-3xl mx-auto">
            <Reveal as="div" index={0}>
              <Card className="bg-card/50">
                <CardContent className="p-6">
                  <p className="text-sm leading-6 text-muted-foreground">
                    We don&apos;t start work, and we don&apos;t turn on your intake form, until we have your signed
                    copy.
                  </p>
                </CardContent>
              </Card>
            </Reveal>
            <Reveal as="div" index={1}>
              <Card className="bg-card/50">
                <CardContent className="p-6">
                  <p className="text-sm leading-6 text-muted-foreground">
              Please don&apos;t edit the text. Changes you make before signing have no effect unless we
              accept them in writing. We check each returned copy against the original for altered content.
                  </p>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </section>

        <section className="container pb-16">
          <Reveal as="div" className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-2 text-center">Key terms at a glance</h2>
            <p className="text-sm text-muted-foreground text-center mb-6">
              This page summarizes the agreement. The signed Partner Service Agreement controls.
            </p>
            <Card className="bg-card/50">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Topic</TableHead>
                      <TableHead>Summary</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {terms.map((row) => (
                      <TableRow key={row.topic}>
                        <TableCell className="font-medium whitespace-normal">{row.topic}</TableCell>
                        <TableCell className="whitespace-normal text-muted-foreground">{row.summary}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Reveal>
        </section>

        <section className="container pb-20">
          <Reveal as="div" className="max-w-3xl mx-auto text-center">
            <Button size="lg" asChild>
              <a
                href="/partner-service-agreement.pdf"
                download
                aria-label="Download the Partner Service Agreement PDF"
              >
                Download the Partner Service Agreement (PDF) <Download className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </Reveal>
        </section>

        <InlineContactForm />
      </div>
    </div>
  )
}
