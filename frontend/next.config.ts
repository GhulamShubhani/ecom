import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.22"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/blogs", destination: "/search", permanent: false },
      { source: "/blogs/:path*", destination: "/search", permanent: false },
    ];
  },
};

export default withFlowbiteReact(nextConfig);