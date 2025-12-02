import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use webpack for stable builds
  turbopack: {},
  webpack: (config, { isServer }) => {
    // Exclude test files and other problematic files
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    
    config.module.rules.push({
      test: /\.test\.(js|ts|tsx|jsx)$/,
      loader: "ignore-loader",
    });

    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
};

export default nextConfig;
