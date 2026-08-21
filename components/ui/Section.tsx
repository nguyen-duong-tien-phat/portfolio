"use client";

import { SECTION } from "@/lib/metadata";
import { motion, type Variants } from "framer-motion";

export type SectionProps = {
  name: SECTION;
  subtitle?: string;
  extra?: React.ReactNode;
  children: React.ReactNode;
};

const headerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const lineVariants: Variants = {
  hidden: { y: 14, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Section({
  name,
  subtitle,
  extra,
  children,
}: SectionProps) {
  return (
    <section id={name} className="w-full pt-10 pb-16">
      <motion.div
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 1,
        }}
      >
        <motion.h2
          variants={lineVariants}
          className="text-3xl font-normal tracking-tight text-foreground"
        >
          {name}
        </motion.h2>

        {subtitle && (
          <motion.p
            variants={lineVariants}
            className="mt-1 text-muted-foreground"
          >
            {subtitle}
          </motion.p>
        )}

        {extra && (
          <motion.div variants={lineVariants} className="mt-2">
            {extra}
          </motion.div>
        )}
      </motion.div>

      <main className="mt-6">{children}</main>
    </section>
  );
}
