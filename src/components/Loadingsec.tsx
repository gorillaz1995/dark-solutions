"use client";

import React, { useState, useEffect } from "react";

// Define proper TypeScript interface for component props
interface LoadingSecProps {
  isLoading?: boolean;
  onLoadingComplete?: () => void;
  duration?: number;
}

// Create a preloadable loading component that can be controlled externally
const LoadingSec: React.FC<LoadingSecProps> = ({
  isLoading = true,
  onLoadingComplete = () => {},
  duration = 500,
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

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-amber-300">
          {/* Simple split layout */}
          <div className="absolute inset-0 flex">
            {/* Left panel */}
            <div className="relative w-1/2 h-full overflow-hidden">
              <div className="absolute inset-0 bg-black">
                {/* Subtle texture overlay */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(to bottom, transparent, transparent 10px, rgba(0,0,0,0.05) 10px, rgba(0,0,0,0.05) 20px)",
                  }}
                />
              </div>
            </div>

            {/* Right panel */}
            <div className="relative w-1/2 h-full overflow-hidden">
              <div className="absolute inset-0 bg-black">
                {/* Subtle texture overlay */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(to bottom, transparent, transparent 10px, rgba(0,0,0,0.05) 10px, rgba(0,0,0,0.05) 20px)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Center content with greeting text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative">
              <h1
                className="text-6xl md:text-8xl text-yellow-200 font-extralight tracking-tight"
                style={{
                  fontSize: "16vw",
                  lineHeight: "1",
                  wordBreak: "break-word",
                  fontWeight: "100",
                  fontFamily: "Lato, serif", // Using direct font-family instead of Tailwind class
                }}
              >
                We glow in dark
              </h1>
            </div>
          </div>
        </div>
      )}
    </>
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
