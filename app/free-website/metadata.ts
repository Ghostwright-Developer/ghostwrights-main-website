import type { Metadata } from "next"
import { BRAND } from "@/lib/brand"
import { OFFER } from "@/lib/offer"

export const metadata: Metadata = {
  title: `Get a Free Website for Your Business | Only $${OFFER.monthlyFee}/Month to Keep It Live | ${BRAND.name}`,
  description: `Get a 100% free custom-coded website for your service business. No setup fees, no hidden costs. Just $${OFFER.monthlyFee}/month for hosting, SSL, updates, and real support. Affordable website design for small businesses.`,
  keywords: [
    "free website",
    "free web design",
    "free business website",
    "affordable website",
    "cheap website",
    "premium website",
    "low cost website",
    "small business website",
    "free website design",
    "custom website free",
    "free website for small business",
  ],
  openGraph: {
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Ghostwright Web Development. Websites built under your name." }],
    title: `Get a Free Custom Website — Only $${OFFER.monthlyFee}/Month | ${BRAND.name}`,
    description: `Professional, custom-coded website built free for your service business. Only $${OFFER.monthlyFee}/month for hosting, updates, and support.`,
    type: "website",
  },
}
