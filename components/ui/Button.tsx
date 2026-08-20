"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { FaCheck } from "react-icons/fa6";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;

  showCheckbox?: boolean;
  checked?: boolean;
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
      showCheckbox = false,
      checked = false,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "group relative inline-flex items-center justify-center overflow-hidden cursor-pointer " +
      "rounded-md border font-medium tracking-[-0.01em] " +
      "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] " +
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 " +
      "disabled:pointer-events-none disabled:opacity-40";

    const variantStyles = {
      primary:
        "border-neutral-900 bg-neutral-900 text-white " +
        "shadow-[0_1px_2px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.08)] " +
        "hover:-translate-y-px hover:bg-neutral-800 " +
        "active:translate-y-0 active:scale-[0.98]",

      secondary:
        "border-border border-dashed bg-white text-current " +
        "shadow-[0_1px_2px_rgba(0,0,0,0.04)] " +
        "hover:-translate-y-px hover:border-current " +
        "hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] " +
        "active:translate-y-0 active:scale-[0.98]",

      ghost:
        "border-transparent bg-transparent text-neutral-600 " +
        "hover:bg-neutral-100 hover:text-neutral-950 " +
        "active:scale-[0.98]",
    };

    const sizeStyles = {
      sm: "h-8 px-2 text-[13px]",
      md: "h-11 px-4 text-sm",
    };

    return (
      <button
        ref={ref}
        aria-pressed={showCheckbox ? checked : undefined}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        <span className="relative z-10 inline-flex items-center gap-2">
          {showCheckbox && (
            <span
              className={[
                "flex size-3.5 items-center justify-center",
                "rounded-[3px] border transition-all duration-200",

                checked
                  ? "border-neutral-900 bg-neutral-900"
                  : "border-neutral-300 bg-white",
              ].join(" ")}
            >
              <FaCheck
                className={[
                  "size-2.5 text-white transition-all duration-200",

                  checked ? "scale-100 opacity-100" : "scale-50 opacity-0",
                ].join(" ")}
                strokeWidth={3}
              />
            </span>
          )}

          {leftIcon && <span className="flex shrink-0">{leftIcon}</span>}

          <span>{children}</span>

          {rightIcon && (
            <span className="flex shrink-0 transition-transform duration-300 group-hover:translate-x-1">
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
