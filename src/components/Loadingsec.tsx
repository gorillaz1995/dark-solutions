"use client";

import React, { useState, useEffect } from "react";

// Define proper TypeScript interface for component props
interface LoadingSecProps {
  isLoading?: boolean;
  onLoadingComplete?: () => void;
  duration?: number;
}

// Optimized loading component with minimal rendering overhead
const LoadingSec: React.FC<LoadingSecProps> = ({
  isLoading = true,
  onLoadingComplete = () => {},
  duration = 750, // Fixed at 750ms (0.75 seconds)
}) => {
  // Handle auto-completion of loading if not controlled externally
  useEffect(() => {
    // Only start the timer if isLoading is true
    if (isLoading) {
      const timer = setTimeout(() => {
        onLoadingComplete();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isLoading, onLoadingComplete, duration]);

  // Early return if not loading to avoid unnecessary rendering
  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-amber-300 h-screen w-screen flex items-center justify-center"
      // Use inline styles for critical rendering path
      style={{
        backgroundColor: "#fcd34d", // Amber-300 hex value for faster parsing
      }}
    >
      {/* Simplified layout with no animations */}
      <div className="flex w-full h-full">
        {/* Left panel - static */}
        <div className="w-1/2 h-full bg-black" />

        {/* Right panel - static */}
        <div className="w-1/2 h-full bg-black" />
      </div>

      {/* Pre-rendered text with no animations */}
      <h1
        className="absolute text-orange-500"
        style={{
          fontSize: "clamp(2rem, 16vw, 20rem)", // Responsive but more performant than pure vw
          lineHeight: "1",
          fontWeight: "100",
          fontFamily: "Lato, -apple-system, sans-serif", // System fonts for faster loading
          textAlign: "center",
        }}
      >
        We glow in dark
      </h1>
    </div>
  );
};

// Export a default instance with internal state management for backward compatibility
const DefaultLoadingSec: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LoadingSec
      isLoading={isLoading}
      onLoadingComplete={() => setIsLoading(false)}
    />
  );
};

export default DefaultLoadingSec;

// Export the component for dynamic imports and external control
export { LoadingSec };
