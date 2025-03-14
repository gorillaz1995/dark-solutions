import Scene from "./Testx";
import Scndsection from "./parts/main-page/Scndsection";

export default function Home() {
  return (
    <div className="overflow-hidden bg-gradient">
      <div className="h-screen">
        <Scene />
      </div>

      <div className="py-10 backgrd2">
        <Scndsection />
      </div>
    </div>
  );
}
