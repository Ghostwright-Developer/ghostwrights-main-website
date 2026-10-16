"use client"

import * as React from "react"
import { X, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface IdleReassurancePopupProps {
  idleTimeMs?: number
}

export function IdleReassurancePopup({ idleTimeMs = 30000 }: IdleReassurancePopupProps) {
  const [showPopup, setShowPopup] = React.useState(false)
  const [hasShown, setHasShown] = React.useState(false)
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  React.useEffect(() => {
    if (hasShown) return

    const resetTimer = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        setShowPopup(true)
        setHasShown(true)
      }, idleTimeMs)
    }

    // Events that indicate user activity
    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart", "click"]

    // Set initial timer
    resetTimer()

    // Add event listeners
    events.forEach((event) => {
      document.addEventListener(event, resetTimer, true)
    })

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      events.forEach((event) => {
        document.removeEventListener(event, resetTimer, true)
      })
    }
  }, [idleTimeMs, hasShown])

  if (!showPopup) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <Card className="max-w-md mx-4 border-primary/20 shadow-2xl animate-in zoom-in-95 duration-300">
        <CardContent className="p-8 relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={() => setShowPopup(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>

          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-4 ring-1 ring-primary/20">
              <Shield className="h-10 w-10 text-primary" />
            </div>

            <h3 className="text-2xl font-bold mb-3 text-foreground">Your Privacy Matters</h3>

            <p className="text-muted-foreground leading-relaxed mb-6">
              We understand sharing your information online can feel risky. Rest assured, we'll{" "}
              <span className="font-semibold text-foreground">never</span> use your data for spam, sell it to third
              parties, or send you unwanted emails. We only use your contact info to discuss your project and provide
              updates.
            </p>

            <Button size="lg" onClick={() => setShowPopup(false)} className="w-full">
              Got it, thanks!
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
