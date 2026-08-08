"use client";

import { useLayoutEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import CustomCursor from "@/components/CustomCursor";
import ArrowUpRight from "./icons/ArrowUpRight";
import { metadata, SECTION } from "@/lib/metadata";

// The 3D canvas is client-only.
const HeroScene = dynamic(() => import("@/three/HeroScene"), {
  ssr: false,
});

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLSpanElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const navLinks = navRef.current?.querySelectorAll("a");

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(badgeRef.current, {
        opacity: 0,
        y: -12,
        duration: 0.6,
      })
        .from(headingRef.current, { yPercent: 110, duration: 1 }, "-=0.3")
        .from(paraRef.current, { opacity: 0, y: 16, duration: 0.7 }, "-=0.5")
        .from(
          navLinks ?? [],
          { opacity: 0, y: 12, duration: 0.5, stagger: 0.08 },
          "-=0.4",
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id={SECTION.Hero}
      ref={root}
      className="relative min-h-svh overflow-hidden bg-background"
    >
      <CustomCursor />

      {/* 3D background */}
      <div className="absolute inset-0 z-0" aria-hidden>
        <HeroScene />
      </div>

      {/* subtle white fade so text stays crisp over particles */}
      <div
        className="pointer-events-none absolute inset-0 z-10 bg-linear-to-b from-background/40 via-transparent to-background/60"
        aria-hidden
      />

      {/* Content — pinned to the top since the 3D plane occupies the lower half */}
      <main className="relative flex z-10 min-h-svh justify-center px-6 md:px-12">
        <div className="pt-35 md:pt-40">
          <div
            ref={badgeRef}
            className="group mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 backdrop-blur transition-colors duration-300 hover:border-border"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <span className="text-sm text-muted-foreground">
              {metadata.hero.available}
            </span>
          </div>

          <h1 className="text-6xl font-semibold leading-[0.9] tracking-tight md:text-8xl">
            <span className="block overflow-hidden">
              <span ref={headingRef} className="block">
                {metadata.hero.hello}
              </span>
            </span>
          </h1>

          <p
            ref={paraRef}
            className="mt-8 md:max-w-2xl text-lg leading-relaxed text-muted-foreground"
          >
            {metadata.hero.description}
          </p>

          <nav ref={navRef} className="mt-14 flex flex-wrap gap-8">
            {metadata.links.map(({ label, href }, i) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex items-baseline gap-2 text-lg tracking-tight text-foreground"
              >
                <span className="font-mono text-[0.7rem] text-muted-foreground">
                  0{i + 1}
                </span>

                {/* rolling text: top rolls up and out, bottom rolls in */}
                <span className="relative block overflow-hidden">
                  <span className="block transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-full">
                    {label}
                  </span>
                  <span
                    className="absolute left-0 top-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-y-0"
                    aria-hidden
                  >
                    {label}
                  </span>
                </span>

                <ArrowUpRight
                  className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-x-0 group-hover:opacity-100"
                  aria-hidden
                />

                {/* underline draw */}
                <span
                  className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-foreground transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-x-100"
                  aria-hidden
                />
              </a>
            ))}
          </nav>
        </div>
      </main>
    </section>
  );
}
