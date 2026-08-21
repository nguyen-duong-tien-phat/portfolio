"use client";

import { metadata, SECTION } from "@/lib/metadata";
import { Icon } from "@iconify/react";
import { motion, type Variants } from "framer-motion";
import dynamic from "next/dynamic";
import TechTag from "../TechTag";
import Button from "../ui/Button";

const Avatar = dynamic(() => import("@/components/Avatar"));

const MotionButton = motion.create(Button);

const linksContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.25,
      staggerChildren: 0.08,
    },
  },
};

const linkVariants: Variants = {
  hidden: {
    y: 14,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

const descriptionVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.025,
    },
  },
};

const descriptionItemVariants: Variants = {
  hidden: {
    y: 10,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

export default function Hero() {
  return (
    <section id={SECTION.Hero} className="w-full pb-10">
      {/* Avatar — no animation */}
      <div className="relative z-10 mx-auto mb-4 aspect-square w-full sm:w-2/3">
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
      <motion.div
        className="mt-3 flex flex-wrap gap-3"
        variants={linksContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {metadata.links.map((link) => (
          <motion.a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            variants={linkVariants}
          >
            <MotionButton
              variant="secondary"
              size="sm"
              leftIcon={<Icon icon={link.icon} className="text-[1.35rem]" />}
              whileHover={{
                color: link.color,
                borderColor: link.color,
                y: -2,
              }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
            >
              <span className="text-sm">{link.label}</span>
            </MotionButton>
          </motion.a>
        ))}
      </motion.div>

      {/* Description */}
      <motion.p
        className="mt-8 text-lg leading-relaxed text-muted-foreground"
        variants={descriptionVariants}
        initial="hidden"
        animate="visible"
      >
        {metadata.hero.description.map((item, index) => {
          if (item.type === "tech") {
            return (
              <motion.span
                key={`${item.name}-${index}`}
                variants={descriptionItemVariants}
              >
                {" "}
                <TechTag name={item.name} />
              </motion.span>
            );
          }

          return item.content.split(" ").map((word, wordIndex) => (
            <motion.span
              key={`${item.content}-${index}-${wordIndex}`}
              className="inline-block"
              variants={descriptionItemVariants}
            >
              {word}&nbsp;
            </motion.span>
          ));
        })}
      </motion.p>
    </section>
  );
}
