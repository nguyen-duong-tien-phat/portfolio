"use client";

import { metadata, SECTION } from "@/lib/metadata";
import { useRef } from "react";
import dynamic from "next/dynamic";
import { Tooltip } from "./ui/ToolTip";
import { motion } from "framer-motion";

// The 3D canvas is client-only.
const Avatar = dynamic(() => import("@/components/Avatar"));

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  return (
    <section id={SECTION.Hero} ref={root} className="w-full">
      <div className="mx-auto w-2/3 aspect-square">
        <Avatar />
      </div>

      <h1 className="text-foreground text-3xl font-normal tracking-tight">
        {metadata.hero.fullName}{" "}
        <span className="text-muted-foreground">(Finn)</span>
      </h1>

      <div className="mt-3 flex gap-3">
        {metadata.links.map((link) => (
          <Tooltip key={link.href} content={link.label}>
            <motion.a
              href={link.href}
              target="_blank"
              className="text-[1.25rem] text-muted-foreground"
              whileHover={{ color: link.color }}
            >
              <link.icon />
            </motion.a>
          </Tooltip>
        ))}
      </div>

      <p className="mt-8 text-lg text-muted-foreground">
        {metadata.hero.description}
      </p>
    </section>
  );
}
