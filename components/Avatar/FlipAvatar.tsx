import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

import Tile, { TileAnimation } from "./Tile";

const GRID = 10;
const SIZE = 6;

interface FlipAvatarProps {
  src: string;
  animation?: TileAnimation;
}

export default function FlipAvatar({
  src,
  animation = "fly",
}: FlipAvatarProps) {
  const texture = useTexture(src);

  const planeRef = useRef<THREE.Mesh>(null);

  // Shared mouse position for all tiles
  const mousePosition = useMemo(() => new THREE.Vector3(999, 999, 0), []);

  // Prevent the default R3F pointer (0, 0) from
  // triggering the center tiles before interaction.
  const hasPointerMoved = useRef(false);

  // Configure texture
  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
  }, [texture]);

  // Generate grid
  const tiles = useMemo(() => {
    const items: {
      row: number;
      column: number;
      id: number;
    }[] = [];

    for (let row = 0; row < GRID; row++) {
      for (let column = 0; column < GRID; column++) {
        items.push({
          row,
          column,
          id: row * GRID + column,
        });
      }
    }

    return items;
  }, []);

  /**
   * Random reveal order.
   *
   * Example:
   *
   * tile 0  -> reveal #42
   * tile 1  -> reveal #3
   * tile 2  -> reveal #81
   *
   * This is generated once and stays stable
   * during the component lifecycle.
   */
  const introOrder = useMemo(() => {
    const ids = Array.from({ length: GRID * GRID }, (_, index) => index);

    // Fisher-Yates shuffle
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [ids[i], ids[j]] = [ids[j], ids[i]];
    }

    const orderMap = new Map<number, number>();

    ids.forEach((tileId, index) => {
      orderMap.set(tileId, index);
    });

    return orderMap;
  }, []);

  /**
   * Update mouse world position.
   *
   * We only raycast after the user has actually
   * interacted with the avatar.
   */
  useFrame(({ raycaster, pointer, camera }) => {
    if (!hasPointerMoved.current) return;

    if (!planeRef.current) return;

    raycaster.setFromCamera(pointer, camera);

    const intersection = raycaster.intersectObject(planeRef.current, false)[0];

    if (intersection) {
      mousePosition.copy(intersection.point);
    }
  });

  const handlePointerMove = () => {
    hasPointerMoved.current = true;
  };

  const handlePointerLeave = () => {
    hasPointerMoved.current = false;

    // Move the virtual cursor far away
    // so all tiles animate back to normal.
    mousePosition.set(999, 999, 0);
  };

  return (
    <>
      {/* Interaction plane */}
      <mesh
        ref={planeRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <planeGeometry args={[SIZE, SIZE]} />

        {/* Invisible but still receives pointer events */}
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Avatar tiles */}
      {tiles.map((tile) => (
        <Tile
          key={tile.id}
          texture={texture}
          row={tile.row}
          column={tile.column}
          grid={GRID}
          size={SIZE}
          mousePosition={mousePosition}
          animation={animation}
          animationIndex={introOrder.get(tile.id) ?? 0}
        />
      ))}
    </>
  );
}
