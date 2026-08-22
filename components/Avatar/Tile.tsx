import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const INTERACTION_RADIUS = 1;
const SPEED = 8;
const HEIGHT_STRENGTH = 5;
const SIZE_SCALE = 0.1;
const ROTATION_STRENGTH = Math.PI * 1.5;

// Intro animation
const INTRO_DURATION = 1.5;
const INTRO_MAX_DELAY = 0.4;

// Camera is at z = 11.
// Tiles start behind / around the camera and travel toward z = 0.
const INITIAL_Z_MIN = 12;
const INITIAL_Z_MAX = 12;

// How far tiles can spawn away from their final X/Y position.
const INITIAL_XY_SPREAD = 2;

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
  const introStartTime = useRef<number | null>(null);

  const tileSize = size / grid;

  /**
   * Final tile position.
   */
  const x = column * tileSize - size / 2 + tileSize / 2;

  const y = -(row * tileSize) + size / 2 - tileSize / 2;

  /**
   * Initial state.
   *
   * Tiles start behind the camera and slightly
   * offset around their own final X/Y position.
   */
  const initialState = useMemo(() => {
    return {
      x: x + (Math.random() - 0.5) * INITIAL_XY_SPREAD * 2,

      y: y + (Math.random() - 0.5) * INITIAL_XY_SPREAD * 2,

      z: THREE.MathUtils.lerp(INITIAL_Z_MIN, INITIAL_Z_MAX, Math.random()),

      rotationX: (Math.random() - 0.5) * Math.PI * 2,
      rotationY: (Math.random() - 0.5) * Math.PI * 2,
      rotationZ: (Math.random() - 0.5) * Math.PI * 2,

      delay: Math.random() * INTRO_MAX_DELAY,
    };
  }, [x, y]);

  /**
   * Create texture section for this tile.
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
   * Material.
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

  useFrame(({ clock }, delta) => {
    if (!meshRef.current) return;

    const mesh = meshRef.current;

    /**
     * Set the intro start time once.
     */
    if (introStartTime.current === null) {
      introStartTime.current = clock.elapsedTime;
    }

    const elapsedTime = clock.elapsedTime - introStartTime.current;

    /**
     * INTRO
     */
    const rawIntroProgress = THREE.MathUtils.clamp(
      (elapsedTime - initialState.delay) / INTRO_DURATION,
      0,
      1,
    );

    /**
     * Ease out cubic.
     *
     * Tiles move fast from behind the camera,
     * then slow down as they approach the avatar.
     */
    const introProgress = 1 - Math.pow(1 - rawIntroProgress, 3);

    const isIntroFinished = rawIntroProgress >= 1;

    if (!isIntroFinished) {
      mesh.position.x = THREE.MathUtils.lerp(initialState.x, x, introProgress);

      mesh.position.y = THREE.MathUtils.lerp(initialState.y, y, introProgress);

      mesh.position.z = THREE.MathUtils.lerp(initialState.z, 0, introProgress);

      mesh.rotation.x = THREE.MathUtils.lerp(
        initialState.rotationX,
        0,
        introProgress,
      );

      mesh.rotation.y = THREE.MathUtils.lerp(
        initialState.rotationY,
        0,
        introProgress,
      );

      mesh.rotation.z = THREE.MathUtils.lerp(
        initialState.rotationZ,
        0,
        introProgress,
      );

      return;
    }

    /**
     * HOVER EFFECT
     */
    const dx = mousePosition.x - x;
    const dy = mousePosition.y - y;

    const distance = Math.sqrt(dx * dx + dy * dy);

    const strength = THREE.MathUtils.clamp(
      1 - distance / INTERACTION_RADIUS,
      0,
      1,
    );

    const eased = Math.pow(strength, 2);

    const directionX = distance > 0 ? dx / distance : 0;

    const directionY = distance > 0 ? dy / distance : 0;

    const targetRotationY = -directionX * eased * ROTATION_STRENGTH;

    const targetRotationX = directionY * eased * ROTATION_STRENGTH;

    const targetZ = eased * HEIGHT_STRENGTH;

    const targetScale = 1 + eased * SIZE_SCALE;

    const damping = 1 - Math.exp(-SPEED * delta);

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

    mesh.rotation.z = THREE.MathUtils.lerp(mesh.rotation.z, 0, damping);

    mesh.position.x = THREE.MathUtils.lerp(mesh.position.x, x, damping);

    mesh.position.y = THREE.MathUtils.lerp(mesh.position.y, y, damping);

    mesh.position.z = THREE.MathUtils.lerp(mesh.position.z, targetZ, damping);

    mesh.scale.x = THREE.MathUtils.lerp(mesh.scale.x, targetScale, damping);

    mesh.scale.y = THREE.MathUtils.lerp(mesh.scale.y, targetScale, damping);
  });

  return (
    <mesh
      ref={meshRef}
      position={[initialState.x, initialState.y, initialState.z]}
      rotation={[
        initialState.rotationX,
        initialState.rotationY,
        initialState.rotationZ,
      ]}
      material={material}
      castShadow
      receiveShadow
    >
      <planeGeometry args={[tileSize - 0.01, tileSize - 0.01]} />
    </mesh>
  );
}
