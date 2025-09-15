import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'localhost:8001'],
    },
  },
  turbopack: {
    root: path.join(__dirname, "../.."),
  },
  serverExternalPackages: ['axios'],
  env: {
    SERVICES_BASE_URL: process.env.SERVICES_BASE_URL || 'http://localhost:8001',
  },
};

export default nextConfig;
