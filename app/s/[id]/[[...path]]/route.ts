import type { NextRequest } from "next/server"
import { getPortfolioSite } from "@/lib/portfolio"
import { injectShim, rewriteText } from "@/lib/portfolio-proxy"

export const dynamic = "force-dynamic"

const FORWARDED_REQUEST_HEADERS = [
  "accept",
  "accept-language",
  "user-agent",
  "range",
  "rsc",
  "next-router-state-tree",
  "next-router-prefetch",
  "next-router-segment-prefetch",
  "next-url",
]

const FORWARDED_RESPONSE_HEADERS = [
  "content-type",
  "content-language",
  "content-range",
  "accept-ranges",
  "etag",
  "last-modified",
  "x-nextjs-stale-time",
  "x-nextjs-postponed",
  "x-nextjs-prerender",
]

const MAX_INTERNAL_HOPS = 5

function unavailable(status = 502) {
  return new Response(
    `<!doctype html><html><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>Unavailable</title></head><body style="font-family:system-ui,sans-serif;display:flex;min-height:100vh;align-items:center;justify-content:center;margin:0;color:#555"><p>This sample is unavailable right now.</p></body></html>`,
    {
      status,
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "no-store",
        "x-robots-tag": "noindex, nofollow",
      },
    },
  )
}

function stripSlash(path: string) {
  return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path
}

async function proxy(request: NextRequest, params: Promise<{ id: string; path?: string[] }>) {
  const { id } = await params
  const site = getPortfolioSite(id)
  if (!site) return unavailable(404)

  const upstreamOrigin = new URL(site.url).origin
  const upstreamHost = new URL(site.url).host
  const prefix = `/s/${id}`

  const incomingPath = request.nextUrl.pathname.slice(prefix.length) || "/"
  let target = new URL(incomingPath + request.nextUrl.search, upstreamOrigin)
  if (target.origin !== upstreamOrigin) return unavailable(404)

  const headers = new Headers()
  for (const name of FORWARDED_REQUEST_HEADERS) {
    const value = request.headers.get(name)
    if (value === null) continue
    if (name === "next-url" && (value === prefix || value.startsWith(`${prefix}/`))) {
      headers.set(name, value.slice(prefix.length) || "/")
    } else {
      headers.set(name, value)
    }
  }

  let upstream: Response
  try {
    for (let hop = 0; ; hop++) {
      upstream = await fetch(target, {
        method: request.method,
        headers,
        redirect: "manual",
        cache: "no-store",
        signal: AbortSignal.timeout(15000),
      })

      const location = upstream.headers.get("location")
      if (upstream.status < 300 || upstream.status >= 400 || !location) break

      const next = new URL(location, target)
      if (next.host !== upstreamHost) return unavailable(404)

      // Our site enforces trailing slashes; following slash-only redirects
      // server-side avoids an infinite redirect loop with the upstream.
      const slashOnly = stripSlash(next.pathname) === stripSlash(target.pathname) && next.search === target.search
      if (slashOnly && hop < MAX_INTERNAL_HOPS) {
        target = next
        continue
      }

      return new Response(null, {
        status: upstream.status,
        headers: {
          location: `${prefix}${next.pathname}${next.search}${next.hash}`,
          "cache-control": "no-store",
          "x-robots-tag": "noindex, nofollow",
        },
      })
    }
  } catch {
    return unavailable()
  }

  if (upstream.status >= 500) return unavailable()

  const responseHeaders = new Headers()
  for (const name of FORWARDED_RESPONSE_HEADERS) {
    const value = upstream.headers.get(name)
    if (value !== null) responseHeaders.set(name, value)
  }
  responseHeaders.set("x-robots-tag", "noindex, nofollow")
  responseHeaders.set("vary", "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch")

  const contentType = (upstream.headers.get("content-type") || "").toLowerCase()
  const isHtml = contentType.includes("text/html")
  const isRsc = contentType.includes("text/x-component") || request.headers.has("rsc")
  const isText =
    isHtml ||
    isRsc ||
    contentType.includes("javascript") ||
    contentType.includes("text/css") ||
    contentType.includes("json") ||
    contentType.includes("text/plain")

  if (isHtml || isRsc) {
    responseHeaders.set("cache-control", "no-store")
  } else if (isText) {
    responseHeaders.set("cache-control", "public, max-age=300")
  } else {
    responseHeaders.set("cache-control", "public, max-age=3600, s-maxage=86400")
  }

  if (request.method === "HEAD" || upstream.status === 204 || upstream.status === 304) {
    return new Response(null, { status: upstream.status, headers: responseHeaders })
  }

  if (!isText) {
    return new Response(upstream.body, { status: upstream.status, headers: responseHeaders })
  }

  let body = rewriteText(await upstream.text(), upstreamHost, prefix, isHtml)
  if (isHtml) body = injectShim(body, prefix)

  return new Response(body, { status: upstream.status, headers: responseHeaders })
}

type RouteContext = { params: Promise<{ id: string; path?: string[] }> }

export function GET(request: NextRequest, { params }: RouteContext) {
  return proxy(request, params)
}

export function HEAD(request: NextRequest, { params }: RouteContext) {
  return proxy(request, params)
}
