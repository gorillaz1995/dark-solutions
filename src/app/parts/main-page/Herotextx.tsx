"use client";

import { SpinningText } from "@/components/magicui/spinning-text";
import React from "react";

/**
 * HeroText component that displays spinning text with Lorem Ipsum content
 * Can be used in hero sections or as decorative elements
 */
const HeroText: React.FC<{
  className?: string;
  duration?: number;
  reverse?: boolean;
  radius?: number;
}> = ({ className = "", duration = 25, reverse = false, radius = 8 }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Primary spinning text with Lorem Ipsum */}
      <SpinningText
        duration={duration}
        reverse={reverse}
        radius={radius}
        className="text-white font-thin  md:text-3xl lg:text-4xl font-fraunces "
      >
        Solutions that bring light to your darkness
      </SpinningText>
    </div>
  );
};

export default HeroText;
