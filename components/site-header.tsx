"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navigation = [
  { name: "How It Works", href: "/how-it-works" },
  { name: "Pricing", href: "/pricing" },
  { name: "For Insurance Agencies", href: "/for-insurance-agencies" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "FAQ", href: "/faq" },
]

export function SiteHeader() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-border bg-black/60 backdrop-blur transition-all duration-300 ${
        isScrolled ? "h-14" : "h-16"
      }`}
    >
      <div
        className={`container max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 transition-all duration-300 ${
          isScrolled ? "h-14" : "h-16"
        }`}
      >
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <Image
              src="/ghostwright-header-dark.png"
              alt="Ghostwright Web Development"
              width={221}
              height={40}
              priority
              className={`w-auto transition-all duration-300 ${isScrolled ? "h-8" : "h-8 sm:h-10"}`}
            />
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="nav-link text-gray-300 transition-colors hover:text-white"
            >
              {item.name}
            </Link>
          ))}
          <Button
            size="sm"
            variant="outline"
            className="ml-4 border-secondary text-secondary hover:bg-[rgba(186,0,226,0.12)] hover:shadow-[0_0_24px_rgba(186,0,226,0.35)] active:scale-[0.98] transition-all duration-200 bg-transparent"
            asChild
          >
            <Link href="/contact">Become a Partner</Link>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-lg font-medium text-foreground hover:text-primary transition-colors px-4 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button
                variant="outline"
                className="mt-4 w-full border-secondary text-secondary hover:bg-[rgba(186,0,226,0.12)] hover:shadow-[0_0_24px_rgba(186,0,226,0.35)] active:scale-[0.98] transition-all duration-200 bg-transparent"
                asChild
              >
                <Link href="/contact">Become a Partner</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
