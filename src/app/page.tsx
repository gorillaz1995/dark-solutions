import Scene from "./Testx";
import Glidex from "./parts/main-page/Glidex";
export default function Home() {
  return (
    <div className="overflow-hidden ">
      <div className="h-screen">
        <Scene />
      </div>

      <Glidex />
    </div>
  );
}
