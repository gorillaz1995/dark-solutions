"use client";

import React, { useState, useEffect } from "react";

/**
 * Secondtexthero component - A 3D glass section with parallax effects
 * Optimized for performance with reduced complexity
 * Implements best practices for reducing Largest Contentful Paint (LCP)
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

  return (
    <div className="w-full h-[30vh] xl:h-[33vh]">
      {/* 3D Glass Section */}
      <div className="relative">
        {/* Gradient overlay for depth - simplified for better performance */}

        {/* Glass panel with parallax effect - simplified for better performance */}
        <div
          className="relative backdrop-blur-md border-t border-neutral-800/30 overflow-hidden"
          style={{
            backgroundImage:
              "linear-gradient(to top, #495057, #434950, #3d4248, #383c41, #32353a)",
            boxShadow:
              "0 -10px 30px rgba(73, 80, 87, 0.15), inset 0 1px 1px rgba(206, 212, 218, 0.03)",
            transform: `translateY(${mousePosition.y * 3}px)`,
            transformOrigin: "center top",
          }}
        >
          {/* Content container with responsive padding */}
          <div className="max-w-7xl mx-auto py-12 md:py-32 md:px-6 text-center relative z-10">
            {/* Responsive heading with tracking for better readability */}
            <h2
              className="text-[1.55rem] sm:text-2xl md:text-6xl mb-2 tracking-tight text-transparent"
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
              of Advertising <br className="md:block hidden" />
              <span className="md:hidden inline"> </span>
              <br></br>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Secondtexthero;
