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
        name && "border border-black/8",
        name ? "px-2 py-1" : "p-1",
        "text-xs text-muted-foreground",
        "transition-[transform,background-color,border-color] duration-200",
        "hover:border-black/12 hover:bg-neutral-200/60",
      )}
    >
      <Icon icon={icon} className="size-5 shrink-0" />

      {name && <span>{name}</span>}
    </span>
  );
}
