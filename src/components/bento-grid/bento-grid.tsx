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
  Icon: React.ElementType;
  description: string;
  href: string;
  cta: string;
  style?: React.CSSProperties;
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-[85%] auto-rows-[25rem] grid-cols-3 gap-8 px-2 lg:px-20 mx-auto",
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
  Icon, // This prop is used to render the icon component
  description,

  style,
  ...props
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
      // light styles
      "bg-gradient-to-r from-[#AEFC00] to-[#ffc300] [box-shadow:0_0_0_1px_rgba(0,0,0,.01),0_1px_2px_rgba(0,0,0,.02),0_6px_12px_rgba(0,0,0,.03)] [border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-10px_40px_-10px_#ffffff0f_inset]",

      className
    )}
    style={style}
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

    <div className="bg-gradient-to-r from-[#AEFC00] to-[#ffc300]">
      {background}
    </div>
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-2 p-6 transition-all duration-300 group-hover:-translate-y-10">
      {/* Render the Icon component */}
      {Icon && typeof Icon === "function" && (
        <Icon className="h-6 w-6 mb-2 text-primary" />
      )}
      <h3
        className="text-xl lg:text-3xl text-[#00000]"
        style={{ fontFamily: "Lato, serif", fontWeight: "700" }}
      >
        {name}
      </h3>
      <p
        className="max-w-lg text-[#00000]   font-normal"
        style={{ fontFamily: "Lato, serif", fontWeight: "300" }}
      >
        {description}
      </p>
    </div>

    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 dark:bg-white-100" />
  </div>
);

export { BentoCard, BentoGrid };
