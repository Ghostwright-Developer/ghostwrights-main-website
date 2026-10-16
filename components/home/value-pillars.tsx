"use client"

import { Code, Zap, DollarSign, Award, Smartphone, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BRAND } from "@/lib/brand"

const pillars = [
  {
    title: "Get More Leads",
    description: "Clean, conversion-optimized pages designed to turn visitors into leads and boost your bottom line.",
    icon: TrendingUp,
  },
  {
    title: "Stand Out Locally",
    description:
      "Look professional with sleek design, animations, and modern UI that separates you from outdated competitors.",
    icon: Award,
  },
  {
    title: "Save Thousands",
    description:
      "Get the high-end website normally reserved for companies paying $3,000–$15,000 to build — at a price any business can afford.",
    icon: DollarSign,
  },
  {
    title: "Built From Scratch",
    description: "Every site is custom-coded specifically for your business. No templates. No drag-and-drop builders.",
    icon: Code,
  },
  {
    title: "Lightning Fast",
    description: "Modern, animated, SEO-ready sites that load instantly and look great on every device.",
    icon: Zap,
  },
  {
    title: "Fully Managed",
    description: "Hosting, SSL, updates, and support included. Stay worry-free while we handle everything.",
    icon: Smartphone,
  },
]

export function ValuePillars() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation()
  const card0 = useScrollAnimation({ threshold: 0.2 })
  const card1 = useScrollAnimation({ threshold: 0.2 })
  const card2 = useScrollAnimation({ threshold: 0.2 })
  const card3 = useScrollAnimation({ threshold: 0.2 })
  const card4 = useScrollAnimation({ threshold: 0.2 })
  const card5 = useScrollAnimation({ threshold: 0.2 })
  const cardAnimations = [card0, card1, card2, card3, card4, card5]

  return (
    <section ref={sectionRef} className="section-glow section-tint w-full py-20 md:py-28">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div className={`mb-12 text-center animate-on-scroll ${sectionVisible ? "visible" : ""}`}>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
            Built From Scratch — Just for Your Business
          </h2>
          <p className="mt-6 max-w-3xl mx-auto text-gray-400 text-base md:text-lg leading-relaxed">
            Every {BRAND.short} site is custom-coded from the ground up. No templates. No drag-and-drop builders. Just
            premium, modern websites designed to help service-based businesses look professional and win more clients.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, index) => {
            const { ref: cardRef, isVisible: cardVisible } = cardAnimations[index]
            return (
              <div
                key={index}
                ref={cardRef}
                className={`animate-on-scroll ${cardVisible ? "visible" : ""}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Card className="group h-full">
                  <CardContent className="p-6">
                    <div className="icon-tile mb-4">
                      <pillar.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-3">{pillar.title}</h3>
                    <p className="text-gray-400 text-base leading-relaxed">{pillar.description}</p>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
        <div className="mt-12 text-center">
          <Button
            size="lg"
            variant="outline"
            className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary bg-transparent"
            asChild
          >
            <Link href="/portfolio">View Our Work</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
