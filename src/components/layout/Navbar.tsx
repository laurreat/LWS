"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X, Sun, Moon, Volume2, VolumeX } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useProgressStore } from "@/lib/store";
import { Button } from "@/components/ui";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/progress", label: "Progreso" },
  { href: "/resources", label: "Recursos" },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme, mounted } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const soundEnabled = useProgressStore((s) => s.settings.soundEnabled);
  const updateSettings = useProgressStore((s) => s.updateSettings);
  const totalPoints = useProgressStore((s) => s.totalPoints);

  const toggleTheme = () => {
    const themes: ("light" | "dark" | "system")[] = ["light", "dark", "system"];
    const currentIndex = themes.indexOf(theme);
    setTheme(themes[(currentIndex + 1) % themes.length]);
  };

  const toggleSound = () => {
    updateSettings({ soundEnabled: !soundEnabled });
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📚</span>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Learn With Sena
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-medium transition-colors ${
                  pathname === link.href
                    ? "text-primary"
                    : "text-gray-600 hover:text-primary dark:text-gray-300"
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-accent/10 rounded-full">
              <span className="text-lg">⭐</span>
              <span className="font-bold text-accent">{totalPoints}</span>
            </div>

            <Button variant="ghost" size="sm" onClick={toggleSound} className="p-2">
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </Button>

            {mounted && (
              <Button variant="ghost" size="sm" onClick={toggleTheme} className="p-2">
                {resolvedTheme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-surface-dark border-t border-gray-200 dark:border-gray-700"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
