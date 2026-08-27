import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  images: {
    minimumCacheTTL: 31536000,
    qualities: [75, 85],
  },
  async headers() {
    return [
      {
        source: "/assets/img/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;

void initOpenNextCloudflareForDev();
