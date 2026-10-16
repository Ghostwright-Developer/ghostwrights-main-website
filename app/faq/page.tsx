import type { Metadata } from "next"
import { InlineContactForm } from "@/components/inline-contact-form"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Reveal } from "@/components/reveal"
import { BRAND } from "@/lib/brand"
import { FAQ } from "@/lib/faq"
import { FaqAnswer } from "@/components/faq-answer"

export const metadata: Metadata = {
  title: `Partner FAQ | ${BRAND.short}`,
  description: "Answers on pricing, revisions, billing, ownership, cancellation, and more.",
  openGraph: {
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Ghostwright Web Development. Websites built under your name." }],
    title: `Partner FAQ | ${BRAND.short}`,
    description: "Answers on pricing, revisions, billing, ownership, cancellation, and more.",
  },
}

const faqs = FAQ

export default function FAQPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="container max-w-7xl mx-auto px-4 py-20 text-center">
        <Reveal as="div">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Partner FAQ</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Questions about the <span className="text-primary">partnership?</span></h1>
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground mt-8">Here&apos;s how {BRAND.short} helps agencies deliver a better web presence to their clients.</p>
        </Reveal>
      </section>

      <section className="container max-w-7xl mx-auto px-4 pb-20">
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible defaultValue="faq-0" className="w-full">
            {faqs.map((faq, index) => (
              <Reveal as="li" key={index} index={index} className="list-none">
                <AccordionItem value={`faq-${index}`}>
                  <AccordionTrigger className="text-left text-lg text-primary hover:text-primary/80">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed"><FaqAnswer faq={faq} /></AccordionContent>
                </AccordionItem>
              </Reveal>
            ))}
          </Accordion>
        </div>
      </section>

      <InlineContactForm />
    </div>
  )
}
