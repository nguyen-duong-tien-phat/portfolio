"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { metadata, SECTION } from "@/lib/metadata";

gsap.registerPlugin(ScrollTrigger);
const experiences = metadata.experiences;

export default function Experience() {
  const section = useRef<HTMLElement>(null);
  const intro = useRef<HTMLDivElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLSpanElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const [active, setActive] = useState(0);
  const total = experiences.length;

  // Gate the first entrance animation until the pinned block actually scrolls into view.
  const isPinInView = useInView(pin, { once: true, amount: 0.4 });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Intro paragraph: words rise and fade in as the section arrives.
      const lines = gsap.utils.toArray<HTMLElement>("[data-intro-line]");

      lines.forEach((line) =>
        gsap.from(line, {
          yPercent: 110,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: line, start: "top bottom" },
        }),
      );

      // Pin the timeline and scrub the drawing line as the user scrolls.
      ScrollTrigger.create({
        trigger: pin.current,
        start: "top top",
        end: () => `+=${total * 90}%`,
        pin: true,
        scrub: true,
        anticipatePin: 1,
        refreshPriority: 1,
        onUpdate: (self) => {
          const p = self.progress;

          if (line.current) {
            gsap.set(line.current, { scaleY: p });
          }

          const idx = Math.min(total - 1, Math.floor(p * (total - 1) + 1e-6));

          setActive((prev) => (prev === idx ? prev : idx));
        },
      });
    }, section);

    return () => ctx.revert();
  }, [total]);

  return (
    <section
      id={SECTION.Experience}
      ref={section}
      className="relative bg-background"
      aria-label="Experience"
    >
      {/* Intro paragraph */}
      <div
        ref={intro}
        className="mx-auto max-w-6xl px-6 pb-24 pt-32 md:px-12 md:pb-40 md:pt-48"
      >
        <span className="mb-8 block font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          The Goal
        </span>
        <p className="text-balance text-2xl font-medium leading-snug tracking-tight text-muted-foreground sm:text-3xl md:text-5xl md:leading-tight">
          {[
            "2+ years building products across the frontend —",
            "React, Next.js, Three.js, and more. Right now",
            "I'm leveling up into full-stack territory, going",
            "deeper on the backend side of things.",
          ].map((l, i) => (
            <span key={l} className="block overflow-hidden">
              <span data-intro-line className="block">
                {i > 1 ? <span className="text-foreground">{l}</span> : l}
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
                  // Only treat the first dot as "reached" once the section has actually entered view.
                  const reached = isPinInView && i <= active;
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
            <div className="flex min-h-64 flex-col md:min-h-80">
              <motion.span
                key={`counter-${active}`}
                initial={{ opacity: 0 }}
                animate={isPinInView ? { opacity: 1 } : { opacity: 0 }}
                className="mb-6 font-mono text-xs tabular-nums text-muted-foreground"
              >
                <motion.span
                  key={active}
                  initial={{ y: -10, opacity: 0 }}
                  animate={
                    isPinInView ? { y: 0, opacity: 1 } : { y: -10, opacity: 0 }
                  }
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="inline-block text-foreground"
                >
                  0{active + 1}
                </motion.span>{" "}
                / 0{total}
              </motion.span>

              <div className="flex-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={experiences[active].company}
                    initial="initial"
                    animate={isPinInView ? "animate" : "initial"}
                    exit="exit"
                    variants={{
                      initial: {},
                      animate: { transition: { staggerChildren: 0.08 } },
                      exit: {},
                    }}
                  >
                    <motion.span
                      variants={{
                        initial: { opacity: 0, y: 20, filter: "blur(4px)" },
                        animate: {
                          opacity: 1,
                          y: 0,
                          filter: "blur(0px)",
                          transition: {
                            duration: 0.5,
                            ease: [0.65, 0, 0.35, 1],
                          },
                        },
                        exit: {
                          opacity: 0,
                          y: -12,
                          filter: "blur(4px)",
                          transition: {
                            duration: 0.3,
                            ease: [0.65, 0, 0.35, 1],
                          },
                        },
                      }}
                      className="block font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
                    >
                      {experiences[active].period} ·{" "}
                      {experiences[active].location}
                    </motion.span>

                    <motion.h3
                      variants={{
                        initial: { opacity: 0, y: 20, filter: "blur(4px)" },
                        animate: {
                          opacity: 1,
                          y: 0,
                          filter: "blur(0px)",
                          transition: {
                            duration: 0.5,
                            ease: [0.65, 0, 0.35, 1],
                          },
                        },
                        exit: {
                          opacity: 0,
                          y: -12,
                          filter: "blur(4px)",
                          transition: {
                            duration: 0.3,
                            ease: [0.65, 0, 0.35, 1],
                          },
                        },
                      }}
                      className="mt-3 text-3xl font-medium tracking-tight text-foreground md:text-4xl"
                    >
                      {experiences[active].role}
                    </motion.h3>

                    <motion.p
                      variants={{
                        initial: { opacity: 0, y: 20, filter: "blur(4px)" },
                        animate: {
                          opacity: 1,
                          y: 0,
                          filter: "blur(0px)",
                          transition: {
                            duration: 0.5,
                            ease: [0.65, 0, 0.35, 1],
                          },
                        },
                        exit: {
                          opacity: 0,
                          y: -12,
                          filter: "blur(4px)",
                          transition: {
                            duration: 0.3,
                            ease: [0.65, 0, 0.35, 1],
                          },
                        },
                      }}
                      className="mt-1 text-lg text-muted-foreground"
                    >
                      {experiences[active].company}
                    </motion.p>

                    <motion.p
                      variants={{
                        initial: { opacity: 0, y: 20, filter: "blur(4px)" },
                        animate: {
                          opacity: 1,
                          y: 0,
                          filter: "blur(0px)",
                          transition: {
                            duration: 0.5,
                            ease: [0.65, 0, 0.35, 1],
                          },
                        },
                        exit: {
                          opacity: 0,
                          y: -12,
                          filter: "blur(4px)",
                          transition: {
                            duration: 0.3,
                            ease: [0.65, 0, 0.35, 1],
                          },
                        },
                      }}
                      className="mt-5 max-w-md text-pretty leading-relaxed text-muted-foreground"
                    >
                      {experiences[active].description}
                    </motion.p>

                    <motion.ul
                      variants={{
                        initial: { opacity: 0, y: 20, filter: "blur(4px)" },
                        animate: {
                          opacity: 1,
                          y: 0,
                          filter: "blur(0px)",
                          transition: {
                            duration: 0.5,
                            ease: [0.65, 0, 0.35, 1],
                          },
                        },
                        exit: {
                          opacity: 0,
                          y: -12,
                          filter: "blur(4px)",
                          transition: {
                            duration: 0.3,
                            ease: [0.65, 0, 0.35, 1],
                          },
                        },
                      }}
                      className="mt-6 flex flex-wrap gap-2"
                      aria-label="Tech stack"
                    >
                      {experiences[active].tech.map((t) => (
                        <motion.li
                          key={t}
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={
                            isPinInView
                              ? { opacity: 1, scale: 1 }
                              : { opacity: 0, scale: 0.85 }
                          }
                          transition={{
                            duration: 0.3,
                            ease: "easeOut",
                          }}
                          className="border border-border px-2.5 py-1 font-mono text-xs text-foreground"
                        >
                          {t}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
