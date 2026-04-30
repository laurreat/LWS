"use client";

import Link from "next/link";
import { BookOpen, Mic, GraduationCap, BarChart2, Sparkles, Heart, Twitter, Mail, Github } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200/50 dark:border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-xl group-hover:shadow-primary/30 transition-all">
                <Mic className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">SpeakRush</span>
            </Link>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Aprende inglés de forma interactiva y divertida con nuestra plataforma gamificada.
            </p>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              Aprendizaje
            </h4>
            <ul className="space-y-3">
              <li><Link href="/courses" className="text-sm text-gray-500 hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-primary transition-colors" />Cursos</Link></li>
              <li><Link href="/courses/A1" className="text-sm text-gray-500 hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-primary transition-colors" />Nivel A1</Link></li>
              <li><Link href="/courses/A2" className="text-sm text-gray-500 hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-primary transition-colors" />Nivel A2</Link></li>
              <li><Link href="/courses/B1" className="text-sm text-gray-500 hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-primary transition-colors" />Nivel B1</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Recursos
            </h4>
            <ul className="space-y-3">
              <li><Link href="/progress" className="text-sm text-gray-500 hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-primary transition-colors" />Mi Progreso</Link></li>
              <li><Link href="/resources" className="text-sm text-gray-500 hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-primary transition-colors" />Recursos</Link></li>
              <li><Link href="/login" className="text-sm text-gray-500 hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-primary transition-colors" />Iniciar Sesión</Link></li>
              <li><Link href="/signup" className="text-sm text-gray-500 hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-primary transition-colors" />Registrarse</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              Contacto
            </h4>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:text-primary hover:bg-primary/10 hover:border-primary/50 border border-gray-200 dark:border-gray-700 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:text-primary hover:bg-primary/10 hover:border-primary/50 border border-gray-200 dark:border-gray-700 transition-all">
                <Mail className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:text-primary hover:bg-primary/10 hover:border-primary/50 border border-gray-200 dark:border-gray-700 transition-all">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200/50 dark:border-gray-700/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {currentYear} SpeakRush. Todos los derechos reservados.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
            Hecho con <Heart className="w-4 h-4 text-red-500 animate-pulse" /> para aprender inglés
          </p>
        </div>
      </div>
    </footer>
  );
}