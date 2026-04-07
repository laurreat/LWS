"use client";

import { create } from "zustand";
import { useEffect, useState, useCallback } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeStore {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  setResolvedTheme: (theme: "light" | "dark") => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: "system",
  resolvedTheme: "light",
  setTheme: (theme) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lws-theme", theme);
    }
    set({ theme });
  },
  setResolvedTheme: (resolvedTheme) => set({ resolvedTheme }),
}));

export function useTheme() {
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);
  const setResolvedTheme = useThemeStore((s) => s.setResolvedTheme);
  const resolvedTheme = useThemeStore((s) => s.resolvedTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("lws-theme") as Theme | null;
    if (stored) setTheme(stored);
  }, [setTheme]);

  const updateResolvedTheme = useCallback(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const isDark = theme === "dark" || (theme === "system" && mediaQuery.matches);
    setResolvedTheme(isDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", isDark);
  }, [theme, setResolvedTheme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    updateResolvedTheme();
    
    mediaQuery.addEventListener("change", updateResolvedTheme);
    return () => mediaQuery.removeEventListener("change", updateResolvedTheme);
  }, [updateResolvedTheme]);

  return { theme, setTheme, resolvedTheme, mounted };
}
