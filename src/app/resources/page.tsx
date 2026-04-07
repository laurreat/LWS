"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Headphones, Mic, FileText, ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui";

const resources = [
  {
    category: "Vocabulario",
    icon: BookOpen,
    color: "from-violet-500 to-purple-500",
    items: [
      { 
        title: "¿Qué es el vocabulario?", 
        content: "El vocabulario son todas las palabras que conoces en un idioma. Cuantas más palabras aprendas, mejor podrás comunicarte.",
      },
      { 
        title: "Nivel A1 - Palabras básicas", 
        content: "Son las primeras 100 palabras que debes aprender: colores, números, animales, familia, comida, partes del cuerpo, ropa y objetos escolares.",
      },
      { 
        title: "Nivel A2 - Palabras intermedias", 
        content: "Palabras para describir el clima, lugares, transporte, deportes, música, emociones y profesiones.",
      },
      { 
        title: "Nivel B1 - Palabras avanzadas", 
        content: "Vocabulario para tecnología, ciencia, medio ambiente, negocios y arte.",
      },
      { 
        title: "Consejo: Aprende en contexto", 
        content: "Es más fácil recordar palabras cuando las aprendes en frases o situaciones reales, no solas.",
      },
    ],
  },
  {
    category: "Listening",
    icon: Headphones,
    color: "from-pink-500 to-rose-500",
    items: [
      { 
        title: "¿Qué es el listening?", 
        content: "Es la habilidad de entender lo que escuchas. Es importante porque te ayuda a comunicarte con otros.",
      },
      { 
        title: "Nivel A1", 
        content: "Escucha frases simples y cortas. Practica con saludos y preguntas básicas.",
      },
      { 
        title: "Nivel A2", 
        content: "Puedes entender conversaciones sobre temas familiares como trabajo, escuela y pasatiempos.",
      },
      { 
        title: "Nivel B1", 
        content: "Entiende ideas principales de conversaciones más largas y temas que no son familiares.",
      },
      { 
        title: "Consejo: Escucha diferentes acentos", 
        content: "El inglés se habla diferente en cada país. Escucha a personas de distintas regiones.",
      },
    ],
  },
  {
    category: "Speaking",
    icon: Mic,
    color: "from-cyan-500 to-blue-500",
    items: [
      { 
        title: "¿Qué es el speaking?", 
        content: "Es la habilidad de hablar en inglés. Incluye pronunciación, fluidez y gramática.",
      },
      { 
        title: "Nivel A1", 
        content: "Saludos, presentarte, preguntar cosas básicas. Usa frases cortas y simples.",
      },
      { 
        title: "Nivel A2", 
        content: "Puedes tener conversaciones sobre temas cotidianos como compras, direcciones y experiencias.",
      },
      { 
        title: "Nivel B1", 
        content: "Expresa opiniones y da explicaciones. Puedes narrar historias y describir planes.",
      },
      { 
        title: "Consejo: No tengas miedo de errar", 
        content: "Es normal equivocarse. Hablar es la mejor manera de mejorar. ¡No te rindas!",
      },
    ],
  },
  {
    category: "Grammar",
    icon: FileText,
    color: "from-amber-500 to-orange-500",
    items: [
      { 
        title: "¿Qué es la gramática?", 
        content: "Son las reglas que告诉我们 cómo usar las palabras correctamente en oraciones.",
      },
      { 
        title: "Nivel A1 - basics", 
        content: "Verbos ser/estar (am/is/are), presente simple, artículos (a, an, the), posesivos (my, your).",
      },
      { 
        title: "Nivel A2 - intermedio", 
        content: "Past simple, present perfect, condicionales (if clauses), comparativos y superlativos.",
      },
      { 
        title: "Nivel B1 - avanzado", 
        content: "Past perfect, future perfect, reported speech, passive voice, relative clauses.",
      },
      { 
        title: "Consejo: Estudia un poco cada día", 
        content: "La gramática se aprende mejor con práctica constante. Haz ejercicios todos los días.",
      },
    ],
  },
];

export default function ResourcesPage() {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-4">📚 Recursos Educativos</h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Aprende las bases para mejorar tu inglés
        </p>

        <div className="space-y-6">
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
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <button
                        onClick={() => toggleExpand(categoryIndex * 100 + itemIndex)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <span className="font-medium">{item.title}</span>
                        {expanded === categoryIndex * 100 + itemIndex ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                      {expanded === categoryIndex * 100 + itemIndex && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-4 pb-4"
                        >
                          <p className="text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            {item.content}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
