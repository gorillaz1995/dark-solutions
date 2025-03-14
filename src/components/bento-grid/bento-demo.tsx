"use client";
import { TrendingUp, Share2Icon, Layers, ShieldAlert } from "lucide-react";

import { BentoCard, BentoGrid } from "./bento-grid";

const features = [
  {
    Icon: TrendingUp,
    name: "Fast doesn't mean rushed. We accelerate timelines while maintaining impeccable standards.",
    description:
      "In a hurry with a big project? Urgency is our specialty. We thrive when the clock is ticking.",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0">
        {/* Wrapper div for the animation */}
        <div className="absolute inset-0 flex items-center justify-center text-center text-6xl xl:text-4xl 2xl:text-7xl  pb-50 lg:pb-30">
          <h1>Deadline Champions</h1>
        </div>
        {/* Icon with breathing animation */}
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
    name: "Design, source, produce, deliver. We scale to match your ambition, no matter the size.",
    description:
      "From concept to delivery, we handle every step without outsourcing.",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-0 flex items-center justify-center text-6xl lg:text-6xl xl:text-8xl pb-60 lg:pb-30">
        <h1>End-to-End Mastery</h1>
      </div>
    ),
    href: "/files",
    cta: "View Files",
  },
  {
    Icon: Share2Icon,
    name: "No project too large. Our scalable resources adapt to your needs without compromising quality.",
    description:
      "Every aspect handled under one roof. No middlemen, no delays, just seamless execution. ",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-0 flex items-center justify-center text-6xl lg:text-6xl xl:text-8xl pb-60 lg:pb-30">
        <h1>Unlimited Capacity</h1>
      </div>
    ),
  },

  {
    Icon: ShieldAlert,
    name: " Large, urgent projects on short notice? That's where we shine brightest.",
    description:
      "We turn your most challenging deadlines and large-scale projects into flawless deliverables.",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 flex items-center justify-center text-center text-6xl xl:text-4xl 2xl:text-7xl  pb-50 lg:pb-30">
        <h1>Crisis-Ready Solutions</h1>
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
