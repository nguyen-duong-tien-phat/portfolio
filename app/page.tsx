"use client";

import { HeroObject } from "@/three/models/heroModel";

const socials = [
  { label: "GitHub", href: "#" },
  { label: "Gmail", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Read.cv", href: "#" },
];

export default function Home() {
  return (
    <section
      id="top"
      data-snap
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-background text-foreground"
    >
      {/* Top meta bar */}
      <header className="mx-auto grid max-w-[1600px] grid-cols-12 items-center gap-4 px-8 pt-8 md:px-10">
        <div className="col-span-6 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Portfolio — 2026
        </div>
        <div className="col-span-6 text-right font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Index / 01
        </div>
      </header>

      {/* Main composition */}
      <div className="mx-auto grid min-h-[calc(100vh-12rem)] w-[min(1600px,100%)] grid-cols-12 items-center gap-x-4 gap-y-12 px-6 py-12 md:px-10">
        {/* Left */}
        <div className="col-span-12 flex flex-col justify-center lg:col-span-6 lg:h-full">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Frontend Developer
          </p>
          <h1 className="mt-8 text-balance text-6xl font-medium leading-[0.92] tracking-[-0.03em] md:text-7xl lg:text-8xl">
            Finn Nguyen
          </h1>
          <p className="mt-8 max-w-sm text-pretty text-base leading-relaxed text-muted-foreground">
            I design and build calm, precise interfaces where typography,
            motion, and restraint do the heavy lifting.
          </p>

          {/* Social links */}
          <nav
            aria-label="Social links"
            className="animate-fade-in-up mt-12 flex flex-col gap-1"
            style={{ animationDelay: "220ms" }}
          >
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="group flex w-fit cursor-pointer items-center gap-2 py-1 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="inline-block h-px w-6 bg-current transition-all duration-300 group-hover:w-10" />
                {s.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Center — 3D focal point */}
        <div className="col-span-12 flex items-center justify-center lg:col-span-6">
          <div className="aspect-square w-full">
            <HeroObject />
          </div>
        </div>
      </div>
    </section>
  );
}
