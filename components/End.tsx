"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { metadata, SECTION } from "@/lib/metadata";
import Link from "next/link";

const fadeUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1] },
  },
};

export default function End() {
  const section = useRef<HTMLElement>(null);
  const isInView = useInView(section, { once: true, amount: 0.5 });

  return (
    <section
      id={SECTION.End}
      ref={section}
      className="relative flex min-h-svh flex-col items-center justify-center bg-background px-6 text-center md:px-12"
      aria-label="Contact"
    >
      <motion.div
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        variants={{
          animate: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
        }}
      >
        <motion.span
          variants={fadeUp}
          className="mb-8 block font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground"
        >
          What&apos;s Next
        </motion.span>

        <motion.h2
          variants={fadeUp}
          className="text-balance text-4xl font-medium leading-tight tracking-tight text-foreground sm:text-6xl md:text-7xl"
        >
          Let&apos;s build
          <br />
          something great.
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground"
        >
          Open to new opportunities, collaborations, or just a chat about
          frontend and full-stack engineering.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10 flex justify-center">
          <motion.nav
            key="nav"
            initial={{ opacity: 0, width: 0, marginLeft: 0 }}
            animate={{ opacity: 1, width: "auto", marginLeft: 0 }}
            exit={{ opacity: 0, width: 0, marginLeft: 0 }}
            transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
            className="flex gap-5 overflow-hidden"
          >
            {metadata.links
              .filter((link) => link.label !== "Resume")
              .map((link) => (
                <Link
                  key={`end-section-${link.label}`}
                  href={link.href}
                  target={"_blank"}
                  className="cursor-pointer items-center font-mono shrink-0"
                >
                  <link.icon
                    className="text-white hover:opacity-60 size-4 md:size-5"
                    data-tooltip={link.label}
                  />
                </Link>
              ))}
          </motion.nav>
        </motion.div>
      </motion.div>
    </section>
  );
}
