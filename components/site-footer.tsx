import Link from "next/link"
import Image from "next/image"
import { BRAND } from "@/lib/brand"

const footerLinks = {
  offer: [
    { name: "How It Works", href: "/how-it-works" },
    { name: "The Intake Form", href: "/intake" },
    { name: "Ways to Work", href: "/ways-to-work" },
    { name: "Pricing", href: "/pricing" },
    { name: "For Insurance Agencies", href: "/for-insurance-agencies" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
  ],
  policies: [
    { name: "Billing & Payments", href: "/billing" },
    { name: "Support & Edits", href: "/support" },
    { name: "Cancellation & Ownership", href: "/cancellation" },
    { name: "Partner Service Agreement", href: "/partner-service-agreement" },
    { name: "Terms", href: "/terms" },
    { name: "Privacy", href: "/privacy" },
  ],
  contact: [{ name: "Become a Partner", href: "/contact" }],
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-background/40">
      <div className="container max-w-7xl mx-auto px-4 py-12 md:px-6 md:py-16 lg:py-20">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/ghostwright-lockup-dark.png"
                alt="Ghostwright Web Development"
                width={220}
                height={64}
                className="h-auto w-[220px]"
              />
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">{BRAND.tagline}</p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Offer</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {footerLinks.offer.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Policies</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {footerLinks.policies.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Contact</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {footerLinks.contact.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <a href={`mailto:${BRAND.contactEmail}`} className="hover:text-primary transition-colors">
                  {BRAND.contactEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {BRAND.year} {BRAND.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
