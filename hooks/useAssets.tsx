"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { loadingManager } from "@/three/loadingManager";
import { preloadAssets } from "@/three/preload";

const AssetContext = createContext({
  progress: 0,
  ready: false,
});

export function AssetProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadingManager.onProgress = (url, loaded, total) => {
      setProgress((loaded / total) * 100);
    };

    loadingManager.onLoad = () => {
      setProgress(100);
      setReady(true);
    };

    preloadAssets();
  }, []);

  return (
    <AssetContext.Provider value={{ progress, ready }}>
      {children}
    </AssetContext.Provider>
  );
}

export function useAssets() {
  return useContext(AssetContext);
}
