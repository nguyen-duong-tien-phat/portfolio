"use client";

import { metadata, SECTION } from "@/lib/metadata";
import TechTag from "../TechTag";
import Section from "../ui/Section";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const TechStack = ({
  name,
  techs,
}: {
  name: string;
  techs: typeof metadata.skills.fe;
}) => (
  <motion.div
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
  >
    <motion.h4
      variants={itemVariants}
      className="text-muted-foreground text-sm"
    >
      {name}
    </motion.h4>

    <div className="flex flex-wrap gap-1 mt-1">
      {techs.map((tech) => (
        <motion.div key={`skills-${tech}`} variants={itemVariants}>
          <TechTag name={tech} />
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default function Skills() {
  return (
    <Section name={SECTION.Skills} subtitle={metadata.skills.subtitle}>
      <TechStack name="Frontend" techs={metadata.skills.fe} />

      <div className="mt-6" />

      <TechStack name="Backend & Database" techs={metadata.skills.be} />

      <div className="mt-6" />

      <TechStack name="Tools & Others" techs={metadata.skills.others} />
    </Section>
  );
}
