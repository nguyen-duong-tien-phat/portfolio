"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = "",
      variant = "primary",
      size = "md",
      leftIcon,
      rightIcon,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "group relative inline-flex items-center justify-center overflow-hidden cursor-pointer " +
      "rounded-md border font-medium tracking-[-0.01em] " +
      "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] " +
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 " +
      "disabled:pointer-events-none disabled:opacity-40";

    const variantStyles = {
      primary:
        "border-foreground bg-foreground text-background " +
        "shadow-[0_1px_2px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.08)] " +
        "dark:shadow-[0_1px_2px_rgba(0,0,0,0.3),0_4px_12px_rgba(0,0,0,0.2)] " +
        "hover:-translate-y-px hover:opacity-90 " +
        "active:translate-y-0 active:scale-[0.98]",

      secondary:
        "border-border border-dashed bg-card text-foreground " +
        "shadow-[0_1px_2px_rgba(0,0,0,0.04)] " +
        "hover:-translate-y-px hover:border-current " +
        "hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] " +
        "dark:hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] " +
        "active:translate-y-0 active:scale-[0.98]",

      ghost:
        "border-transparent bg-transparent text-muted-foreground " +
        "hover:bg-foreground/8 hover:text-foreground " +
        "active:scale-[0.98]",
    };

    const sizeStyles = {
      sm: "h-8 px-2 text-[13px]",
      md: "h-11 px-4 text-sm",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        <span className="relative z-10 inline-flex items-center gap-2">
          {leftIcon && <span className="flex shrink-0">{leftIcon}</span>}

          <span>{children}</span>

          {rightIcon && (
            <span className="flex shrink-0 transition-transform duration-300">
              {rightIcon}
            </span>
          )}
        </span>
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
