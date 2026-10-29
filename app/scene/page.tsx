import { Scene } from "@/components/Scene";

export const metadata = {
  title: "ThreeUI - LaserCollection Matrix Junction",
  description: "The preserved pointer-reactive three-way matrix junction.",
};

export default function ScenePage() {
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative", overflow: "hidden", background: "#000" }}>
      <Scene />
    </div>
  );
}
