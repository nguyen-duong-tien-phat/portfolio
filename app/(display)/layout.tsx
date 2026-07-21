"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { useGSAP } from "@gsap/react";

import Intro from "@/components/intro/Intro";

gsap.registerPlugin(Observer, useGSAP);

type LayoutProps = {
  modals: React.ReactNode;
  hero: React.ReactNode;
  about: React.ReactNode;
};

export default function Layout({ hero, about, modals }: LayoutProps) {
  const containerRef = useRef<HTMLElement>(null);

  const currentSection = useRef(0);
  const isAnimating = useRef(false);

  useGSAP(
    () => {
      const sections = gsap.utils.toArray<HTMLElement>("[data-section]");

      // Initial state
      gsap.set(sections, { yPercent: 100 });

      gsap.set(sections[0], { yPercent: 0 });

      const gotoSection = (index: number) => {
        if (isAnimating.current) return;

        if (index < 0 || index >= sections.length) return;

        isAnimating.current = true;

        const direction = index > currentSection.current ? 1 : -1;

        gsap
          .timeline({
            defaults: { duration: 1, ease: "power4.inOut" },
            onComplete() {
              currentSection.current = index;
              isAnimating.current = false;
            },
          })
          .to(sections[currentSection.current], {
            yPercent: direction === 1 ? -100 : 100,
          })
          .fromTo(
            sections[index],
            { yPercent: direction === 1 ? 100 : -100 },
            { yPercent: 0 },
            "<",
          );
      };

      const observer = Observer.create({
        target: window,
        type: "wheel,touch",
        tolerance: 1,
        wheelSpeed: 1.5,
        preventDefault: true,
        onDown: () => gotoSection(currentSection.current + 1),
        onUp: () => gotoSection(currentSection.current - 1),
      });

      return () => observer.kill();
    },
    {
      scope: containerRef,
    },
  );

  return (
    <>
      <Intro />

      <main ref={containerRef} className="relative h-screen overflow-hidden">
        {modals}

        {hero}

        {about}
      </main>
    </>
  );
}
