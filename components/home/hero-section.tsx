"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight, X, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import { BRAND } from "@/lib/brand"
import { OFFER } from "@/lib/offer"

const heroImages = [
  "/01_homepage_hero_landscaper_trimming_hedges.png",
  "/02_homepage_hero_electrician_fixing_wiring.png",
  "/03_homepage_hero_contruction_contractor.png",
  "/04_homepage_hero_septic_man_at_work.png",
  "/05_homepage_hero_HVAC_tech_in_action.png",
  "/06_homepage_hero_roofer_in_action.png",
  "/07_homepage_hero_plumber_in_action.png",
]

export function HeroSection() {
  const [currentImage, setCurrentImage] = React.useState(0)
  const [showModal, setShowModal] = React.useState(false)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  const openModal = () => {
    setShowModal(true)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setShowModal(false)
    document.body.style.overflow = "auto"
  }

  return (
    <>
      <section className="relative h-[90vh] min-h-[600px] w-full overflow-hidden bg-background">
        {/* Background Carousel disabled intentionally. Keep the image list and markup below for an easy visual revert. */}
        {false && heroImages.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className={`h-full w-full bg-cover bg-center transition-transform duration-[10000ms] ease-linear ${
                index === currentImage ? "scale-110" : "scale-100"
              }`}
              style={{ backgroundImage: `url(${src})` }}
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          </div>
        ))}

        {/* Content */}
        <div className="relative z-10 flex h-full items-center justify-center px-4 md:px-6">
          <div className="mx-auto w-full max-w-5xl text-center">
            <h1 className="animate-fade-in-up text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
<span className="text-primary">Premium websites for your clients</span>{" "}
          <span className="text-secondary">— fulfilled behind your brand</span>
            </h1>
            <p className="animate-fade-in-up delay-100 mx-auto mt-6 max-w-3xl text-pretty text-base text-gray-300 md:text-lg">
              Get a fully custom website built from scratch — modern, fast, animated, SEO-ready, and tailored to your
              business. Pay ${OFFER.setupFee} upon completion, then just ${OFFER.monthlyFee}/month for hosting, SSL, and updates.
            </p>
            <div className="animate-fade-in-up delay-200 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="h-12 px-8" asChild>
                <Link href="/contact">
                  Become a partner <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary hover:shadow-[0_0_24px_rgba(23,158,199,0.35)] transition-all duration-300 bg-transparent"
                onClick={openModal}
              >
                See A Sample Of Our Work <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <p className="animate-fade-in-up delay-300 mt-4 text-sm text-gray-400">
              ${OFFER.setupFee} upon completion, then ${OFFER.monthlyFee}/month for hosting & updates.
            </p>
          </div>
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-background rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-[#8B4513]" />
                <div>
                  <h2 className="font-semibold text-lg">Elite Roofing</h2>
                  <p className="text-sm text-muted-foreground">Roofing Contractor</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild className="gap-2">
                  <a href={`https://eliteroofing.${BRAND.domain}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    Open in New Tab
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeModal}
                  className="rounded-full hover:bg-destructive/10 hover:text-destructive"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* iFrame */}
            <div className="flex-1 overflow-hidden">
              <iframe
                src={`https://eliteroofing.${BRAND.domain}`}
                className="w-full h-full border-0"
                title="Elite Roofing"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
