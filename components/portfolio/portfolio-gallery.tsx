"use client"

import * as React from "react"
import Image from "next/image"
import { ExternalLink, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import type { PublicPortfolioSite } from "@/lib/portfolio"

export function PortfolioGallery({ sites }: { sites: PublicPortfolioSite[] }) {
  const [selectedSite, setSelectedSite] = React.useState<PublicPortfolioSite | null>(null)

  React.useEffect(() => {
    if (!selectedSite) return
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedSite(null)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [selectedSite])

  return (
    <>
      <section className="container pb-20">
        {sites.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {sites.map((site, index) => (
              <PortfolioCard key={site.id} site={site} priority={index < 3} onOpen={() => setSelectedSite(site)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">Portfolio sites coming soon...</p>
          </div>
        )}
      </section>

      {selectedSite && <PortfolioModal site={selectedSite} onClose={() => setSelectedSite(null)} />}
    </>
  )
}

function PortfolioCard({
  site,
  priority,
  onOpen,
}: {
  site: PublicPortfolioSite
  priority: boolean
  onOpen: () => void
}) {
  const animation = useScrollAnimation()

  return (
    <div
      ref={animation.ref as React.RefObject<HTMLDivElement>}
      className={`group animate-on-scroll ${animation.isVisible ? "visible" : ""}`}
    >
      <button
        type="button"
        onClick={onOpen}
        className="relative block w-full aspect-[8/5] overflow-hidden rounded-xl mb-4 border-2 border-border hover:border-primary transition-all duration-300 bg-muted shadow-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={`Preview ${site.name}`}
      >
        <Image
          src={site.thumbnail || "/placeholder.svg"}
          alt={`${site.name} homepage`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
          <span className="text-white font-semibold text-lg">Click to View Full Site</span>
        </span>
      </button>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-lg">{site.name}</h3>
          <Badge variant={site.label === "Live client site" ? "default" : "secondary"}>{site.label}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{site.type}</p>
        <p className="text-sm text-muted-foreground">{site.description}</p>
        <div className="flex gap-2">
          <Button className="flex-1" style={{ backgroundColor: site.color }} onClick={onOpen}>
            View Live Site
          </Button>
          <Button variant="outline" size="icon" asChild>
            <a href={site.previewPath} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              <span className="sr-only">Open {site.name} in a new tab</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}

function PortfolioModal({ site, onClose }: { site: PublicPortfolioSite; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="portfolio-modal-title"
        className="bg-background rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: site.color }} aria-hidden="true" />
            <div>
              <h2 id="portfolio-modal-title" className="font-semibold text-lg">
                {site.name}
              </h2>
              <p className="text-sm text-muted-foreground">{site.type}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="gap-2">
              <a href={site.previewPath} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                Open in New Tab
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close preview</span>
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <iframe
            src={site.previewPath}
            className="w-full h-full border-0"
            title={`${site.name} live preview`}
            sandbox="allow-same-origin allow-scripts allow-popups"
          />
        </div>
      </div>
    </div>
  )
}
