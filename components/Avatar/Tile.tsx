import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface TileProps {
  texture: THREE.Texture;
  row: number;
  column: number;
  grid: number;
  size: number;
  mousePosition: THREE.Vector3;
}

export default function Tile({
  texture,
  row,
  column,
  grid,
  size,
  mousePosition,
}: TileProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const tileSize = size / grid;

  /**
   * Tile position
   */
  const x = column * tileSize - size / 2 + tileSize / 2;

  const y = -(row * tileSize) + size / 2 - tileSize / 2;

  /**
   * Create texture section for this tile
   */
  const tileTexture = useMemo(() => {
    const clonedTexture = texture.clone();

    clonedTexture.colorSpace = THREE.SRGBColorSpace;

    clonedTexture.wrapS = THREE.ClampToEdgeWrapping;
    clonedTexture.wrapT = THREE.ClampToEdgeWrapping;

    clonedTexture.repeat.set(1 / grid, 1 / grid);

    clonedTexture.offset.set(column / grid, 1 - (row + 1) / grid);

    clonedTexture.needsUpdate = true;

    return clonedTexture;
  }, [texture, row, column, grid]);

  useEffect(() => {
    return () => {
      tileTexture.dispose();
    };
  }, [tileTexture]);

  /**
   * Material
   */
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: tileTexture,
      roughness: 0.45,
      metalness: 0.05,
      side: THREE.DoubleSide,
    });
  }, [tileTexture]);

  useEffect(() => {
    return () => {
      material.dispose();
    };
  }, [material]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    const mesh = meshRef.current;

    /**
     * Distance from cursor
     */
    const dx = mousePosition.x - x;
    const dy = mousePosition.y - y;

    const distance = Math.sqrt(dx * dx + dy * dy);

    /**
     * Larger interaction radius
     */
    const radius = 2.5;

    const strength = THREE.MathUtils.clamp(1 - distance / radius, 0, 1);

    /**
     * Stronger easing.
     *
     * Makes tiles close to the cursor react
     * much more aggressively.
     */
    const eased = Math.pow(strength, 1.5);

    /**
     * Normalize direction
     */
    const directionX = distance > 0 ? dx / distance : 0;
    const directionY = distance > 0 ? dy / distance : 0;

    /**
     * Strong rotation.
     *
     * PI / 1.5 ≈ 120 degrees max
     */
    const targetRotationY = -directionX * eased * (Math.PI / 1.5);

    const targetRotationX = directionY * eased * (Math.PI / 1.5);

    /**
     * Strong pop-out.
     */
    const targetZ = eased * 1.5;

    /**
     * Slight scale-up near cursor.
     */
    const targetScale = 1 + eased * 0.15;

    /**
     * Faster response
     */
    const speed = 14;

    const damping = 1 - Math.exp(-speed * delta);

    mesh.rotation.x = THREE.MathUtils.lerp(
      mesh.rotation.x,
      targetRotationX,
      damping,
    );

    mesh.rotation.y = THREE.MathUtils.lerp(
      mesh.rotation.y,
      targetRotationY,
      damping,
    );

    mesh.position.z = THREE.MathUtils.lerp(mesh.position.z, targetZ, damping);

    mesh.scale.x = THREE.MathUtils.lerp(mesh.scale.x, targetScale, damping);

    mesh.scale.y = THREE.MathUtils.lerp(mesh.scale.y, targetScale, damping);
  });

  return (
    <mesh
      ref={meshRef}
      position={[x, y, 0]}
      material={material}
      castShadow
      receiveShadow
    >
      <planeGeometry args={[tileSize - 0.02, tileSize - 0.02]} />
    </mesh>
  );
}
