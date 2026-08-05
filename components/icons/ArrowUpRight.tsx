import * as React from "react";

interface ArrowUpRightProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export default function ArrowUpRight({
  size = 24,
  strokeWidth = 2,
  ...props
}: ArrowUpRightProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}
