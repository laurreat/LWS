"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-surface-dark border-t border-gray-200 dark:border-gray-700 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
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

          <div className="flex items-center gap-4">
            <a href="https://web.facebook.com/SENA" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors" aria-label="Facebook SENA">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/></svg>
            </a>
            <a href="https://web.facebook.com/sena.caqueta" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors" aria-label="Facebook SENA Caquetá">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/></svg>
            </a>
            <a href="https://www.youtube.com/@senaregionalcaqueta6518" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors" aria-label="YouTube SENA Caquetá">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.81ZM9.75 15.02V8.98L15.5 12l-5.75 3.02Z"/></svg>
            </a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Hecho con 💜 para aprender inglés | © 2024 SENA Caquetá
          </p>
        </div>
      </div>
    </footer>
  );
}
