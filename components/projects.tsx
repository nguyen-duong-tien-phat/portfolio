"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "@/lib/projects";
import ArrowUpRight from "./icons/ArrowUpRight";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const section = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const progressBar = useRef<HTMLSpanElement>(null);
  const frame = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(0);

  const total = projects.length;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the section and scrub through projects as the user scrolls.
      ScrollTrigger.create({
        trigger: section.current,
        start: "top top",
        end: () => `+=${total * 100}%`,
        pin: pin.current,
        scrub: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Map scroll progress -> active project index.
          const idx = Math.min(total - 1, Math.floor(self.progress * total));
          setActive((prev) => (prev === idx ? prev : idx));
          if (progressBar.current) {
            gsap.set(progressBar.current, { scaleY: self.progress });
          }
        },
      });

      // Entrance reveal: the preview frame clips open as the section arrives.
      gsap.from(frame.current, {
        clipPath: "inset(45% 45% 45% 45% round 16px)",
        scale: 0.9,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top 80%",
          end: "top top",
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [total]);

  const project = projects[active];

  return (
    <section
      ref={section}
      className="relative bg-background"
      aria-label="Selected projects"
    >
      <div
        ref={pin}
        className="relative flex h-svh w-full flex-col overflow-hidden"
      >
        {/* Section heading */}
        <div className="flex items-end justify-end px-6 pt-8 md:px-12">
          <span className="font-mono text-xs tabular-nums text-muted-foreground">
            <span className="text-foreground">0{active + 1}</span> / 0{total}
          </span>
        </div>

        {/* Main grid */}
        <div className="grid flex-1 grid-cols-1 items-center gap-6 px-6 py-6 md:grid-cols-12 md:gap-10 md:px-12">
          {/* Left: info */}
          <div className="order-2 md:order-1 md:col-span-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
              >
                <div className="mb-5 flex items-center gap-3">
                  <Image alt="logo" src={project.logo} width={50} height={50} />{" "}
                  {project.nameComp ? (
                    <project.nameComp className="text-white h-12.5" />
                  ) : (
                    <h3 className="text-balance text-4xl font-medium tracking-tight text-foreground md:text-5xl">
                      {project.name}
                    </h3>
                  )}
                </div>

                <p className="mt-5 max-w-sm text-pretty leading-relaxed text-muted-foreground">
                  {project.desc}
                </p>

                <ul
                  className="mt-6 flex flex-wrap gap-2"
                  aria-label="Tech stack"
                >
                  {project.tech.map((t) => (
                    <li
                      key={t}
                      className="border border-border px-2.5 py-1 font-mono text-xs text-foreground"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex items-center gap-6">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground"
                  >
                    Visit live
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Source
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: interactive preview */}
          <div className="order-1 md:order-2 md:col-span-8">
            <div
              ref={frame}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
            >
              {/* Browser chrome */}
              <div className="flex items-center gap-3 border-b border-border px-4 py-2.5">
                <div className="flex gap-1.5" aria-hidden>
                  <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                </div>
                <div className="flex-1 truncate rounded-md bg-muted px-3 py-1 text-center font-mono text-[0.7rem] text-muted-foreground">
                  {project.demo.replace(/^https?:\/\//, "")}
                </div>
                <button
                  type="button"
                  className="shrink-0 rounded-md border border-border px-2.5 py-1 font-mono text-[0.7rem] text-foreground transition-colors hover:bg-foreground hover:text-background"
                  data-cursor-hover
                >
                  Preview
                </button>
              </div>

              {/* Viewport */}
              <div className="relative aspect-video w-full bg-muted">
                <iframe
                  key={project.demo}
                  src={project.demo}
                  title={`${project.name} live preview`}
                  className="h-full w-full"
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll progress rail */}
        <div className="pointer-events-none absolute right-6 top-1/2 hidden h-40 w-px -translate-y-1/2 bg-border md:block">
          <span
            ref={progressBar}
            className="absolute left-0 top-0 block h-full w-full origin-top scale-y-0 bg-foreground"
            aria-hidden
          />
        </div>

        {/* Hint */}
        <div className="px-6 pb-6 md:px-12">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
            Scroll to explore
          </p>
        </div>
      </div>
    </section>
  );
}
