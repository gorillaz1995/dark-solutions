import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Only load 3D libraries when needed
    if (
      !isServer &&
      config.optimization &&
      typeof config.optimization.splitChunks !== "boolean"
    ) {
      // Ensure splitChunks is an object before accessing cacheGroups
      config.optimization.splitChunks = config.optimization.splitChunks || {};
      config.optimization.splitChunks.cacheGroups = {
        ...(config.optimization.splitChunks.cacheGroups || {}),
        // Create separate chunks for heavy libraries
        three: {
          test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
          name: "three-vendors",
          priority: 10,
          chunks: "async", // Only load when needed
        },
      };
    }
    return config;
  },
  // Enable compression
  compress: true,
  // Next.js 13+ has swcMinify enabled by default, no need to specify
};

export default nextConfig;
