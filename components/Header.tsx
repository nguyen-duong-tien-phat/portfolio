import { SECTION_NAME, sectionConfig } from "@/config/section.config";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, TextPlugin } from "gsap/all";
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
  const headerRef = useRef<HTMLElement>(null);
  const indexRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);

  // text currently shown / targeted, so each new animation knows its "from"
  const displayedNameRef = useRef<SECTION_NAME>(sectionConfig[0].name);
  const activeSectionRef = useRef<SECTION_NAME>(sectionConfig[0].name);

  const maxChars = Math.max(...sectionConfig.map((s) => s.name.length));

  useGSAP(() => {
    const header = headerRef.current!;
    const name = nameRef.current!;
    const index = indexRef.current!;

    // paint initial name instantly, no animation on mount
    flapTo(name, "", displayedNameRef.current).progress(1);

    // --- horizontal animation (unchanged) ---
    gsap.to(name, {
      x: () =>
        header.getBoundingClientRect().x -
        name.getBoundingClientRect().x +
        parseFloat(getComputedStyle(header).paddingLeft),
      scrollTrigger: {
        trigger: `#${sectionConfig[0].name}`,
        start: "top 56px",
        end: "bottom 56px",
        scrub: true,
      },
    });

    gsap.to(index, {
      x: () =>
        header.getBoundingClientRect().right -
        index.getBoundingClientRect().left -
        index.clientWidth -
        parseFloat(getComputedStyle(header).paddingLeft),
      scrollTrigger: {
        trigger: `#${sectionConfig[0].name}`,
        start: "top 56px",
        end: "bottom 100px",
        scrub: true,
      },
    });

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
        start: "top 56px",
        end: "50% top",
        onEnter: handleChange,
        onEnterBack: handleChange,
      });
    });
  }, [maxChars]);

  return (
    <header
      ref={headerRef}
      className={cn(
        "grid grid-cols-2 gap-8 md:gap-16 pt-8 px-6 md:px-10 bg-white",
        "font-mono uppercase tracking-[0.2em]",
        "sticky top-0 z-20",
      )}
    >
      <div className="col-span-1">
        <p
          ref={nameRef}
          className="justify-self-end w-fit h-6 overflow-hidden leading-6 flex gap-[3.2px]"
        />
      </div>

      <div className="col-span-1">
        <p ref={indexRef} className="w-fit h-6 leading-6">
          Index / <span>01</span>
        </p>
      </div>
    </header>
  );
}
