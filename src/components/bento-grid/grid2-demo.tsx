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
      <div>
        <Finalxdes />
      </div>
    ),
    background: null,
  },
  {
    name: "",
    description: "",
    href: "/",
    cta: "",
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    background: null,
  },
  {
    name: "",
    description: "",
    href: "/",
    cta: "",
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    background: null,
  },
  {
    name: "",
    description: "",
    href: "/",
    cta: "",
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
    background: null,
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
