import type { Metadata } from "next"
import Link from "next/link"

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
  title: `Billing and Payments | ${BRAND.short}`,
  description: "One bundled invoice on the 1st, due by the 8th. Setup and monthly billing, late fees, unpaid clients, and fee changes.",
  openGraph: {
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Ghostwright Web Development. Websites built under your name." }],
    title: `Billing and Payments | ${BRAND.short}`,
    description: "One bundled invoice on the 1st, due by the 8th. Setup and monthly billing, late fees, unpaid clients, and fee changes.",
  },
}

const invoiceEvents = [
  {
    event: "Intake arrives",
    result: `We invoice the $${OFFER.setupFee} setup fee.`,
  },
  {
    event: "Setup fee paid",
    result: "Work starts and your 5–7 business day clock starts.",
  },
  {
    event: "Go-live",
    result: "No charge for the partial launch month.",
  },
  {
    event: `The ${OFFER.invoiceDay} of each month`,
    result: "One bundled invoice lists every active site.",
  },
  {
    event: `The ${OFFER.dueDay}`,
    result: "Payment is due.",
  },
]

export default function BillingPage() {
  return (
    <div className="w-full">
      <div className="flex flex-col min-h-screen max-w-7xl mx-auto px-6 md:px-12">
        <section className="container py-20 md:py-28">
          <Reveal as="div" className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">
              Billing and payments
            </h1>
          </Reveal>
        </section>

        <section className="container pb-16">
          <div className="max-w-3xl mx-auto space-y-12">
            <Reveal as="div">
              <h2 className="text-2xl font-bold mb-4">What you pay</h2>
              <ul className="space-y-3 text-muted-foreground leading-relaxed">
                <li>
                  Setup: ${OFFER.setupFee} per site, invoiced when the intake arrives, due before work begins,
                  non-refundable once work begins.
                </li>
                <li>Monthly: ${OFFER.monthlyFee} per active site.</li>
              </ul>
            </Reveal>

            <Reveal as="div">
              <h2 className="text-2xl font-bold mb-4">When you&apos;re invoiced</h2>
              <Card className="bg-card/50">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Event</TableHead>
                        <TableHead>What happens</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {invoiceEvents.map((row) => (
                        <TableRow key={row.event}>
                          <TableCell className="font-medium whitespace-normal">{row.event}</TableCell>
                          <TableCell className="whitespace-normal text-muted-foreground">{row.result}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </Reveal>

            <Reveal as="div">
              <h2 className="text-2xl font-bold mb-4">Late payments</h2>
              <p className="text-muted-foreground leading-relaxed">
                If an invoice is not paid by the {OFFER.lateAfterDay}, a flat ${OFFER.lateFee} late fee applies per
                invoice, not per site. If it is still unpaid {OFFER.noticeDays} days after its due date, we send
                written notice. Five days after that notice, we may suspend the sites on that invoice until it is
                paid. At {OFFER.cancelDays} days unpaid, those sites are treated as cancelled.
              </p>
            </Reveal>

            <Reveal as="div">
              <h2 className="text-2xl font-bold mb-4">If your client doesn&apos;t pay you</h2>
              <p className="text-muted-foreground leading-relaxed">
                Tell us in writing, before the invoice due date, which site is unpaid. We remove that site&apos;s
                monthly fee from the current invoice, or credit it to your next one. The rest is still due by the
                due date. The unpaid site follows the same {OFFER.noticeDays}-day and {OFFER.cancelDays}-day
                schedule. If your client pays you before cancellation, you pay the removed fees and we restore the
                site.
              </p>
            </Reveal>

            <Reveal as="div">
              <h2 className="text-2xl font-bold mb-4">Fee changes</h2>
              <p className="text-muted-foreground leading-relaxed">
                We give {OFFER.feeChangeNoticeDays} days&apos; written notice before changing the monthly fee. Setup
                fees for sites you&apos;ve already greenlit don&apos;t change.
              </p>
            </Reveal>

            <Reveal as="div">
              <h2 className="text-2xl font-bold mb-4">Taxes</h2>
              <p className="text-muted-foreground leading-relaxed">
                Fees exclude taxes. If we are required to collect any, you pay them.
              </p>
            </Reveal>

            <p className="text-sm text-muted-foreground">
              Full terms are in your{" "}
              <Link href="/partner-service-agreement" className="text-primary hover:underline">
                Partner Service Agreement
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
