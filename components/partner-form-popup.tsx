"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { ArrowRight, X } from "lucide-react"

import { PartnerForm } from "@/components/partner-form"

const POPUP_DELAY_MS = 180000
const SESSION_KEY = "gw_popup_seen"

/**
 * Site-wide partner-form modal shown once per session, three minutes after arrival.
 * Never shown on /contact, which already has its own dedicated form and idle popup.
 */
export function PartnerFormPopup() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)
  const excluded = pathname === "/contact"

  React.useEffect(() => {
    if (excluded) return
    if (typeof window === "undefined") return
    if (window.sessionStorage.getItem(SESSION_KEY)) return

    const timer = window.setTimeout(() => {
      setOpen(true)
      window.sessionStorage.setItem(SESSION_KEY, "true")
    }, POPUP_DELAY_MS)

    return () => window.clearTimeout(timer)
  }, [excluded])

  React.useEffect(() => {
    if (!open) return
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [open])

  if (excluded || !open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Become a partner"
      className="popup-overlay fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={(event) => {
        if (event.target === event.currentTarget) setOpen(false)
      }}
    >
      <div className="popup-panel relative z-[61] max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-primary/30 bg-card shadow-[0_0_60px_rgba(23,158,199,0.2)]">
        <div className="sticky top-0 z-10 overflow-hidden border-b border-primary/20 bg-card/95 px-6 py-7 backdrop-blur-xl md:px-8">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(23,158,199,0.16),transparent_48%,rgba(168,85,247,0.12))]" />
          <div className="relative pr-12">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-primary">Become a partner</p>
            <h2 className="text-balance text-2xl font-bold tracking-tight text-primary md:text-3xl">
              Add websites to your offer, without adding a web department.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
              Tell us a little about your agency. We&apos;ll follow up with the details and answer your questions.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-primary/25 bg-background/80 text-muted-foreground transition-all duration-200 hover:scale-105 hover:border-primary hover:text-primary"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="bg-[linear-gradient(180deg,rgba(23,158,199,0.04),transparent_24%)] p-1 md:p-3">
          <PartnerForm compact source="popup" onSuccess={() => setOpen(false)} />
        </div>
        <div className="flex items-center justify-center gap-2 border-t border-border/60 bg-background/40 px-6 py-4 text-xs text-muted-foreground">
          <span>No pressure. Just a straightforward conversation.</span>
          <ArrowRight className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}
