"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type RevealTag = "div" | "section" | "li" | "article" | "tr" | "form"

interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  /** HTML tag to render. Defaults to "div". */
  as?: RevealTag
  /** Stagger index; multiplied by 80ms to produce a transition delay. Use for grid/list children. */
  index?: number
  /** Explicit delay in ms. Overrides `index` when provided. */
  delay?: number
  children: React.ReactNode
}

/**
 * Scroll-triggered fade-up reveal. Observes the element with IntersectionObserver
 * (threshold 0.15, rootMargin "0px 0px -80px 0px") and adds the "reveal-visible"
 * class once, on first intersection. All animated properties are defined in
 * globals.css under a prefers-reduced-motion: no-preference guard.
 */
export function Reveal({ as = "div", index, delay, className, style, children, ...props }: RevealProps) {
  const ref = React.useRef<HTMLElement | null>(null)
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const transitionDelay = delay ?? (index !== undefined ? index * 80 : 0)

  const Tag = as as React.ElementType

  return (
    <Tag
      ref={ref}
      className={cn("reveal", visible && "reveal-visible", className)}
      style={{ ...style, transitionDelay: `${transitionDelay}ms` }}
      {...props}
    >
      {children}
    </Tag>
  )
}
