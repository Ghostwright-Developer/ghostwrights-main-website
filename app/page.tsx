import type { Metadata } from "next"
import { PartnerHome } from "@/components/partner-home"
import { BRAND } from "@/lib/brand"

export const metadata: Metadata = {
  title: `White-Label Websites for Contractor Agencies | ${BRAND.short}`,
  description: `Custom-coded websites for your contractor clients, built and maintained under your brand. $149 setup per site, then $25/month.`,
  openGraph: {
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Ghostwright Web Development. Websites built under your name." }],
    title: `White-Label Websites for Contractor Agencies | ${BRAND.short}`,
    description: `Custom-coded websites for your contractor clients, built and maintained under your brand. $149 setup per site, then $25/month.`,
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BRAND.name,
  url: `${BRAND.url}/`,
  description: "White-label website fulfillment for contractor-focused agencies.",
}

export default function Home() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><PartnerHome /></>
}
