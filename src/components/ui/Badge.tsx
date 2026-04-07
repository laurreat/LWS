"use client";

import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "secondary" | "success" | "error" | "warning";
  size?: "sm" | "md" | "lg";
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", size = "md", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center font-semibold rounded-full";
    
    const variants = {
      default: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
      primary: "bg-primary/10 text-primary dark:bg-primary-dark/20 dark:text-primary-dark",
      secondary: "bg-secondary/10 text-secondary dark:bg-secondary-dark/20 dark:text-secondary-dark",
      success: "bg-success/10 text-success dark:bg-success-dark/20 dark:text-success-dark",
      error: "bg-error/10 text-error dark:bg-error-dark/20 dark:text-error-dark",
      warning: "bg-accent/10 text-amber-600 dark:bg-accent-dark/20 dark:text-accent-dark",
    };

    const sizes = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-3 py-1 text-sm",
      lg: "px-4 py-1.5 text-base",
    };

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
