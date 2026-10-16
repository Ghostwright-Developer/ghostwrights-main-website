import Link from "next/link"

import type { FaqItem } from "@/lib/faq"

export function FaqAnswer({ faq }: { faq: FaqItem }) {
  const index = faq.link ? faq.answer.indexOf(faq.link.label) : -1
  if (!faq.link || index === -1) return <>{faq.answer}</>

  return (
    <>
      {faq.answer.slice(0, index)}
      <Link href={faq.link.href} className="text-primary underline-offset-4 hover:underline">
        {faq.link.label}
      </Link>
      {faq.answer.slice(index + faq.link.label.length)}
    </>
  )
}
