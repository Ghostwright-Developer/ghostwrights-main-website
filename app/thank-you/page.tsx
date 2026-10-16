"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Home, X } from "lucide-react" // Added icons
import { BRAND } from "@/lib/brand"

export default function ThankYouPage() {
  const [firstName, setFirstName] = React.useState("")

  React.useEffect(() => {
    const stored = window.sessionStorage.getItem("gw_thanks_name")
    if (stored) setFirstName(stored)
  }, [])

  const handleClose = () => {
    // Close the tab/window
    if (typeof window !== "undefined") {
      window.close()
      // For browsers that block window.close(), try alternative approaches
      setTimeout(() => {
        if (!window.closed) {
          window.open("", "_self", "")
          window.close()
        }
      }, 100)
    }
  }

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-8 rounded-full bg-primary/10 p-6 ring-1 ring-primary/20 animate-in zoom-in duration-500">
        <CheckCircle className="h-20 w-20 text-primary" />
      </div>

      <h1 className="mb-6 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
        Partner inquiry received
      </h1>

      <p className="mb-10 max-w-md text-xl text-muted-foreground">
        {firstName ? `Thanks, ${firstName}.` : "Thanks for reaching out."} We&apos;ve received your agency details and will be in touch shortly to discuss how {BRAND.short} can support your clients.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Button size="lg" asChild className="min-w-[180px]">
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Back to Homepage
          </Link>
        </Button>

        <Button variant="pink" size="lg" onClick={handleClose} className="min-w-[180px]">
          <X className="mr-2 h-4 w-4" />
          Close Tab
        </Button>
      </div>
    </div>
  )
}
