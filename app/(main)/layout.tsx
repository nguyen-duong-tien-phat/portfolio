"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import React, { useCallback, useEffect, useRef, useState } from "react";

import Intro from "@/components/intro/Intro";
import { sectionConfig } from "@/config/section.config";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

gsap.registerPlugin(Observer, useGSAP);

type LayoutProps = {
  modals: React.ReactNode;
  hero: React.ReactNode;
  about: React.ReactNode;
  projects: React.ReactNode;
  experience: React.ReactNode;
};

export default function Layout({
  hero,
  projects,
  experience,
  modals,
}: LayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [activeSection, setActiveSection] = useState(
    Number(searchParams.get("s")),
  );

  const sections = useRef<HTMLElement[]>([]);
  const initialSection = useRef(Number(searchParams.get("s")) ?? 0);
  const currentSection = useRef(Number(searchParams.get("s")) ?? 0);
  const isAnimating = useRef(false);

  const isAtBottom = (element: HTMLElement) =>
    element.scrollTop + element.clientHeight >= element.scrollHeight - 2;

  const isAtTop = (element: HTMLElement) => element.scrollTop <= 2;

  const gotoSection = useCallback(
    (index: number) => {
      if (isAnimating.current) return;
      if (currentSection.current === index) return;
      if (index < 0 || index >= sections.current.length) return;

      isAnimating.current = true;
      router.replace(`${pathname}?s=${index}`); // update params for refreshing

      const current = sections.current[currentSection.current];
      const next = sections.current[index];
      const direction = index > currentSection.current ? 1 : -1;

      setActiveSection(index);

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
    },
    [pathname, router],
  );

  useEffect(() => {
    sections.current = gsap.utils.toArray<HTMLElement>("[data-section]");
    gsap.set(sections.current, { yPercent: 100, autoAlpha: 0, zIndex: 0 });
    gsap.set(sections.current[initialSection.current], {
      yPercent: 0,
      autoAlpha: 1,
      zIndex: 1,
    });

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
  }, [gotoSection]);

  return (
    <>
      <Intro />

      <main className="h-dvh overflow-hidden">
        {/* Top meta bar */}
        <header
          className={cn(
            "grid grid-cols-2 gap-8 md:gap-16 pt-8 md:px-10",
            "font-mono uppercase tracking-[0.2em]",
          )}
        >
          <div className="overflow-hidden">
            <p
              key={`${sectionConfig[activeSection].name}-name`}
              className="col-span-1 text-right"
            >
              {sectionConfig[activeSection].name}
            </p>
          </div>
          <p className="col-span-1">
            Index /{" "}
            <span key={`${sectionConfig[activeSection].name}-idx`}>
              0{activeSection + 1}
            </span>
          </p>
        </header>

        {modals}

        <div className="relative h-[calc(100vh-48px)]">
          {hero}
          {experience}
          {projects}
        </div>

        {/* {about} */}
      </main>
    </>
  );
}
