import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Optimize barrel imports from lucide-react (react-best-practices skill)
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
