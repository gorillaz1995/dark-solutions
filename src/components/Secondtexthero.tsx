"use client";

import React, { useState, useEffect, useMemo } from "react";

import { Particles } from "./magicui/particles";

/**
 * Secondtexthero component - A 3D glass section with parallax effects and wave patterns
 * Responsive design that works across various screen sizes
 * Features curved wave glass effect with dynamic shadows for enhanced depth perception
 * Includes particle background for enhanced visual appeal
 */
function Secondtexthero() {
  // Track mouse position for parallax effects
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // Track if we're on a mobile device
  const [isMobile, setIsMobile] = useState(false);
  // Animation time for wave movement
  const [time, setTime] = useState(0);

  // Generate wave pattern SVG for the glass effect
  const wavePatternSVG = useMemo(() => {
    // Create a more complex wave pattern with multiple sine waves
    return `
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="wave-distortion" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.01 0.05" numOctaves="3" seed="5" />
            <feDisplacementMap in="SourceGraphic" scale="20" />
          </filter>
          <linearGradient id="glass-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="rgba(255, 255, 255, 0.08)" />
            <stop offset="48%" stop-color="rgba(255, 255, 255, 0.03)" />
            <stop offset="100%" stop-color="rgba(255, 255, 255, 0.05)" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#glass-gradient)" filter="url(#wave-distortion)" />
      </svg>
    `;
  }, []);

  // Convert SVG to data URL for use in CSS
  const waveSVGUrl = useMemo(() => {
    return `data:image/svg+xml;base64,${btoa(wavePatternSVG)}`;
  }, [wavePatternSVG]);

  useEffect(() => {
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

    // Animate waves over time
    const animationFrame = requestAnimationFrame(function animate() {
      setTime((prevTime) => prevTime + 0.005);
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
    <div className="w-full lg:h-[35vh]">
      {/* 3D Glass Section */}
      <div className="relative">
        {/* Particles background */}
        <div className="absolute inset-0 z-40">
          <Particles
            className="absolute inset-0"
            quantity={isMobile ? 40 : 100}
            color="#ffd60a"
          />
        </div>

        {/* Gradient overlay for depth */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-yellow-400 via-yellow-300 to-transparent opacity-60"
          style={{
            transform: `translateY(${mousePosition.y * -4}px)`,
          }}
        ></div>

        {/* Wave pattern overlay for curved glass effect */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: `url("${waveSVGUrl}")`,
            backgroundSize: "cover",
            transform: `translateX(${Math.sin(time) * 10}px) translateY(${
              Math.cos(time) * 5
            }px)`,
            filter: "blur(8px)",
          }}
        ></div>

        {/* Glass panel with parallax effect and wave patterns */}
        <div
          className="relative backdrop-blur-md border-t border-neutral-800/30 overflow-hidden"
          style={{
            backgroundImage:
              "linear-gradient(to top, #495057, #434950, #3d4248, #383c41, #32353a, #2f3136, #2c2d32, #29292e, #28272c, #26252a, #252428, #232226)",
            boxShadow:
              "0 -10px 30px rgba(73, 80, 87, 0.15), inset 0 1px 1px rgba(206, 212, 218, 0.03), 0 -5px 15px rgba(50, 53, 58, 0.1)",
            transform: `translateY(${mousePosition.y * 5}px) rotateX(${
              mousePosition.y * 2
            }deg)`,
            transformOrigin: "center top",
            perspective: "1000px",
            // Apply 40% more height on larger displays
          }}
        >
          {/* Wave highlight effects - multiple layers for depth */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: `radial-gradient(ellipse at ${
                50 + mousePosition.x * 20
              }% ${
                50 + mousePosition.y * 20
              }%, rgba(255, 255, 255, 0.2), transparent 70%)`,
              transform: `translateX(${
                Math.sin(time * 0.7) * 15
              }px) scale(1.1)`,
            }}
          ></div>

          <div
            className="absolute inset-0 opacity-10"
            style={{
              background: `radial-gradient(circle at ${
                40 - mousePosition.x * 10
              }% ${
                60 - mousePosition.y * 10
              }%, rgba(255, 255, 255, 0.15), transparent 60%)`,
              transform: `translateX(${
                Math.sin(time * 0.5 + 1) * 20
              }px) translateY(${Math.cos(time * 0.3) * 10}px)`,
            }}
          ></div>

          {/* Wave shadow effects for depth */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `linear-gradient(${
                45 + mousePosition.x * 10
              }deg, transparent, rgba(0, 0, 0, 0.2) 50%, transparent)`,
              transform: `translateX(${
                Math.sin(time * 0.6 + 2) * 25
              }px) scale(1.2)`,
            }}
          ></div>

          {/* Content container with responsive padding */}
          <div className="max-w-7xl mx-auto py-12 md:py-32 md:px-6 text-center relative z-10">
            {/* Responsive heading with tracking for better readability */}
            <h2
              className="text-[1.55rem] sm:text-2xl md:text-6xl mb-2 tracking-tight bg-gradient-to-br from-[#8997A6] to-[#DCFF90] text-transparent bg-clip-text"
              style={{ fontFamily: "Lato, serif", fontWeight: "400" }}
            >
              <span
                className="bg-gradient-to-r from-[#ffc300] to-[#AEFC00] text-transparent bg-clip-text"
                style={{ fontFamily: "Lato, serif", fontWeight: "700" }}
              >
                Wizards
              </span>{" "}
              of Advertising <br className="md:block hidden" />
              <span className="md:hidden inline"> </span>
              <br></br>
              Making{" "}
              <span
                className="bg-gradient-to-r from-[#AEFC00] to-[#ffc300] text-transparent bg-clip-text"
                style={{ fontFamily: "Lato, serif", fontWeight: "900" }}
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
