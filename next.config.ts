import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable built-in compression for better performance
  compress: true,

  // Optimize webpack configuration for better code splitting and performance
  webpack: (config, { isServer }) => {
    if (!isServer && config.optimization) {
      // Ensure splitChunks is properly configured
      if (typeof config.optimization.splitChunks !== "boolean") {
        config.optimization.splitChunks = {
          chunks: "all",
          maxInitialRequests: 25,
          minSize: 20000,
          cacheGroups: {
            // Default vendor chunk for node_modules
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true,
            },
            // Separate chunk for 3D libraries
            three: {
              test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
              name: "three-vendors",
              priority: 10,
              chunks: "async",
              enforce: true,
            },
            // Common chunk for shared components
            commons: {
              name: "commons",
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        };
      }
    }

    return config;
  },

  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Optimize images with built-in Next.js Image Optimization
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },

  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },

  // Optimize production builds
  swcMinify: true, // Next.js 13+ has this enabled by default
};

export default nextConfig;
