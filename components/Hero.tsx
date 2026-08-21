"use client";

import { metadata, SECTION } from "@/lib/metadata";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import TechTag from "./TechTag";
import Button from "./ui/Button";

const Avatar = dynamic(() => import("@/components/Avatar"));

const MotionButton = motion(Button);

export default function Hero() {
  return (
    <section id={SECTION.Hero} className="w-full pb-10">
      {/* Avatar — no animation */}
      <div className="relative z-10 mx-auto mb-4 aspect-square w-2/3">
        <Avatar />
      </div>

      {/* Name */}
      <div className="relative z-0 -mt-2 overflow-hidden">
        <h1 className="text-3xl font-normal tracking-tight text-foreground">
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
          >
            <MotionButton
              variant="secondary"
              size="sm"
              leftIcon={<Icon icon={link.icon} className="text-[1.35rem]" />}
              whileHover={{
                color: link.color,
                borderColor: link.color,
              }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
            >
              <span className="text-sm">{link.label}</span>
            </MotionButton>
          </a>
        ))}
      </div>

      {/* Description */}
      <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
        {metadata.hero.description.map((item, index) => {
          if (item.type === "tech") {
            return (
              <span key={`${item.name}-${index}`}>
                {" "}
                <TechTag name={item.name} />
              </span>
            );
          }

          return <span key={`${item.content}-${index}`}>{item.content} </span>;
        })}
      </p>
    </section>
  );
}
