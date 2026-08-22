"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

type TooltipPosition = "top" | "bottom" | "left" | "right";

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: TooltipPosition;
  delay?: number;
  className?: string;
}

const positions: Record<
  TooltipPosition,
  {
    className: string;
    initial: { x: number; y: number };
  }
> = {
  top: {
    className: "bottom-full left-1/2 mb-3 -translate-x-1/2",
    initial: { x: 0, y: 3 },
  },
  bottom: {
    className: "top-full left-1/2 mt-3 -translate-x-1/2",
    initial: { x: 0, y: -3 },
  },
  left: {
    className: "right-full top-1/2 mr-3 -translate-y-1/2",
    initial: { x: 3, y: 0 },
  },
  right: {
    className: "left-full top-1/2 ml-3 -translate-y-1/2",
    initial: { x: -3, y: 0 },
  },
};

export function Tooltip({
  content,
  children,
  position = "top",
  delay = 200,
  className,
}: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipId = useId();

  const config = positions[position];

  const open = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, delay);
  };

  const close = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setIsOpen(false);
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={open}
      onMouseLeave={close}
      onFocus={open}
      onBlur={close}
      aria-describedby={isOpen ? tooltipId : undefined}
    >
      {children}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={tooltipId}
            role="tooltip"
            initial={{ opacity: 0, scale: 0.96, ...config.initial }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, ...config.initial }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "pointer-events-none absolute z-50 whitespace-nowrap rounded-lg border border-white/10 bg-neutral-900/80 px-2 py-1 text-xs text-neutral-200 shadow-xl shadow-black/20 backdrop-blur-2xl",
              config.className,
              className,
            )}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
