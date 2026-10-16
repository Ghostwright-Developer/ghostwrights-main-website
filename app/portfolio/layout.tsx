import type { Metadata } from "next"
import { BRAND } from "@/lib/brand"

export const metadata: Metadata = {
  title: `Contractor Website Portfolio | ${BRAND.short}`,
  description: "Sites built for roofing, remodeling, and septic contractors, delivered under partner brands.",
  openGraph: {
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Ghostwright Web Development. Websites built under your name." }],
    title: `Contractor Website Portfolio | ${BRAND.short}`,
    description: "Sites built for roofing, remodeling, and septic contractors, delivered under partner brands.",
  },
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children
}
