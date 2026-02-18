import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com", "localhost", "api.builder.io", "res.cloudinary.com"],
  },
  eslint: {
    ignoreDuringBuilds: true, // disables ESLint checks during build
  },
};

export default nextConfig;
