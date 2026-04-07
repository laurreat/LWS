"use client";

import { cn } from "@/lib/utils";
import { GameLevel } from "@/types";

interface LevelBadgeProps {
  level: GameLevel;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const levelColors: Record<GameLevel, { bg: string; text: string; border: string }> = {
  A1: { bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-700 dark:text-green-400", border: "border-green-300 dark:border-green-700" },
  A2: { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400", border: "border-blue-300 dark:border-blue-700" },
  B1: { bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-700 dark:text-purple-400", border: "border-purple-300 dark:border-purple-700" },
};

const levelNames: Record<GameLevel, string> = {
  A1: "Beginner",
  A2: "Elementary",
  B1: "Intermediate",
};

export function LevelBadge({ level, className, size = "md" }: LevelBadgeProps) {
  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-bold rounded-full border",
        levelColors[level].bg,
        levelColors[level].text,
        levelColors[level].border,
        sizes[size],
        className
      )}
    >
      {level} - {levelNames[level]}
    </span>
  );
}
