import { sectionConfig } from "@/config/section.config";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface HeaderProps {
  section: (typeof sectionConfig)[number];
}

export default function Header({ section }: HeaderProps) {
  const sectionName = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: "main",
      start: "top top",
      end: "bottom bottom",
      pin: sectionName.current,
      pinSpacing: false,
      markers: true,
    });
  });

  return (
    <header
      className={cn(
        "grid grid-cols-2 gap-8 md:gap-16 pt-8 md:px-10",
        "font-mono uppercase tracking-[0.2em]",
      )}
    >
      <p
        ref={sectionName}
        key={`${section.name}-name`}
        className="col-span-1 text-right"
      >
        {section.name}
      </p>
      <p className="col-span-1">
        Index / <span key={`${section.name}-idx`}>01</span>
      </p>
    </header>
  );
}
