"use client";

import { LaserCollection } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Scene() {
  return (
    <div className="shader-frame">
      <LaserCollection
        speed={1.00}
        size={1.15}
        length={1.25}
        density={1.20}
        opacity={1.00}
        hue={195}
        saturation={1.00}
        brightness={1.30}
      />
    </div>
  );
}
