"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { experiences } from "@/lib/experience";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const section = useRef<HTMLElement>(null);
  const intro = useRef<HTMLDivElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLSpanElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const [active, setActive] = useState(0);
  const total = experiences.length;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Intro paragraph: words rise and fade in as the section arrives.
      gsap.from("[data-intro-line]", {
        yPercent: 110,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: intro.current,
          start: "top 75%",
        },
      });

      // Pin the timeline and scrub the drawing line as the user scrolls.
      ScrollTrigger.create({
        trigger: pin.current,
        start: "top top",
        end: () => `+=${total * 90}%`,
        pin: true,
        scrub: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Ease progress slightly so the line settles on each milestone.
          const p = self.progress;
          if (line.current) {
            gsap.set(line.current, { scaleY: p });
          }

          // Map progress -> active milestone (line "reaches" the point).
          const idx = Math.min(total - 1, Math.floor(p * total));
          setActive((prev) => (prev === idx ? prev : idx));
        },
      });
    }, section);

    return () => ctx.revert();
  }, [total]);

  return (
    <section
      ref={section}
      className="relative bg-background"
      aria-label="Experience"
    >
      {/* Intro paragraph */}
      <div
        ref={intro}
        className="mx-auto max-w-5xl px-6 pb-24 pt-32 md:px-12 md:pb-40 md:pt-48"
      >
        <span className="mb-8 block font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          The Journey
        </span>
        <p className="text-balance text-2xl font-medium leading-snug tracking-tight text-foreground sm:text-3xl md:text-4xl md:leading-tight">
          {[
            "2+ years building products across the frontend —",
            "React, Next.js, Three.js, and more. Right now",
            "I'm leveling up into full-stack territory, going",
            "deeper on Node.js and the backend side of things.",
          ].map((l, i) => (
            <span key={i} className="block overflow-hidden">
              <span data-intro-line className="block">
                {i > 1 ? <span className="text-muted-foreground">{l}</span> : l}
              </span>
            </span>
          ))}
        </p>
      </div>

      {/* Pinned timeline */}
      <div ref={pin} className="relative h-svh w-full overflow-hidden">
        <div className="mx-auto flex h-full max-w-5xl items-center px-6 md:px-12">
          <div className="grid w-full grid-cols-[auto_1fr] gap-8 md:gap-16">
            {/* Timeline rail */}
            <div className="relative flex flex-col justify-center">
              <div className="relative h-64 w-px bg-border md:h-80">
                {/* drawn line */}
                <span
                  ref={line}
                  className="absolute left-0 top-0 block h-full w-full origin-top scale-y-0 bg-foreground"
                  aria-hidden
                />

                {/* milestone dots */}
                {experiences.map((exp, i) => {
                  const top = total > 1 ? (i / (total - 1)) * 100 : 0;
                  const reached = i <= active;
                  return (
                    <span
                      key={exp.company}
                      ref={(el) => {
                        dotRefs.current[i] = el;
                      }}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ top: `${top}%`, left: "50%" }}
                    >
                      <span
                        className={`block rounded-full border transition-all duration-500 ease-out ${
                          reached
                            ? "h-3.5 w-3.5 border-foreground bg-foreground"
                            : "h-2.5 w-2.5 border-border bg-background"
                        }`}
                      />
                      {reached && (
                        <span className="absolute left-1/2 top-1/2 -z-10 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/10" />
                      )}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Active experience */}
            <div className="flex min-h-64 flex-col justify-center md:min-h-80">
              <span className="mb-6 font-mono text-xs tabular-nums text-muted-foreground">
                <span className="text-foreground">0{active + 1}</span> / 0
                {total}
              </span>

              <AnimatePresence mode="wait">
                <motion.div
                  key={experiences[active].company}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -28 }}
                  transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
                >
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {experiences[active].period} ·{" "}
                    {experiences[active].location}
                  </span>

                  <h3 className="mt-3 text-3xl font-medium tracking-tight text-foreground md:text-4xl">
                    {experiences[active].role}
                  </h3>
                  <p className="mt-1 text-lg text-muted-foreground">
                    {experiences[active].company}
                  </p>

                  <p className="mt-5 max-w-md text-pretty leading-relaxed text-muted-foreground">
                    {experiences[active].description}
                  </p>

                  <ul
                    className="mt-6 flex flex-wrap gap-2"
                    aria-label="Tech stack"
                  >
                    {experiences[active].tech.map((t) => (
                      <li
                        key={t}
                        className="border border-border px-2.5 py-1 font-mono text-xs text-foreground"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
