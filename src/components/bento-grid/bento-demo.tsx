"use client";
import { TrendingUp, Share2Icon, Layers, ShieldAlert } from "lucide-react";
import { useEffect, useState, useRef } from "react";

import { BentoCard, BentoGrid } from "./bento-grid";

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

// Cross-browser compatible Oscillating Wave Component with responsive animation
const OscillatingWaves = () => {
  const [offset, setOffset] = useState(0);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Use a single animation frame for performance
  useAnimationFrame((deltaTime) => {
    setOffset((prev: number) => (prev + deltaTime * 0.1) % 10);
  });

  // Apply cross-browser compatible transform with responsive amplitude
  useEffect(() => {
    if (!svgRef.current) return;

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
  }, [offset, windowSize]);

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
        </defs>
        <g
          strokeWidth="3"
          stroke="url(#oooscillate-grad)"
          fill="none"
          strokeLinecap="round"
        >
          {/* Single combined path with varying opacity for performance */}
          <path
            d="M 0 3698 Q 266.5 -100 533 400 Q 799.5 900 1066 3698"
            opacity="0.05"
          ></path>
          <path
            d="M 0 3655 Q 266.5 -100 533 400 Q 799.5 900 1066 3655"
            opacity="0.06"
          ></path>
          <path
            d="M 0 3612 Q 266.5 -100 533 400 Q 799.5 900 1066 3612"
            opacity="0.07"
          ></path>
          <path
            d="M 0 3569 Q 266.5 -100 533 400 Q 799.5 900 1066 3569"
            opacity="0.08"
          ></path>
          <path
            d="M 0 3526 Q 266.5 -100 533 400 Q 799.5 900 1066 3526"
            opacity="0.09"
          ></path>
          <path
            d="M 0 3483 Q 266.5 -100 533 400 Q 799.5 900 1066 3483"
            opacity="0.11"
          ></path>
          <path
            d="M 0 3440 Q 266.5 -100 533 400 Q 799.5 900 1066 3440"
            opacity="0.12"
          ></path>
          <path
            d="M 0 3397 Q 266.5 -100 533 400 Q 799.5 900 1066 3397"
            opacity="0.13"
          ></path>
          <path
            d="M 0 3354 Q 266.5 -100 533 400 Q 799.5 900 1066 3354"
            opacity="0.14"
          ></path>
          <path
            d="M 0 3311 Q 266.5 -100 533 400 Q 799.5 900 1066 3311"
            opacity="0.15"
          ></path>
          <path
            d="M 0 3268 Q 266.5 -100 533 400 Q 799.5 900 1066 3268"
            opacity="0.16"
          ></path>
          <path
            d="M 0 3225 Q 266.5 -100 533 400 Q 799.5 900 1066 3225"
            opacity="0.17"
          ></path>
          <path
            d="M 0 3182 Q 266.5 -100 533 400 Q 799.5 900 1066 3182"
            opacity="0.18"
          ></path>
          <path
            d="M 0 3139 Q 266.5 -100 533 400 Q 799.5 900 1066 3139"
            opacity="0.20"
          ></path>
          <path
            d="M 0 3096 Q 266.5 -100 533 400 Q 799.5 900 1066 3096"
            opacity="0.21"
          ></path>
          <path
            d="M 0 3053 Q 266.5 -100 533 400 Q 799.5 900 1066 3053"
            opacity="0.22"
          ></path>
          <path
            d="M 0 3010 Q 266.5 -100 533 400 Q 799.5 900 1066 3010"
            opacity="0.23"
          ></path>
          <path
            d="M 0 2967 Q 266.5 -100 533 400 Q 799.5 900 1066 2967"
            opacity="0.24"
          ></path>
          <path
            d="M 0 2924 Q 266.5 -100 533 400 Q 799.5 900 1066 2924"
            opacity="0.25"
          ></path>
          <path
            d="M 0 2881 Q 266.5 -100 533 400 Q 799.5 900 1066 2881"
            opacity="0.26"
          ></path>
          <path
            d="M 0 2838 Q 266.5 -100 533 400 Q 799.5 900 1066 2838"
            opacity="0.27"
          ></path>
          <path
            d="M 0 2795 Q 266.5 -100 533 400 Q 799.5 900 1066 2795"
            opacity="0.28"
          ></path>
          <path
            d="M 0 2752 Q 266.5 -100 533 400 Q 799.5 900 1066 2752"
            opacity="0.30"
          ></path>
          <path
            d="M 0 2709 Q 266.5 -100 533 400 Q 799.5 900 1066 2709"
            opacity="0.31"
          ></path>
          <path
            d="M 0 2666 Q 266.5 -100 533 400 Q 799.5 900 1066 2666"
            opacity="0.32"
          ></path>
          <path
            d="M 0 2623 Q 266.5 -100 533 400 Q 799.5 900 1066 2623"
            opacity="0.33"
          ></path>
          <path
            d="M 0 2580 Q 266.5 -100 533 400 Q 799.5 900 1066 2580"
            opacity="0.34"
          ></path>
          <path
            d="M 0 2537 Q 266.5 -100 533 400 Q 799.5 900 1066 2537"
            opacity="0.35"
          ></path>
          <path
            d="M 0 2494 Q 266.5 -100 533 400 Q 799.5 900 1066 2494"
            opacity="0.36"
          ></path>
          <path
            d="M 0 2451 Q 266.5 -100 533 400 Q 799.5 900 1066 2451"
            opacity="0.37"
          ></path>
          <path
            d="M 0 2408 Q 266.5 -100 533 400 Q 799.5 900 1066 2408"
            opacity="0.39"
          ></path>
          <path
            d="M 0 2365 Q 266.5 -100 533 400 Q 799.5 900 1066 2365"
            opacity="0.40"
          ></path>
          <path
            d="M 0 2322 Q 266.5 -100 533 400 Q 799.5 900 1066 2322"
            opacity="0.41"
          ></path>
          <path
            d="M 0 2279 Q 266.5 -100 533 400 Q 799.5 900 1066 2279"
            opacity="0.42"
          ></path>
          <path
            d="M 0 2236 Q 266.5 -100 533 400 Q 799.5 900 1066 2236"
            opacity="0.43"
          ></path>
          <path
            d="M 0 2193 Q 266.5 -100 533 400 Q 799.5 900 1066 2193"
            opacity="0.44"
          ></path>
          <path
            d="M 0 2150 Q 266.5 -100 533 400 Q 799.5 900 1066 2150"
            opacity="0.45"
          ></path>
          <path
            d="M 0 2107 Q 266.5 -100 533 400 Q 799.5 900 1066 2107"
            opacity="0.46"
          ></path>
          <path
            d="M 0 2064 Q 266.5 -100 533 400 Q 799.5 900 1066 2064"
            opacity="0.47"
          ></path>
          <path
            d="M 0 2021 Q 266.5 -100 533 400 Q 799.5 900 1066 2021"
            opacity="0.49"
          ></path>
          <path
            d="M 0 1978 Q 266.5 -100 533 400 Q 799.5 900 1066 1978"
            opacity="0.50"
          ></path>
          <path
            d="M 0 1935 Q 266.5 -100 533 400 Q 799.5 900 1066 1935"
            opacity="0.51"
          ></path>
          <path
            d="M 0 1892 Q 266.5 -100 533 400 Q 799.5 900 1066 1892"
            opacity="0.52"
          ></path>
          <path
            d="M 0 1849 Q 266.5 -100 533 400 Q 799.5 900 1066 1849"
            opacity="0.53"
          ></path>
          <path
            d="M 0 1806 Q 266.5 -100 533 400 Q 799.5 900 1066 1806"
            opacity="0.54"
          ></path>
          <path
            d="M 0 1763 Q 266.5 -100 533 400 Q 799.5 900 1066 1763"
            opacity="0.55"
          ></path>
          <path
            d="M 0 1720 Q 266.5 -100 533 400 Q 799.5 900 1066 1720"
            opacity="0.56"
          ></path>
          <path
            d="M 0 1677 Q 266.5 -100 533 400 Q 799.5 900 1066 1677"
            opacity="0.58"
          ></path>
          <path
            d="M 0 1634 Q 266.5 -100 533 400 Q 799.5 900 1066 1634"
            opacity="0.59"
          ></path>
          <path
            d="M 0 1591 Q 266.5 -100 533 400 Q 799.5 900 1066 1591"
            opacity="0.60"
          ></path>
          <path
            d="M 0 1548 Q 266.5 -100 533 400 Q 799.5 900 1066 1548"
            opacity="0.61"
          ></path>
          <path
            d="M 0 1505 Q 266.5 -100 533 400 Q 799.5 900 1066 1505"
            opacity="0.62"
          ></path>
          <path
            d="M 0 1462 Q 266.5 -100 533 400 Q 799.5 900 1066 1462"
            opacity="0.63"
          ></path>
          <path
            d="M 0 1419 Q 266.5 -100 533 400 Q 799.5 900 1066 1419"
            opacity="0.64"
          ></path>
          <path
            d="M 0 1376 Q 266.5 -100 533 400 Q 799.5 900 1066 1376"
            opacity="0.65"
          ></path>
          <path
            d="M 0 1333 Q 266.5 -100 533 400 Q 799.5 900 1066 1333"
            opacity="0.66"
          ></path>
          <path
            d="M 0 1290 Q 266.5 -100 533 400 Q 799.5 900 1066 1290"
            opacity="0.68"
          ></path>
          <path
            d="M 0 1247 Q 266.5 -100 533 400 Q 799.5 900 1066 1247"
            opacity="0.69"
          ></path>
          <path
            d="M 0 1204 Q 266.5 -100 533 400 Q 799.5 900 1066 1204"
            opacity="0.70"
          ></path>
          <path
            d="M 0 1161 Q 266.5 -100 533 400 Q 799.5 900 1066 1161"
            opacity="0.71"
          ></path>
          <path
            d="M 0 1118 Q 266.5 -100 533 400 Q 799.5 900 1066 1118"
            opacity="0.72"
          ></path>
          <path
            d="M 0 1075 Q 266.5 -100 533 400 Q 799.5 900 1066 1075"
            opacity="0.73"
          ></path>
          <path
            d="M 0 1032 Q 266.5 -100 533 400 Q 799.5 900 1066 1032"
            opacity="0.74"
          ></path>
          <path
            d="M 0 989 Q 266.5 -100 533 400 Q 799.5 900 1066 989"
            opacity="0.75"
          ></path>
          <path
            d="M 0 946 Q 266.5 -100 533 400 Q 799.5 900 1066 946"
            opacity="0.77"
          ></path>
          <path
            d="M 0 903 Q 266.5 -100 533 400 Q 799.5 900 1066 903"
            opacity="0.78"
          ></path>
          <path
            d="M 0 860 Q 266.5 -100 533 400 Q 799.5 900 1066 860"
            opacity="0.79"
          ></path>
          <path
            d="M 0 817 Q 266.5 -100 533 400 Q 799.5 900 1066 817"
            opacity="0.80"
          ></path>
          <path
            d="M 0 774 Q 266.5 -100 533 400 Q 799.5 900 1066 774"
            opacity="0.81"
          ></path>
          <path
            d="M 0 731 Q 266.5 -100 533 400 Q 799.5 900 1066 731"
            opacity="0.82"
          ></path>
          <path
            d="M 0 688 Q 266.5 -100 533 400 Q 799.5 900 1066 688"
            opacity="0.83"
          ></path>
          <path
            d="M 0 645 Q 266.5 -100 533 400 Q 799.5 900 1066 645"
            opacity="0.84"
          ></path>
          <path
            d="M 0 602 Q 266.5 -100 533 400 Q 799.5 900 1066 602"
            opacity="0.85"
          ></path>
          <path
            d="M 0 559 Q 266.5 -100 533 400 Q 799.5 900 1066 559"
            opacity="0.87"
          ></path>
          <path
            d="M 0 516 Q 266.5 -100 533 400 Q 799.5 900 1066 516"
            opacity="0.88"
          ></path>
          <path
            d="M 0 473 Q 266.5 -100 533 400 Q 799.5 900 1066 473"
            opacity="0.89"
          ></path>
          <path
            d="M 0 430 Q 266.5 -100 533 400 Q 799.5 900 1066 430"
            opacity="0.90"
          ></path>
          <path
            d="M 0 387 Q 266.5 -100 533 400 Q 799.5 900 1066 387"
            opacity="0.91"
          ></path>
          <path
            d="M 0 344 Q 266.5 -100 533 400 Q 799.5 900 1066 344"
            opacity="0.92"
          ></path>
          <path
            d="M 0 301 Q 266.5 -100 533 400 Q 799.5 900 1066 301"
            opacity="0.93"
          ></path>
          <path
            d="M 0 258 Q 266.5 -100 533 400 Q 799.5 900 1066 258"
            opacity="0.94"
          ></path>
          <path
            d="M 0 215 Q 266.5 -100 533 400 Q 799.5 900 1066 215"
            opacity="0.96"
          ></path>
          <path
            d="M 0 172 Q 266.5 -100 533 400 Q 799.5 900 1066 172"
            opacity="0.97"
          ></path>
          <path
            d="M 0 129 Q 266.5 -100 533 400 Q 799.5 900 1066 129"
            opacity="0.98"
          ></path>
          <path
            d="M 0 86 Q 266.5 -100 533 400 Q 799.5 900 1066 86"
            opacity="0.99"
          ></path>
        </g>
      </svg>
    </div>
  );
};

const features = [
  {
    Icon: TrendingUp,
    name: "Fast doesn't mean rushed. We accelerate timelines while maintaining impeccable standards.",

    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0">
        {/* Cross-browser compatible blur effect */}
        <div
          className="absolute inset-0 z-10"
          style={{
            backdropFilter: "blur(1px)",
            WebkitBackdropFilter: "blur(1px)", // Safari support
            backgroundColor: "rgba(255, 165, 0, 0.025)", // Changed to a warmer color (orange)
            borderRadius: "0.25rem",
          }}
        />
        {/* Oscillating waves background with adjusted size for small card */}
        <div
          className="w-full h-full transform-gpu scale-x-[1]"
          style={{
            transform: "scale(2) scaleX(-1)", // Use standard transform for Firefox
            WebkitTransform: "scale(2) scaleX(-1)", // Safari support
            position: "relative",
          }}
        >
          <OscillatingWaves />
        </div>

        {/* Wrapper div for the animation */}
        <div className="absolute inset-0 flex items-center justify-center text-center text-6xl xl:text-4xl 2xl:text-7xl pb-50 lg:pb-30 z-10">
          <h1>Deadline Champions</h1>
        </div>
      </div>
    ),
    href: "/notifications",
    cta: "View Notifications",
    // Add custom styles for the breathing animation
    style: {
      "--breath-duration": "4s",
    } as React.CSSProperties,
  },
  {
    Icon: Layers,
    name: "Design, source, produce, deliver. We scale to match your ambition, no matter the size.",
    description:
      "From concept to delivery, we handle every step without outsourcing.",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-0">
        {/* Cross-browser compatible blur effect */}
        <div
          className="absolute inset-0 z-10"
          style={{
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)", // Safari support
            backgroundColor: "rgba(255, 165, 0, 0.15)", // Changed to a warmer color (orange)
            borderRadius: "0.25rem",
          }}
        />
        {/* Enhanced oscillating waves for wider container */}
        <div
          className="absolute inset-[-12] w-full transform-gpu scale-x-[-1]"
          style={{
            transform: "scale(1.5) scaleX(-1)", // Use standard transform for Firefox
            WebkitTransform: "scale(1.2) scaleX(-1)", // Safari support
            position: "relative",
          }}
        >
          <OscillatingWaves />
        </div>

        <div className="absolute text-center inset-0 flex items-center justify-center text-6xl lg:text-6xl xl:text-8xl pb-60 lg:pb-30 z-10">
          <h1>End-to-End Mastery</h1>
        </div>
      </div>
    ),
    href: "/files",
    cta: "View Files",
  },
  {
    Icon: Share2Icon,
    name: "No project too large. Our scalable resources adapt to your needs without compromising quality.",
    description:
      "Every aspect handled under one roof. No middlemen, no delays, just seamless execution. ",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-0">
        {/* Cross-browser compatible blur effect */}
        <div
          className="absolute inset-0 z-10"
          style={{
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)", // Safari support
            backgroundColor: "rgba(255, 165, 0, 0.23)", // Changed to a warmer color (orange)
            borderRadius: "0.25rem",
          }}
        />

        <div
          className="relative w-full h-full transform-gpu z-[1] scale-x-[-1]"
          style={{
            transform: "scale(1.15)", // Use standard transform for Firefox
            WebkitTransform: "scale(1.15)", // Safari support
          }}
        >
          <OscillatingWaves />
        </div>

        <div className="absolute text-center inset-0 flex items-center justify-center text-6xl lg:text-6xl xl:text-8xl pb-60 lg:pb-30 z-10">
          <h1>Unlimited Capacity</h1>
        </div>
      </div>
    ),
    href: "#",
    cta: "",
  },

  {
    Icon: ShieldAlert,
    name: " Large, urgent projects on short notice? That's where we shine brightest.",
    description:
      "We turn your most challenging deadlines and large-scale projects into flawless deliverables.",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0">
        {/* Cross-browser compatible blur effect */}
        <div
          className="absolute inset-0 z-10"
          style={{
            backdropFilter: "blur(1px)",
            WebkitBackdropFilter: "blur(1px)", // Safari support
            backgroundColor: "rgba(255, 165, 0, 0.05)", // Changed to a warmer color (orange)
            borderRadius: "0.25rem",
          }}
        />
        {/* Oscillating waves background with adjusted size for small card */}
        <div
          className="w-full h-full transform-gpu scale-x-[-1]"
          style={{
            transform: "scale(2) scaleX(-1)", // Use standard transform for Firefox
            WebkitTransform: "scale(2) scaleX(-1)", // Safari support
            position: "relative",
          }}
        >
          <OscillatingWaves />
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-center text-6xl xl:text-4xl 2xl:text-7xl pb-50 lg:pb-30 z-10">
          <h1>Crisis-Ready Solutions</h1>
        </div>
      </div>
    ),
    href: "/icons",
    cta: "Explore Icons",
  },
];

export default function BentoDemo() {
  return (
    <BentoGrid>
      {features.map((feature, idx) => (
        <BentoCard
          key={idx}
          name={feature.name}
          className={feature.className}
          background={feature.background}
          href={feature.href || "#"} // Provide a default value for href
          cta={feature.cta || ""} // Provide a default empty string for cta
          style={feature.style}
        />
      ))}
    </BentoGrid>
  );
}
