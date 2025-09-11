import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Rewrites để proxy API
  async rewrites() {
    return [
      {
        source: '/api/:path*', // tất cả request bắt đầu bằng /api
        destination: 'https://product-54lf.onrender.com/:path*', // proxy sang backend
      },
    ];
  },
};

export default nextConfig;
