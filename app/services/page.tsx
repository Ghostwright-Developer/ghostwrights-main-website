import type { Metadata } from "next"
import Link from "next/link"

import { Code, Zap, Smartphone, Search, Globe, Headphones } from "lucide-react"
import { InlineContactForm } from "@/components/inline-contact-form"
import { BRAND } from "@/lib/brand"
import { OFFER } from "@/lib/offer"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Reveal } from "@/components/reveal"

export const metadata: Metadata = {
  title: `What We Build for Your Contractor Clients | ${BRAND.short}`,
  description: "Custom-coded, SEO-ready, mobile-first websites for roofers, remodelers, septic, HVAC, and other trades, built behind your brand.",
  openGraph: {
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Ghostwright Web Development. Websites built under your name." }],
    title: `What We Build for Your Contractor Clients | ${BRAND.short}`,
    description: "Custom-coded, SEO-ready, mobile-first websites for roofers, remodelers, septic, HVAC, and other trades, built behind your brand.",
  },
}

const services = [
  {
    title: "Website Design & Development",
    description:
      "Custom-coded websites built from the ground up — modern, animated, and high-polish. No templates, just premium work.",
    icon: Code,
    link: "/services/website-design",
  },
  {
    title: "Contractor Website Builds",
    description:
      "Purpose-built layouts for roofing, remodeling, septic, plumbing, HVAC, electrical, and landscaping. A dedicated page for each major service, with related smaller services grouped on the same page.",
    icon: Globe,
    link: "/services/service-business-websites",
  },
  {
    title: "SEO-Ready Architecture",
    description:
      "Your site structure is built for search visibility with clean code, optimized meta tags, and proper header hierarchy.",
    icon: Search,
    link: "/services/seo-architecture",
  },
  {
    title: "Mobile-First Design",
    description: "Responsive layouts that load fast and look great on every device — phone, tablet, or desktop.",
    icon: Smartphone,
    link: "/services/mobile-first-design",
  },
  {
    title: "Conversion Optimization",
    description: "Strategic layout, service pages, and contact routing designed to turn visitors into leads.",
    icon: Zap,
    link: "/services/conversion-optimization",
  },
  {
    title: "Hosting + Maintenance",
    description: "We handle hosting, updates, SSL, and support so you never worry about your site going down.",
    icon: Headphones,
    link: "/services/hosting-maintenance",
  },
]

export default function ServicesPage() {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="container py-20 md:py-28 text-center">
          <Reveal as="div">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">
              What we build for your <span className="text-primary">contractor clients</span>
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-muted-foreground mb-10 leading-relaxed mt-8">
              {BRAND.short} builds websites from scratch — custom-coded, fast, modern, and optimized to bring in more leads
              for roofing, remodeling, septic, plumbing, HVAC, electrical, and landscaping contractors.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/contact">Become a Partner</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/portfolio">See the Work</Link>
              </Button>
            </div>
          </Reveal>
        </section>

        {/* Services Grid */}
        <section className="bg-muted/30 py-20">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <Reveal as="div" key={index} index={index}>
                  <Card className="group">
                    <CardContent className="p-6">
                      <div className="icon-tile mb-4">
                        <service.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-primary">{service.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container py-20">
          <Reveal as="div" className="rounded-3xl bg-gradient-to-r from-primary/20 to-secondary/20 p-8 md:p-12 text-center border border-primary/20">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Offer a custom-coded website without handling fulfillment. Partner pricing is ${OFFER.setupFee} setup per site, then ${OFFER.monthlyFee}/month per active site.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">Become a Partner</Link>
            </Button>
          </Reveal>
        </section>

        {/* Inline Contact Form */}
        <InlineContactForm />
      </div>
    </div>
  )
}
