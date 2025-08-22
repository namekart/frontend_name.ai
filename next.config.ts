import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // Enable standalone feature for optimized app size
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
};

export default nextConfig;
