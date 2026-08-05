/* eslint-disable react-hooks/purity */
"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

type LayerProps = {
  count: number;
  spread: number;
  depth: number;
  size: number;
  opacity: number;
  /** How strongly this layer reacts to the pointer. Nearer = larger. */
  parallax: number;
  drift: number;
};

// A single depth plane of scattered points.
function ParticleLayer({
  count,
  spread,
  depth,
  size,
  opacity,
  parallax,
  drift,
}: LayerProps) {
  const ref = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * spread;
      arr[i * 3 + 1] = (Math.random() - 0.5) * spread;
      arr[i * 3 + 2] = depth + (Math.random() - 0.5) * 1.5;
    }
    return arr;
  }, [count, spread, depth]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    // Slow ambient drift so the field feels alive even when the mouse is still.
    ref.current.rotation.z += delta * drift;

    // Parallax: each layer eases toward the pointer by its own factor,
    // so nearer layers travel farther than distant ones -> depth.
    const targetX = ((state.pointer.x * viewport.width) / 2) * parallax;
    const targetY = ((state.pointer.y * viewport.height) / 2) * parallax;
    ref.current.position.x = THREE.MathUtils.lerp(
      ref.current.position.x,
      targetX,
      0.05,
    );
    ref.current.position.y = THREE.MathUtils.lerp(
      ref.current.position.y,
      targetY,
      0.05,
    );
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        sizeAttenuation
        color="#111111"
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </points>
  );
}

// Tilts the entire field toward the pointer for a subtle 3D rotation.
function ParallaxRig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      state.pointer.x * 0.28,
      0.05,
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -state.pointer.y * 0.28,
      0.05,
    );
  });

  return <group ref={group}>{children}</group>;
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ParallaxRig>
        {/* Far layer: faint, dense, barely moves. */}
        <ParticleLayer
          count={520}
          spread={16}
          depth={-4}
          size={0.02}
          opacity={0.22}
          parallax={0.15}
          drift={0.01}
        />
        {/* Mid layer. */}
        <ParticleLayer
          count={340}
          spread={13}
          depth={0}
          size={0.03}
          opacity={0.4}
          parallax={0.35}
          drift={0.02}
        />
        {/* Near layer: bolder, sparse, travels most with the pointer. */}
        <ParticleLayer
          count={150}
          spread={11}
          depth={3}
          size={0.045}
          opacity={0.6}
          parallax={0.6}
          drift={0.03}
        />
      </ParallaxRig>
    </Canvas>
  );
}
