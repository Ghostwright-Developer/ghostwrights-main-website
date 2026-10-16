"use client"

import * as React from "react"
import { X, ExternalLink } from "lucide-react"
import { InlineContactForm } from "@/components/inline-contact-form"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { PORTFOLIO_SITES } from "@/lib/portfolio"

const portfolioSites = PORTFOLIO_SITES

export default function PortfolioPage() {
  const titleAnimation = useScrollAnimation()
  const subtitleAnimation = useScrollAnimation()
  const card1Animation = useScrollAnimation()
  const card2Animation = useScrollAnimation()
  const card3Animation = useScrollAnimation()
  const card4Animation = useScrollAnimation()

  const [selectedSite, setSelectedSite] = React.useState<(typeof portfolioSites)[0] | null>(null)
  const iframeRef = React.useRef<HTMLIFrameElement>(null)

  const openModal = (site: (typeof portfolioSites)[0]) => {
    setSelectedSite(site)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setSelectedSite(null)
    document.body.style.overflow = "auto"
  }

  const cardAnimations = [card1Animation, card2Animation, card3Animation, card4Animation]

  return (
    <div className="w-full">
      <div className="flex flex-col min-h-screen max-w-7xl mx-auto px-6 md:px-12">
        {/* Hero */}
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

        {/* Portfolio Grid */}
        <section className="container pb-20">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {portfolioSites.map((site, index) => {
              const animation = cardAnimations[index]
              return (
                <div
                  key={site.id}
                  ref={animation?.ref as React.RefObject<HTMLDivElement>}
                  className={`group cursor-pointer animate-on-scroll ${animation?.isVisible ? "visible" : ""}`}
                >
                  <div
                    className="relative aspect-[16/10] overflow-hidden rounded-xl mb-4 border-2 border-border hover:border-primary transition-all duration-300 bg-white shadow-lg"
                    onClick={() => openModal(site)}
                  >
                    <iframe
                      src={site.url}
                      className="w-full h-full border-0 pointer-events-none absolute top-0 left-0"
                      style={{
                        transform: "scale(0.33)",
                        transformOrigin: "0 0",
                        width: "300%",
                        height: "300%",
                      }}
                      title={`${site.name} preview`}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                      <span className="text-white font-semibold text-lg">Click to View Full Site</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{site.name}</h3>
                      <Badge variant={site.label === "Live client site" ? "default" : "secondary"}>{site.label}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{site.type}</p>
                    <p className="text-sm text-muted-foreground">{site.description}</p>
                    <div className="flex gap-2">
                      <Button
                        className="flex-1"
                        style={{ backgroundColor: site.color }}
                        onClick={() => openModal(site)}
                      >
                        View Live Site
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <a
                          href={site.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {portfolioSites.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">Portfolio sites coming soon...</p>
            </div>
          )}
        </section>

        {/* Inline Contact Form */}
        <InlineContactForm />
      </div>

      {/* Modal with iFrame */}
      {selectedSite && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-background rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: selectedSite.color }} />
                <div>
                  <h2 className="font-semibold text-lg">{selectedSite.name}</h2>
                  <p className="text-sm text-muted-foreground">{selectedSite.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild className="gap-2">
                  <a href={selectedSite.url} target="_blank" rel="noopener noreferrer">
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
                ref={iframeRef}
                src={selectedSite.url}
                className="w-full h-full border-0"
                title={selectedSite.name}
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
