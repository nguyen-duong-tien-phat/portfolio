"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function WaveGrid() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame(({ clock }, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const geometry = mesh.geometry as THREE.PlaneGeometry;
    const pos = geometry.attributes.position as THREE.BufferAttribute;
    const time = clock.getElapsedTime();

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z =
        Math.sin(x * 0.35 + time * 0.5) * 0.25 +
        Math.cos(y * 0.35 + time * 0.35) * 0.25;
      pos.setZ(i, z);
    }
    pos.needsUpdate = true;

    const targetRotX = -1.15 + pointer.y * 0.12;
    const targetRotZ = pointer.x * 0.4;
    const smoothing = 1 - Math.pow(0.001, delta);

    mesh.rotation.x = THREE.MathUtils.lerp(
      mesh.rotation.x,
      targetRotX,
      smoothing,
    );
    mesh.rotation.z = THREE.MathUtils.lerp(
      mesh.rotation.z,
      targetRotZ,
      smoothing,
    );
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-1.15, 0, 0]}
      position={[0, -2.5, -3]}
      scale={3}
    >
      <planeGeometry args={[46, 30, 40, 20]} />
      <meshBasicMaterial color={"#888"} wireframe transparent opacity={0.16} />
    </mesh>
  );
}

export default function GridBackground() {
  return (
    <Canvas
      camera={{ position: [0, -2, 6], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      className="absolute! inset-0"
      dpr={[1, 1.5]}
      // listen for pointer movement on <body> instead of the canvas itself —
      // needed because the canvas has pointer-events-none and would
      // otherwise never receive mousemove events
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      eventPrefix="client"
    >
      <WaveGrid />
    </Canvas>
  );
}
