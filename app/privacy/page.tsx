import type { Metadata } from "next"
import { Reveal } from "@/components/reveal"
import { BRAND } from "@/lib/brand"

export const metadata: Metadata = {
  title: `Privacy Policy | ${BRAND.short}`,
  description: "How Ghostwright collects, uses, and protects information.",
  openGraph: {
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Ghostwright Web Development. Websites built under your name." }],
    title: `Privacy Policy | ${BRAND.short}`,
    description: "How Ghostwright collects, uses, and protects information.",
  },
}

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="container max-w-7xl mx-auto px-4 py-20 max-w-4xl">
        <Reveal as="div">
          <h1 className="text-4xl font-bold tracking-tighter mb-6">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: October 3, 2026</p>
        </Reveal>

        <div className="prose prose-invert max-w-none space-y-8">
          <Reveal as="section">
            <h2 className="text-2xl font-bold mb-4">Who we are</h2>
            <p className="text-muted-foreground leading-relaxed">{BRAND.legalName}.</p>
          </Reveal>

          <Reveal as="section">
            <h2 className="text-2xl font-bold mb-4">Information we collect</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>
                Contact form details (name, email, phone, agency name, website, type, volume, message)
              </li>
              <li>
                Intake information for sites we build for a partner&apos;s clients, such as business name, contact
                details, service information, logos, photos, and licensing or credential statements the client asks
                us to show
              </li>
              <li>Email messages with a partner&apos;s client, if the partner chooses the web-team option</li>
              <li>Business details, files, and answers a client submits through an intake form on a partner&apos;s website</li>
              <li>
                Images and logos a client uploads through an intake form, and the choices they make about editing them
              </li>
              <li>
                Partner billing contacts, while payments are handled by a payment processor and we do not store card
                numbers
              </li>
              <li>Technical data such as IP address, device, browser, and pages visited</li>
            </ul>
          </Reveal>

          <Reveal as="section">
            <h2 className="text-2xl font-bold mb-4">How we use it</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>To respond to inquiries</li>
              <li>To build, host, and maintain sites</li>
              <li>To invoice partners</li>
              <li>To secure and improve this site</li>
              <li>To meet legal obligations</li>
            </ul>
          </Reveal>

          <Reveal as="section">
            <h2 className="text-2xl font-bold mb-4">Client information</h2>
            <p className="text-muted-foreground leading-relaxed">
              When we build a site for a partner&apos;s client, we use the information to build and maintain
              that site. By default the partner is the client&apos;s point of contact. If the partner chooses the
              web-team option, we also communicate with the client by email about their site, from an address on the
              partner&apos;s domain. Partners are responsible for having any consents they need from their clients.
            </p>
          </Reveal>

          <Reveal as="section">
            <h2 className="text-2xl font-bold mb-4">Sharing</h2>
            <p className="text-muted-foreground leading-relaxed">
              We do not sell personal information. We share it with service providers for hosting, email, forms,
              invoicing and payments, and analytics only as needed, and when the law requires.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              We may use image-editing and image-generation tools, including AI-assisted tools, from third-party
              providers to prepare images for a website. We send only the images needed.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Contact-form messages on sites we build go through the client&apos;s own EmailJS account and do not
              pass through our systems.
            </p>
          </Reveal>

          <Reveal as="section">
            <h2 className="text-2xl font-bold mb-4">Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We keep information as long as needed for these purposes. After a site is cancelled we keep a backup
              for 45 days, then remove the client&apos;s identifying content from our retained copy, except records
              we must keep for legal or billing reasons. Files uploaded through an intake form are stored privately
              and deleted about 90 days after launch.
            </p>
          </Reveal>

          <Reveal as="section">
            <h2 className="text-2xl font-bold mb-4">Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use reasonable measures. No method of transmission is 100% secure.
            </p>
          </Reveal>

          <Reveal as="section">
            <h2 className="text-2xl font-bold mb-4">Your choices</h2>
            <p className="text-muted-foreground leading-relaxed">
              You can ask to access, correct, or delete your information, or opt out of marketing, through the
              contact page.
            </p>
          </Reveal>

          <Reveal as="section">
            <h2 className="text-2xl font-bold mb-4">Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use cookies and similar tools for analytics. You can control them in your browser.
            </p>
          </Reveal>

          <Reveal as="section">
            <h2 className="text-2xl font-bold mb-4">Children</h2>
            <p className="text-muted-foreground leading-relaxed">
              This site is for businesses and is not directed to children.
            </p>
          </Reveal>

          <Reveal as="section">
            <h2 className="text-2xl font-bold mb-4">Changes</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
              new policy on this page and updating the &quot;Last updated&quot; date.
            </p>
          </Reveal>

          <Reveal as="section">
            <h2 className="text-2xl font-bold mb-4">Contact</h2>
            <p className="text-muted-foreground leading-relaxed">Use the contact page.</p>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
