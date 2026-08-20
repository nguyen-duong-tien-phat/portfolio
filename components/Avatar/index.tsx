"use client";

import { Canvas } from "@react-three/fiber";
import FlipAvatar from "./FlipAvatar";

export default function Avatar() {
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 11], fov: 35 }}>
      {/* Soft ambient light */}
      <ambientLight intensity={1} />

      {/* Main light */}
      <directionalLight
        position={[1, 2, 3]}
        intensity={5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <FlipAvatar src="/my-face.png" />
    </Canvas>
  );
}
