import { SECTION_NAME } from "@/config/section.config";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const headerRef = useRef<HTMLHeadElement>(null);
  const indexRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    gsap.to(nameRef.current, {
      x: () => {
        const header = headerRef.current!;
        const name = nameRef.current!;
        return (
          header.getBoundingClientRect().x -
          name.getBoundingClientRect().x +
          parseFloat(getComputedStyle(header).paddingLeft)
        );
      },
      scrollTrigger: {
        trigger: `#${SECTION_NAME.HERO}`,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(indexRef.current, {
      x: () => {
        const header = headerRef.current!;
        const index = indexRef.current!;
        return (
          header.getBoundingClientRect().right -
          index.getBoundingClientRect().left -
          index.clientWidth -
          parseFloat(getComputedStyle(header).paddingLeft)
        );
      },
      scrollTrigger: {
        trigger: `#${SECTION_NAME.HERO}`,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  });

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
        <p ref={nameRef} className="justify-self-end w-fit">
          {SECTION_NAME.HERO}
        </p>
      </div>

      <div className="col-span-1">
        <p ref={indexRef} className="w-fit">
          Index / <span>01</span>
        </p>
      </div>
    </header>
  );
}
