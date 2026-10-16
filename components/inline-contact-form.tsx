"use client"
import { PartnerForm } from "@/components/partner-form"
import { Reveal } from "@/components/reveal"

export function InlineContactForm() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container max-w-4xl mx-auto px-4 md:px-6">
        <Reveal as="div" className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Ready to add websites to your offer?</h2>
          <p className="text-muted-foreground">Tell us about your agency and we&apos;ll show you how the partnership works.</p>
        </Reveal>
        <Reveal as="div" delay={80}>
          <PartnerForm />
        </Reveal>
      </div>
    </section>
  )
}
