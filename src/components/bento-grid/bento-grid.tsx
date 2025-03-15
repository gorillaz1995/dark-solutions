"use client";
import type React from "react";

import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";
import { BorderBeam } from "./border-beam";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className: string;
  background: ReactNode;

  description: string;
  href: string;
  cta: string;
  style?: React.CSSProperties;
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "w-[90%] sm:w-[85%] md:w-[80%] lg:w-[85%] grid auto-rows-[25rem] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-2 lg:px-20 mx-auto",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,

  description,

  style,
  ...props
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-xl",
      // Enhanced 3D effect with shadows and light
      className
    )}
    style={{
      boxShadow:
        "inset 0 0 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 255, 255, 0.3)",
      background:
        "radial-gradient(circle, rgba(40, 20, 10, 0.2) 0%, rgba(255, 200, 150, 0.15) 70%)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      position: "relative",
      overflow: "hidden",
      backdropFilter: "blur(40px)",
      WebkitBackdropFilter: "blur(40px)", // Safari support
      transform: "translateZ(0)",
      WebkitTransform: "translateZ(0)", // Safari support
      // Prevent Safari flickering during animations
      WebkitBackfaceVisibility: "hidden",
      WebkitPerspective: 1000,
      ...style,
    }}
    {...props}
  >
    {/* Border beam animation on hover */}
    <div
      className="absolute inset-0 opacity-1 group-hover:opacity-100 transition-opacity duration-300 z-21"
      style={{
        // Improve Safari performance by forcing hardware acceleration
        WebkitTransform: "translateZ(0)",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      <BorderBeam
        size={100}
        duration={2.5}
        colorFrom="#000000"
        colorTo="#000000"
        className="opacity-100"
      />
    </div>

    {/* Enhanced background with subtle inner shadow for depth */}
    <div>{background}</div>

    {/* Content with enhanced depth and hover effect */}
    <div
      className="pointer-events-none z-10 flex transform-gpu flex-col gap-2 p-6 transition-all duration-300 group-hover:-translate-y-10"
      style={{
        // Optimize animations for Safari
        WebkitTransform: "translate3d(0,0,0)",
        WebkitTransition: "all 300ms cubic-bezier(0.33, 1, 0.68, 1)",
      }}
    >
      <h3
        className="text-xl lg:text-2xl text-[#00000] relative"
        style={{
          fontFamily: "Lato, -apple-system, BlinkMacSystemFont, sans-serif", // Add system fonts as fallback
          fontWeight: "700",
          filter: "drop-shadow(0 1px 1px rgba(0, 0, 0, 0.15))",
          WebkitFontSmoothing: "antialiased", // Improve text rendering on Safari
        }}
      >
        {name}
      </h3>
      <p
        className="max-w-lg text-[#f8f8f8] font-normal"
        style={{
          fontFamily: "Lato, -apple-system, BlinkMacSystemFont, sans-serif", // Add system fonts as fallback
          fontWeight: "300",
          filter: "drop-shadow(0 1px 1px rgba(0, 0, 0, 0.1))",
          WebkitFontSmoothing: "antialiased", // Improve text rendering on Safari
        }}
      >
        {description}
      </p>
    </div>
  </div>
);

export { BentoCard, BentoGrid };
