"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-surface-dark border-t border-gray-200 dark:border-gray-700 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">📚</span>
            <span className="font-bold text-gray-900 dark:text-white">Learn With Sena</span>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
            <Link href="/games/vocabulary" className="hover:text-primary transition-colors">Juegos</Link>
            <Link href="/progress" className="hover:text-primary transition-colors">Progreso</Link>
            <Link href="/resources" className="hover:text-primary transition-colors">Recursos</Link>
          </nav>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Hecho con 💜 para aprender inglés
          </p>
        </div>
      </div>
    </footer>
  );
}
