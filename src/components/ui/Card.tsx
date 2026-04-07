"use client";

import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined";
  hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", hover = false, children, ...props }, ref) => {
    const baseStyles = "rounded-2xl p-6 transition-all duration-300";
    
    const variants = {
      default: "bg-white dark:bg-surface-dark shadow-md",
      elevated: "bg-white dark:bg-surface-dark shadow-xl",
      outlined: "border-2 border-gray-200 dark:border-gray-700 bg-transparent",
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          hover && "hover:shadow-xl hover:-translate-y-1 cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
