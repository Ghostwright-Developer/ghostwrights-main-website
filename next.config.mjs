/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "notfair.co",
        pathname: "/api/seo/**",
      },
    ],
  },
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/partner-agreement",
        destination: "/partner-service-agreement",
        permanent: true,
      },
      {
        source: "/partner-agreement/",
        destination: "/partner-service-agreement",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
