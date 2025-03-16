import Scndsection from "./Scndsection";
import Grid2Demo from "@/components/bento-grid/grid2-demo";

export default function Glidex() {
  return (
    <div className="overflow-hidden ">
      <div className="py-10 lg:py-40 backgrd2">
        <Scndsection />
      </div>
      {/* Smooth transition banner from dark to bright gradient */}

      <div className="py-10 bg-gradient">
        <Grid2Demo />
      </div>
    </div>
  );
}
