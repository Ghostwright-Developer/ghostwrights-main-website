"use client"

import * as React from "react"
import Link from "next/link"
import { X, HelpCircle, ArrowRight } from "lucide-react"

export function FAQBanner() {
  const [isVisible, setIsVisible] = React.useState(false)
  const [hasShown, setHasShown] = React.useState(false)
  const [isDismissed, setIsDismissed] = React.useState(false)

  React.useEffect(() => {
    // Check if already shown this session
    const shown = sessionStorage.getItem("faq-banner-shown")
    if (shown) {
      setHasShown(true)
      return
    }

    const handleScroll = () => {
      if (hasShown || isDismissed) return

      // Calculate scroll position - trigger when user is 70% down the page
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = scrollTop / docHeight

      if (scrollPercent > 0.7) {
        setIsVisible(true)
        setHasShown(true)
        sessionStorage.setItem("faq-banner-shown", "true")

        setTimeout(() => {
          setIsVisible(false)
        }, 15000)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [hasShown, isDismissed])

  const handleDismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
  }

  if (!isVisible || isDismissed) return null

  return (
    <div className="fixed bottom-20 left-0 right-0 z-50">
      <div className="animate-slide-across-screen mx-4 md:mx-auto md:max-w-2xl">
        <Link
          href="/faq"
          className="flex items-center gap-4 bg-primary/95 backdrop-blur-sm text-primary-foreground px-6 py-4 rounded-xl shadow-2xl shadow-primary/20 border border-primary/50 hover:bg-primary transition-colors group hover:scale-105 duration-300"
        >
          <HelpCircle className="h-6 w-6 shrink-0 animate-pulse" />
          <span className="flex-1 font-medium">Got questions? Click here to check out our FAQ page!</span>
          <ArrowRight className="h-5 w-5 shrink-0 group-hover:translate-x-1 transition-transform" />
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              handleDismiss()
            }}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="h-5 w-5" />
          </button>
        </Link>
      </div>
    </div>
  )
}
