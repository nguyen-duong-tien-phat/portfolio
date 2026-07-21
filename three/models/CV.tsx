"use client";

import { X } from "@/components/icons";
import { THREE_ASSETS } from "@/config/three.config";
import {
  CameraControls,
  CameraControlsImpl,
  useTexture,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRouter } from "next/navigation";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function CVPaper() {
  const texture = useTexture(THREE_ASSETS.textures.cv);

  return (
    <mesh onClick={(e) => e.stopPropagation()}>
      <boxGeometry args={[2.1, 2.97, 0.03]} />

      {/* Right */}
      <meshBasicMaterial attach="material-0" color="#fff" />

      {/* Left */}
      <meshBasicMaterial attach="material-1" color="#fff" />

      {/* Top */}
      <meshBasicMaterial attach="material-2" color="#fff" />

      {/* Bottom */}
      <meshBasicMaterial attach="material-3" color="#fff" />

      {/* Front */}
      <meshBasicMaterial attach="material-4" map={texture} toneMapped={false} />

      {/* Back */}
      <meshBasicMaterial attach="material-5" color="#fff" />
    </mesh>
  );
}

function Controls() {
  const controls = useRef<CameraControlsImpl>(null);

  const progress = useRef(0);
  const introFinished = useRef(false);

  useFrame((_, delta) => {
    if (!controls.current || introFinished.current) return;

    // Total animation ≈ 4 seconds
    progress.current = Math.min(progress.current + delta / 4, 1);

    const t = progress.current;

    let cameraY = 0;
    let cameraZ = 0;
    let targetY = 0;

    if (t < 0.2) {
      // ----------------------------------------------------
      // Phase 1 (20%)
      // Fast zoom to the bottom
      // ----------------------------------------------------

      const p = THREE.MathUtils.smoothstep(t / 0.2, 0, 1);

      cameraY = -1.2;
      targetY = -1.4;

      cameraZ = THREE.MathUtils.lerp(7, 2.2, p);
    } else if (t < 0.8) {
      // ----------------------------------------------------
      // Phase 2 (60%)
      // Slowly move upward while staying close
      // ----------------------------------------------------

      const p = THREE.MathUtils.smoothstep((t - 0.2) / 0.6, 0, 1);

      cameraY = THREE.MathUtils.lerp(-1.2, 1.0, p);
      targetY = THREE.MathUtils.lerp(-1.4, 1.2, p);

      cameraZ = 2.2;
    } else {
      // ----------------------------------------------------
      // Phase 3 (20%)
      // Zoom back out for reading
      // ----------------------------------------------------

      const p = THREE.MathUtils.smoothstep((t - 0.8) / 0.2, 0, 1);

      cameraY = THREE.MathUtils.lerp(1.0, 0.8, p);
      targetY = THREE.MathUtils.lerp(1.2, 0.9, p);

      cameraZ = THREE.MathUtils.lerp(2.2, 2, p);
    }

    controls.current.setLookAt(0, cameraY, cameraZ, 0, targetY, 0, false);

    if (t >= 1) {
      introFinished.current = true;
    }
  });

  return (
    <CameraControls
      ref={controls}
      smoothTime={0.5}
      minDistance={3.5}
      maxDistance={8}
      dollySpeed={0.6}
      mouseButtons={{
        left: CameraControlsImpl.ACTION.ROTATE,
        middle: CameraControlsImpl.ACTION.DOLLY,
        right: CameraControlsImpl.ACTION.TRUCK,
        wheel: CameraControlsImpl.ACTION.DOLLY,
      }}
    />
  );
}

export default function CV() {
  const router = useRouter();
  return (
    <div className="relative h-full w-full">
      <Canvas
        camera={{
          position: [0, 0, 5.2],
          fov: 35,
        }}
      >
        <Suspense fallback={null}>
          <CVPaper />

          <Controls />
        </Suspense>
      </Canvas>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-3">
        <div className="pointer-events-none rounded-full border border-white/10 bg-black/70 px-4 py-2 text-sm text-white backdrop-blur">
          Left Drag - Rotate&nbsp;&nbsp;•&nbsp;&nbsp; Right Drag -
          Move&nbsp;&nbsp;•&nbsp;&nbsp; Scroll - Zoom
        </div>

        <button
          onClick={() => router.back()}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/70 text-white backdrop-blur transition hover:bg-white/10 cursor-pointer"
          aria-label="Close"
        >
          <X width={16} />
        </button>
      </div>
    </div>
  );
}
