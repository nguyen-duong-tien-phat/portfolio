"use client";

import { X } from "@/components/icons";
import { THREE_ASSETS } from "@/config/three.config";
import {
  CameraControls,
  CameraControlsImpl,
  useTexture,
} from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useMemo, useRef } from "react";
import gsap from "gsap";

function CVPaper() {
  const texture = useTexture(THREE_ASSETS.textures.cv);
  const { viewport } = useThree();

  // Scale the paper on smaller screens
  const scale = useMemo(() => {
    if (viewport.width < 4.5) return 0.65;
    if (viewport.width < 6) return 0.8;
    return 1;
  }, [viewport.width]);

  return (
    <mesh scale={scale} onClick={(e) => e.stopPropagation()}>
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

  const { viewport } = useThree();

  const isMobile = viewport.width < 5;
  const progress = useRef({ value: 0 });

  useEffect(() => {
    const tween = gsap.to(progress.current, {
      value: 1,
      duration: 4,
      ease: "power2.inOut",
    });

    return () => {
      tween.kill();
    };
  }, []);

  const lookAt = () => {
    controls.current?.setLookAt(
      0,
      cameraState.current.y,
      cameraState.current.z,
      0,
      cameraState.current.targetY,
      0,
      false,
    );
  };

  const START_Z = isMobile ? 6 : 5;
  const CLOSE_Z = isMobile ? 2 : 1;
  const END_Z = isMobile ? 1.8 : 0.8;
  const cameraState = useRef({
    y: -1.2,
    z: START_Z,
    targetY: -1.4,
  });

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(cameraState.current, {
      z: CLOSE_Z,
      duration: 0.8,
      ease: "power2.out",
      onUpdate: lookAt,
    });

    tl.to(
      cameraState.current,
      {
        y: 1,
        targetY: 1.2,
        duration: 2.4,
        ease: "power2.inOut",
        onUpdate: lookAt,
      },
      "<",
    );

    tl.to(cameraState.current, {
      y: 0.9,
      targetY: 0.9,
      z: END_Z,
      duration: 0.8,
      ease: "power2.out",
      onUpdate: lookAt,
    });

    return () => {
      tl.kill();
    };
  }, [START_Z, CLOSE_Z, END_Z]);

  return (
    <CameraControls
      ref={controls}
      smoothTime={0.5}
      minDistance={0.8}
      maxDistance={8}
      dollySpeed={0.6}
      mouseButtons={{
        left: CameraControlsImpl.ACTION.ROTATE,
        middle: CameraControlsImpl.ACTION.DOLLY,
        right: CameraControlsImpl.ACTION.TRUCK,
        wheel: CameraControlsImpl.ACTION.DOLLY,
      }}
      touches={{
        one: CameraControlsImpl.ACTION.TOUCH_TRUCK,
        two: CameraControlsImpl.ACTION.TOUCH_DOLLY_TRUCK,
        three: CameraControlsImpl.ACTION.NONE,
      }}
    />
  );
}

export default function CV() {
  const router = useRouter();

  return (
    <div data-ignore-section-scroll className="relative h-full w-full">
      <Canvas>
        <Suspense fallback={null}>
          <CVPaper />
          <Controls />
        </Suspense>
      </Canvas>

      <div className="absolute bottom-4 left-1/2 flex w-full -translate-x-1/2 flex-col items-center gap-3 px-4 sm:bottom-8 sm:w-auto sm:flex-row">
        {/* Desktop */}
        <div className="pointer-events-none hidden rounded-full border border-white/10 bg-black/70 px-4 py-2 text-sm text-white backdrop-blur sm:block">
          Left Drag - Rotate&nbsp;&nbsp;•&nbsp;&nbsp;Right Drag -
          Move&nbsp;&nbsp;•&nbsp;&nbsp;Scroll - Zoom
        </div>

        {/* Mobile */}
        <div className="pointer-events-none rounded-full border border-white/10 bg-black/70 px-4 py-2 text-center text-xs text-white backdrop-blur sm:hidden">
          Drag - Move
          <br />
          Pinch - Zoom
        </div>

        <button
          onClick={() => router.back()}
          className="group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/70 text-white backdrop-blur transition hover:bg-white/10"
          aria-label="Close"
        >
          <X width={16} className="group-hover:text-black" />
        </button>
      </div>
    </div>
  );
}
