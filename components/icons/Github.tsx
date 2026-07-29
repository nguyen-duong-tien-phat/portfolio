import * as React from "react";
import { cn } from "@/lib/utils";

const GithubIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={cn(
      "size-6 text-black transition-colors duration-200",
      "hover:text-[#181717]",
      className,
    )}
    aria-hidden="true"
    {...props}
  >
    <path d="M12 .5C5.65.5.5 5.65.5 12A11.5 11.5 0 0 0 8.36 22.9c.58.1.79-.25.79-.56v-2.02c-3.18.69-3.85-1.53-3.85-1.53-.52-1.3-1.27-1.65-1.27-1.65-1.04-.71.08-.69.08-.69 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.54-.29-5.21-1.27-5.21-5.65 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.19 1.17a11.1 11.1 0 0 1 5.8 0c2.22-1.48 3.19-1.17 3.19-1.17.62 1.58.23 2.75.11 3.04.73.8 1.18 1.82 1.18 3.07 0 4.39-2.67 5.36-5.22 5.64.41.35.77 1.03.77 2.08v3.09c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
  </svg>
);

export default GithubIcon;
