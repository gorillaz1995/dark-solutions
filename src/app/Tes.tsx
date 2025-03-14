"use client";

import React, { useEffect, useState } from "react";

function Hugetext() {
  const [fontSize, setFontSize] = useState("10vw");

  // Adjust font size based on viewport width
  useEffect(() => {
    const handleResize = () => {
      // For mobile devices (width < 768px), use larger relative font size and allow text to wrap
      if (window.innerWidth < 768) {
        setFontSize("19vw");
      } else {
        // For larger screens, scale font with viewport width
        setFontSize("17vw");
      }
    };

    // Set initial font size
    handleResize();

    // Update font size when window is resized
    window.addEventListener("resize", handleResize);

    // Clean up event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="flex text-center lg:text-left px-4 pt-10 lg:pt-0 bg-clip-text text-transparent bg-gradient-to-br from-[#D5DADF] to-[#8997A6]"
      style={{
        fontSize: fontSize,
        lineHeight: "1",
        wordBreak: "break-word",
        fontWeight: "900",
        fontFamily: "Lato, serif", // Using direct font-family instead of Tailwind class
      }}
    >
      {/* Text will wrap to two lines on mobile devices */}
      DARK Solutions
    </div>
  );
}

export default Hugetext;
