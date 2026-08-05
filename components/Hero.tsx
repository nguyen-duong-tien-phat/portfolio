"use client";

import { useLayoutEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import CustomCursor from "@/components/CustomCursor";
import ArrowUpRight from "./icons/ArrowUpRight";

// The 3D canvas is client-only.
const HeroScene = dynamic(() => import("@/three/HeroScene"), { ssr: false });

const links = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Email", href: "mailto:hello@finn.dev" },
];

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set("[data-reveal]", { yPercent: 120 });
      gsap
        .timeline({ defaults: { ease: "power4.out", duration: 1.1 } })
        .to("[data-reveal]", { yPercent: 0, stagger: 0.08, delay: 0.15 })
        .from(
          "[data-fade]",
          { opacity: 0, y: 12, duration: 0.9, stagger: 0.08 },
          "-=0.6",
        );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div
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

      {/* Top bar */}
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-6 md:px-12">
        <span className="font-mono text-sm tracking-tight text-foreground">
          finn.dev
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Available for work
        </span>
      </header>

      {/* Content */}
      <main className="relative z-20 flex min-h-svh items-center px-6 md:px-12">
        <div className="max-w-2xl">
          <div className="mb-5 overflow-hidden">
            <p
              data-reveal
              className="font-mono text-sm tracking-tight text-muted-foreground"
            >
              Hi, I&apos;m Finn
            </p>
          </div>

          <h1 className="text-balance text-6xl font-medium leading-[0.95] tracking-tight text-foreground md:text-8xl">
            <span className="block overflow-hidden">
              <span data-reveal className="block">
                Frontend
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-reveal className="block">
                Developer
              </span>
            </span>
          </h1>

          <p
            data-fade
            className="mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground"
          >
            I build fast, accessible, and thoughtfully crafted interfaces for
            the web.
          </p>

          <nav
            data-fade
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
            aria-label="Social links"
          >
            {links.map(({ label, href }, i) => (
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
    </div>
  );
}
