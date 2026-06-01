import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
    ],
  },
  allowedDevOrigins: [
    "prudent-lawanna-unstunted.ngrok-free.dev",
    "*.ngrok-free.dev",
    "localhost:3000",
    "192.168.0.104"
  ],
};

export default nextConfig;
