import { BRAND } from "@/lib/brand"

export function FeaturedWork() {
  return (
    <section className="section-glow w-full bg-black py-20 md:py-28 border-t border-white/10">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">Sample Design</h2>
          <p className="mt-6 max-w-3xl mx-auto text-gray-400 text-base md:text-lg leading-relaxed">
            Preview a live website built for one of our service-business partners.
          </p>
        </div>

        <div className="mx-auto max-w-5xl overflow-hidden rounded-xl border-2 border-white/10 bg-white shadow-lg">
          <div className="aspect-[16/10] overflow-hidden">
            <iframe
              src={`https://ramas-roofing.${BRAND.domain}`}
              className="h-full w-full border-0"
              title="Rama&apos;s Roofing website preview"
              loading="lazy"
            />
          </div>
        </div>

        <div className="mt-6 text-center">
          <h3 className="text-xl font-semibold text-white">Rama&apos;s Roofing</h3>
          <p className="mt-2 text-sm text-gray-400">Roofing Contractor</p>
        </div>
      </div>
    </section>
  )
}
