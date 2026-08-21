"use client";

import { metadata, SECTION } from "@/lib/metadata";
import { useLayoutEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import Button from "./ui/Button";
import { Icon } from "@iconify/react";

gsap.registerPlugin(SplitText);

const Avatar = dynamic(() => import("@/components/Avatar"));

const MotionButton = motion(Button);

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!root.current) return;

    const ctx = gsap.context(() => {
      const description = root.current!.querySelector(".hero-description");

      const split = new SplitText(description, { type: "words" });

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Name
      tl.from(".hero-name-inner", { yPercent: 110, duration: 0.8 });

      // Links
      tl.from(
        ".hero-link",
        {
          y: 16,
          opacity: 0,
          duration: 0.45,
          stagger: 0.07,
          ease: "power3.out",
        },
        "-=0.35",
      );

      // Description — word by word
      tl.from(
        split.words,
        { yPercent: 100, stagger: 0.05, autoAlpha: 0 },
        "-=0.2",
      );
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section id={SECTION.Hero} ref={root} className="w-full pb-10">
      {/* Avatar — no animation */}
      <div className="relative z-10 mx-auto aspect-square w-2/3 mb-4">
        <Avatar />
      </div>

      {/* Name */}
      <div className="relative z-0 -mt-2 overflow-hidden">
        <h1 className="hero-name-inner text-3xl font-normal tracking-tight text-foreground">
          {metadata.hero.fullName}{" "}
          <span className="text-muted-foreground">(Finn)</span>
        </h1>
      </div>

      {/* Links */}
      <div className="mt-3 flex gap-3">
        {metadata.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-link"
          >
            <MotionButton
              variant="secondary"
              size="sm"
              leftIcon={<Icon icon={link.icon} className="text-[1.35rem]" />}
              whileHover={{ color: link.color, borderColor: link.color }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <span className="text-sm">{link.label}</span>
            </MotionButton>
          </a>
        ))}
      </div>

      {/* Description */}
      <p className="hero-description mt-8 text-lg leading-relaxed text-muted-foreground">
        {metadata.hero.description}
      </p>
    </section>
  );
}
