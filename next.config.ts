import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://flagsapi.com/**")],
  },
  allowedDevOrigins: ["192.168.2.200"],
  devIndicators: false,
};

export default nextConfig;
