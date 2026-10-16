"use client"

import type * as React from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function PortfolioHero() {
  const titleAnimation = useScrollAnimation()
  const subtitleAnimation = useScrollAnimation()

  return (
    <section className="container py-20 text-center">
      <h1
        ref={titleAnimation.ref as React.RefObject<HTMLHeadingElement>}
        className={`text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6 animate-fade-in ${titleAnimation.isVisible ? "visible" : ""}`}
      >
        Our <span className="text-primary">Work</span>
      </h1>
      <p
        ref={subtitleAnimation.ref as React.RefObject<HTMLParagraphElement>}
        className={`max-w-2xl mx-auto text-xl text-muted-foreground mt-8 animate-fade-in ${subtitleAnimation.isVisible ? "visible" : ""}`}
      >
        Explore sites we&apos;ve built for contractors. Click any project to preview the live site.
      </p>
    </section>
  )
}
