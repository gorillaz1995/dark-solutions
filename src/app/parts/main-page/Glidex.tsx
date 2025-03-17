import Scndsection from "./Scndsection";
import Grid2Demo from "@/components/bento-grid/grid2-demo";
import BigText21 from "./Bigtext21";

export default function Glidex() {
  return (
    <div className="overflow-hidden ">
      <div className="py-10 lg:py-40 backgrd2">
        <Scndsection />
      </div>
      <BigText21 />
      {/* Smooth transition banner from dark to bright gradient */}

      <div className="py-10 bg-gradient relative">
        {/* Animated Blur Overlay for visual depth */}
        <div className="blur-overlay">
          <div className="blur-element"></div>
          <div className="blur-element"></div>
          <div className="blur-element"></div>
        </div>
        {/* Grid container with proper z-index to appear above blur effect */}
        <div className="grid-container">
          <Grid2Demo />
        </div>
      </div>
    </div>
  );
}
