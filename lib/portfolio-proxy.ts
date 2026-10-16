import "server-only"

const ASSET_EXTENSIONS =
  "png|jpe?g|gif|webp|avif|svg|ico|bmp|woff2?|ttf|otf|eot|css|js|mjs|map|json|webmanifest|xml|txt|mp4|webm|mp3|wav|ogg|pdf"

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

export function rewriteText(body: string, upstreamHost: string, prefix: string, isHtml: boolean) {
  const host = escapeRegExp(upstreamHost)
  const notPrefixed = `(?!/|${escapeRegExp(prefix.slice(1))}(?:/|["'\`\\s)?#]|$))`
  const escapedPrefix = prefix.replace(/\//g, "\\/")

  let out = body
    // Absolute URLs pointing at the real host, plain and JSON-escaped.
    .replace(new RegExp(`(?:https?:)?//${host}(?![\\w.-])`, "gi"), prefix)
    .replace(new RegExp(`(?:https?:)?\\\\/\\\\/${host}(?![\\w.-])`, "gi"), escapedPrefix)
    .replace(new RegExp(`https?%3A%2F%2F${host}(?![\\w.-])`, "gi"), encodeURIComponent(prefix))
    // Root-relative attribute values.
    .replace(
      new RegExp(`(\\s(?:src|href|action|poster|data-src)\\s*=\\s*["'])/${notPrefixed}`, "gi"),
      `$1${prefix}/`,
    )
    // srcset / imagesrcset lists.
    .replace(/(\s(?:srcset|imagesrcset)\s*=\s*)(["'])([^"']*)\2/gi, (_m, attr: string, quote: string, list: string) => {
      const fixed = list
        .split(",")
        .map((entry) => entry.replace(new RegExp(`^(\\s*)/${notPrefixed}`), `$1${prefix}/`))
        .join(",")
      return `${attr}${quote}${fixed}${quote}`
    })
    // CSS url(/...)
    .replace(new RegExp(`url\\(\\s*(["']?)/${notPrefixed}`, "gi"), `url($1${prefix}/`)
    // Next.js asset paths anywhere they appear after a delimiter.
    .replace(/(["'`(\s,=])\/_next\//g, `$1${prefix}/_next/`)
    .replace(/(["'`])\\\/_next\\\//g, `$1${escapedPrefix}\\/_next\\/`)
    // Quoted root-relative asset paths (e.g. "/logo.png" inside RSC payloads or JS).
    .replace(
      new RegExp(`(["'\`])/${notPrefixed}([^"'\`\\s?#<>]*\\.(?:${ASSET_EXTENSIONS}))(?=[?#"'\`])`, "gi"),
      `$1${prefix}/$2`,
    )

  if (!isHtml) {
    // React Router SPAs (Vite builds) match routes against the full pathname;
    // defaulting their basename to the prefix makes routes resolve under /s/{id}.
    out = out.replace(/(\{\s*basename\s*:\s*[A-Za-z_$][\w$]*\s*=\s*)(["'])\/\2/g, `$1(window.__GW_BASE__||"/")`)
  }

  if (isHtml) {
    out = out
      .replace(/<base\b[^>]*>/gi, "")
      .replace(/<meta\b[^>]*name\s*=\s*["']referrer["'][^>]*>/gi, "")
      .replace(/\sintegrity\s*=\s*["'][^"']*["']/gi, "")
  }

  return out
}

export function clientShim(prefix: string) {
  const p = JSON.stringify(prefix)
  return `<script>(function(){var P=${p};window.__GW_BASE__=P;
function fx(u){if(typeof u!=="string")return u;if(u.indexOf("//")===0)return u;
if(u.charAt(0)==="/"){return(u===P||u.indexOf(P+"/")===0||u.indexOf(P+"?")===0)?u:P+u;}
if(/^https?:/i.test(u)){try{var x=new URL(u);if(x.origin===location.origin&&x.pathname!==P&&x.pathname.indexOf(P+"/")!==0){x.pathname=P+x.pathname;return x.toString();}}catch(e){}}
return u;}
function fxAny(u){if(u instanceof URL)return new URL(fx(u.toString()));return fx(u);}
function fxSet(v){return String(v).split(",").map(function(s){var t=s.replace(/^\\s+/,"");return s.slice(0,s.length-t.length)+fx(t);}).join(",");}
var H=window.history;["pushState","replaceState"].forEach(function(k){var o=H[k];H[k]=function(s,t,u){return o.call(this,s,t,u==null?u:fxAny(u));};});
var F=window.fetch;if(F){window.fetch=function(i,o){if(typeof Request!=="undefined"&&i instanceof Request){var n=fx(i.url);if(n!==i.url)i=new Request(n,i);}else{i=fxAny(i);}return F.call(this,i,o);};}
var X=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(m,u){var a=Array.prototype.slice.call(arguments);a[1]=fxAny(u);return X.apply(this,a);};
var A={src:1,href:1,poster:1,action:1};var S=Element.prototype.setAttribute;
Element.prototype.setAttribute=function(n,v){var k=String(n).toLowerCase();if(A[k]&&typeof v==="string")v=fx(v);else if((k==="srcset"||k==="imagesrcset")&&typeof v==="string")v=fxSet(v);return S.call(this,n,v);};
function patch(C,prop,set){if(!C)return;var d=Object.getOwnPropertyDescriptor(C.prototype,prop);if(!d||!d.set)return;Object.defineProperty(C.prototype,prop,{configurable:true,enumerable:d.enumerable,get:d.get,set:function(v){d.set.call(this,set(v));}});}
[window.HTMLImageElement,window.HTMLScriptElement,window.HTMLSourceElement,window.HTMLMediaElement,window.HTMLIFrameElement].forEach(function(C){patch(C,"src",fx);});
patch(window.HTMLVideoElement,"poster",fx);patch(window.HTMLLinkElement,"href",fx);patch(window.HTMLFormElement,"action",fx);
patch(window.HTMLImageElement,"srcset",fxSet);patch(window.HTMLSourceElement,"srcset",fxSet);
})();</script>`
}

export function injectShim(html: string, prefix: string) {
  const shim = clientShim(prefix)
  const headMatch = html.match(/<head\b[^>]*>/i)
  if (headMatch && headMatch.index !== undefined) {
    const at = headMatch.index + headMatch[0].length
    return html.slice(0, at) + shim + html.slice(at)
  }
  return shim + html
}
