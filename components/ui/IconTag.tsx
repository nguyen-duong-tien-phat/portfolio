import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";

export default function IconTag({
  name,
  icon,
}: {
  name?: string;
  icon: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md",
        name && [
          "border border-black/8",
          "bg-linear-to-b from-white to-neutral-100/80",
          "backdrop-blur-xl",
          "shadow-[0_2px_8px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)]",
        ],
        name ? "px-2 py-1" : "p-1",
        "text-xs text-foreground",
        "transition-all duration-200",
        name && [
          "hover:-translate-y-px",
          "hover:border-black/15",
          "hover:bg-neutral-200/70",
          "hover:shadow-[0_6px_16px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.9)]",
        ],
      )}
    >
      <Icon icon={icon} className="size-5 shrink-0" />
      {name && <span>{name}</span>}
    </span>
  );
}
