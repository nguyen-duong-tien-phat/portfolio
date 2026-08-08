"use client";

import { flapTo } from "@/lib/flap-text";
import { metadata, SECTION, sections } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, TextPlugin } from "gsap/all";
import Link from "next/link";
import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function TopBar() {
  const compRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);

  const displayedNameRef = useRef<SECTION>(sections[0]);
  const activeSectionRef = useRef<SECTION>(sections[0]);

  const maxChars = Math.max(...sections.map((s) => s.length));

  useGSAP(() => {
    ScrollTrigger.normalizeScroll(true);

    gsap.set(compRef.current, { xPercent: -50, yPercent: -150, autoAlpha: 0 });

    const show = () => {
      gsap.to(compRef.current, {
        yPercent: 0,
        autoAlpha: 1,
        duration: 0.5,
        ease: "power3.out",
      });
    };

    const hide = () => {
      gsap.to(compRef.current, {
        yPercent: -150,
        autoAlpha: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    };

    ScrollTrigger.create({
      trigger: `#${SECTION.Hero}`,
      start: "bottom top",
      end: "bottom top",
      onEnter: show,
      onEnterBack: hide,
    });

    // flap section name
    const name = nameRef.current!;
    flapTo(name, "", displayedNameRef.current).progress(1);
    sections.forEach((section) => {
      const handleChange = () => {
        if (activeSectionRef.current === section) return;
        flapTo(name, displayedNameRef.current, section);
        displayedNameRef.current = section;
        activeSectionRef.current = section;
      };

      ScrollTrigger.create({
        trigger: `#${section}`,
        start: () => `top top`,
        end: "90% top",
        onEnter: handleChange,
        onEnterBack: handleChange,
      });
    });
  }, [maxChars]);

  return (
    <div
      ref={compRef}
      className={cn(
        "fixed top-5 left-1/2 z-20",
        "px-5 py-2 rounded-full",
        "border border-white/15",
        "bg-white/5 backdrop-blur-xl backdrop-saturate-150",
        "shadow-[0_1px_1px_rgba(255,255,255,0.1)_inset,0_8px_24px_rgba(0,0,0,0.25)]",
      )}
    >
      <div className="font-mono flex items-center gap-20">
        <p
          ref={nameRef}
          className="w-fit mx-auto h-6 overflow-hidden leading-6 flex gap-[3.2px] text-sm md:text-base"
        />

        <AnimatePresence initial={false}>
          <motion.nav
            key="nav"
            initial={{ opacity: 0, width: 0, marginLeft: 0 }}
            animate={{ opacity: 1, width: "auto", marginLeft: 0 }}
            exit={{ opacity: 0, width: 0, marginLeft: 0 }}
            transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
            className="flex gap-5 overflow-hidden"
          >
            {metadata.links.map((link) => (
              <Link
                key={`top-bar-${link.label}`}
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
        </AnimatePresence>
      </div>
    </div>
  );
}
