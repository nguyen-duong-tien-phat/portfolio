"use client";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import FlipAvatar from "./FlipAvatar";

export default function Avatar() {
  return (
    <Canvas
      shadows={{ type: THREE.PCFShadowMap }}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 11], fov: 35 }}
    >
      {/* Soft ambient light */}
      <ambientLight intensity={1} />

      {/* Main light */}
      <directionalLight
        position={[1, 2, 3]}
        intensity={6}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <FlipAvatar src="/my-face.png" animation="fly" />
    </Canvas>
  );
}
