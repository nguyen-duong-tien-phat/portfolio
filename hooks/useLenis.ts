// hooks/useLenis.ts
"use client";

import { useEffect, useRef, RefObject } from "react";
import Lenis, { type LenisOptions } from "lenis";
import { setLenisInstance, getLenisInstance } from "@/lib/lenis";

interface UseLenisOptions extends Partial<LenisOptions> {
  wrapperRef?: RefObject<HTMLElement | null>;
  isPageInstance?: boolean;
  pausePageLenis?: boolean;
  /** Sync this Lenis instance with GSAP ScrollTrigger. */
  syncScrollTrigger?: boolean;
}

export function useLenis({
  wrapperRef,
  isPageInstance = false,
  pausePageLenis = true,
  lerp = 0.1,
  smoothWheel = true,
  ...rest
}: UseLenisOptions = {}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    let wrapper: HTMLElement | undefined;
    let content: HTMLElement | undefined;

    if (!isPageInstance) {
      if (!wrapperRef?.current) return;
      const contentEl = wrapperRef.current.firstElementChild as HTMLElement;
      if (!contentEl) return;
      wrapper = wrapperRef.current;
      content = contentEl;
    }

    const pageLenis =
      !isPageInstance && pausePageLenis ? getLenisInstance() : null;
    pageLenis?.stop();

    const lenis = new Lenis({ wrapper, content, lerp, smoothWheel, ...rest });
    lenisRef.current = lenis;
    if (isPageInstance) setLenisInstance(lenis);

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      if (isPageInstance) setLenisInstance(null);
      pageLenis?.start();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPageInstance, pausePageLenis]);

  return lenisRef;
}
