"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "@/app/parts/main-page/human-animation/stylesx/design-process-animation.css";

export default function DesignProcessAnimation() {
  const [currentStage, setCurrentStage] = useState<
    "creating" | "inspecting" | "modifying"
  >("creating");
  const [progress, setProgress] = useState(0);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);

  // Extended duration: 2.5 seconds per stage (7.5 seconds total)
  const stageDuration = 2500; // 2.5 seconds per stage

  useEffect(() => {
    // Start the animation cycle
    startAnimationCycle();

    // Start progress tracking
    startProgressTracking();

    return () => {
      // Clean up timers on unmount
      if (animationRef.current) clearTimeout(animationRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, []);

  const startAnimationCycle = () => {
    // Clear any existing animation timer
    if (animationRef.current) clearTimeout(animationRef.current);

    // Set initial stage
    setCurrentStage("creating");

    // Schedule transition to inspecting stage
    animationRef.current = setTimeout(() => {
      setCurrentStage("inspecting");

      // Schedule transition to modifying stage
      animationRef.current = setTimeout(() => {
        setCurrentStage("modifying");

        // Schedule restart of animation cycle
        animationRef.current = setTimeout(() => {
          // Reset progress
          setProgress(0);
          // Restart the cycle
          startAnimationCycle();
        }, stageDuration);
      }, stageDuration);
    }, stageDuration);
  };

  const startProgressTracking = () => {
    // Clear any existing progress timer
    if (progressRef.current) clearInterval(progressRef.current);

    // Reset progress
    setProgress(0);

    // Update progress every 75ms (100 steps for 7.5 seconds)
    const interval = 75;
    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 1;
        if (newProgress >= 100) {
          if (progressRef.current) clearInterval(progressRef.current);
          return 100;
        }
        return newProgress;
      });
    }, interval);
  };

  return (
    <div className="design-process-container">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="stage-indicator">
        <div
          className={`stage-dot ${currentStage === "creating" ? "active" : ""}`}
        />
        <div
          className={`stage-dot ${
            currentStage === "inspecting" ? "active" : ""
          }`}
        />
        <div
          className={`stage-dot ${
            currentStage === "modifying" ? "active" : ""
          }`}
        />
      </div>

      <div className="animation-container">
        <svg
          viewBox="0 0 800 500"
          xmlns="http://www.w3.org/2000/svg"
          className="design-svg"
        >
          {/* Dark gradient background */}
          <defs>
            <linearGradient id="bgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#000000" />
              <stop offset="10%" stopColor="#110f10" />
              <stop offset="20%" stopColor="#1b191b" />
              <stop offset="30%" stopColor="#232226" />
              <stop offset="40%" stopColor="#2b2c31" />
              <stop offset="50%" stopColor="#303238" />
              <stop offset="60%" stopColor="#34383f" />
              <stop offset="70%" stopColor="#393f46" />
              <stop offset="80%" stopColor="#3d434a" />
              <stop offset="90%" stopColor="#41474e" />
              <stop offset="100%" stopColor="#495057" />
            </linearGradient>
          </defs>

          {/* Background */}
          <rect x="0" y="0" width="800" height="500" fill="url(#bgGradient)" />

          {/* Design Canvas */}
          <motion.rect
            x="250"
            y="100"
            width="400"
            height="300"
            rx="10"
            fill="#1a1a1a"
            stroke="#333"
            strokeWidth="2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: currentStage === "inspecting" ? -30 : 0,
              rotate: currentStage === "modifying" ? -2 : 0,
            }}
            transition={{ duration: 0.8 }}
          />

          {/* Design Content - Changes based on stage */}
          <AnimatePresence mode="wait">
            {currentStage === "creating" && (
              <motion.g
                key="creating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.line
                  x1="300"
                  y1="150"
                  x2="600"
                  y2="150"
                  stroke="#FF8000"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.2 }}
                />
                <motion.line
                  x1="300"
                  y1="200"
                  x2="550"
                  y2="200"
                  stroke="#FFB366"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.0, delay: 0.6 }}
                />
                <motion.rect
                  x="300"
                  y="230"
                  width="150"
                  height="120"
                  fill="#222"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                />
                <motion.circle
                  cx="550"
                  cy="290"
                  r="50"
                  fill="#FF8000"
                  opacity="0.7"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                />
              </motion.g>
            )}

            {currentStage === "inspecting" && (
              <motion.g
                key="inspecting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <rect x="300" y="150" width="300" height="30" fill="#FF8000" />
                <rect x="300" y="200" width="250" height="20" fill="#FFB366" />
                <rect x="300" y="230" width="150" height="120" fill="#222" />
                <circle cx="550" cy="290" r="50" fill="#FF8000" opacity="0.7" />

                {/* Magnifying effect - extended duration */}
                <motion.circle
                  cx="450"
                  cy="250"
                  r="60"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  opacity="0.3"
                  initial={{ scale: 0 }}
                  animate={{
                    scale: 1,
                    opacity: [0.3, 0.5, 0.3, 0.5, 0.3],
                  }}
                  transition={{
                    scale: { duration: 0.8 },
                    opacity: { duration: 2.0, times: [0, 0.25, 0.5, 0.75, 1] },
                  }}
                />
                <motion.path
                  d="M450,250 L450,250"
                  stroke="#fff"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{
                    pathLength: 1,
                    d: [
                      "M450,250 L450,250",
                      "M440,240 L460,260",
                      "M440,260 L460,240",
                      "M450,240 L450,260",
                      "M440,250 L460,250",
                      "M450,250 L450,250",
                    ],
                  }}
                  transition={{
                    duration: 2.0,
                    times: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
                  }}
                />

                {/* Additional inspection elements */}
                <motion.circle
                  cx="550"
                  cy="290"
                  r="55"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 0.7, 0],
                    rotate: 360,
                  }}
                  transition={{
                    opacity: { duration: 2.0, times: [0, 0.5, 1] },
                    rotate: { duration: 8.0, ease: "linear" },
                  }}
                />
              </motion.g>
            )}

            {currentStage === "modifying" && (
              <motion.g
                key="modifying"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <rect x="300" y="150" width="300" height="30" fill="#FF8000" />
                <rect x="300" y="200" width="250" height="20" fill="#FFB366" />

                {/* Modified elements - extended transitions */}
                <motion.rect
                  x="300"
                  y="230"
                  width="150"
                  height="120"
                  fill="#333"
                  initial={{ fill: "#222" }}
                  animate={{ fill: "#333" }}
                  transition={{ duration: 1.0 }}
                />
                <motion.circle
                  cx="550"
                  cy="290"
                  r="50"
                  fill="#FFB366"
                  opacity="0.9"
                  initial={{ fill: "#FF8000", opacity: 0.7 }}
                  animate={{ fill: "#FFB366", opacity: 0.9 }}
                  transition={{ duration: 1.0 }}
                />

                {/* New element being added */}
                <motion.polygon
                  points="400,350 450,300 500,350"
                  fill="#FF8000"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                />

                {/* Additional new element */}
                <motion.rect
                  x="520"
                  y="200"
                  width="30"
                  height="30"
                  fill="#FFB366"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1, rotate: 45 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                />

                {/* Edit cursor - more complex movement */}
                <motion.g
                  initial={{ opacity: 0, x: -20, y: -20 }}
                  animate={{
                    opacity: 1,
                    x: [0, 50, 100, 50, 0],
                    y: [0, -30, 0, 30, 0],
                  }}
                  transition={{
                    opacity: { duration: 0.5 },
                    x: { duration: 2.0, times: [0, 0.25, 0.5, 0.75, 1] },
                    y: { duration: 2.0, times: [0, 0.25, 0.5, 0.75, 1] },
                  }}
                >
                  <path d="M450,290 L460,300 L470,280 Z" fill="#fff" />
                  <line
                    x1="470"
                    y1="280"
                    x2="480"
                    y2="270"
                    stroke="#fff"
                    strokeWidth="2"
                  />
                </motion.g>
              </motion.g>
            )}
          </AnimatePresence>

          {/* Human Figure */}
          <motion.g
            animate={{
              x: currentStage === "inspecting" ? 30 : 0,
              rotate: currentStage === "modifying" ? 2 : 0,
            }}
            transition={{ duration: 0.8 }}
          >
            {/* Head */}
            <circle cx="150" cy="150" r="50" fill="#ddd" />

            {/* Face features */}
            <ellipse cx="135" cy="140" rx="5" ry="7" fill="#333" />
            <ellipse cx="165" cy="140" rx="5" ry="7" fill="#333" />

            {/* Mouth - changes with stage */}
            <AnimatePresence mode="wait">
              {currentStage === "creating" && (
                <motion.path
                  key="creating-mouth"
                  d="M135,170 Q150,180 165,170"
                  fill="none"
                  stroke="#333"
                  strokeWidth="2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              )}
              {currentStage === "inspecting" && (
                <motion.path
                  key="inspecting-mouth"
                  d="M135,175 Q150,165 165,175"
                  fill="none"
                  stroke="#333"
                  strokeWidth="2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              )}
              {currentStage === "modifying" && (
                <motion.path
                  key="modifying-mouth"
                  d="M135,170 Q150,185 165,170"
                  fill="none"
                  stroke="#333"
                  strokeWidth="2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </AnimatePresence>

            {/* Torso */}
            <path d="M100,200 L200,200 L220,350 L80,350 Z" fill="#333" />

            {/* Arms - position changes with stage */}
            <AnimatePresence mode="wait">
              {currentStage === "creating" && (
                <motion.g
                  key="creating-arms"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.path
                    d="M100,220 L50,260 L30,240"
                    fill="none"
                    stroke="#ddd"
                    strokeWidth="20"
                    strokeLinecap="round"
                    animate={{
                      d: [
                        "M100,220 L50,260 L30,240",
                        "M100,220 L60,270 L40,250",
                        "M100,220 L50,260 L30,240",
                      ],
                    }}
                    transition={{
                      duration: 2.0,
                      times: [0, 0.5, 1],
                      repeat: 1,
                      repeatType: "reverse",
                    }}
                  />
                  <motion.path
                    d="M200,220 L250,240 L280,220"
                    fill="none"
                    stroke="#ddd"
                    strokeWidth="20"
                    strokeLinecap="round"
                    animate={{
                      d: [
                        "M200,220 L250,240 L280,220",
                        "M200,220 L260,250 L290,230",
                        "M200,220 L250,240 L280,220",
                      ],
                    }}
                    transition={{
                      duration: 2.0,
                      times: [0, 0.5, 1],
                      repeat: 1,
                      repeatType: "reverse",
                      delay: 0.3,
                    }}
                  />
                </motion.g>
              )}

              {currentStage === "inspecting" && (
                <motion.g
                  key="inspecting-arms"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <path
                    d="M100,220 L70,280 L90,310"
                    fill="none"
                    stroke="#ddd"
                    strokeWidth="20"
                    strokeLinecap="round"
                  />
                  <motion.path
                    d="M200,220 L260,230 L300,260"
                    fill="none"
                    stroke="#ddd"
                    strokeWidth="20"
                    strokeLinecap="round"
                    animate={{
                      rotate: [0, 5, 0, -5, 0, 5, 0],
                    }}
                    transition={{
                      duration: 2.2,
                      times: [0, 0.16, 0.33, 0.5, 0.67, 0.84, 1],
                    }}
                  />

                  {/* Magnifying glass - extended animation */}
                  <motion.g
                    animate={{
                      rotate: [0, 5, 0, -5, 0, 5, 0],
                      y: [0, -5, 0, 5, 0, -5, 0],
                    }}
                    transition={{
                      rotate: {
                        duration: 2.2,
                        times: [0, 0.16, 0.33, 0.5, 0.67, 0.84, 1],
                      },
                      y: {
                        duration: 2.2,
                        times: [0, 0.16, 0.33, 0.5, 0.67, 0.84, 1],
                      },
                    }}
                  >
                    <circle
                      cx="320"
                      cy="260"
                      r="25"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="5"
                    />
                    <line
                      x1="340"
                      y1="280"
                      x2="360"
                      y2="300"
                      stroke="#fff"
                      strokeWidth="5"
                    />
                  </motion.g>
                </motion.g>
              )}

              {currentStage === "modifying" && (
                <motion.g
                  key="modifying-arms"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <path
                    d="M100,220 L80,280 L60,320"
                    fill="none"
                    stroke="#ddd"
                    strokeWidth="20"
                    strokeLinecap="round"
                  />
                  <motion.path
                    d="M200,220 L250,240 L290,210"
                    fill="none"
                    stroke="#ddd"
                    strokeWidth="20"
                    strokeLinecap="round"
                    animate={{
                      d: [
                        "M200,220 L250,240 L290,210",
                        "M200,220 L250,250 L290,220",
                        "M200,220 L250,240 L290,210",
                        "M200,220 L250,250 L290,220",
                        "M200,220 L250,240 L290,210",
                      ],
                    }}
                    transition={{
                      duration: 2.0,
                      times: [0, 0.25, 0.5, 0.75, 1],
                    }}
                  />

                  {/* Pencil/tool - extended animation */}
                  <motion.g
                    animate={{
                      rotate: [0, -5, 0, -5, 0, -5, 0],
                      y: [0, 3, 0, 3, 0, 3, 0],
                    }}
                    transition={{
                      duration: 2.0,
                      times: [0, 0.16, 0.33, 0.5, 0.67, 0.84, 1],
                    }}
                  >
                    <line
                      x1="290"
                      y1="210"
                      x2="330"
                      y2="250"
                      stroke="#fff"
                      strokeWidth="3"
                    />
                    <polygon points="330,250 340,255 335,245" fill="#fff" />
                  </motion.g>
                </motion.g>
              )}
            </AnimatePresence>
          </motion.g>

          {/* Stage Label */}
          <motion.g
            animate={{
              y:
                currentStage === "creating"
                  ? 0
                  : currentStage === "inspecting"
                  ? -20
                  : -40,
            }}
            transition={{ duration: 0.8 }}
          >
            <rect x="300" y="400" width="200" height="40" rx="20" fill="#222" />
            <AnimatePresence mode="wait">
              {currentStage === "creating" && (
                <motion.text
                  key="creating-text"
                  x="400"
                  y="425"
                  textAnchor="middle"
                  fill="#FF8000"
                  fontFamily="Arial"
                  fontSize="18"
                  fontWeight="bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  CREATING
                </motion.text>
              )}
              {currentStage === "inspecting" && (
                <motion.text
                  key="inspecting-text"
                  x="400"
                  y="425"
                  textAnchor="middle"
                  fill="#FF8000"
                  fontFamily="Arial"
                  fontSize="18"
                  fontWeight="bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  INSPECTING
                </motion.text>
              )}
              {currentStage === "modifying" && (
                <motion.text
                  key="modifying-text"
                  x="400"
                  y="425"
                  textAnchor="middle"
                  fill="#FF8000"
                  fontFamily="Arial"
                  fontSize="18"
                  fontWeight="bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  MODIFYING
                </motion.text>
              )}
            </AnimatePresence>
          </motion.g>
        </svg>
      </div>
    </div>
  );
}
