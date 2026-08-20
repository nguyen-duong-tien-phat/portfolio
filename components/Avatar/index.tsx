"use client";

import { Canvas } from "@react-three/fiber";
import FlipAvatar from "./FlipAvatar";

export default function Avatar() {
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 35 }}>
      {/* Soft ambient light */}
      <ambientLight intensity={1.5} />

      {/* Main light */}
      <directionalLight
        position={[4, 5, 6]}
        intensity={4}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <FlipAvatar src="/my-face.png" />
    </Canvas>
  );
}
