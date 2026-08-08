import * as React from "react";
import { cn } from "@/lib/utils";

const GmailIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn(
      "size-6 text-black transition-colors duration-200 hover:text-zinc-600",
      className,
    )}
    aria-hidden="true"
    {...props}
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 6 10 7 10-7" />
  </svg>
);

export default GmailIcon;
