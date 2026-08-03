"use client";
import { socialsConfig } from "@/config/hero.config";
import { SECTION_NAME, sectionConfig } from "@/config/section.config";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, TextPlugin } from "gsap/all";
import Link from "next/link";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

// --- flap-text helpers -----------------------------------------------
const CELL_HEIGHT = 24;
const ALPHA_LOWER = "abcdefghijklmnopqrstuvwxyz";
const ALPHA_UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const RANGE_SIZE = 26;

function isAlpha(ch: string) {
  return /[a-zA-Z]/.test(ch);
}

function buildSequence(srcChar: string, dstChar: string) {
  // non-letters (space padding, punctuation, etc.) just cut instantly
  if (!isAlpha(srcChar) || !isAlpha(dstChar)) {
    return [srcChar, dstChar];
  }

  // use the destination's case for the reel, since that's what
  // should be left on screen once the animation finishes
  const isUpper = dstChar === dstChar.toUpperCase();
  const alphabet = isUpper ? ALPHA_UPPER : ALPHA_LOWER;

  const srcIdx = alphabet.indexOf(
    isUpper ? srcChar.toUpperCase() : srcChar.toLowerCase(),
  );
  const dstIdx = alphabet.indexOf(dstChar);

  const steps = (dstIdx - srcIdx + RANGE_SIZE) % RANGE_SIZE;

  const seq: string[] = [];
  for (let i = 0; i <= steps; i++) {
    seq.push(alphabet[(srcIdx + i) % RANGE_SIZE]);
  }

  // preserve the exact original glyphs at the start/end
  seq[0] = srcChar;
  seq[seq.length - 1] = dstChar;

  return seq;
}

/** Rebuilds `container` as a row of flap cells and tweens `from` -> `to`. */
function flapTo(container: HTMLElement, from: string, to: string) {
  const len = Math.max(from.length, to.length, 1);
  const fromPadded = from.padEnd(len, " ");
  const toPadded = to.padEnd(len, " ");

  container.innerHTML = "";
  const tl = gsap.timeline();

  for (let i = 0; i < len; i++) {
    const seq = buildSequence(fromPadded[i], toPadded[i]);

    const cell = document.createElement("span");
    Object.assign(cell.style, {
      display: "inline-block",
      width: "1ch",
      height: `${CELL_HEIGHT}px`,
      overflow: "hidden",
      position: "relative",
      verticalAlign: "top",
    });

    const strip = document.createElement("span");
    Object.assign(strip.style, {
      position: "absolute",
      top: "0",
      left: "0",
      display: "flex",
      flexDirection: "column",
    });

    seq.forEach((ch) => {
      const charEl = document.createElement("span");
      Object.assign(charEl.style, {
        height: `${CELL_HEIGHT}px`,
        lineHeight: `${CELL_HEIGHT}px`,
      });
      charEl.textContent = ch === " " ? "\u00A0" : ch;
      strip.appendChild(charEl);
    });

    cell.appendChild(strip);
    container.appendChild(cell);

    const steps = seq.length - 1;
    if (steps <= 0) continue;

    const distance = steps * CELL_HEIGHT;
    const duration = Math.min(0.3 + steps * 0.02, 1.2);

    tl.to(
      strip,
      { y: -distance, duration, ease: `steps(${steps})` },
      i * 0.035, // stagger per cell, left to right
    );
  }

  return tl;
}

// --- component ---------------------------------------------------------

export default function Header() {
  const headerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);

  // text currently shown / targeted, so each new animation knows its "from"
  const displayedNameRef = useRef<SECTION_NAME>(sectionConfig[0].name);
  const activeSectionRef = useRef<SECTION_NAME>(sectionConfig[0].name);

  const maxChars = Math.max(...sectionConfig.map((s) => s.name.length));

  useGSAP(() => {
    ScrollTrigger.normalizeScroll(true); // fix header position fix on responsive devices

    const header = headerRef.current!;
    const name = nameRef.current!;

    // paint initial name instantly, no animation on mount
    flapTo(name, "", displayedNameRef.current).progress(1);

    // --- flap-text swap, one ScrollTrigger per section ---
    sectionConfig.forEach((section) => {
      const handleChange = () => {
        if (activeSectionRef.current === section.name) return;
        flapTo(name, displayedNameRef.current, section.name);
        displayedNameRef.current = section.name;
        activeSectionRef.current = section.name;
      };
      ScrollTrigger.create({
        trigger: `#${section.name}`,
        start: () => `top-=5px ${headerRef.current!.clientHeight}`,
        end: "10% top",
        onEnter: handleChange,
        onEnterBack: handleChange,
      });
    });

    // --- name move to left ---
    gsap.to(name, {
      x: () => {
        return (
          header.getBoundingClientRect().x -
          name.getBoundingClientRect().x +
          parseFloat(getComputedStyle(header).paddingLeft)
        );
      },
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: `#${sectionConfig[0].name}`,
        start: () => `10% top`,
        end: () => `10% top`,
        toggleActions: "restart none reverse none",
      },
    });

    const socials = gsap.utils.toArray(".social");
    gsap.set(socials, { y: "100%" });

    gsap.to(socials, {
      y: "0%",
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: `#${sectionConfig[0].name}`,
        start: () => `10% top`,
        end: () => `10% top`,
        toggleActions: "restart none reverse none",
      },
    });
  }, [maxChars]);

  return (
    <header
      id="header"
      className="fixed bg-white top-0 left-0 right-0 z-10 shadow-[0_8px_12px_-4px_rgba(0,0,0,0.15)]"
    >
      <div
        ref={headerRef}
        className={cn(
          "font-mono uppercase tracking-[0.2em]",
          "relative w-[min(1600px,100%)] mx-auto px-6 md:px-12 py-5",
        )}
      >
        <p
          ref={nameRef}
          className="w-fit mx-auto h-6 overflow-hidden leading-6 flex gap-[3.2px]"
        />

        <nav className="absolute top-5 right-6 md:right-12 flex gap-5 md:gap-8 overflow-hidden">
          {Object.values(socialsConfig).map((s) => (
            <Link
              key={s.label}
              href={s.link}
              target={s.target ?? "_blank"}
              className="social cursor-pointer items-center font-mono uppercase tracking-[0.18em] transition-colors hover:text-blue-700"
            >
              <span className="hidden md:block">{s.label}</span>
              <span className="block md:hidden">
                <s.icon />
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
