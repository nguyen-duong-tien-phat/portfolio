"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const INTERACTION_RADIUS = 2;
const SPEED = 10;

const HEIGHT_STRENGTH = 5;
const SIZE_SCALE = 0.2;
const ROTATION_STRENGTH = Math.PI;

/* -------------------------------------------------------------------------- */
/*                                  ANIMATION                                 */
/* -------------------------------------------------------------------------- */

export type TileAnimation = "fly" | "flip";

const FLY_INTRO_DURATION = 1.5;
const FLY_INTRO_MAX_DELAY = 0.4;

const INITIAL_Z = 12;
const INITIAL_XY_SPREAD = 2;

const FLIP_INTRO_DURATION = 0.5;
const FLIP_STAGGER = 0.035;

interface TileProps {
  texture: THREE.Texture;
  row: number;
  column: number;
  grid: number;
  size: number;
  mousePosition: THREE.Vector3;
  animation?: TileAnimation;
  animationIndex?: number;
}

export default function Tile({
  texture,
  row,
  column,
  grid,
  size,
  mousePosition,
  animation = "fly",
  animationIndex = 0,
}: TileProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const introStartTime = useRef<number | null>(null);

  const tileSize = size / grid;

  /* ------------------------------------------------------------------------ */
  /*                              FINAL POSITION                              */
  /* ------------------------------------------------------------------------ */

  const x = column * tileSize - size / 2 + tileSize / 2;

  const y = -(row * tileSize) + size / 2 - tileSize / 2;

  /* ------------------------------------------------------------------------ */
  /*                           FLY INITIAL STATE                              */
  /* ------------------------------------------------------------------------ */

  const initialState = useMemo(() => {
    return {
      x: x + (Math.random() - 0.5) * INITIAL_XY_SPREAD * 2,

      y: y + (Math.random() - 0.5) * INITIAL_XY_SPREAD * 2,

      z: INITIAL_Z,

      rotationX: (Math.random() - 0.5) * Math.PI * 2,
      rotationY: (Math.random() - 0.5) * Math.PI * 2,
      rotationZ: (Math.random() - 0.5) * Math.PI * 2,

      delay: Math.random() * FLY_INTRO_MAX_DELAY,
    };
  }, [x, y]);

  /* ------------------------------------------------------------------------ */
  /*                              TILE TEXTURE                                */
  /* ------------------------------------------------------------------------ */

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

  /* ------------------------------------------------------------------------ */
  /*                                MATERIAL                                  */
  /* ------------------------------------------------------------------------ */

  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: tileTexture,
      roughness: 0.45,
      metalness: 0.05,
      side: THREE.FrontSide,
    });
  }, [tileTexture]);

  useEffect(() => {
    return () => {
      material.dispose();
    };
  }, [material]);

  /* ------------------------------------------------------------------------ */
  /*                                ANIMATION                                 */
  /* ------------------------------------------------------------------------ */

  useFrame(({ clock }, delta) => {
    if (!meshRef.current) return;

    const mesh = meshRef.current;

    if (introStartTime.current === null) {
      introStartTime.current = clock.elapsedTime;
    }

    const elapsedTime = clock.elapsedTime - introStartTime.current;

    const damping = 1 - Math.exp(-SPEED * delta);

    /* ====================================================================== */
    /*                               FLY MODE                                  */
    /* ====================================================================== */

    if (animation === "fly") {
      const rawProgress = THREE.MathUtils.clamp(
        (elapsedTime - initialState.delay) / FLY_INTRO_DURATION,
        0,
        1,
      );

      const progress = 1 - Math.pow(1 - rawProgress, 3);

      if (rawProgress < 1) {
        mesh.position.x = THREE.MathUtils.lerp(initialState.x, x, progress);

        mesh.position.y = THREE.MathUtils.lerp(initialState.y, y, progress);

        mesh.position.z = THREE.MathUtils.lerp(initialState.z, 0, progress);

        mesh.rotation.x = THREE.MathUtils.lerp(
          initialState.rotationX,
          0,
          progress,
        );

        mesh.rotation.y = THREE.MathUtils.lerp(
          initialState.rotationY,
          0,
          progress,
        );

        mesh.rotation.z = THREE.MathUtils.lerp(
          initialState.rotationZ,
          0,
          progress,
        );

        return;
      }

      /* ==================================================================== */
      /*                              FLY HOVER                                */
      /* ==================================================================== */

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

      return;
    }

    /* ====================================================================== */
    /*                              FLIP INTRO                                */
    /* ====================================================================== */

    const delay = animationIndex * FLIP_STAGGER;

    const rawProgress = THREE.MathUtils.clamp(
      (elapsedTime - delay) / FLIP_INTRO_DURATION,
      0,
      1,
    );

    const progress = 1 - Math.pow(1 - rawProgress, 3);

    if (rawProgress < 1) {
      mesh.rotation.x = THREE.MathUtils.lerp(Math.PI, 0, progress);

      return;
    }

    /* ====================================================================== */
    /*                              FLIP HOVER                                */
    /* ====================================================================== */

    /**
     * Check whether the mouse is directly
     * inside THIS tile.
     *
     * No interaction radius.
     * No neighbouring tiles.
     */
    const halfTileSize = tileSize / 2;

    const isHovered =
      mousePosition.x >= x - halfTileSize &&
      mousePosition.x <= x + halfTileSize &&
      mousePosition.y >= y - halfTileSize &&
      mousePosition.y <= y + halfTileSize;

    /**
     * Hovered:
     *
     * 0 -> PI
     * visible -> flipped / invisible
     *
     * Not hovered:
     *
     * PI -> 0
     * flipped -> visible
     */
    const targetRotationX = isHovered ? Math.PI : 0;

    mesh.rotation.x = THREE.MathUtils.lerp(
      mesh.rotation.x,
      targetRotationX,
      damping,
    );

    mesh.rotation.y = THREE.MathUtils.lerp(mesh.rotation.y, 0, damping);

    mesh.rotation.z = THREE.MathUtils.lerp(mesh.rotation.z, 0, damping);

    mesh.position.x = THREE.MathUtils.lerp(mesh.position.x, x, damping);

    mesh.position.y = THREE.MathUtils.lerp(mesh.position.y, y, damping);

    mesh.position.z = THREE.MathUtils.lerp(mesh.position.z, 0, damping);

    mesh.scale.x = THREE.MathUtils.lerp(mesh.scale.x, 1, damping);

    mesh.scale.y = THREE.MathUtils.lerp(mesh.scale.y, 1, damping);
  });

  /* ------------------------------------------------------------------------ */
  /*                            INITIAL TRANSFORM                             */
  /* ------------------------------------------------------------------------ */

  const initialPosition: [number, number, number] =
    animation === "fly"
      ? [initialState.x, initialState.y, initialState.z]
      : [x, y, 0];

  const initialRotation: [number, number, number] =
    animation === "fly"
      ? [initialState.rotationX, initialState.rotationY, initialState.rotationZ]
      : [Math.PI, 0, 0];

  return (
    <mesh
      ref={meshRef}
      position={initialPosition}
      rotation={initialRotation}
      material={material}
      castShadow
      receiveShadow
    >
      <planeGeometry args={[tileSize - 0.01, tileSize - 0.01]} />
    </mesh>
  );
}
