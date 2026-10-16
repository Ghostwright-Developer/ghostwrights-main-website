"use client"

import { Check, Sparkles, Palette, MousePointer, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const features = [
  {
    icon: MousePointer,
    title: "Hover Animations",
    description: "Every button and icon lights up and scales on hover — just like this site",
  },
  {
    icon: Zap,
    title: "Smooth Interactions",
    description: "Scroll-triggered animations, sticky headers, and polished transitions throughout",
  },
  {
    icon: Sparkles,
    title: "Strategic Popups",
    description: "Conversion-optimized contact forms that appear at the right moment (try waiting 5 minutes!)",
  },
  {
    icon: Palette,
    title: "Custom Branding",
    description: "Unique color schemes and typography tailored to your business identity",
  },
]

export function SiteFeaturesShowcase() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation()
  const card0 = useScrollAnimation({ threshold: 0.2 })
  const card1 = useScrollAnimation({ threshold: 0.2 })
  const card2 = useScrollAnimation({ threshold: 0.2 })
  const card3 = useScrollAnimation({ threshold: 0.2 })
  const cardRefs = [card0, card1, card2, card3]

  return (
    <section ref={sectionRef} className="section-glow section-tint w-full py-20 md:py-28">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div className={`text-center mb-12 animate-on-scroll ${sectionVisible ? "visible" : ""}`}>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            Your Site Will Have <span className="text-primary">All These Features</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Every website we build includes the same professional features you see on this demo. Take a look around —
            check the button animations, the popup forms, the smooth scrolling, and the cohesive branding.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {features.map((feature, index) => {
            const { ref: cardRef, isVisible: cardVisible } = cardRefs[index]
            return (
              <div
                key={index}
                ref={cardRef}
                className={`animate-on-scroll ${cardVisible ? "visible" : ""}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Card className="group h-full">
                  <CardContent className="p-6 text-center">
                    <div className="icon-tile mx-auto mb-4">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-primary">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>

        <div
          className={`bg-card/50 border border-border/50 rounded-2xl p-8 max-w-4xl mx-auto animate-on-scroll ${sectionVisible ? "visible" : ""}`}
          style={{ transitionDelay: "400ms" }}
        >
          <h3 className="text-2xl font-bold mb-6 text-center">What You Get:</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              "Button hover effects & animations",
              "Sticky shrinking header on scroll",
              "Strategic popup contact forms",
              "Inline contact forms on every page",
              "Custom color scheme & branding",
              "Professional typography",
              "Smooth scroll-to-top functionality",
              "Mobile-responsive layouts",
              "Fast loading times",
              "SEO-optimized structure",
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
