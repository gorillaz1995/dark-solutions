import Scndsection from "./Scndsection";
import Grid2Demo from "@/components/bento-grid/grid2-demo";
export default function Glidex() {
  return (
    <div className="overflow-hidden ">
      <div className="py-10 backgrd2">
        <Scndsection />
      </div>
      {/* Smooth transition banner from dark to bright gradient */}
      <div
        className="h-[15vh] w-full relative"
        style={{
          background:
            "linear-gradient(to bottom, #000000   55%, #999955 80%, #aaaa44 85%, #bbbb33 90%, #cccc22 95%, #dddd11 98%)",
        }}
      >
        {/* Subtle overlay to soften the transition to the Grid2Demo section */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, transparent, rgba(174, 252, 0, 0.05) 40%, rgba(174, 252, 0, 0.1) 60%, rgba(174, 252, 0, 0.15) 70%, rgba(255, 195, 0, 0.1) 80%, rgba(255, 195, 0, 0.15) 90%, rgba(255, 195, 0, 0.2))",
            mixBlendMode: "soft-light",
          }}
        />
        {/* Reduced opacity texture for subtle visual interest */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, #ffffff 0.5px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="py-10 bg-gradient-to-r from-[#AEFC00] to-[#ffc300]">
        <Grid2Demo />
      </div>
    </div>
  );
}
