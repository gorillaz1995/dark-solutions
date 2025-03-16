"use client";
import { useEffect, useState, useRef } from "react";

// Custom hook for animation frame with browser compatibility improvements
const useAnimationFrame = (callback: (deltaTime: number) => void) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let frameId: number;
    let lastTime = performance.now();

    const animate = (now: number) => {
      const deltaTime = now - lastTime;
      lastTime = now;
      setTime((prevTime) => prevTime + deltaTime * 0.004);
      callback(deltaTime * 0.001);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [callback]);

  return time;
};

// Optimized cross-browser compatible Oscillating Wave Component with reduced CPU usage
export const OscillatingWaves = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [offset, setOffset] = useState(0);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Handle window resize for responsive animations
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Use a single animation frame for performance - only if reduced motion is not preferred
  useAnimationFrame((deltaTime) => {
    if (!prefersReducedMotion) {
      setOffset((prev: number) => (prev + deltaTime * 0.1) % 10);
    }
  });

  // Apply cross-browser compatible transform with responsive amplitude
  useEffect(() => {
    if (!svgRef.current) return;

    // Skip animation for users who prefer reduced motion
    if (prefersReducedMotion) {
      svgRef.current.style.transform = "none";
      return;
    }

    // Calculate amplitude based on screen size
    // Micro-animation for small screens, more pronounced for larger displays
    const getResponsiveAmplitude = () => {
      if (windowSize.width < 640) return 5; // Very small movement for mobile
      if (windowSize.width < 768) return 10; // Small movement for tablets
      if (windowSize.width < 1024) return 20; // Medium for small desktops
      return 30; // Larger movement for big screens
    };

    const amplitude = getResponsiveAmplitude();

    // Smaller X movement for better visual effect
    const translateY = Math.sin(offset) * amplitude;
    const translateX = Math.cos(offset) * (amplitude * 0.3);

    // Apply smooth transform with reduced movement on smaller screens
    svgRef.current.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
    svgRef.current.style.willChange = "transform";
    svgRef.current.style.transition =
      "transform .35s cubic-bezier(0.25, 0.1, 0.25, 1)";
  }, [offset, windowSize, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="relative inset-0 overflow-hidden pointer-events-none z-0"
      style={{ WebkitOverflowScrolling: "touch" }} // Improve scrolling on Safari
    >
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 1066 800"
        opacity="1"
        className="transition-transform"
        style={{
          backfaceVisibility: "hidden", // Prevent flickering in Safari
          WebkitBackfaceVisibility: "hidden",
          WebkitTransformStyle: "preserve-3d",
          transformStyle: "preserve-3d",
        }}
      >
        <defs>
          <linearGradient
            x1="50%"
            y1="0%"
            x2="50%"
            y2="100%"
            id="oooscillate-grad"
          >
            <stop
              stopColor="hsl(30, 100%, 50%)"
              stopOpacity="1"
              offset="0%"
            ></stop>
            <stop
              stopColor="hsl(30, 100%, 70%)"
              stopOpacity="1"
              offset="100%"
            ></stop>
          </linearGradient>

          {/* Add CSS animation for reduced CPU usage */}
          {!prefersReducedMotion && (
            <style>
              {`
                @keyframes wave-animation {
                  0% { opacity: 0.05; }
                  50% { opacity: 0.5; }
                  100% { opacity: 0.05; }
                }
                .wave-path {
                  animation: wave-animation 3s infinite alternate ease-in-out;
                  animation-delay: calc(var(--delay) * 0.1s);
                }
              `}
            </style>
          )}
        </defs>
        <g
          strokeWidth="3"
          stroke="url(#oooscillate-grad)"
          fill="none"
          strokeLinecap="round"
        >
          {/* Significantly reduced number of paths - only 10 instead of 100+ */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
            const yPos = 3698 - i * 400;
            const opacity = prefersReducedMotion
              ? 0.05 + i * 0.1 // Static opacity for reduced motion
              : 0.05; // Base opacity for animated paths

            return (
              <path
                key={i}
                d={`M 0 ${yPos} Q 266.5 -100 533 400 Q 799.5 900 1066 ${yPos}`}
                opacity={opacity}
                className={!prefersReducedMotion ? "wave-path" : ""}
                style={
                  !prefersReducedMotion
                    ? ({ "--delay": i } as React.CSSProperties)
                    : {}
                }
              ></path>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

// Create a named object for default export to fix the ESLint error
const OscillatingWavesModule = { OscillatingWaves };

// Default export with named object
export default OscillatingWavesModule;
