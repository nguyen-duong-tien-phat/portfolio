import { SECTION_NAME } from "@/config/section.config";
import { cn } from "@/lib/utils";
import React from "react";

export type SectionProps = React.ComponentPropsWithoutRef<"section"> & {
  children: React.ReactNode;
  name: SECTION_NAME;
};

export default function Section({ children, name, ...props }: SectionProps) {
  return (
    <section
      {...props}
      id={name}
      className={cn(
        "px-6 pt-10 pb-6 mt-16 md:min-h-screen md:px-12 w-[min(1600px,100%)] mx-auto",
        props.className,
      )}
    >
      {children}
    </section>
  );
}
