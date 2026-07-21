// preload.ts

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { loadingManager } from "./loadingManager";
import { THREE_ASSETS } from "@/config/three.config";

export function preloadAssets() {
  const textureLoader = new THREE.TextureLoader(loadingManager);
  const gltfLoader = new GLTFLoader(loadingManager);

  Object.values(THREE_ASSETS.textures).forEach((path) => {
    textureLoader.load(path);
  });

  Object.values(THREE_ASSETS.models).forEach((path) => {
    gltfLoader.load(path, () => {});
  });
}
