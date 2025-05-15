import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   experimental: {
//     allowedDevOrigins: ['http://192.168.100.115:3000'], // Replace with your actual IP and port
//   },
// };

// export default nextConfig;


// module.exports = {
//   images: {
//     domains: ['robohash.org'], 
//   },
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
// };

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['robohash.org'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    appDir: true,
    optimizeCss: false,
    serverActions: true,
    serverComponentsExternalPackages: [],
  },
  webpack: (config: import('webpack').Configuration) => {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname),
    };
    return config;
  },

  optimizeFonts: true,
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  trailingSlash: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
