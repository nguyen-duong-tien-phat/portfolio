// hooks/useLenis.ts
"use client";

import { useEffect, useRef, RefObject } from "react";
import Lenis, { type LenisOptions } from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenisInstance, getLenisInstance } from "@/lib/lenis";

gsap.registerPlugin(ScrollTrigger);

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
  syncScrollTrigger = false,
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

    // --- ScrollTrigger sync ---
    if (syncScrollTrigger) {
      lenis.on("scroll", ScrollTrigger.update);

      if (!isPageInstance && wrapper) {
        // Tell ScrollTrigger this element is its own scroller, driven by Lenis
        // (not native scroll), so triggers inside the modal measure correctly.
        ScrollTrigger.scrollerProxy(wrapper, {
          scrollTop(value) {
            if (arguments.length && value !== undefined) {
              lenis.scrollTo(value, { immediate: true });
            }
            return lenis.scroll;
          },
          getBoundingClientRect() {
            return {
              top: 0,
              left: 0,
              width: wrapper!.clientWidth,
              height: wrapper!.clientHeight,
            };
          },
        });

        // Any ScrollTrigger you create inside the modal must pass `scroller: wrapper`
        // in its own config to use this proxy.
      }

      gsap.ticker.lagSmoothing(0);
    }

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      if (isPageInstance) setLenisInstance(null);
      pageLenis?.start();

      if (syncScrollTrigger && !isPageInstance && wrapper) {
        // Clean up triggers/proxy scoped to this scroller so they don't
        // leak or misfire after the modal unmounts.
        ScrollTrigger.getAll()
          .filter((t) => t.scroller === wrapper)
          .forEach((t) => t.kill());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPageInstance, pausePageLenis, syncScrollTrigger]);

  return lenisRef;
}
