import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Production optimizations
  compress: true,
  poweredByHeader: false,

  // Image optimization — allow remote sources if needed
  images: {
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
