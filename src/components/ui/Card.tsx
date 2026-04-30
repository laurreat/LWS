"use client";

import { HTMLAttributes, forwardRef, memo } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined";
  hover?: boolean;
}

export const Card = memo(forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", hover = false, children, ...props }, ref) => {
    const baseStyles = "rounded-2xl p-6 transition-all duration-300 border-0";
    
    const variants = {
      default: "bg-white dark:bg-surface-dark shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50",
      elevated: "bg-white dark:bg-surface-dark shadow-xl shadow-gray-300/50 dark:shadow-gray-800/50",
      outlined: "border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark",
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          hover && "hover:shadow-2xl hover:-translate-y-2 cursor-pointer hover:border-primary/50",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
));

Card.displayName = "Card";
