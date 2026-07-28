"use client";
import { THREE_ASSETS } from "@/config/three.config";
import {
  Environment,
  Html,
  PresentationControls,
  useGLTF,
} from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

interface MonitorProps {
  url: string;
}

export default function Monitor({ url }: MonitorProps) {
  const monitor = useGLTF(THREE_ASSETS.models.monitor);

  useEffect(() => {
    monitor.scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      if (child.name === "body") {
        child.material = new THREE.MeshStandardMaterial({
          color: "#d6d6d6",
          metalness: 0.9,
          roughness: 0.3,
        });
      }

      if (child.name === "screen") {
        child.material = new THREE.MeshStandardMaterial({
          color: "#111111",
          metalness: 0.05,
          roughness: 0.95,
        });
      }
    });
  }, [monitor]);

  return (
    <>
      <Environment preset="sunset" />
      <PresentationControls
        snap
        speed={1.2}
        polar={[-0.3, 0.3]}
        azimuth={[-0.6, 0.6]}
      >
        <primitive object={monitor.scene}>
          <Html
            transform
            distanceFactor={0.19}
            position={[0, 0.04, 0]}
            className="bg-white"
          >
            <iframe
              src={url}
              style={{
                width: 1100,
                height: 1024 * 0.5625, // 0.5625 = screenSize.current.y / screenSize.current.x
              }}
            />
          </Html>
        </primitive>
      </PresentationControls>
    </>
  );
}
