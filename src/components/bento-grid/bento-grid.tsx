"use client";
import React from "react";

interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  className: string;
  background: React.ReactNode;
  href: string;
  cta: string;
  style?: React.CSSProperties;
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={`w-[90%] sm:w-[85%] md:w-[80%] lg:w-[85%] grid auto-rows-[25rem] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-2 lg:px-20 mx-auto ${
        className || ""
      }`}
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
  style,
  ...props
}: BentoCardProps) => {
  return (
    <div
      key={name}
      className={`group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-xl ${
        className || ""
      }`}
      style={{
        boxShadow:
          "inset 0 0 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 165, 0, 0.3)", // Golden-orange shade
        background:
          "radial-gradient(circle, rgba(40, 20, 10, 0.2) 0%, rgba(255, 200, 150, 0.15) 120%)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        position: "relative",
        overflow: "hidden",
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)", // Safari support
        transform: "translateZ(0)",
        WebkitTransform: "translateZ(0)", // Safari support
        // Prevent Safari flickering during animations
        WebkitPerspective: 1000,
        ...style,
      }}
      {...props}
    >
      {/* Enhanced background with subtle inner shadow for depth */}
      <div>{background}</div>

      {/* Content with enhanced depth and hover effect - using CSS variables for animations */}
      <div
        className="pointer-events-none z-10 flex flex-col gap-2 p-6 transition-all duration-300 group-hover:-translate-y-10"
        style={{
          // Use CSS transform for better performance
          transform: "translate3d(0,0,0)",
          WebkitTransform: "translate3d(0,0,0)",
          WebkitTransition: "all 300ms cubic-bezier(0.33, 1, 0.68, 1)",
        }}
      >
        <h3
          className="text-xl lg:text-2xl text-[#000000] relative"
          style={{
            fontFamily: "Lato, -apple-system, BlinkMacSystemFont, sans-serif", // Add system fonts as fallback
            fontWeight: "700",
            filter: "drop-shadow(0 1px 1px rgba(0, 0, 0, 0.15))",
            WebkitFontSmoothing: "antialiased", // Improve text rendering on Safari
          }}
        >
          {name}
        </h3>
      </div>
    </div>
  );
};

export { BentoCard, BentoGrid };
