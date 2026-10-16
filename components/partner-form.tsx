"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ChevronDown, Loader2 } from "lucide-react"
import emailjs from "@emailjs/browser"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { BRAND } from "@/lib/brand"
import { cn } from "@/lib/utils"

const AGENCY_TYPES = [
  "Insurance agency",
  "Business setup or formation",
  "Lead generation",
  "Marketing agency",
  "Other",
]

const MONTHLY_VOLUMES = ["1–5", "6–20", "21–50", "50+"]

const COMMUNICATION_PREFERENCES = [
  "Fully white-label: you are our only contact",
  "As your web team: use an email address on my domain",
  "Not sure yet",
]

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const COOLDOWN_KEY = "gw_last_submit"
const COOLDOWN_MS = 30000

const MAX_LENGTHS = {
  name: 100,
  agencyName: 150,
  businessesServed: 200,
  message: 2000,
}

const selectClassName = cn(
  "border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30 appearance-none pr-8",
  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
)

function normalizeWebsiteUrl(value: string): string | null {
  const trimmed = value.trim()
  if (!trimmed) return null
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
  try {
    const parsed = new URL(withProtocol)
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null
    return parsed.href
  } catch {
    return null
  }
}

type FormErrors = Partial<
  Record<
    "name" | "email" | "agency_name" | "agency_url" | "agency_type" | "businesses_served" | "monthly_volume" | "communication_preference" | "message",
    string
  >
>

type FormStatus = { type: "sending" } | { type: "cooldown" } | { type: "error" } | null

interface PartnerFormProps {
  compact?: boolean
  source?: "page" | "popup"
  onSuccess?: () => void
}

export function PartnerForm({ compact = false, source = "page", onSuccess }: PartnerFormProps) {
  const router = useRouter()
  const uid = React.useId()
  const formRef = React.useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [agencyType, setAgencyType] = React.useState("")
  const [monthlyVolume, setMonthlyVolume] = React.useState("")
  const [communicationPreference, setCommunicationPreference] = React.useState("")
  const [errors, setErrors] = React.useState<FormErrors>({})
  const [status, setStatus] = React.useState<FormStatus>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus(null)

    const formData = new FormData(e.currentTarget)
    const honeypot = ((formData.get("company_website") as string) || "").trim()

    const name = ((formData.get("name") as string) || "").trim()
    const email = ((formData.get("email") as string) || "").trim().toLowerCase()
    const phone = ((formData.get("phone") as string) || "").trim()
    const agencyName = ((formData.get("agency_name") as string) || "").trim()
    const rawAgencyUrl = (formData.get("agency_url") as string) || ""
    const businessesServed = ((formData.get("businesses_served") as string) || "").trim()
    const message = ((formData.get("message") as string) || "").trim()

    const nextErrors: FormErrors = {}

    if (!name) nextErrors.name = "Please enter your name."
    else if (name.length > MAX_LENGTHS.name) nextErrors.name = `Name must be ${MAX_LENGTHS.name} characters or fewer.`

    if (!email) nextErrors.email = "Please enter your email."
    else if (!EMAIL_REGEX.test(email)) nextErrors.email = "Enter a valid email address."

    if (!agencyName) nextErrors.agency_name = "Please enter your agency name."
    else if (agencyName.length > MAX_LENGTHS.agencyName)
      nextErrors.agency_name = `Agency name must be ${MAX_LENGTHS.agencyName} characters or fewer.`

    let normalizedUrl = ""
    if (!rawAgencyUrl.trim()) {
      nextErrors.agency_url = "Please enter your agency website URL."
    } else {
      const parsed = normalizeWebsiteUrl(rawAgencyUrl)
      if (!parsed) nextErrors.agency_url = "Enter a valid website address"
      else normalizedUrl = parsed
    }

    if (!agencyType) nextErrors.agency_type = "Please select your agency type."

    if (!businessesServed) nextErrors.businesses_served = "Please tell us what businesses you serve."
    else if (businessesServed.length > MAX_LENGTHS.businessesServed)
      nextErrors.businesses_served = `Please keep this under ${MAX_LENGTHS.businessesServed} characters.`

    if (!monthlyVolume) nextErrors.monthly_volume = "Please select a range."

    if (!communicationPreference) nextErrors.communication_preference = "Please select an option."

    if (message.length > MAX_LENGTHS.message) nextErrors.message = `Please keep this under ${MAX_LENGTHS.message} characters.`

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    if (!honeypot) {
      const lastSubmit = Number(window.sessionStorage.getItem(COOLDOWN_KEY) || 0)
      if (Date.now() - lastSubmit < COOLDOWN_MS) {
        setStatus({ type: "cooldown" })
        return
      }
    }

    setIsSubmitting(true)
    setStatus({ type: "sending" })

    try {
      if (!honeypot) {
        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

        if (!serviceId || !templateId || !publicKey) {
          throw new Error("Missing EmailJS configuration")
        }

        const params = {
          name,
          email,
          phone: phone || "Not provided",
          agency_name: agencyName,
          agency_url: normalizedUrl,
          agency_type: agencyType,
          businesses_served: businessesServed,
          monthly_volume: monthlyVolume,
          communication_preference: communicationPreference,
          message: message || "Not provided",
          page_url: window.location.href,
          submitted_at: `${new Intl.DateTimeFormat("en-US", {
            timeZone: "America/Phoenix",
            dateStyle: "medium",
            timeStyle: "short",
          }).format(new Date())} (Arizona time)`,
          form_source: source,
        }

        await emailjs.send(serviceId, templateId, params, { publicKey })

        window.sessionStorage.setItem(COOLDOWN_KEY, String(Date.now()))
      }

      const firstName = name.split(/\s+/)[0]
      window.sessionStorage.setItem("gw_thanks_name", firstName)

      if (source === "popup") {
        window.sessionStorage.setItem("gw_popup_seen", "true")
        onSuccess?.()
      }

      formRef.current?.reset()
      setAgencyType("")
      setMonthlyVolume("")
      setErrors({})
      setStatus(null)
      router.push("/thank-you")
    } catch {
      setStatus({ type: "error" })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className={compact ? "border-primary/20 bg-background/55 shadow-none" : "border-border/50"}>
      <CardContent className={compact ? "p-5 md:p-6" : "p-6 md:p-8"}>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="hidden" aria-hidden="true">
            <input
              type="text"
              name="company_website"
              tabIndex={-1}
              autoComplete="off"
              defaultValue=""
              aria-hidden="true"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor={`${uid}-name`} className="text-sm font-medium leading-none">
                Name *
              </label>
              <Input
                id={`${uid}-name`}
                name="name"
                required
                maxLength={MAX_LENGTHS.name}
                aria-invalid={Boolean(errors.name) || undefined}
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor={`${uid}-email`} className="text-sm font-medium leading-none">
                Email *
              </label>
              <Input
                id={`${uid}-email`}
                name="email"
                type="email"
                required
                aria-invalid={Boolean(errors.email) || undefined}
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor={`${uid}-phone`} className="text-sm font-medium leading-none">
              Phone (optional)
            </label>
            <Input id={`${uid}-phone`} name="phone" type="tel" />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor={`${uid}-agency-name`} className="text-sm font-medium leading-none">
                Agency name *
              </label>
              <Input
                id={`${uid}-agency-name`}
                name="agency_name"
                required
                maxLength={MAX_LENGTHS.agencyName}
                aria-invalid={Boolean(errors.agency_name) || undefined}
              />
              {errors.agency_name && <p className="text-sm text-destructive">{errors.agency_name}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor={`${uid}-agency-url`} className="text-sm font-medium leading-none">
                Agency website URL *
              </label>
              <Input
                id={`${uid}-agency-url`}
                name="agency_url"
                type="text"
                required
                placeholder="https://"
                aria-invalid={Boolean(errors.agency_url) || undefined}
              />
              {errors.agency_url && <p className="text-sm text-destructive">{errors.agency_url}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor={`${uid}-agency-type`} className="text-sm font-medium leading-none">
              Agency type *
            </label>
            <div className="relative">
              <select
                id={`${uid}-agency-type`}
                name="agency_type"
                required
                value={agencyType}
                onChange={(e) => setAgencyType(e.target.value)}
                aria-invalid={Boolean(errors.agency_type) || undefined}
                className={selectClassName}
              >
                <option value="" disabled>
                  Select agency type
                </option>
                {AGENCY_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
            {errors.agency_type && <p className="text-sm text-destructive">{errors.agency_type}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor={`${uid}-businesses-served`} className="text-sm font-medium leading-none">
              What businesses do you serve? *
            </label>
            <Textarea
              id={`${uid}-businesses-served`}
              name="businesses_served"
              className="min-h-[100px]"
              required
              maxLength={MAX_LENGTHS.businessesServed}
              placeholder="Tell us about your contractor clients"
              aria-invalid={Boolean(errors.businesses_served) || undefined}
            />
            {errors.businesses_served && <p className="text-sm text-destructive">{errors.businesses_served}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor={`${uid}-monthly-volume`} className="text-sm font-medium leading-none">
              How many new businesses do you onboard per month? *
            </label>
            <div className="relative">
              <select
                id={`${uid}-monthly-volume`}
                name="monthly_volume"
                required
                value={monthlyVolume}
                onChange={(e) => setMonthlyVolume(e.target.value)}
                aria-invalid={Boolean(errors.monthly_volume) || undefined}
                className={selectClassName}
              >
                <option value="" disabled>
                  Select a range
                </option>
                {MONTHLY_VOLUMES.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
            {errors.monthly_volume && <p className="text-sm text-destructive">{errors.monthly_volume}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor={`${uid}-communication-preference`} className="text-sm font-medium leading-none">
              How hands-on do you want to be? *
            </label>
            <div className="relative">
              <select
                id={`${uid}-communication-preference`}
                name="communication_preference"
                required
                value={communicationPreference}
                onChange={(e) => setCommunicationPreference(e.target.value)}
                aria-invalid={Boolean(errors.communication_preference) || undefined}
                className={selectClassName}
              >
                <option value="" disabled>
                  Select an option
                </option>
                {COMMUNICATION_PREFERENCES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
            {errors.communication_preference && (
              <p className="text-sm text-destructive">{errors.communication_preference}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor={`${uid}-message`} className="text-sm font-medium leading-none">
              Tell us about your agency (optional)
            </label>
            <Textarea
              id={`${uid}-message`}
              name="message"
              className="min-h-[100px]"
              maxLength={MAX_LENGTHS.message}
              placeholder="Anything else we should know?"
              aria-invalid={Boolean(errors.message) || undefined}
            />
            {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending…
              </>
            ) : (
              "Request Partner Info"
            )}
          </Button>

          <div role="status" aria-live="polite" className="min-h-[1.25rem]">
            {status?.type === "sending" && <p className="text-sm text-muted-foreground">Sending…</p>}
            {status?.type === "cooldown" && (
              <p className="text-sm text-destructive">Please wait a moment before sending another inquiry.</p>
            )}
            {status?.type === "error" && (
              <p className="text-sm text-destructive">
                Something went wrong. Please email{" "}
                <a href={`mailto:${BRAND.contactEmail}`} className="underline hover:text-destructive/80">
                  {BRAND.contactEmail}
                </a>{" "}
                directly.
              </p>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default PartnerForm
