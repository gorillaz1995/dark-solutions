import type React from "react";

import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps {
  content: ReactNode; // Content property that accepts an imported component
  className?: string;
  // Spread remaining div props
  [key: string]: ReactNode | string | undefined;
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[34rem] md:auto-rows-[25rem] grid-cols-3 gap-4 lg:h-[80vh] py-10 px-5 lg:px-35 ",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const BentoCard = ({ content, className, ...props }: BentoCardProps) => (
  <div
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl ",
      // light styles
      "bg-gradient [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      // dark styles
      "transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      className
    )}
    {...props}
  >
    {/* Render the imported component directly */}
    <div className="h-full w-full">{content}</div>

    {/* Hover effect overlay */}
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
  </div>
);

export { BentoCard, BentoGrid };
