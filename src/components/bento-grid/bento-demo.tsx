"use client";
import { TrendingUp, Share2Icon, Layers, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { BentoCard, BentoGrid } from "./bento-grid";

// Custom hook for animation frame with browser compatibility improvements
// Export the hook so it can be used elsewhere and avoid the unused variable warning
export const useAnimationFrame = (callback: (deltaTime: number) => void) => {
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

// Dynamically import OscillatingWaves component to reduce initial bundle size
const OscillatingWaves = dynamic(
  () => import("./oscillating-waves").then((mod) => mod.OscillatingWaves),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-gradient-to-b from-orange-200/20 to-orange-400/10"></div>
    ),
  }
);

// Define feature cards data
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
        {/* Oscillating waves with loading fallback */}
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

// Lazy load the BentoDemo component to reduce initial bundle size
const BentoDemo = () => {
  // Use intersection observer to load cards only when they come into view

  // Set isVisible to true by default since we're not using IntersectionObserver anymore

  return (
    <div>
      {/* Render BentoGrid directly without conditional visibility check */}
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
    </div>
  );
};

export default BentoDemo;
