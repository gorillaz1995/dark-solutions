"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import "@/styles/designer-animation.css";

export default function DesignerAnimation() {
  const [currentState, setCurrentState] = useState<
    "creating" | "inspecting" | "modifying"
  >("creating");
  const [isAnimating, setIsAnimating] = useState(false);

  const handleStateChange = (
    newState: "creating" | "inspecting" | "modifying"
  ) => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentState(newState);

    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  return (
    <div className="designer-animation-container h-full w-full">
      <div className="controls">
        <button
          className={`control-btn ${
            currentState === "creating" ? "active" : ""
          }`}
          onClick={() => handleStateChange("creating")}
          disabled={isAnimating}
        >
          Creating
        </button>
        <button
          className={`control-btn ${
            currentState === "inspecting" ? "active" : ""
          }`}
          onClick={() => handleStateChange("inspecting")}
          disabled={isAnimating}
        >
          Inspecting
        </button>
        <button
          className={`control-btn ${
            currentState === "modifying" ? "active" : ""
          }`}
          onClick={() => handleStateChange("modifying")}
          disabled={isAnimating}
        >
          Modifying
        </button>
      </div>

      <div className="svg-container">
        <svg
          viewBox="0 0 800 600"
          xmlns="http://www.w3.org/2000/svg"
          className="designer-svg"
        >
          {/* Background elements */}
          <rect x="0" y="0" width="800" height="600" fill="#f8f9fa" />

          {/* Banner/Design */}
          <motion.g
            className="banner"
            initial={{ opacity: 1 }}
            animate={{
              opacity: 1,
              x: currentState === "inspecting" ? -30 : 0,
              scale: currentState === "inspecting" ? 1.05 : 1,
            }}
            transition={{ duration: 0.5 }}
          >
            <rect
              x="300"
              y="150"
              width="400"
              height="250"
              rx="10"
              fill="white"
              stroke="#ddd"
              strokeWidth="2"
              className="banner-base"
            />

            {/* Banner content changes based on state */}
            {currentState === "creating" && (
              <g className="banner-content creating">
                <motion.line
                  x1="350"
                  y1="200"
                  x2="650"
                  y2="200"
                  stroke="#333"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
                <motion.line
                  x1="350"
                  y1="250"
                  x2="600"
                  y2="250"
                  stroke="#333"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                />
                <motion.rect
                  x="350"
                  y="280"
                  width="150"
                  height="80"
                  fill="#e9ecef"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                />
              </g>
            )}

            {currentState === "inspecting" && (
              <g className="banner-content inspecting">
                <rect x="350" y="180" width="300" height="30" fill="#333" />
                <rect x="350" y="230" width="250" height="20" fill="#555" />
                <rect x="350" y="270" width="200" height="20" fill="#777" />
                <circle
                  cx="550"
                  cy="330"
                  r="40"
                  fill="#f8f9fa"
                  stroke="#333"
                  strokeWidth="2"
                />
                <motion.path
                  d="M535,330 L550,345 L565,315"
                  fill="none"
                  stroke="#333"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                />
              </g>
            )}

            {currentState === "modifying" && (
              <g className="banner-content modifying">
                <rect x="350" y="180" width="300" height="30" fill="#333" />
                <rect x="350" y="230" width="250" height="20" fill="#555" />
                <motion.rect
                  x="350"
                  y="270"
                  width="200"
                  height="20"
                  fill="#4dabf7"
                  initial={{ fill: "#777" }}
                  animate={{ fill: "#4dabf7" }}
                  transition={{ duration: 0.5 }}
                />
                <motion.rect
                  x="350"
                  y="300"
                  width="150"
                  height="60"
                  fill="#4dabf7"
                  opacity="0.7"
                  initial={{ width: 0 }}
                  animate={{ width: 150 }}
                  transition={{ duration: 0.7 }}
                />
              </g>
            )}
          </motion.g>

          {/* Human figure */}
          <motion.g
            className="human-figure"
            animate={{
              x: currentState === "inspecting" ? 30 : 0,
              rotate: currentState === "modifying" ? -5 : 0,
            }}
            transition={{ duration: 0.5 }}
          >
            {/* Head */}
            <circle cx="180" cy="150" r="50" fill="#f8c291" />

            {/* Face features */}
            <ellipse cx="165" cy="140" rx="5" ry="7" fill="#333" />
            <ellipse cx="195" cy="140" rx="5" ry="7" fill="#333" />

            {/* Mouth - changes with state */}
            {currentState === "creating" && (
              <path
                d="M165,170 Q180,185 195,170"
                fill="none"
                stroke="#333"
                strokeWidth="2"
              />
            )}
            {currentState === "inspecting" && (
              <path
                d="M165,175 Q180,165 195,175"
                fill="none"
                stroke="#333"
                strokeWidth="2"
              />
            )}
            {currentState === "modifying" && (
              <path
                d="M165,170 Q180,180 195,170"
                fill="none"
                stroke="#333"
                strokeWidth="2"
              />
            )}

            {/* Hair */}
            <path d="M130,130 Q180,80 230,130" fill="#6c5ce7" />

            {/* Neck */}
            <path d="M165,200 L165,230 L195,230 L195,200" fill="#f8c291" />

            {/* Torso/Shirt */}
            <path d="M140,230 L220,230 L240,350 L120,350 Z" fill="#74b9ff" />
            <path
              d="M180,230 L180,300"
              fill="none"
              stroke="#333"
              strokeWidth="2"
            />

            {/* Arms - position changes with state */}
            {currentState === "creating" && (
              <>
                <motion.path
                  d="M140,240 L90,280 L70,260"
                  fill="none"
                  stroke="#f8c291"
                  strokeWidth="20"
                  strokeLinecap="round"
                  animate={{
                    rotate: [0, 5, 0],
                    x: [0, 5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
                <motion.path
                  d="M220,240 L270,290 L290,270"
                  fill="none"
                  stroke="#f8c291"
                  strokeWidth="20"
                  strokeLinecap="round"
                  animate={{
                    rotate: [0, -5, 0],
                    x: [0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    delay: 0.5,
                  }}
                />
              </>
            )}

            {currentState === "inspecting" && (
              <>
                <path
                  d="M140,240 L100,300 L120,330"
                  fill="none"
                  stroke="#f8c291"
                  strokeWidth="20"
                  strokeLinecap="round"
                />
                <motion.path
                  d="M220,240 L280,240 L320,280"
                  fill="none"
                  stroke="#f8c291"
                  strokeWidth="20"
                  strokeLinecap="round"
                  animate={{
                    rotate: [0, 2, 0, -2, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                />

                {/* Magnifying glass */}
                <motion.g
                  animate={{
                    rotate: [0, 5, 0, -5, 0],
                    x: [0, 5, 0, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  <circle
                    cx="340"
                    cy="280"
                    r="25"
                    fill="none"
                    stroke="#333"
                    strokeWidth="5"
                  />
                  <line
                    x1="360"
                    y1="300"
                    x2="380"
                    y2="320"
                    stroke="#333"
                    strokeWidth="5"
                  />
                </motion.g>
              </>
            )}

            {currentState === "modifying" && (
              <>
                <path
                  d="M140,240 L120,300 L100,340"
                  fill="none"
                  stroke="#f8c291"
                  strokeWidth="20"
                  strokeLinecap="round"
                />
                <motion.path
                  d="M220,240 L270,260 L310,230"
                  fill="none"
                  stroke="#f8c291"
                  strokeWidth="20"
                  strokeLinecap="round"
                  animate={{
                    d: [
                      "M220,240 L270,260 L310,230",
                      "M220,240 L270,270 L310,240",
                      "M220,240 L270,260 L310,230",
                    ],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                />

                {/* Pencil/tool */}
                <motion.g
                  animate={{
                    rotate: [0, -5, 0],
                    y: [0, 5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  <line
                    x1="310"
                    y1="230"
                    x2="350"
                    y2="270"
                    stroke="#333"
                    strokeWidth="3"
                  />
                  <polygon points="350,270 360,275 355,265" fill="#333" />
                </motion.g>
              </>
            )}
          </motion.g>

          {/* Thought bubble for creating state */}
          {currentState === "creating" && (
            <motion.g
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <circle cx="230" cy="80" r="10" fill="#e9ecef" />
              <circle cx="250" cy="60" r="15" fill="#e9ecef" />
              <circle cx="280" cy="40" r="30" fill="#e9ecef" />
              <rect
                x="260"
                y="20"
                width="100"
                height="40"
                rx="10"
                fill="#e9ecef"
              />
              <motion.path
                d="M270,40 L290,40 M310,40 L330,40"
                stroke="#adb5bd"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
            </motion.g>
          )}
        </svg>
      </div>

      <div className="description">
        {currentState === "creating" && (
          <p>
            The designer is creating the initial layout and structure of the
            banner design.
          </p>
        )}
        {currentState === "inspecting" && (
          <p>
            The designer is carefully inspecting the details and quality of the
            banner design.
          </p>
        )}
        {currentState === "modifying" && (
          <p>
            The designer is making adjustments and modifications to improve the
            banner design.
          </p>
        )}
      </div>
    </div>
  );
}
