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

    // Ignore optional wallet connector dependencies and React Native modules
    config.resolve.alias = {
      ...config.resolve.alias,
      "@coinbase/wallet-sdk": false,
      "@gemini-wallet/core": false,
      "@react-native-async-storage/async-storage": false,
    };

    // Ignore these modules completely (handles dynamic imports)
    const webpack = require("webpack");
    config.plugins = config.plugins || [];
    config.plugins.push(
      new webpack.IgnorePlugin({
        checkResource(resource: string, context: string) {
          // Ignore optional wallet SDKs that use dynamic imports
          if (
            resource.includes("@coinbase/wallet-sdk") ||
            resource.includes("@gemini-wallet/core") ||
            resource.includes("@react-native-async-storage/async-storage")
          ) {
            return true;
          }
          return false;
        },
      })
    );

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
