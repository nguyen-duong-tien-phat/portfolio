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
      className={cn("min-h-screen px-6 pt-10 pb-6 md:px-12", props.className)}
    >
      {children}
    </section>
  );
}
