"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Marquee from "@/components/Marquee";
import Section from "@/components/ui/Section";
import { experienceConfig } from "@/config/experience.config";
import { SECTION_NAME } from "@/config/section.config";
import { formatDate } from "@/lib/datetime";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: "easeOut",
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.97,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const wordsContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.02, delayChildren: 0.15 },
  },
};

const wordVariant: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

// title words stagger in first, slightly heavier motion for emphasis
const titleContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.05 },
  },
};

const titleWord: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// summary paragraph starts once the title has mostly finished
const summaryContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.015, delayChildren: 0.45 },
  },
};

// TODO: move this into experienceConfig (e.g. experienceConfig.summary)
// if you'd rather manage this copy alongside the rest of the section content.
const SUMMARY =
  "2+ years building products across the frontend — React, Next.js, Three.js, and more. Right now I'm leveling up into full-stack territory, going deeper on Node.js and the backend side of things.";

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  const experiences = experienceConfig.experience;
  const count = experiences.length;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Pinned scrollytelling only kicks in on md+ screens.
      // Mobile gets a plain stacked list (see JSX below) — pinning
      // a horizontal effect on mobile scroll tends to feel janky.
      mm.add("(min-width: 768px)", () => {
        // TOP_OFFSET: how far from the very top of the viewport the
        // pinned section should stick (e.g. clear a sticky navbar).
        // "top top+=X" means: pin once the trigger's top is X px
        // below the viewport's top, and the pinned box stays X px
        // from the top for the whole pinned duration.
        const TOP_OFFSET = 64; // px — adjust to your navbar height

        const timelineTrigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: `top top+=${TOP_OFFSET + 49}`,
          end: `+=${window.innerHeight * count}`,
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            gsap.set(lineRef.current, { scaleX: self.progress });

            // figure out which dot the line has reached
            const segment = 1 / (count - 1);
            let idx = -1;
            for (let i = 0; i < count; i++) {
              const threshold = i * segment;
              if (self.progress >= threshold - 0.015) idx = i;
            }
            setActiveIndex(idx);
          },
        });

        // CSS `sticky` doesn't work here because ScrollSmoother scrolls
        // by transforming #smooth-content — any transformed ancestor
        // kills sticky/fixed positioning for descendants. Using
        // ScrollTrigger's pin instead, wired to the exact same end
        // position as the timeline above (via timelineTrigger.end)
        // so the marquee unpins right when the line finishes growing —
        // not at some independently-guessed scroll distance.
        const marqueeTrigger = ScrollTrigger.create({
          trigger: marqueeRef.current,
          start: `top top+=${TOP_OFFSET}`,
          end: () => timelineTrigger.end,
          pin: true,
          pinSpacing: false,
        });

        return () => {
          timelineTrigger.kill();
          marqueeTrigger.kill();
        };
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, [count]);

  return (
    <div className="relative">
      {/* Pinned via ScrollTrigger (not CSS sticky — see the comment in
          the effect for why). Unpins exactly when the timeline's line
          finishes, since its end is tied to timelineTrigger.end. */}
      <div ref={marqueeRef} className="relative z-30 bg-background">
        <Marquee
          items={[
            "React",
            "Next.Js",
            "Gatsby",
            "Tailwind CSS",
            "Three.js",
            "React Three Fiber",
            "Alipay Mini Program",
            "Redux",
            "Node.js",
            "Ant Design",
            "Material UI",
          ]}
        />
      </div>

      <Section name={SECTION_NAME.EXPERIENCE} className="relative">
        {/* Desktop: pinned horizontal-line scrollytelling */}
        <div
          ref={sectionRef}
          className="relative hidden md:flex md:flex-col min-h-[calc(100vh-4rem-49px)] px-8 lg:px-16 py-16"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <motion.h1
              variants={titleContainer}
              className="text-balance text-center text-5xl md:text-7xl font-medium leading-[1.02] tracking-[-0.03em]"
            >
              {experienceConfig.title.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  variants={titleWord}
                  className="inline-block mr-3 md:mr-4"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              variants={summaryContainer}
              className="mt-6 max-w-2xl mx-auto text-balance text-center font-mono text-gray-600"
            >
              {SUMMARY.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  variants={wordVariant}
                  className="inline-block mr-1"
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          {/* pushes the timeline down toward the bottom of the pinned viewport */}
          <div className="min-h-120" />

          <div className="relative w-full max-w-5xl mx-auto">
            <div className="relative flex justify-between items-center pr-16 md:pr-24">
              {/* base dashed track */}
              <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-black/20 -translate-y-1/2 pointer-events-none" />

              {/* progress line, grows with scroll — stops at the same
                  edge the dots stop at (pr-16/pr-24), NOT the full box,
                  otherwise scaleX:1 overshoots past the last dot and
                  the last dot's threshold never lines up with where
                  the line visually reaches it. */}
              <div
                ref={lineRef}
                className="absolute top-1/2 left-0 right-16 md:right-24 h-px bg-black origin-left -translate-y-1/2 pointer-events-none"
                style={{ transform: "scaleX(0)" }}
              />

              {experiences.map((experience, i) => {
                const isPassed = i <= activeIndex;
                const isCurrent = i === activeIndex;
                const align =
                  i === 0
                    ? "left-0"
                    : i === count - 1
                      ? "right-0"
                      : "left-1/2 -translate-x-1/2";

                return (
                  <div
                    key={experience.company}
                    className="relative flex flex-col items-center"
                  >
                    <span className="relative flex items-center justify-center size-3">
                      {/* pulsing ring, only while this dot is the active one */}
                      {isCurrent && (
                        <span className="absolute inline-flex h-full w-full rounded-full bg-black/50 animate-ping" />
                      )}

                      <motion.span
                        animate={{ scale: isCurrent ? 1.4 : 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                        }}
                        className={cn(
                          "relative size-3 rounded-full border-2 border-black/30 bg-white transition-colors duration-300 z-10",
                          isPassed && "bg-black border-black",
                        )}
                      />
                    </span>

                    <AnimatePresence>
                      {isCurrent && (
                        <motion.div
                          key={experience.company}
                          variants={cardVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className={cn(
                            "absolute bottom-full mb-6 w-72 rounded-lg border border-black/10 bg-white p-4 shadow-sm",
                            align,
                          )}
                        >
                          <motion.p
                            variants={fadeUp}
                            className="font-mono text-sm text-gray-500"
                          >
                            {formatDate(experience.startAt, {
                              month: "2-digit",
                              year: "numeric",
                            })}
                            {" - "}
                            {experience.endAt
                              ? formatDate(experience.endAt, {
                                  month: "2-digit",
                                  year: "numeric",
                                })
                              : "Present"}
                          </motion.p>
                          <motion.p
                            variants={fadeUp}
                            className="font-medium text-lg mt-1"
                          >
                            {experience.company}
                          </motion.p>
                          <motion.p
                            variants={fadeUp}
                            className="font-mono text-sm text-gray-700"
                          >
                            {experience.role}
                          </motion.p>
                          <motion.p
                            variants={wordsContainer}
                            className="font-mono text-sm mt-2 flex flex-wrap"
                          >
                            {experience.desc.split(" ").map((word, wi) => (
                              <motion.span
                                key={wi}
                                variants={wordVariant}
                                className="mr-1"
                              >
                                {word}
                              </motion.span>
                            ))}
                          </motion.p>
                          <motion.div
                            variants={fadeUp}
                            className="mt-3 flex flex-wrap gap-2"
                          >
                            {experience.technologies.map((tech) => (
                              <span
                                key={`${experience.company}-${tech}`}
                                className="font-mono text-xs border border-black/20 py-0.5 px-2 rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile: plain stacked list, no pin/scrub */}
        <div className="md:hidden">
          <h1 className="text-balance text-center text-5xl font-medium leading-[1.02] tracking-[-0.03em]">
            {experienceConfig.title}
          </h1>
          <p className="mt-4 mb-8 px-4 text-balance text-center font-mono text-gray-600">
            {SUMMARY}
          </p>
          <ul className="flex flex-col gap-4 px-4 pb-16">
            {experiences.map((experience) => (
              <li
                key={experience.company}
                className="border border-black/10 rounded-lg p-4"
              >
                <p className="font-mono text-sm text-gray-500">
                  {formatDate(experience.startAt, {
                    month: "2-digit",
                    year: "numeric",
                  })}
                  {" - "}
                  {experience.endAt
                    ? formatDate(experience.endAt, {
                        month: "2-digit",
                        year: "numeric",
                      })
                    : "Present"}
                </p>
                <p className="font-medium text-lg mt-1">{experience.company}</p>
                <p className="font-mono text-sm text-gray-700">
                  {experience.role}
                </p>
                <p className="font-mono text-sm mt-2">{experience.desc}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {experience.technologies.map((tech) => (
                    <span
                      key={`${experience.company}-${tech}`}
                      className="font-mono text-xs border border-black/20 py-0.5 px-2 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </div>
  );
}
