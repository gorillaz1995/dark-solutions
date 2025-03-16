"use client";

import { useEffect, useState, useRef } from "react";

export default function BigText21() {
  const textRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState("10vw");

  // Function to adjust text size based on container width
  const adjustTextSize = () => {
    if (!textRef.current) return;

    const containerWidth = textRef.current.offsetWidth;
    // Calculate font size based on container width
    // Using vw units for responsive sizing
    const calculatedSize = Math.min(
      containerWidth / 7,
      window.innerHeight * 0.35
    );
    setFontSize(`${calculatedSize / 16}rem`); // Convert to rem for better accessibility
  };

  useEffect(() => {
    // Initial adjustment
    adjustTextSize();

    // Adjust on window resize
    window.addEventListener("resize", adjustTextSize);

    // Cleanup
    return () => window.removeEventListener("resize", adjustTextSize);
  }, []);

  return (
    <div
      className="w-full flex items-center justify-center bg-backgrd2 overflow-hidden bg-gradient"
      style={{ maxHeight: "35vh" }}
    >
      <div
        ref={textRef}
        className="w-full text-center whitespace-nowrap tracking-tight"
        style={{
          fontSize,
          fontFamily: "Lato, sans-serif",
          fontWeight: 900,
          background: "linear-gradient(135deg, #FFB366 0%, #FF8000 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          color: "transparent", // Using standard color property instead of textFillColor
          textTransform: "uppercase",
          lineHeight: "0.9", // Compress height slightly
          padding: "0.5rem",
          // Improve text rendering
          textRendering: "optimizeLegibility",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        SERVICES
      </div>
    </div>
  );
}
