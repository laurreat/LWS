"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Headphones, Mic, FileText, ExternalLink } from "lucide-react";
import { Card, Button } from "@/components/ui";

const resources = [
  {
    category: "Vocabulario",
    icon: BookOpen,
    color: "from-violet-500 to-purple-500",
    items: [
      { title: "Flashcards A1", description: "100 tarjetas para principiantes", url: "#" },
      { title: "Flashcards A2", description: "100 tarjetas intermedias", url: "#" },
      { title: "Flashcards B1", description: "100 tarjetas avanzadas", url: "#" },
    ],
  },
  {
    category: "Listening",
    icon: Headphones,
    color: "from-pink-500 to-rose-500",
    items: [
      { title: "Canciones en inglés", description: "Letras y actividades", url: "#" },
      { title: "Podcast para niños", description: "Historias cortas", url: "#" },
      { title: "Audiolibros", description: "Clásicos adaptados", url: "#" },
    ],
  },
  {
    category: "Speaking",
    icon: Mic,
    color: "from-cyan-500 to-blue-500",
    items: [
      { title: "Fonética básica", description: "Sonidos del inglés", url: "#" },
      { title: "Práctica de pronunciación", description: "Ejercicios guiados", url: "#" },
      { title: "Diálogos cotidianos", description: "Conversaciones comunes", url: "#" },
    ],
  },
  {
    category: "Grammar",
    icon: FileText,
    color: "from-amber-500 to-orange-500",
    items: [
      { title: "Guía de verbos", description: "Presente, pasado, futuro", url: "#" },
      { title: "Preposiciones", description: "in, on, at, to, for...", url: "#" },
      { title: "Artículos y plurales", description: "a, an, the, -s, -es", url: "#" },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-4">📚 Recursos Educativos</h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Material complementario para reforzar tu aprendizaje
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {resources.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <Card className="overflow-hidden">
                <div className={`bg-gradient-to-r ${category.color} p-4 text-white`}>
                  <div className="flex items-center gap-3">
                    <category.icon className="w-6 h-6" />
                    <h2 className="text-xl font-bold">{category.category}</h2>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  {category.items.map((item) => (
                    <div
                      key={item.title}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">🎯 ¿Listo para practicar?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Pon a prueba lo que has aprendido con nuestros juegos interactivos
          </p>
          <Link href="/">
            <Button size="lg">Ir a los juegos</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
