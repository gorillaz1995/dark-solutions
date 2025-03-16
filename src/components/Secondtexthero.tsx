"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ArrowRight } from "lucide-react";

/**
 * Secondtexthero component - A 3D glass section with parallax effects
 * Optimized for performance with reduced complexity
 * Implements best practices for reducing Largest Contentful Paint (LCP)
 * Fully responsive across all device sizes
 */
function Secondtexthero() {
  // Track mouse position for parallax effects
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Simplified wave pattern - reduced complexity for better performance

  useEffect(() => {
    // Function to handle mouse movement and update position state
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse position values between -0.5 and 0.5
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove);

    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Memoize button styles to prevent recreation on each render
  const buttonStyle = useMemo(
    () => ({
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      position: "relative" as const,
      overflow: "hidden",
      opacity: 1,
      backdropFilter: "blur(10px)",
      // Removed fixed transform that was causing positioning issues
    }),
    []
  );

  const buttonGradientStyle = useMemo(
    () => ({
      backgroundImage:
        "radial-gradient(circle, rgba(255, 128, 0, 0.8) 0%, rgba(255, 128, 0, 0.6) 50%, rgba(255, 128, 0, 0.4) 100%)",
    }),
    []
  );

  return (
    // Adjusted height to be more responsive with min-height
    <div className="w-full min-h-[30vh] md:min-h-[33vh] flex flex-col justify-center">
      {/* 3D Glass Section */}
      <div className="relative w-full">
        {/* Gradient overlay for depth - simplified for better performance */}

        {/* Glass panel with parallax effect - simplified for better performance */}
        <div
          className="relative backdrop-blur-md border-t border-neutral-800/30 overflow-hidden w-full"
          style={{
            backgroundImage:
              "linear-gradient(to top, #495057, #434950, #3d4248, #383c41, #32353a)",
            boxShadow:
              "0 -10px 30px rgba(73, 80, 87, 0.15), inset 0 1px 1px rgba(206, 212, 218, 0.03)",
            transform: `translateY(${mousePosition.y * 3}px)`,
            transformOrigin: "center top",
          }}
        >
          {/* Content container with improved responsive padding */}
          <div className="max-w-7xl mx-auto px-4 py-8 sm:py-10 md:py-16 lg:py-20 md:px-6 text-center relative z-10">
            {/* Responsive heading with improved font scaling */}
            <h2
              className="text-[1.35rem] xs:text-[1.55rem] sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 md:mb-6 tracking-tight text-transparent"
              style={{
                fontFamily: "Lato, serif",
                fontWeight: "400",
                background:
                  "linear-gradient(to bottom right, #8997A6, #ffffff)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              <span
                className="relative inline-block text-transparent"
                style={{
                  fontFamily: "Lato, serif",
                  fontWeight: "900",
                  background: "linear-gradient(to right, #FFB366, #FF8000)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 0 15px rgba(255, 128, 0, 0.5)",
                  willChange: "transform", // Optimize for GPU acceleration
                }}
              >
                Wizards
              </span>{" "}
              of Advertising {/* Improved responsive line breaks */}
              <span className="hidden md:inline">
                <br />
              </span>
              Making{" "}
              <span
                className="relative inline-block text-transparent"
                style={{
                  fontFamily: "Lato, serif",
                  fontWeight: "900",
                  background: "linear-gradient(to right, #FFB366, #FF8000)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 0 15px rgba(255, 128, 0, 0.5)",
                  willChange: "transform", // Optimize for GPU acceleration
                }}
              >
                IMPOSSIBLE
              </span>{" "}
              a daily routine
            </h2>

            {/* Portfolio button with gradient effect - improved positioning */}
            <div className="mt-4 sm:mt-6 md:mt-8">
              <button
                className="group relative px-4 py-2 sm:px-6 sm:py-3 rounded-full hover:bg-white/10 transition-all duration-300"
                style={buttonStyle}
              >
                <span className="flex items-center gap-2 relative z-10 text-sm sm:text-base">
                  Portfolio
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
                </span>

                {/* Button gradient background */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={buttonGradientStyle}
                ></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Secondtexthero;
