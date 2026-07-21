"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import { useAssets } from "@/hooks/useAssets";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const words = ["Next.js", "TypeScript", "Three.js", "React Three Fiber"];

export default function Intro() {
  const { progress, ready } = useAssets();

  const [fading, setFading] = useState(false);
  const [done, setDone] = useState(false);

  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((current) => (current + 1) % words.length);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Fade out once everything is loaded
  useEffect(() => {
    if (!ready) return;
    setFading(true);

    const doneTimer = setTimeout(() => {
      setDone(true);
    }, 1000);

    return () => {
      clearTimeout(doneTimer);
    };
  }, [ready]);

  if (done) return null;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "fixed inset-0 z-50 flex flex-col justify-between bg-[#13110f] px-6 py-8 text-white",
        "transform-gpu transition-all duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] md:px-10",
        fading
          ? "pointer-events-none -translate-y-20 opacity-0"
          : "translate-y-0 opacity-100",
      )}
    >
      {/* Top */}
      <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.2em] opacity-70">
        <span>Portfolio — 2026</span>
        <span>{ready ? "Ready" : "Loading"}</span>
      </div>

      {/* Center */}
      <div className="flex flex-1 items-center">
        <div className="overflow-hidden">
          <p
            key={wordIndex}
            className="animate-intro-word text-balance text-5xl font-medium tracking-[-0.03em] md:text-7xl lg:text-8xl"
          >
            {words[wordIndex]}
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6 h-px w-full bg-white/20">
        <div
          className="h-px bg-white transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Bottom */}
      <span className="text-right font-mono text-6xl font-medium tabular-nums tracking-tight md:text-7xl">
        {String(progress).padStart(3, "0")}
      </span>
    </div>
  );
}
