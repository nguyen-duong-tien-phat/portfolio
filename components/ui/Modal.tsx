"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useLenis } from "@/hooks/useLenis";

interface ModalProps {
  children: React.ReactNode;
  className?: string;
}

const backdropVariants: Variants = {
  hidden: {
    opacity: 0,
    backdropFilter: "blur(0px)",
  },
  visible: {
    opacity: 1,
    backdropFilter: "blur(8px)",
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    backdropFilter: "blur(0px)",
    transition: { delay: 0.3, duration: 0.25, ease: [0.22, 1, 0.36, 1] },
  },
};

const modalVariants: Variants = {
  hidden: { maxHeight: 0, padding: 0, opacity: 0 },
  visible: {
    maxHeight: "85dvh",
    padding: 20,
    opacity: 1,
    transition: { duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    height: 0,
    transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
  },
};

export default function Modal({ children, className }: ModalProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [isAnimatingHeight, setIsAnimatingHeight] = useState(true);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useLenis({ wrapperRef });

  const close = () => {
    setIsAnimatingHeight(true);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial="hidden"
      animate={isOpen ? "visible" : "exit"}
      onAnimationComplete={(definition) => {
        if (definition === "visible") {
          setIsAnimatingHeight(false); // safe to allow scroll/scrollbar now that height has settled
        }
        if (definition === "exit") {
          router.back();
        }
      }}
    >
      {/* Backdrop */}
      <motion.div
        variants={backdropVariants}
        className="absolute inset-0 bg-black/30 dark:bg-black/60"
        onClick={close}
      />

      {/* Modal animation wrapper */}
      <motion.div
        ref={wrapperRef}
        variants={modalVariants}
        style={{ willChange: "height, opacity" }}
        className={cn(
          "relative z-10 w-full max-w-3xl overscroll-contain rounded-lg",
          isAnimatingHeight ? "overflow-hidden" : "overflow-y-auto",
          "border border-border bg-background",
          "shadow-[0_24px_100px_rgba(0,0,0,0.16)]",
          "dark:shadow-[0_24px_100px_rgba(0,0,0,0.5)]",
          className,
        )}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
