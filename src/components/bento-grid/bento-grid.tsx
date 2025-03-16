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
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-9xl mx-auto ${
        className || ""
      }`}
      style={{
        gridAutoRows: "25rem", // Fixed height for consistency
        width: "min(95%, 1800px)", // Increased responsive width with larger max constraint

        maxWidth: "100%", // Ensure it doesn't overflow viewport
      }}
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
      {/* Background container with fixed dimensions to prevent layout shifts */}
      <div className="absolute inset-0 w-full h-full">{background}</div>

      {/* Content with fixed positioning and dimensions to prevent layout shifts */}
      <div
        className="pointer-events-none z-10 flex flex-col gap-2 p-6 absolute bottom-0 left-0 right-0 transition-transform duration-300 group-hover:-translate-y-10"
        style={{
          // Use CSS transform for better performance
          transform: "translate3d(0,0,0)",
          WebkitTransform: "translate3d(0,0,0)",
          WebkitTransition: "all 300ms cubic-bezier(0.33, 1, 0.68, 1)",
          height: "auto", // Allow content to determine height but prevent shifts
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
