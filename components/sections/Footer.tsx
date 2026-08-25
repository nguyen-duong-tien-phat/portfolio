"use client";

import { metadata } from "@/lib/metadata";
import { Icon } from "@iconify/react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import React, { useRef } from "react";

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
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function MagneticCTA({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const arrowX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.2 });
  const arrowY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.2 });

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
      className="group relative inline-flex items-start gap-3 rounded-md text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
    >
      <span className="text-balance text-[clamp(2.5rem,8vw,6rem)] font-medium leading-[0.95] tracking-tighter transition-colors duration-300 group-hover:text-muted-foreground">
        {children}
      </span>

      <motion.span
        style={prefersReducedMotion ? undefined : { x: arrowX, y: arrowY }}
        className="mt-3 flex size-10 shrink-0 items-center justify-center rounded-full border border-border opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:mt-5 sm:size-14"
      >
        <Icon icon="heroicons:arrow-up-right" className="size-4 sm:size-6" />
      </motion.span>
    </motion.a>
  );
}

export default function Footer() {
  const emailLink = metadata.links.find((link) =>
    link.href.startsWith("mailto:"),
  );

  const socialLinks = metadata.links.filter(
    (link) => link.label !== "Resume" && !link.href.startsWith("mailto:"),
  );

  return (
    <footer className="w-full border-t border-border/50 pt-16 pb-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        {/* Hero CTA — short, big, clickable */}
        <motion.div variants={itemVariants}>
          {emailLink ? (
            <MagneticCTA href={emailLink.href}>
              {metadata.footer.eyebrow}
            </MagneticCTA>
          ) : (
            <h2 className="text-balance text-[clamp(2.5rem,8vw,6rem)] font-medium leading-[0.95] tracking-tighter text-foreground">
              {metadata.footer.eyebrow}
            </h2>
          )}
        </motion.div>

        {/* Supporting paragraph — the old long copy, now sized like body text */}
        <motion.p
          variants={itemVariants}
          className="mt-5 max-w-md text-balance text-sm text-muted-foreground sm:text-base"
        >
          {metadata.footer.title.join(" ")}
        </motion.p>

        {/* Direct email, spelled out plainly */}
        {emailLink && (
          <motion.a
            variants={itemVariants}
            href={emailLink.href}
            className="mt-6 inline-block font-mono text-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
          >
            {emailLink.href.replace("mailto:", "")}
          </motion.a>
        )}

        {/* Social links */}
        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-wrap gap-x-5 gap-y-3"
        >
          {socialLinks.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ color: link.color }}
              className="group flex items-center gap-1.5 rounded-md text-sm text-muted-foreground outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
          className="mt-12 flex items-center justify-between gap-4 border-t border-border/50 pt-6 text-xs text-muted-foreground"
        >
          <span>{metadata.footer.copyright}</span>
          <span className="font-mono">{metadata.footer.tagline}</span>
        </motion.div>
      </motion.div>
    </footer>
  );
}
