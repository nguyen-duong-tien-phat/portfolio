"use client";

import { SECTION } from "@/lib/metadata";
import { motion } from "framer-motion";

export type SectionProps = {
  name: SECTION;
  subtitle?: string;
  extra?: React.ReactNode;
  children: React.ReactNode;
};

export default function Section({
  name,
  subtitle,
  extra,
  children,
}: SectionProps) {
  return (
    <section id={name} className="pt-10 pb-16 w-full">
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-3xl font-normal tracking-tight text-foreground">
          {name}
        </h2>
        {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
        {extra && <div className="mt-2">{extra}</div>}
      </motion.div>

      <main className="mt-6">{children}</main>
    </section>
  );
}
