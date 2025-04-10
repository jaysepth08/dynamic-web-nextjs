import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    allowedDevOrigins: ['http://192.168.100.115:3000'], // Replace with your actual IP and port
  },
};

export default nextConfig;
