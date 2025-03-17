"use client";
import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

interface BentoCardProps {
  name?: string;
  description?: string;
  className?: string;
  background?: React.ReactNode;
  content?: React.ReactNode;
  href?: string;
  cta?: string;
  style?: React.CSSProperties;
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  // Use intersection observer for lazy loading
  const gridRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={gridRef}
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto",
        className
      )}
      style={{
        gridAutoRows: "25rem", // Fixed height for consistency
        width: "min(95%, 1800px)", // Responsive width with max constraint
        maxWidth: "100%", // Prevent viewport overflow
      }}
      {...props}
    >
      {/* Render children only when visible for better performance */}
      {isVisible ? (
        children
      ) : (
        // Placeholder with matching grid layout
        <div className="col-span-full h-[50vh] w-full">
          <div className="animate-pulse bg-orange-100/20 rounded-lg w-full h-full"></div>
        </div>
      )}
    </div>
  );
};

const BentoCard = ({
  name,
  description,
  className,
  background,
  content,

  cta,
  style,
  ...props
}: BentoCardProps) => {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-xl",
        // Default styling that can be overridden by className
        "transform-gpu transition-all duration-300",
        className
      )}
      style={{
        boxShadow:
          "inset 0 0 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 165, 0, 0.3)",
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
      {/* Background container */}
      {background && (
        <div className="absolute inset-0 w-full h-full">{background}</div>
      )}

      {/* Content container - render either provided content or default layout */}
      {content ? (
        <div className="relative z-10 h-full w-full">{content}</div>
      ) : (
        <div
          className="pointer-events-none z-10 flex flex-col gap-2 p-6 absolute bottom-0 left-0 right-0 transition-transform duration-300 group-hover:-translate-y-10"
          style={{
            transform: "translate3d(0,0,0)",
            WebkitTransform: "translate3d(0,0,0)",
            WebkitTransition: "all 300ms cubic-bezier(0.33, 1, 0.68, 1)",
          }}
        >
          {name && (
            <h3
              className="text-xl lg:text-2xl text-[#000000] relative"
              style={{
                fontFamily:
                  "Lato, -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: "700",
                filter: "drop-shadow(0 1px 1px rgba(0, 0, 0, 0.15))",
                WebkitFontSmoothing: "antialiased",
              }}
            >
              {name}
            </h3>
          )}
          {description && (
            <p className="text-sm text-[#000000]/80">{description}</p>
          )}
          {cta && (
            <div className="mt-2">
              <span className="text-sm font-medium">{cta}</span>
            </div>
          )}
        </div>
      )}

      {/* Hover effect overlay */}
      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
    </div>
  );
};

export { BentoCard, BentoGrid };
