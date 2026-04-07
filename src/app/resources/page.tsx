"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Headphones, Mic, FileText, Brain, Type, MessageSquare } from "lucide-react";
import { Card, Button } from "@/components/ui";

const resources = [
  {
    category: "Vocabulario",
    icon: BookOpen,
    color: "from-violet-500 to-purple-500",
    link: "/games/vocabulary",
    description: "Aprende y practica vocabulario con flashcards",
  },
  {
    category: "Listening",
    icon: Headphones,
    color: "from-pink-500 to-rose-500",
    link: "/games/listening",
    description: "Mejora tu comprensión auditiva",
  },
  {
    category: "Speaking",
    icon: Mic,
    color: "from-cyan-500 to-blue-500",
    link: "/games/speaking",
    description: "Practica tu pronunciación",
  },
  {
    category: "Grammar",
    icon: FileText,
    color: "from-amber-500 to-orange-500",
    link: "/games/grammar",
    description: "Ejercicios de gramática",
  },
  {
    category: "Sentence",
    icon: Type,
    color: "from-emerald-500 to-teal-500",
    link: "/games/sentence",
    description: "Organiza palabras en oraciones",
  },
  {
    category: "Spelling",
    icon: MessageSquare,
    color: "from-green-500 to-emerald-500",
    link: "/games/spelling",
    description: "Practica deletreo en inglés",
  },
  {
    category: "Memory",
    icon: Brain,
    color: "from-yellow-500 to-amber-500",
    link: "/games/memory",
    description: "Encuentra las parejas",
  },
  {
    category: "Phrases",
    icon: BookOpen,
    color: "from-indigo-500 to-violet-500",
    link: "/games/phrases",
    description: "Aprende frases completas",
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-4">📚 Recursos Educativos</h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Selecciona un recurso para practicar y mejorar tu inglés
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {resources.map((resource, index) => (
            <motion.div
              key={resource.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={resource.link}>
                <Card hover className={`bg-gradient-to-br ${resource.color} border-0 h-full min-h-[140px]`}>
                  <div className="text-center text-white h-full flex flex-col justify-center items-center">
                    <resource.icon className="w-10 h-10 mb-2" />
                    <h2 className="text-lg font-bold">{resource.category}</h2>
                    <p className="text-xs text-white/80 mt-1">{resource.description}</p>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">🎯 ¿Listo para practicar?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Elige cualquiera de los juegos disponibles para empezar
          </p>
          <Link href="/">
            <Button size="lg">Ver todos los juegos</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
