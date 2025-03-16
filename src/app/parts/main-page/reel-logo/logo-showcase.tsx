"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import "./reel.css"; // Import the CSS file

export default function LogoShowcase() {
  const [isClient, setIsClient] = useState(false);

  // Use useEffect to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Logo data with paths to public directory
  const logos = [
    {
      id: 1,
      src: "/logo-reel/tinder-1-logo-svgrepo-com.svg",
      alt: "Tinder",
    },
    {
      id: 2,
      src: "/logo-reel/bmw-logo-svgrepo-com.svg",
      alt: "BMW",
    },
    {
      id: 3,
      src: "/logo-reel/html-5-logo-svgrepo-com.svg",
      alt: "HTML5",
    },
    {
      id: 4,
      src: "/logo-reel/after-effects-cc-logo-svgrepo-com.svg",
      alt: "Adobe After Effects",
    },
    {
      id: 5,
      src: "/logo-reel/heineken-14-logo-svgrepo-com.svg",
      alt: "Heineken",
    },
    {
      id: 6,
      src: "/logo-reel/forbes-logo-svgrepo-com.svg",
      alt: "Forbes",
    },
    {
      id: 7,
      src: "/logo-reel/html-5-logo-svgrepo-com.svg",
      alt: "HTML5",
    },
    {
      id: 8,
      src: "/logo-reel/after-effects-cc-logo-svgrepo-com.svg",
      alt: "Adobe After Effects",
    },
    {
      id: 9,
      src: "/logo-reel/heineken-14-logo-svgrepo-com.svg",
      alt: "Heineken",
    },
    {
      id: 10,
      src: "/logo-reel/forbes-logo-svgrepo-com.svg",
      alt: "Forbes",
    },
  ];

  // Return a placeholder during SSR to prevent hydration issues
  if (!isClient) {
    return (
      <section className="logo-showcase bg-integrated">
        <div className="container">
          <h2 className="showcase-title">Trusted by 69+ Clients</h2>
        </div>
      </section>
    );
  }

  // Create a duplicate set of logos for seamless scrolling
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className="logo-showcase bg-integrated">
      <div className="container">
        <h2 className="showcase-title">Trusted by 69+ Clients</h2>

        <div className="logo-carousel-container">
          <div
            className="logo-carousel animate-scroll"
            // Add webkit-overflow-scrolling for smooth scrolling on iOS
            style={{
              WebkitOverflowScrolling: "touch",
              willChange: "transform", // Optimize for GPU acceleration
              transform: "translate3d(0,0,0)", // Force hardware acceleration
            }}
          >
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`${logo.id}-${index}`}
                className="logo-item"
                // Ensure proper rendering on iOS
                style={{
                  WebkitTransform: "translateZ(0)",
                  transform: "translateZ(0)",
                }}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={100}
                  height={64}
                  className="logo-image"
                  priority={index < 6} // Prioritize loading for first 6 logos
                  // Improve SVG rendering on iOS
                  style={{
                    WebkitBackfaceVisibility: "hidden",
                    backfaceVisibility: "hidden",
                    WebkitPerspective: 1000,
                    perspective: 1000,
                    maxWidth: "100%",
                    height: "auto",
                    display: "block", // Prevent inline display issues
                  }}
                  unoptimized={true} // Prevent Next.js from optimizing SVGs which can cause issues on iOS
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
