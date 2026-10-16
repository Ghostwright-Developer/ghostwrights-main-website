"use client"

import Link from "next/link"

import { Mail, MessageSquare, Clock, Check, ArrowRight } from "lucide-react"

import { PartnerForm } from "@/components/partner-form"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { IdleReassurancePopup } from "@/components/idle-reassurance-popup"
import { Reveal } from "@/components/reveal"
import { BRAND } from "@/lib/brand"

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    description: "Response within 48 hours",
    detail: "We reply to every partner inquiry by email.",
    email: BRAND.contactEmail,
  },
  {
    icon: MessageSquare,
    title: "Direct Contact",
    description: "Fill out the form below",
    detail: "Fastest way to get started",
  },
  {
    icon: Clock,
    title: "Availability",
    description: "Mon–Fri, 9AM–5PM Arizona time",
    detail: "Arizona time is MST year-round, with no daylight saving.",
  },
]

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen max-w-7xl mx-auto px-4">
      <IdleReassurancePopup idleTimeMs={30000} />
      {/* Hero */}
      <section className="container py-20 text-center">
        <Reveal as="div">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">
            Let&apos;s build your <span className="text-primary">partner offer</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
            Tell us about your agency and the businesses you serve. We&apos;ll show you how to deliver premium websites under your brand.
          </p>
        </Reveal>
      </section>

      {/* Partner positioning */}
      <section className="container pb-12">
        <Reveal as="div" className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">White-label fulfillment</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Add premium websites without adding a web department.</h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">Offer professionally built websites under your own brand. We handle the design, technical setup, launch, and ongoing service behind the scenes.</p>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {["Keep the client relationship", "Set your own retail pricing", "Skip developers and overhead"].map((item, index) => (
            <Reveal as="div" key={item} index={index} className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/40 p-4 text-sm">
              <Check className="h-5 w-5 shrink-0 text-primary" />
              <span>{item}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="container pb-12">
        <div className="grid gap-6 md:grid-cols-3">
          {contactInfo.map((info, index) => (
            <Reveal as="div" key={index} index={index}>
              <Card className="border-border/50 bg-card/50">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <info.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold mb-1">{info.title}</h3>
                  <p className="text-muted-foreground mb-1">{info.description}</p>
                  <p className="text-sm text-muted-foreground">{info.detail}</p>
                  {info.email && (
                    <a
                      href={`mailto:${info.email}`}
                      className="inline-block mt-3 text-primary hover:text-primary/80 transition-colors font-medium"
                    >
                      {info.email}
                    </a>
                  )}
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Partner Form */}
      <section className="container pb-20">
        <Reveal as="div" className="max-w-2xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to add websites to your offer?</h2>
            <p className="text-muted-foreground">
              Fill out the partner form and we&apos;ll get back to you quickly.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Ready to move forward? Start with the{" "}
              <Link href="/partner-service-agreement" className="text-primary hover:underline">
                Partner Service Agreement
              </Link>
              .
            </p>
          </div>
          <PartnerForm />
          <div className="mt-6 flex items-start gap-3 rounded-lg border border-border/50 bg-muted/20 p-4 text-left text-sm text-muted-foreground">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <p>We&apos;ll only use your information to respond to your partner inquiry. No spam, no pressure, and your client relationships stay yours.</p>
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <a href={`mailto:${BRAND.contactEmail}`}>Prefer email? Contact us directly <ArrowRight className="ml-2 h-4 w-4" /></a>
            </Button>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
