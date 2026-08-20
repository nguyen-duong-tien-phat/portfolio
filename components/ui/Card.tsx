"use client";

import {
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
  useState,
} from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function Card({
  children,
  className,
  onMouseMove,
  onMouseLeave,
  ...props
}: CardProps) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setMouse({ x, y });

    onMouseMove?.(e);
  };

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    setMouse({ x: 0, y: 0 });

    onMouseLeave?.(e);
  };

  // Maximum rotation
  const rotateX = mouse.y * 40;
  const rotateY = mouse.x * -40;

  return (
    <div className="relative" style={{ perspective: "1200px" }} {...props}>
      <motion.div
        className={cn(
          "relative overflow-hidden rounded-2xl p-3",
          "border border-black/8",
          "bg-neutral-300/35 backdrop-blur-2xl",
          "shadow-[0_2px_20px_rgba(0,0,0,0.1)]",
          className,
        )}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.4 }}
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "center",
        }}
      >
        {/* Glass reflection */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background: `
              radial-gradient(
                150px circle at ${mouse.x * 100 + 50}% ${mouse.y * 100 + 50}%,
                rgba(255,255,255,1),
                transparent 70%
              )
            `,
          }}
        />

        {/* Content sits slightly above the glass */}
        <div
          className="relative z-10"
          style={{
            transform: "translateZ(20px)",
            transformStyle: "preserve-3d",
          }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}
