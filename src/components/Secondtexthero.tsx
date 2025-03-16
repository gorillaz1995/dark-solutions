"use client";

import React, { useState, useEffect, useMemo, lazy, Suspense } from "react";

// Import Particles component lazily to defer its loading
const Particles = lazy(() =>
  import("./magicui/particles").then((mod) => ({ default: mod.Particles }))
);

/**
 * Secondtexthero component - A 3D glass section with parallax effects and wave patterns
 * Optimized for performance with reduced complexity and deferred loading of heavy elements
 * Features simplified wave effect with improved rendering performance
 * Implements best practices for reducing Largest Contentful Paint (LCP)
 */
function Secondtexthero() {
  // Track mouse position for parallax effects
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // Track if we're on a mobile device
  const [isMobile, setIsMobile] = useState(false);
  // Animation time for wave movement

  // Track if component is mounted to avoid unnecessary renders
  const [isMounted, setIsMounted] = useState(false);

  // Simplified wave pattern - reduced complexity for better performance
  const wavePatternSVG = useMemo(() => {
    return `
      <svg width="100%" height="70%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="glass-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="rgba(255, 255, 255, 0.08)" />
            <stop offset="100%" stop-color="rgba(255, 255, 255, 0.05)" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#glass-gradient)" />
      </svg>
    `;
  }, []);

  // Preload the SVG image
  useEffect(() => {
    const img = new Image();
    img.src = `data:image/svg+xml;base64,${btoa(wavePatternSVG)}`;
  }, [wavePatternSVG]);

  useEffect(() => {
    // Mark component as mounted
    setIsMounted(true);

    // Check if we're on a mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Function to handle mouse movement and update position state
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse position values between -0.5 and 0.5
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", checkMobile);

    // Animate waves over time - using less frequent updates for better performance
    const animationFrame = requestAnimationFrame(function animate() {
      requestAnimationFrame(animate);
    });

    // Clean up event listeners and animation on component unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", checkMobile);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="w-full h-[30vh] xl:h-[33vh]">
      {/* 3D Glass Section */}
      <div className="relative">
        {/* Particles background - loaded lazily after main content */}
        {isMounted && (
          <Suspense fallback={null}>
            <div className="absolute inset-0 z-40 opacity-70">
              <Particles
                className="absolute inset-0"
                quantity={isMobile ? 20 : 50}
                color="#ffd60a"
                staticity={70} // Increased staticity for better performance
              />
            </div>
          </Suspense>
        )}

        {/* Gradient overlay for depth - simplified for better performance */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-yellow-400 via-yellow-300 to-transparent opacity-40"
          style={{
            transform: `translateY(${mousePosition.y * -2}px)`,
          }}
        ></div>

        {/* Static background instead of dynamic SVG for better LCP */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,214,10,0.1) 0%, rgba(255,128,0,0.05) 100%)",
          }}
        ></div>

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
          {/* Simplified highlight effect */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: `radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.2), transparent 70%)`,
            }}
          ></div>

          {/* Content container with responsive padding */}
          <div className="max-w-7xl mx-auto py-12 md:py-32 md:px-6 text-center relative z-10">
            {/* Responsive heading with tracking for better readability */}
            <h2
              className="text-[1.55rem] sm:text-2xl md:text-6xl mb-2 tracking-tight bg-gradient-to-br from-[#8997A6] to-[#ffffff] text-transparent bg-clip-text"
              style={{ fontFamily: "Lato, serif", fontWeight: "400" }}
            >
              <span
                className="bg-gradient-to-r from-[#FFB366] to-[#FF8000] text-transparent bg-clip-text relative inline-block"
                style={{
                  fontFamily: "Lato, serif",
                  fontWeight: "900",
                  textShadow: "0 0 15px rgba(255, 128, 0, 0.5)",
                }}
              >
                Wizards
              </span>{" "}
              of Advertising <br className="md:block hidden" />
              <span className="md:hidden inline"> </span>
              <br></br>
              Making{" "}
              <span
                className="bg-gradient-to-r from-[#FFB366] to-[#FF8000] text-transparent bg-clip-text relative inline-block"
                style={{
                  fontFamily: "Lato, serif",
                  fontWeight: "900",
                  textShadow: "0 0 15px rgba(255, 128, 0, 0.5)",
                }}
              >
                IMPOSSIBLE
              </span>{" "}
              a daily routine
            </h2>

            {/* Simplified CSS animation for better performance */}
            <style jsx>{`
              @keyframes pulse-glow {
                0%,
                100% {
                  filter: brightness(1);
                }
                50% {
                  filter: brightness(1.2);
                }
              }
            `}</style>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Secondtexthero;
