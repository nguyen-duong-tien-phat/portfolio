import { cn } from "@/lib/utils";
import React from "react";

export type SectionProps = React.ComponentPropsWithoutRef<"section"> & {
  children: React.ReactNode;
  name: string;
};

export default function Section({ children, name, ...props }: SectionProps) {
  return (
    <section
      {...props}
      id={name}
      className={cn(
        "size-full mx-auto px-6 pt-10 pb-6 md:px-12 w-[min(1600px,100%)]",
        props.className,
      )}
    >
      {children}
    </section>
  );
}
