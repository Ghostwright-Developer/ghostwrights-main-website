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
      ...[
        "/partner-service-agreement.pdf",
        "/partner-service-agreement-v1.0.pdf",
        "/partner-service-agreement-v1.1.pdf",
      ].map((source) => ({
        source,
        destination: "/partner-service-agreement-v1.2.pdf",
        permanent: true,
      })),
    ]
  },
}

export default nextConfig
