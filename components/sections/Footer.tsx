"use client";

import { metadata } from "@/lib/metadata";
import { Icon } from "@iconify/react";
import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    y: 16,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Footer() {
  return (
    <footer className="w-full pt-5 pb-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        {/* Main */}
        <motion.p
          variants={itemVariants}
          className="text-sm text-muted-foreground"
        >
          {metadata.footer.eyebrow}
        </motion.p>

        <motion.h2
          variants={itemVariants}
          className="mt-2 text-3xl font-normal tracking-tight text-foreground"
        >
          {metadata.footer.title.map((line) => (
            <>
              {line} <br className="hidden sm:block" />
            </>
          ))}
        </motion.h2>

        {/* Links */}
        <motion.div
          variants={itemVariants}
          className="mt-6 flex flex-wrap gap-x-5 gap-y-3"
        >
          {metadata.links
            .filter((item) => item.label !== "Resume")
            .map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={
                  link.href.startsWith("mailto:")
                    ? undefined
                    : "noopener noreferrer"
                }
                whileHover={{ color: link.color }}
                className="group flex items-center gap-1.5 text-sm text-muted-foreground transition-colors"
              >
                <Icon icon={link.icon} className="size-[1.1rem]" />

                <span>{link.label}</span>

                <Icon
                  icon="heroicons:arrow-up-right"
                  className="size-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </motion.a>
            ))}
        </motion.div>

        {/* Bottom */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex items-center justify-between gap-4 text-xs text-muted-foreground"
        >
          <span>{metadata.footer.copyright}</span>

          <span className="font-mono">{metadata.footer.tagline}</span>
        </motion.div>
      </motion.div>
    </footer>
  );
}
