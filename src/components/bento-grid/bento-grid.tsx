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
      "bg-gradient-to-r from-[#AEFC00] to-[#ffc300] transition-all duration-200",
      className
    )}
    style={{
      boxShadow:
        "0 2px 10px rgba(0, 0, 0, 0.2), 0 10px 20px rgba(0, 0, 0, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      position: "relative",
      overflow: "hidden",
      backdropFilter: "blur(40px)",
      transform: "translateZ(0)",
      ...style,
    }}
    {...props}
  >
    {/* Border beam animation on hover */}
    <div className="absolute inset-0 opacity-1 group-hover:opacity-100 transition-opacity duration-300">
      <BorderBeam
        size={260}
        duration={3.5}
        colorFrom="#000000"
        colorTo="#000000"
        className="opacity-100"
      />
    </div>

    {/* Enhanced background with subtle inner shadow for depth */}
    <div
      className="bg-gradient-to-r from-[#AEFC00] to-[#ffc300]"
      style={{
        boxShadow:
          "inset 0 4px 12px rgba(255, 255, 255, 0.3), inset 0 -4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      {background}
    </div>

    {/* Content with enhanced depth and hover effect */}
    <div
      className="pointer-events-none z-10 flex transform-gpu flex-col gap-2 p-6 transition-all duration-300 group-hover:-translate-y-10"
      style={{
        textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3
        className="text-xl lg:text-2xl text-[#00000] relative"
        style={{
          fontFamily: "Lato, serif",
          fontWeight: "700",
          filter: "drop-shadow(0 1px 1px rgba(0, 0, 0, 0.15))",
        }}
      >
        {/* Blur effect behind the name text */}
        <span
          className="absolute -z-10"
          style={{
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            borderRadius: "0.5rem",
            padding: "0.15rem",
            width: "fit-content",
            left: 0,
            right: "auto",
            top: 0,
            bottom: 0,
          }}
        />
        {name}
      </h3>
      <p
        className="max-w-lg text-[#00000] font-normal"
        style={{
          fontFamily: "Lato, serif",
          fontWeight: "300",
          filter: "drop-shadow(0 1px 1px rgba(0, 0, 0, 0.1))",
        }}
      >
        {description}
      </p>
    </div>

    {/* Hover effect overlay with enhanced depth */}
    <div
      className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 dark:bg-white-100 group-hover:bg-black/5"
      style={{
        boxShadow: "inset 10px 0 30px rgba(255, 255, 255, 0.2)",
      }}
    />

    {/* Additional highlight effect on top */}
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-300"
      style={{
        background:
          "linear-gradient(to bottom, rgba(255,255,255,0.5) 0%, rgba(0,0,0,0.3) 100%)",
        borderRadius: "inherit",
        mixBlendMode: "overlay", // Adds depth by blending with underlying content
        backdropFilter: "blur(1px)", // Subtle blur for additional depth
      }}
    />
  </div>
);

export { BentoCard, BentoGrid };
