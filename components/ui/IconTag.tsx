import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { ComponentPropsWithoutRef } from "react";

type IconTagProps = ComponentPropsWithoutRef<"span"> & {
  name?: string;
  icon: string;
};

export default function IconTag({ name, icon, ...props }: IconTagProps) {
  const hasName = Boolean(name);

  return (
    <span
      {...props}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md",
        "text-xs text-foreground",
        "transition-colors duration-200",

        hasName
          ? [
              "border border-border border-dashed",
              "bg-card",
              "backdrop-blur-xl",
              "shadow-[0_2px_8px_rgba(0,0,0,0.08)]",
              "dark:shadow-[0_2px_8px_rgba(0,0,0,0.3)]",
              "px-2 py-1",
              "hover:-translate-y-px",
              "hover:border-border-strong",
              "hover:bg-foreground/8",
              "hover:shadow-[0_6px_16px_rgba(0,0,0,0.1)]",
              "dark:hover:shadow-[0_6px_16px_rgba(0,0,0,0.35)]",
            ]
          : ["p-1", "hover:bg-foreground/8"],
        props.className,
      )}
    >
      <Icon icon={icon} className="size-5 shrink-0" />

      {name && <span>{name}</span>}
    </span>
  );
}
