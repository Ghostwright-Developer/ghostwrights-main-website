import { InlineContactForm } from "@/components/inline-contact-form"
import { PortfolioGallery } from "@/components/portfolio/portfolio-gallery"
import { PortfolioHero } from "@/components/portfolio/portfolio-hero"
import { publicPortfolio } from "@/lib/portfolio"

export default function PortfolioPage() {
  const sites = publicPortfolio()

  return (
    <div className="w-full">
      <div className="flex flex-col min-h-screen max-w-7xl mx-auto px-6 md:px-12">
        <PortfolioHero />
        <PortfolioGallery sites={sites} />
        <InlineContactForm />
      </div>
    </div>
  )
}
