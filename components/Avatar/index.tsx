"use client";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import FlipAvatar from "./FlipAvatar";
import { useTheme } from "@/hooks/useTheme";

export default function Avatar() {
  const { theme } = useTheme();

  return (
    <Canvas
      shadows={{ type: THREE.PCFShadowMap }}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 11], fov: 35 }}
    >
      {/* Soft ambient light */}
      <ambientLight intensity={3} />

      {/* Main light */}
      <directionalLight
        position={[1, 2, 3]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <FlipAvatar
        src={theme === "light" ? "/my-face.png" : "/my-face-dark.png"}
        animation="fly"
      />
    </Canvas>
  );
}
