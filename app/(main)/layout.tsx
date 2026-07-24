"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { useGSAP } from "@gsap/react";

import Intro from "@/components/intro/Intro";
import { sectionConfig } from "@/config/section.config";
import { cn } from "@/lib/utils";

gsap.registerPlugin(Observer, useGSAP);

type LayoutProps = {
  modals: React.ReactNode;
  hero: React.ReactNode;
  about: React.ReactNode;
  experience: React.ReactNode;
};

export default function Layout({ hero, experience, modals }: LayoutProps) {
  const [activeSection, setActiveSection] =
    useState<keyof typeof sectionConfig>("hero");

  const sections = useRef<HTMLElement[]>([]);
  const currentSection = useRef(0);
  const isAnimating = useRef(false);

  const isAtBottom = (element: HTMLElement) =>
    element.scrollTop + element.clientHeight >= element.scrollHeight - 2;

  const isAtTop = (element: HTMLElement) => element.scrollTop <= 2;

  const gotoSection = (index: number) => {
    if (isAnimating.current) return;
    if (currentSection.current === index) return;
    if (index < 0 || index >= sections.current.length) return;

    isAnimating.current = true;

    const current = sections.current[currentSection.current];
    const next = sections.current[index];
    const direction = index > currentSection.current ? 1 : -1;

    setActiveSection(next.id as keyof typeof sectionConfig);

    gsap.set(next, { zIndex: 2 });

    gsap.set(current, { zIndex: 1 });

    gsap
      .timeline({
        defaults: { duration: 1, ease: "power3.inOut" },
        onComplete() {
          // reset old section
          gsap.set(current, {
            yPercent: direction === 1 ? -100 : 100,
            autoAlpha: 0,
            zIndex: 0,
          });

          currentSection.current = index;
          isAnimating.current = false;
        },
      })
      .to(current, { yPercent: direction === 1 ? -25 : 25, autoAlpha: 0 }, 0)
      .fromTo(
        next,
        { yPercent: direction === 1 ? 100 : -100, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1 },
        0,
      );
  };

  useEffect(() => {
    sections.current = gsap.utils.toArray<HTMLElement>("[data-section]");
    gsap.set(sections.current, { yPercent: 100, autoAlpha: 0, zIndex: 0 });
    gsap.set(sections.current[0], { yPercent: 0, autoAlpha: 1, zIndex: 1 });

    const handleWheel = (e: WheelEvent) => {
      if (isAnimating.current) {
        e.preventDefault();
        return;
      }

      const scrollable = (e.target as HTMLElement).closest(
        "[data-scrollable]",
      ) as HTMLElement | null;

      if (scrollable) {
        if (e.deltaY > 0 && !isAtBottom(scrollable)) return;
        if (e.deltaY < 0 && !isAtTop(scrollable)) return;
      }

      if (e.deltaY > 0) {
        e.preventDefault();
        gotoSection(currentSection.current + 1);
      } else if (e.deltaY < 0) {
        e.preventDefault();
        gotoSection(currentSection.current - 1);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <>
      <Intro />

      <main className="h-dvh overflow-hidden">
        {/* Top meta bar */}
        <header
          className={cn(
            "grid grid-cols-2 gap-8 md:gap-16 pt-8 md:px-10",
            "font-mono text-xs uppercase tracking-[0.2em]",
          )}
        >
          <span
            key={`${activeSection}-name`}
            className="animate-intro-word col-span-1 text-right"
          >
            {sectionConfig[activeSection].name}
          </span>
          <span className="col-span-1">
            Index /{" "}
            <span key={`${activeSection}-idx`} className="animate-intro-word">
              {sectionConfig[activeSection].idx}
            </span>
          </span>
        </header>

        {modals}

        <div className="relative h-[calc(100vh-48px)]">
          {hero}
          {experience}
        </div>

        {/* {about} */}
      </main>
    </>
  );
}
