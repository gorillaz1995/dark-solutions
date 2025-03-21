import { BentoCard, BentoGrid } from "./grid2";
import PrintingServices from "../../app/parts/main-page/categoriex/printing-service";
import Finalxdes from "../../app/parts/main-page/human-animation/mainx/finalxdes";

const features = [
  {
    name: "Printing Services",

    href: "/services/printing",
    cta: "Learn more",
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
    // Using content prop instead of background to make PrintingServices the primary visual element
    content: (
      <div className="h-full w-full flex flex-col">
        <PrintingServices />
      </div>
    ),
    background: null,
  },
  {
    name: "",
    description: "",
    href: "/",
    cta: "",
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
    content: (
      <div className="flex flex-col justify-between">
        <div className="flex-grow">
          <Finalxdes />
        </div>
        <div className="p-3 md:p-4 text-center items-center justify-center">
          <h3
            className="text-[#f7f7f7] text-2xl md:text-2xl mb-3 md:mb-2"
            style={{ fontFamily: "Lato, sans-serif", fontWeight: 900 }}
          >
            Pixel-perfect Graphic Design
          </h3>
          <p
            className="text-[#f7f7f7] text-sm md:text-sm opacity-80 mt-2"
            style={{ fontFamily: "Lato, sans-serif", fontWeight: 400 }}
          >
            Versatile design solutions for any challenge - no task is too
            complex for our creative team
          </p>
        </div>
      </div>
    ),
    background: null,
  },
  {
    name: "Project X",
    description: "Revolutionary t-shirt printing technology",
    href: "/services/project-x",
    cta: "Discover",
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    content: (
      <div className="flex flex-col items-center justify-center p-4 h-full">
        <h1
          className="text-white font-bold text-center text-3xl md:text-4xl lg:text-5xl mb-3"
          style={{ fontFamily: "Lato, sans-serif" }}
        >
          Project X
        </h1>
        <p
          className="text-white text-center text-sm md:text-base opacity-90"
          style={{ fontFamily: "Lato, sans-serif", fontWeight: 300 }}
        >
          Experience custom t-shirt printing with our proprietary devices that
          deliver unmatched color vibrancy, durability, and detail resolution
          far superior to anything else on the market.
        </p>
      </div>
    ),
    background: "bg-gradient-to-br from-purple-600 to-indigo-800",
  },
];

export default function BentoDemo() {
  return (
    <BentoGrid className="lg:grid-rows-3">
      {features.map((feature) => (
        <BentoCard
          key={feature.name || Math.random().toString()}
          name={feature.name}
          description={feature.description}
          cta={feature.cta}
          href={feature.href}
          className={`${feature.className} overflow-hidden`}
          background={feature.background}
          content={feature.content}
        />
      ))}
    </BentoGrid>
  );
}
