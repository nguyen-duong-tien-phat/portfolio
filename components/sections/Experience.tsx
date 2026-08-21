"use client";

import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { metadata, SECTION } from "@/lib/metadata";
import Button from "../ui/Button";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import Section from "../ui/Section";

interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
}

const itemVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const textVariants: Variants = {
  hidden: {
    y: 14,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const dotVariants: Variants = {
  hidden: {
    scale: 0,
  },
  visible: {
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 450,
      damping: 20,
      mass: 0.5,
    },
  },
};

const detailsVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.05,
      staggerChildren: 0.07,
    },
  },
};

const detailItemVariants: Variants = {
  hidden: {
    y: 8,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
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
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.5,
      }}
    >
      {/* Timeline line */}
      <motion.div
        className={cn(
          "absolute top-3.5 left-[3.5px] -bottom-10 w-px",
          "origin-top",
          "bg-[linear-gradient(to_bottom,var(--border-strong)_0%,var(--border-strong)_55%,transparent_100%)]",
        )}
        initial={{
          scaleY: 0,
        }}
        whileInView={{
          scaleY: 1,
        }}
        viewport={{
          once: true,
          amount: 0.5,
        }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
        }}
        aria-hidden="true"
      />

      {/* Dot */}
      <motion.span
        className="absolute top-2.5 left-0 size-2 rounded-full border border-foreground bg-foreground"
        variants={dotVariants}
      />

      {/* Content */}
      <motion.div variants={itemVariants}>
        {/* Role + period */}
        <motion.div
          variants={textVariants}
          className="flex items-baseline justify-between gap-4"
        >
          <h3 className="text-foreground text-lg font-medium">{item.role}</h3>

          <span className="shrink-0 font-mono text-xs">{item.period}</span>
        </motion.div>

        {/* Company */}
        <motion.p variants={textVariants} className="text-sm">
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
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: "auto",
                opacity: 1,
              }}
              exit={{
                height: 0,
                opacity: 0,
              }}
              transition={{
                height: {
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                },
                opacity: {
                  duration: 0.2,
                },
              }}
              className="overflow-hidden"
            >
              <motion.ul
                className="mt-3 flex flex-col gap-1.5 pb-1"
                variants={detailsVariants}
                initial="hidden"
                animate="visible"
              >
                {item.highlights.map((point) => (
                  <motion.li
                    key={point}
                    variants={detailItemVariants}
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
    <Section
      name={SECTION.Experience}
      subtitle={metadata.experiences.subtitle}
      extra={
        <Button
          variant="secondary"
          size="sm"
          className="text-muted-foreground hover:text-foreground"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          rightIcon={
            <Icon
              icon="line-md:chevron-down"
              className={cn(
                "size-4 transition-transform duration-300",
                open && "rotate-180",
              )}
            />
          }
        >
          {open ? "Hide details" : "View details"}
        </Button>
      }
    >
      {/* Timeline */}
      <div className="mt-10 flex flex-col gap-10">
        {metadata.experiences.items.map((item) => (
          <ExperienceItem key={item.company} item={item} open={open} />
        ))}
      </div>
    </Section>
  );
}
