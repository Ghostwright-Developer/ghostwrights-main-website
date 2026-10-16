import type { Metadata } from "next"
import { BRAND } from "@/lib/brand"

export const metadata: Metadata = {
  title: `Become a Partner | ${BRAND.short}`,
  description: "Tell us about your agency and how many contractors you onboard.",
  openGraph: {
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Ghostwright Web Development. Websites built under your name." }],
    title: `Become a Partner | ${BRAND.short}`,
    description: "Tell us about your agency and how many contractors you onboard.",
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
