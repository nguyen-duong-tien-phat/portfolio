"use client";

import { useRef } from "react";
import { useLenis } from "@/hooks/useLenis";
import { cn } from "@/lib/utils";

interface MarkdownScrollAreaProps {
  children: React.ReactNode;
  className?: string;
}

export default function MarkdownScrollArea({
  children,
  className,
}: MarkdownScrollAreaProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useLenis({ wrapperRef });

  return (
    <div
      ref={wrapperRef}
      className={cn("overflow-y-auto overscroll-contain", className)}
    >
      <div>{children}</div>
    </div>
  );
}
