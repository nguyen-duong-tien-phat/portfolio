import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";

export default function IconTag({
  name,
  icon,
}: {
  name?: string;
  icon: string;
}) {
  const hasName = Boolean(name);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md",
        "text-xs text-foreground",
        "transition-colors duration-200",

        hasName
          ? [
              "border border-black/8 border-dashed",
              "bg-linear-to-b from-white to-neutral-100/80",
              "backdrop-blur-xl",
              "shadow-[0_2px_8px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)]",
              "px-2 py-1",
              "hover:-translate-y-px",
              "hover:border-black/15",
              "hover:bg-neutral-200/70",
              "hover:shadow-[0_6px_16px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.9)]",
            ]
          : ["p-1", "hover:bg-neutral-200/70"],
      )}
    >
      <Icon icon={icon} className="size-5 shrink-0" />

      {name && <span>{name}</span>}
    </span>
  );
}
