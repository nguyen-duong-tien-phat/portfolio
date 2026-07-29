import * as React from "react";
import { cn } from "@/lib/utils";

const LinkedInIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
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
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M8 10v7" />
    <path d="M8 7h.01" />
    <path d="M12 17v-4a2 2 0 0 1 4 0v4" />
    <path d="M12 10v7" />
  </svg>
);

export default LinkedInIcon;
