import "server-only"

import { BRAND } from "@/lib/brand"

export interface PortfolioSite {
  id: string
  name: string
  type: string
  description: string
  thumbnail: string
  url: string
  color: string
  label: "Live client site" | "Sample build"
}

export type PublicPortfolioSite = Omit<PortfolioSite, "url"> & { previewPath: string }

// TODO: move samples to ghostwrightweb.com subdomains
const PORTFOLIO_SITES: PortfolioSite[] = [
  {
    id: "lone-star-septic",
    name: "Lone Star Septic",
    type: "Septic Services",
    description:
      "Expert septic tank pumping, maintenance, and repair services for residential and commercial properties.",
    thumbnail: "/images/portfolio/lone-star-septic.png",
    url: `https://lone-star.${BRAND.domain}`,
    color: "#2c5f2d",
    label: "Sample build",
  },
  {
    id: "ramas-roofing",
    name: "Roofing Contractor (Sample)",
    type: "Roofing Contractor",
    description: "Premium residential and commercial roofing solutions with expert craftsmanship and reliable service.",
    thumbnail: "/images/portfolio/ramas-roofing.png",
    url: `https://phoenix-roofer.${BRAND.domain}`,
    color: "#c41e3a",
    label: "Sample build",
  },
  {
    id: "elite-roofing",
    name: "Elite Roofing",
    type: "Roofing Contractor",
    description: "Professional roofing services specializing in residential and commercial projects.",
    thumbnail: "/images/portfolio/elite-roofing.png",
    url: `https://eliteroofing.${BRAND.domain}`,
    color: "#8B4513",
    label: "Sample build",
  },
  {
    id: "custom-remodeling-atl",
    name: "Custom Remodeling ATL",
    type: "Remodeling Contractor",
    description:
      "Expert home remodeling and renovation services in Atlanta, specializing in kitchens, bathrooms, and whole-home transformations.",
    thumbnail: "/images/portfolio/custom-remodeling-atl.png",
    url: "https://customremodelingatl.com",
    color: "#D4A574",
    label: "Live client site",
  },
  {
    id: "cindermesa-hardscapes",
    name: "Cindermesa Hardscapes",
    type: "Hardscaping Contractor",
    description:
      "Paver patios, retaining walls, driveways, flagstone walkways, and fire pits across the Tucson area.",
    thumbnail: "/images/portfolio/cindermesa-hardscapes.png",
    url: "https://cindermesa-hardscapes.vercel.app",
    color: "#4d7c0f",
    label: "Sample build",
  },
]

export function getPortfolioSite(id: string): PortfolioSite | undefined {
  return PORTFOLIO_SITES.find((site) => site.id === id)
}

export function publicPortfolio(): PublicPortfolioSite[] {
  return PORTFOLIO_SITES.map(({ url: _url, ...site }) => ({
    ...site,
    previewPath: `/s/${site.id}/`,
  }))
}
