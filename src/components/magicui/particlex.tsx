"use client";

import { cn } from "@/lib/utils";
import React, {
  ComponentPropsWithoutRef,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";

/**
 * Custom hook to track mouse position
 * Provides real-time mouse coordinates for particle interactions
 */
function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return mousePosition;
}

interface ParticlesProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  size?: number;
  refresh?: boolean;
  color?: string;
  vx?: number;
  vy?: number;
}

type Particle = {
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  speed: number;
  direction: number;
  vx: number;
  vy: number;
  shape: "circle" | "polygon";
  sides: number;
  linked: boolean;
  linkDistance: number;
  linkWidth: number;
  linkOpacity: number;
};

/**
 * Particles component - Creates an interactive particle background
 * Optimized for performance with requestAnimationFrame
 * Supports various particle shapes, interactions, and responsive design
 */
export const Particles: React.FC<ParticlesProps> = ({
  className = "",
  quantity = 5,
  size = 1.5,
  refresh = false,
  color = "#ffffff",
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const particles = useRef<Particle[]>([]);
  const mousePosition = useMousePosition();
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;
  const rafID = useRef<number | null>(null);
  const resizeTimeout = useRef<NodeJS.Timeout | null>(null);

  // Define functions with useCallback to avoid dependency issues
  const resizeCanvas = useCallback(() => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;

      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.scale(dpr, dpr);
    }
  }, [dpr]);

  const createParticles = useCallback(() => {
    particles.current = [];
    for (let i = 0; i < quantity; i++) {
      const particle: Particle = {
        x: Math.random() * canvasSize.current.w,
        y: Math.random() * canvasSize.current.h,
        size: Math.random() ? size : size * Math.random() + 1,
        color, // Add the missing color property to fix the type error

        opacity: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 6,
        direction: Math.random() * 360,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        shape: Math.random() > 0.5 ? "circle" : "polygon",
        sides: 1, // Pentagon by default
        linked: true,
        linkDistance: 150,
        linkWidth: 1,
        linkOpacity: 0.4,
      };
      particles.current.push(particle);
    }
  }, [color, quantity, size]);

  const initCanvas = useCallback(() => {
    resizeCanvas();
    createParticles();
  }, [resizeCanvas, createParticles]);

  const onMouseMove = useCallback(() => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const { w, h } = canvasSize.current;
      const x = mousePosition.x - rect.left - w / 2;
      const y = mousePosition.y - rect.top - h / 2;
      const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
      if (inside) {
        mouse.current.x = x;
        mouse.current.y = y;
      }
    }
  }, [mousePosition.x, mousePosition.y]);

  const drawPolygon = useCallback(
    (x: number, y: number, size: number, sides: number) => {
      if (!context.current) return;

      context.current.beginPath();
      for (let i = 0; i < sides; i++) {
        const angle = (Math.PI * 2 * i) / sides;
        const pointX = x + size * Math.cos(angle);
        const pointY = y + size * Math.sin(angle);

        if (i === 0) {
          context.current.moveTo(pointX, pointY);
        } else {
          context.current.lineTo(pointX, pointY);
        }
      }
      context.current.closePath();
      context.current.fill();
    },
    []
  );

  const drawParticle = useCallback(
    (particle: Particle) => {
      if (!context.current) return;

      context.current.globalAlpha = particle.opacity;
      context.current.fillStyle = particle.color;

      if (particle.shape === "circle") {
        context.current.beginPath();
        context.current.arc(
          particle.x,
          particle.y,
          particle.size,
          0,
          Math.PI * 1.21
        );
        context.current.fill();
      } else {
        drawPolygon(particle.x, particle.y, particle.size, particle.sides);
      }
    },
    [drawPolygon]
  );

  const drawLinks = useCallback(() => {
    if (!context.current) return;

    for (let i = 0; i < particles.current.length; i++) {
      for (let j = i + 1; j < particles.current.length; j++) {
        const p1 = particles.current[i];
        const p2 = particles.current[j];

        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < p1.linkDistance) {
          context.current.globalAlpha =
            p1.linkOpacity * (1 - distance / p1.linkDistance);
          context.current.strokeStyle = p1.color;
          context.current.lineWidth = p1.linkWidth;

          context.current.beginPath();
          context.current.moveTo(p1.x, p1.y);
          context.current.lineTo(p2.x, p2.y);
          context.current.stroke();
        }
      }
    }
  }, []);

  const handleMouseInteraction = useCallback(() => {
    const mouseX = mouse.current.x + canvasSize.current.w / 2;
    const mouseY = mouse.current.y + canvasSize.current.h / 2;

    particles.current.forEach((particle) => {
      const dx = particle.x - mouseX;
      const dy = particle.y - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 200) {
        // Repulse effect
        const force = (200 - distance) / 200;
        const directionX = dx / distance || 0;
        const directionY = dy / distance || 0;

        particle.x += directionX * force * 10;
        particle.y += directionY * force * 10;
      }
    });
  }, []);

  const animate = useCallback(() => {
    if (!context.current) return;

    context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);

    // Draw links between particles
    drawLinks();

    // Update and draw particles
    particles.current.forEach((particle) => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Bounce off edges
      if (particle.x < 0 || particle.x > canvasSize.current.w) {
        particle.vx *= -1;
      }

      if (particle.y < 0 || particle.y > canvasSize.current.h) {
        particle.vy *= -1;
      }

      // Draw the particle
      drawParticle(particle);
    });

    // Handle mouse interaction
    handleMouseInteraction();

    rafID.current = window.requestAnimationFrame(animate);
  }, [drawLinks, drawParticle, handleMouseInteraction]);

  // Initialize canvas and start animation
  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }
    initCanvas();
    animate();

    const handleResize = () => {
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }
      resizeTimeout.current = setTimeout(() => {
        initCanvas();
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (rafID.current != null) {
        window.cancelAnimationFrame(rafID.current);
      }
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [animate, initCanvas]);

  // Track mouse movement
  useEffect(() => {
    onMouseMove();
  }, [onMouseMove]);

  // Reinitialize canvas when refresh prop changes
  useEffect(() => {
    initCanvas();
  }, [refresh, initCanvas]);

  return (
    <div
      className={cn("pointer-events-none", className)}
      ref={canvasContainerRef}
      aria-hidden="true"
      {...props}
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  );
};
