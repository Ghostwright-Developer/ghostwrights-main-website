"use client"

import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { OFFER } from "@/lib/offer"

const features = [
`$${OFFER.setupFee} per website launch`,
    `$${OFFER.monthlyFee}/month for hosting & updates`,
  "No long-term contracts",
  "Cancel anytime",
  "Hosting + SSL included",
  "Edits and updates included",
  "100% custom coded",
]

export function PricingSnapshot() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation()

  return (
    <section ref={sectionRef} className="section-glow section-tint w-full py-20 md:py-28">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div className={`mb-12 text-center animate-on-scroll ${sectionVisible ? "visible" : ""}`}>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">Simple Pricing</h2>
        </div>

        <div className={`max-w-md mx-auto animate-scale-in ${sectionVisible ? "visible" : ""}`}>
          <Card className="border-primary/40">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl text-primary mb-4">Custom Website</CardTitle>
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="flex items-baseline gap-2">
<span className="text-5xl font-bold text-foreground">${OFFER.setupFee}</span>
          <span className="text-xl text-gray-400">per launch</span>
                </div>
                <div className="text-sm text-muted-foreground">then</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-foreground">${OFFER.monthlyFee}</span>
                  <span className="text-lg text-gray-400">/month</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
              <Button size="lg" className="w-full h-12 mt-6" asChild>
                <Link href="/contact">Become a partner</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
