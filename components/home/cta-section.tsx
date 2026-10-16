"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function CTASection() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation()

  return (
    <section ref={sectionRef} className="section-glow w-full py-20 md:py-28">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div
          className={`relative overflow-hidden rounded-3xl bg-background px-6 py-16 text-center md:px-12 md:py-24 border border-primary/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_32px_rgba(23,158,199,0.18)] hover:border-primary animate-scale-in ${sectionVisible ? "visible" : ""}`}
        >
          <div className="relative z-10 mx-auto max-w-3xl">
            <h2 className="mb-6 text-3xl font-bold tracking-tighter text-primary sm:text-4xl md:text-5xl">
              Ready to upgrade your online presence?
            </h2>
            <p className="mb-10 text-lg text-muted-foreground md:text-xl">
              Get a premium, custom-coded site for the lowest price in the industry.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" className="h-12 px-8 text-base" asChild>
                <Link href="/contact">
                  Become a partner <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
