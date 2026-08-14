import type { NextConfig } from "next";

const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  // Cloudflare Pages receives a pre-rendered static export. Vercel keeps the
  // default build path so it remains an independent rollback deployment.
  ...(isStaticExport ? { output: "export" as const, trailingSlash: true } : {}),

  // Production optimizations
  compress: true,
  poweredByHeader: false,

  // Image optimization — allow remote sources if needed
  images: {
    // Static hosts do not provide Next.js' default /_next/image endpoint.
    unoptimized: isStaticExport,
    formats: ["image/avif", "image/webp"],
  },

  // Strict Content Security (comment out if it breaks embedding)
  // headers: async () => [
  //   {
  //     source: "/(.*)",
  //     headers: [
  //       { key: "X-Frame-Options", value: "DENY" },
  //       { key: "X-Content-Type-Options", value: "nosniff" },
  //       { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  //     ],
  //   },
  // ],
};

export default nextConfig;
