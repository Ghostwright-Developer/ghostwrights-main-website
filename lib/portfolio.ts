import { BRAND } from "@/lib/brand"

export interface PortfolioSite {
  id: string
  name: string
  type: string
  description: string
  url: string
  color: string
  label: "Live client site" | "Sample build"
}

// TODO: move samples to ghostwrightweb.com subdomains
export const PORTFOLIO_SITES: PortfolioSite[] = [
  {
    id: "lone-star-septic",
    name: "Lone Star Septic",
    type: "Septic Services",
    description:
      "Expert septic tank pumping, maintenance, and repair services for residential and commercial properties.",
    url: `https://lone-star.${BRAND.domain}`,
    color: "#2c5f2d",
    label: "Sample build",
  },
  {
    id: "ramas-roofing",
    name: "Roofing Contractor (Sample)",
    type: "Roofing Contractor",
    description: "Premium residential and commercial roofing solutions with expert craftsmanship and reliable service.",
    url: "https://phoenix-roofer.ghostwrightweb.com",
    color: "#c41e3a",
    label: "Sample build",
  },
  {
    id: "elite-roofing",
    name: "Elite Roofing",
    type: "Roofing Contractor",
    description: "Professional roofing services specializing in residential and commercial projects.",
    url: `https://eliteroofing.${BRAND.domain}`,
    color: "#8B4513",
    label: "Sample build",
  },
  {
    id: "custom-remodeling-atl",
    name: "Custom Remodeling ATL",
    type: "Remodeling Contractor",
    description: "Expert home remodeling and renovation services in Atlanta, specializing in kitchens, bathrooms, and whole-home transformations.",
    url: "https://customremodelingatl.com",
    color: "#D4A574",
    label: "Live client site",
  },
]
