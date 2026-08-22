import { cn } from "@/lib/utils";

export default function Separate({ className }: { className: string }) {
  return (
    <div
      className={cn("w-full border-b border-dashed border-border", className)}
    ></div>
  );
}
