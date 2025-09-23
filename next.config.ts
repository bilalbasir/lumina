import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use a custom build directory to avoid permission issues with default .next
  distDir: ".next-dev",

  images: {
    domains: ["images.unsplash.com"],
  },
};

export default nextConfig;
