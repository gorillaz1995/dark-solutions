"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SquareArrowOutUpRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Barlateasca",
    imageUrl: "/placeholder.jpg",
    category: "Graphic Design",
    link: "/#",
  },
  {
    id: 2,
    title: "Gin & Tonic",
    imageUrl: "/placeholder.jpg",
    category: "Graphic Design",
    link: "/#",
  },
  {
    id: 3,
    title: "papucesti",
    imageUrl: "/placeholder.jpg",
    category: "Print OUTDOOR",
    link: "/#",
  },
  {
    id: 4,
    title: "la nea gica",
    imageUrl: "/placeholder.jpg",
    category: "Print INDOOR",
    link: "#",
  },
  {
    id: 5,
    title: "Gen Z style",
    imageUrl: "/placeholder.jpg",
    category: "Print INDOOR",
    link: "#",
  },
  {
    id: 6,
    title: "farmacistu",
    imageUrl: "/placeholder.jpg",
    category: "Print OUTDOOR",
    link: "/#",
  },
  {
    id: 7,
    title: "Brobolenu",
    imageUrl: "/placeholder.jpg",
    category: "Print INDOOR",
    link: "#",
  },
  {
    id: 8,
    title: "Tonic",
    imageUrl: "/placeholder.jpg",
    category: "Graphic Design",
    link: "/#",
  },
  {
    id: 9,
    title: "Salvamontu",
    imageUrl: "/placeholder.jpg",
    category: "Print OUTDOOR",
    link: "/#",
  },
];

// Get unique categories for filter buttons
const categories = [
  "All",
  ...Array.from(new Set(projects.map((project) => project.category))),
];

export default function PortfolioGrid() {
  const [filter, setFilter] = useState("All");

  // Filter projects based on selected category
  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header with animation */}
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="w-full text-center whitespace-nowrap tracking-tight"
            style={{
              fontSize: "clamp(3rem, 10vw, 8rem)",
              fontFamily: "Lato, sans-serif",
              fontWeight: 900,
              background: "linear-gradient(135deg, #FFB366 0%, #FF8000 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
              textTransform: "uppercase",
              lineHeight: "0.9",
              textRendering: "optimizeLegibility",
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
            }}
          >
            PROJECTS
          </h2>
          <p className="mt-3 font-geist font-extralight sm:mt-4 text-base sm:text-lg text-[#f7f7f7] max-w-2xl mx-auto">
            De la idee la executie, de la concept la implementare.
          </p>
        </motion.div>

        {/* Category filter buttons - scrollable on mobile */}
        <div className="flex justify-start sm:justify-center overflow-x-auto pb-2 sm:pb-0 mb-6 sm:mb-8 -mx-4 sm:mx-0 px-4 sm:px-0">
          <div className="flex space-x-2 sm:space-x-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-lato font-light transition-colors whitespace-nowrap ${
                  filter === category
                    ? "text-black"
                    : "bg-black text-[#FFB366] hover:bg-black/80"
                }`}
                style={{
                  fontFamily: "Lato, sans-serif",
                  fontWeight: 300,
                  ...(filter === category
                    ? {
                        background:
                          "radial-gradient(circle at center, rgba(255, 179, 102, 0.85) 0%, rgba(255, 128, 0, 0.75) 100%)",
                        boxShadow: "inset 0 0 15px rgba(255, 128, 0, 0.3)",
                      }
                    : {}),
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Project grid with responsive columns */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-background/80 backdrop-blur-sm rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-md sm:shadow-lg overflow-hidden transition-all duration-300 ease-in-out border border-white/10 h-full w-full group"
              >
                {/* Project image with subtle glass effect that clears on hover/touch */}
                <div className="relative h-96 sm:h-56 md:h-[46rem] overflow-hidden w-full">
                  <Image
                    src={project.imageUrl || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    style={{ objectFit: "cover", objectPosition: "center" }}
                    className="w-full transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />
                  {/* Subtle glass overlay that disappears on hover/touch */}
                  <div className="absolute inset-0 bg-black/15 backdrop-blur-[1px] flex items-center justify-center transition-all duration-300 ease-in-out group-hover:backdrop-blur-0 group-hover:bg-black/5 group-active:backdrop-blur-0 group-active:bg-black/5"></div>
                </div>
                {/* Project details */}
                <div
                  className="p-4 sm:p-5 md:p-6 lg:p-8 backdrop-blur-sm"
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(255, 179, 102, 0.85) 0%, rgba(255, 128, 0, 0.75) 100%)",
                    color: "#000000",
                    boxShadow: "inset 0 0 15px rgba(255, 128, 0, 0.3)",
                    fontFamily: "Lato, sans-serif",
                  }}
                >
                  <div className="text-xs sm:text-sm lg:text-base font-medium text-primary mb-1">
                    {project.category}
                  </div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-foreground mb-2 line-clamp-1">
                    {project.title}
                  </h3>
                  <Link
                    href={project.link}
                    className="text-primary inline-flex items-center text-sm sm:text-base lg:text-lg font-geist transition-all duration-300 hover:translate-x-1"
                  >
                    Vezi proiectul
                    <SquareArrowOutUpRight className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 ml-1 sm:ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
