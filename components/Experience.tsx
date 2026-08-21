"use client";

import { useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { metadata, SECTION } from "@/lib/metadata";
import Button from "./ui/Button";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";

interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
}

const contentVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const textVariants: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

function ExperienceItem({
  item,
  open = false,
}: {
  item: ExperienceEntry;
  open?: boolean;
}) {
  return (
    <motion.div
      className="relative pl-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      variants={contentVariants}
    >
      {/* Timeline line */}
      <motion.div
        className={cn(
          "absolute top-3.5 left-[3.5px] -bottom-10 w-px",
          "origin-top",
          "bg-[linear-gradient(to_bottom,var(--border-strong)_0%,var(--border-strong)_55%,transparent_100%)]",
        )}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      />

      {/* Dot */}
      <motion.span
        className="absolute top-2.5 left-0 size-2 rounded-full border border-foreground bg-foreground"
        variants={{
          hidden: { scale: 0 },
          visible: {
            scale: 1,
            transition: { type: "spring", stiffness: 400, damping: 18 },
          },
        }}
      />

      {/* Content */}
      <motion.div variants={contentVariants}>
        {/* Role + period */}
        <motion.div
          variants={textVariants}
          className="flex items-baseline justify-between gap-4"
        >
          <h3 className="text-foreground text-lg">{item.role}</h3>

          <span className="text-muted-foreground shrink-0 font-mono text-xs">
            {item.period}
          </span>
        </motion.div>

        {/* Company */}
        <motion.p
          variants={textVariants}
          className="text-muted-foreground text-sm"
        >
          {item.company}
        </motion.p>

        {/* Description */}
        <motion.p
          variants={textVariants}
          className="mt-1 text-sm leading-relaxed text-muted-foreground"
        >
          {item.description}
        </motion.p>
      </motion.div>

      {/* Details */}
      {item.highlights.length > 0 && (
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <motion.ul
                className="mt-3 flex flex-col gap-1.5 pb-1"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.1 } },
                }}
              >
                {item.highlights.map((point) => (
                  <motion.li
                    key={point}
                    variants={{
                      hidden: { y: 10, opacity: 0 },
                      visible: {
                        y: 0,
                        opacity: 1,
                        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                      },
                    }}
                    className="text-muted-foreground flex gap-2 text-sm leading-relaxed"
                  >
                    <span className="bg-foreground mt-2.5 size-1 shrink-0 rounded-full" />
                    <span>{point}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
}

export default function Experience() {
  const [open, setOpen] = useState(false);

  return (
    <section id={SECTION.Experience} className="w-full pt-10 pb-16">
      {/* Section heading */}
      <motion.div
        initial={{ y: 20 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <h2 className="text-foreground text-3xl font-normal tracking-tight">
          {SECTION.Experience}
        </h2>

        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground -ml-2 mt-2 px-2"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          rightIcon={
            <Icon
              icon={"line-md:chevron-down"}
              className={cn(
                "size-4 transition-transform duration-300",
                open && "rotate-180",
              )}
            />
          }
        >
          {open ? "Hide details" : "View details"}
        </Button>
      </motion.div>

      {/* Timeline */}
      <motion.div
        className="mt-10 flex flex-col gap-10"
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.15,
        }}
      >
        {metadata.experiences.map((item) => (
          <ExperienceItem key={item.company} item={item} open={open} />
        ))}
      </motion.div>
    </section>
  );
}
