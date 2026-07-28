import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: boolean;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, icon = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center",
          "rounded-full border transition-colors",
          "border-zinc-300 bg-white text-zinc-900",
          "cursor-pointer hover:bg-black hover:text-white",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400",
          "disabled:cursor-not-allowed disabled:opacity-50",

          icon ? "size-11 p-0" : "h-11 px-5 gap-2",

          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
