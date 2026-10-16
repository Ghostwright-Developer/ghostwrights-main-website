"use client"

import { MessageSquare, Code, Eye, Rocket } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const steps = [
  {
    number: "1",
    title: "Tell Us About Your Business",
    description: "Fill out a simple form about your services, brand colors, and what you want your site to say.",
    icon: MessageSquare,
  },
  {
    number: "2",
    title: "We Design & Build It From Scratch",
    description:
      "You get a fully custom-coded website — not a prefab template. Everything is built specifically for your business.",
    icon: Code,
  },
  {
    number: "3",
    title: "You Review & Approve",
    description: "We show you the finished site. You request edits if needed.",
    icon: Eye,
  },
  {
    number: "4",
    title: "It goes live under your brand",
    description: "Launch for $149, then $25/month for hosting, SSL, support, and ongoing updates. You stay focused on your client.",
    icon: Rocket,
  },
]

export function HowItWorksSection() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation()
  const step0 = useScrollAnimation({ threshold: 0.2 })
  const step1 = useScrollAnimation({ threshold: 0.2 })
  const step2 = useScrollAnimation({ threshold: 0.2 })
  const step3 = useScrollAnimation({ threshold: 0.2 })
  const stepAnimations = [step0, step1, step2, step3]

  return (
    <section ref={sectionRef} className="section-glow w-full py-20 md:py-28 bg-black border-t border-white/10">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div className={`mb-16 text-center animate-on-scroll ${sectionVisible ? "visible" : ""}`}>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">How It Works</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const { ref: stepRef, isVisible: stepVisible } = stepAnimations[index]
            return (
              <div
                key={index}
                ref={stepRef}
                className={`relative animate-scale-in ${stepVisible ? "visible" : ""}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20 transition-all duration-300 hover:scale-110 hover:brightness-125 hover:border-primary">
                    <step.icon className="h-8 w-8" />
                  </div>
                  <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-sm font-bold">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                  <p className="text-gray-400 text-base leading-relaxed">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
