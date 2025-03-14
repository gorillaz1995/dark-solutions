"use client";
import { TrendingUp, Share2Icon, Layers, ShieldAlert } from "lucide-react";

import { BentoCard, BentoGrid } from "./bento-grid";

const features = [
  {
    Icon: TrendingUp,
    name: "Ramai relevant",
    description: "Mereu cu un pas inaintea competitiei!",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0">
        {/* Wrapper div for the animation */}
        <div className="animate-pulse-subtle">
          <h1>Hello</h1>
        </div>
        {/* Icon with breathing animation */}
        <div className="absolute top-4 left-4 animate-breath">
          <TrendingUp className="h-8 w-8 text-primary opacity-70" />
        </div>
      </div>
    ),
    href: "/notifications",
    cta: "View Notifications",
    // Add custom styles for the breathing animation
    style: {
      "--breath-duration": "4s",
    } as React.CSSProperties,
  },
  {
    Icon: Layers,
    name: "Ai probleme cu organizarea?",
    description: "Toate fluxurile, atat interne cat si externe, centralizate.",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-0 flex items-center justify-center">
        <h1>Hello</h1>
      </div>
    ),
    href: "/files",
    cta: "View Files",
  },
  {
    Icon: Share2Icon,
    name: "Asistenta A.I. personalizata.",
    description: "Automatizarea intregului proces de digital marketing. ",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-0 flex items-center justify-center">
        <h1>Hello</h1>
      </div>
    ),
  },

  {
    Icon: ShieldAlert,
    name: "Solutii no-code, low-code si custom",
    description: "Pentru a rezolva orice problema, in orice domeniu.",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute transition-all duration-300 ease-out ">
        <h1>Hello</h1>
      </div>
    ),
    href: "/icons",
    cta: "Explore Icons",
  },
];

export default function BentoDemo() {
  return (
    <BentoGrid>
      {features.map((feature, idx) => (
        <BentoCard
          key={idx}
          Icon={feature.Icon}
          name={feature.name}
          description={feature.description}
          className={feature.className}
          background={feature.background}
          href={feature.href || "#"} // Provide a default value for href
          cta={feature.cta || ""} // Provide a default empty string for cta
          style={feature.style}
        />
      ))}
    </BentoGrid>
  );
}
