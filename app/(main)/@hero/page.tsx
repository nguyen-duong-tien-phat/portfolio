"use client";
import Section from "@/components/ui/Section";
import { heroConfig, socialsConfig } from "@/config/hero.config";
import { SECTION_NAME } from "@/config/section.config";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";

const Suzanne = dynamic(() => import("@/three/models/suzanne"));

gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {
  useGSAP(() => {
    ScrollTrigger.create({
      trigger: `#${SECTION_NAME.HERO}`,
      start: () => `10% top`,
      onEnter: () => {
        const smoother = ScrollSmoother.get();

        smoother?.scrollTo(
          `#${SECTION_NAME.EXPERIENCE}`,
          true,
          `top ${document.querySelector("#header")?.clientHeight ?? 0}`,
        );
      },
    });
  });

  return (
    <Section name={SECTION_NAME.HERO} className="relative">
      <div className="h-full grid grid-cols-12 items-center">
        <div className="col-span-12 sm:col-span-6 flex flex-col">
          <p className="font-mono uppercase tracking-[0.3em] text-muted-foreground">
            {heroConfig.role}
          </p>
          <h1 className="mt-4 text-balance text-5xl md:text-7xl lg:text-8xl font-medium leading-[0.92] tracking-[-0.03em]">
            {heroConfig.name}
          </h1>
          <p className="mt-4 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            {heroConfig.desc}
          </p>

          <nav className="mt-8 flex-1 md:mt-10 flex flex-col flex-wrap">
            {Object.values(socialsConfig).map((s) => (
              <Link
                key={s.label}
                href={s.link}
                target={s.target ?? "_blank"}
                className="group flex w-fit cursor-pointer items-center gap-2 py-1 font-mono text-sm uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="inline-block h-px w-6 bg-current transition-all duration-300 group-hover:w-10" />
                {s.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="col-span-12 sm:col-span-6">
          <div className="aspect-square w-full">
            <Suzanne />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] tracking-[0.4em]">SCROLL</span>
          <div className="h-16 w-px bg-current/50" />
        </div>
      </div>
    </Section>
  );
};

HeroSection.displayName = "HeroSection";
export default HeroSection;
