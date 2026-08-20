"use client";

import { SECTION } from "@/lib/metadata";
import { useRef } from "react";
import dynamic from "next/dynamic";

// The 3D canvas is client-only.
const Avatar = dynamic(() => import("@/components/Avatar"));

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  return (
    <section id={SECTION.Hero} ref={root} className="w-full">
      <div className="mx-auto w-1/2 aspect-square">
        <Avatar />
      </div>
    </section>
  );
}
