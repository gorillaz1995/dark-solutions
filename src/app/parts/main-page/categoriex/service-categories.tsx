"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./service-categories.css";

export default function ServiceCategories() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        // Set height to 40vh on larger screens
        if (window.innerWidth >= 768) {
          containerRef.current.style.height = "40vh";
        } else {
          containerRef.current.style.height = "auto";
        }
      }
    };

    // Initial setup
    updateHeight();

    // Update on resize
    window.addEventListener("resize", updateHeight);

    // Cleanup
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const categories = [
    "BRANDING",
    "PRINT OUTDOOR",
    "PRINT INDOOR",
    "GRAPHIC DESIGN",
  ];

  return (
    <div className="service-categories-container" ref={containerRef}>
      {categories.map((category, index) => (
        <motion.div
          key={index}
          className={`category-item shape-${index + 1}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.3 },
          }}
        >
          <div className="category-content">{category}</div>
        </motion.div>
      ))}
    </div>
  );
}
