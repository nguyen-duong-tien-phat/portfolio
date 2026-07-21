import React from "react";
import { heroConfig, socialsConfig } from "@/config/hero.config";
import { sectionConfig } from "@/config/section.config";
import { Suzanne } from "@/three/models/suzanne";
import Link from "next/link";
import Section from "@/components/ui/Section";

const secConfig = sectionConfig.hero;

const HeroSection: React.FC = () => {
  return (
    <Section>
      {/* Top meta bar */}
      <header className="flex justify-center gap-8 md:gap-16 px-8 pt-8 md:px-10">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {secConfig.name}
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {secConfig.label}
        </span>
      </header>

      <main className="flex-1 grid grid-cols-12 items-center">
        <div className="col-span-12 sm:col-span-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {heroConfig.role}
          </p>
          <h1 className="mt-4 md:mt-8 text-balance text-5xl md:text-7xl lg:text-8xl font-medium leading-[0.92] tracking-[-0.03em]">
            {heroConfig.name}
          </h1>
          <p className="mt-4 md:mt-8 max-w-sm text-pretty text-base leading-relaxed text-muted-foreground">
            {heroConfig.desc}
          </p>

          <nav
            aria-label="Social links"
            className="animate-fade-in-up mt-8 md:mt-12 grid grid-cols-2 sm:grid-cols-1"
            style={{ animationDelay: "220ms" }}
          >
            {Object.values(socialsConfig).map((s) => (
              <Link
                key={s.label}
                href={s.link}
                // target={s.target ?? "_blank"}
                className="col-span-1 group flex w-fit cursor-pointer items-center gap-2 py-1 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
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
      </main>
    </Section>
  );
};

HeroSection.displayName = "HeroSection";
export default HeroSection;
