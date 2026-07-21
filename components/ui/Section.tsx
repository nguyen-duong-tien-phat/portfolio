import { cn } from "@/lib/utils";
import React from "react";

export type SectionProps = React.ComponentPropsWithoutRef<"section"> & {
  children: React.ReactNode;
};

export default function Section({ children, ...props }: SectionProps) {
  return (
    <section
      {...props}
      data-section
      className={cn(
        "absolute inset-0 h-screen overflow-hidden flex flex-col mx-auto px-6 md:px-12 py-8 w-[min(1600px,100%)]",
        props.className,
      )}
    >
      {children}
    </section>
  );
}
