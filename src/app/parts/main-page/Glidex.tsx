import Scndsection from "./Scndsection";
import Grid2Demo from "@/components/bento-grid/grid2-demo";
import Finalxdes from "./human-animation/mainx/finalxdes";
export default function Glidex() {
  return (
    <div className="overflow-hidden ">
      <div className="py-10 lg:py-40 backgrd2">
        <Scndsection />
      </div>
      {/* Smooth transition banner from dark to bright gradient */}

      <div className="py-10 bg-gradient-to-r from-[#AEFC00] to-[#ffc300]">
        <Grid2Demo />
      </div>
      <Finalxdes />
    </div>
  );
}
