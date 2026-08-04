"use client";
import Section from "@/components/ui/Section";
import { heroConfig, socialsConfig } from "@/config/hero.config";
import { SECTION_NAME } from "@/config/section.config";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";

const GridBackground = dynamic(() => import("@/three/background/GridWave"), {
  ssr: false,
});

const KineticName: React.FC<{ text: string }> = ({ text }) => (
  <h1 className="font-display flex flex-wrap text-balance text-5xl md:text-7xl lg:text-8xl font-medium leading-[0.92] tracking-[-0.03em]">
    {text.split("").map((char, i) => (
      <motion.span
        key={i}
        custom={i}
        initial="rest"
        whileHover="hover"
        variants={{
          rest: { rotate: 0, y: 0 },
          hover: (i: number) => ({
            rotate: [0, -6, 6, 0][i % 4],
            y: -6,
            transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
          }),
        }}
        className="inline-block cursor-default"
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}
  </h1>
);

const HeroSection: React.FC = () => {
  return (
    <Section
      name={SECTION_NAME.HERO}
      className="relative min-h-[calc(100vh-4rem)] max-w-none! px-0!"
    >
      <div className="pointer-events-none absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 opacity-80">
        <GridBackground />
      </div>

      <div className="relative z-10 mx-auto w-[min(1600px,100%)] px-6 md:px-12 min-h-[85vh] flex flex-col justify-center py-16">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <p className="font-mono uppercase tracking-[0.3em] text-muted-foreground">
            {heroConfig.role}
          </p>
          <span className="flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-600 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-600" />
            </span>
            open to work
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 max-w-4xl -rotate-1 origin-bottom-left"
        >
          <KineticName text={heroConfig.name} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground"
        >
          {heroConfig.desc}
        </motion.p>

        <motion.nav
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-8 flex flex-wrap gap-2"
        >
          {Object.values(socialsConfig).map((s) => (
            <Link
              key={s.label}
              href={s.link}
              target={s.target ?? "_blank"}
              className="group flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-all duration-300 hover:border-foreground hover:text-foreground hover:-translate-y-0.5"
            >
              {s.label}
            </Link>
          ))}
        </motion.nav>
      </div>
    </Section>
  );
};

HeroSection.displayName = "HeroSection";
export default HeroSection;
