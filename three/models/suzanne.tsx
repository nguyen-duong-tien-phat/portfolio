"use client";

import { THREE_ASSETS } from "@/config/three.config";
import {
  ContactShadows,
  Environment,
  Float,
  PresentationControls,
  useGLTF,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";

function Sculpture() {
  const meshRef = useRef<THREE.Mesh>(null);
  const model = useGLTF(THREE_ASSETS.models.suzanne);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const speed = 0.06;
    meshRef.current.rotation.y += delta * speed;
    meshRef.current.rotation.x += delta * (speed * 0.35);
  });

  useEffect(() => {
    model.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        child.material = new THREE.MeshStandardMaterial({
          color: "#1a1a18",
          metalness: 0.35,
          roughness: 0.35,
        });
      }
    });
  }, [model]);

  return (
    <Float
      speed={1.1}
      rotationIntensity={0.35}
      floatIntensity={0.9}
      floatingRange={[-0.12, 0.12]}
    >
      <primitive ref={meshRef} object={model.scene} />
    </Float>
  );
}

export default function Suzanne() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 2, 7], fov: 38 }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.6} />
      <Suspense fallback={null}>
        <PresentationControls polar={[0, Math.PI]}>
          <Sculpture />
        </PresentationControls>
        <ContactShadows
          position={[0, -1.7, 0]}
          opacity={0.28}
          scale={7}
          blur={2.6}
          far={3}
          color="#3a3733"
        />
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  );
}
