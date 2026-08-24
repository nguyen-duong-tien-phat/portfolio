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

  const rotateX = mouse.y * 40;
  const rotateY = mouse.x * -40;

  return (
    <div
      className="relative h-full"
      style={{ perspective: "1200px" }}
      {...props}
    >
      <motion.div
        className={cn(
          "relative overflow-hidden rounded-2xl",
          "border border-border",
          "bg-card backdrop-blur-xl",
          "shadow-[0_2px_20px_rgba(0,0,0,0.1)]",
          "dark:shadow-[0_2px_20px_rgba(0,0,0,0.4)]",
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
