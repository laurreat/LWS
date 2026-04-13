"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, Headphones, Mic, FileText, ChevronDown, ChevronUp,
  GraduationCap, Clock, Users, Globe, Lightbulb, ArrowRight
} from "lucide-react";
import Link from "next/link";
import { Card, Button } from "@/components/ui";

const resources = [
  {
    category: "Vocabulario",
    icon: BookOpen,
    color: "from-violet-500 to-purple-500",
    description: "Amplía tu banco de palabras",
    items: [
      { 
        title: "¿Qué es el vocabulario?", 
        content: "El vocabulario son todas las palabras que conoces en un idioma. Cuantas más palabras aprendas, mejor podrás comunicarte. Se estima que para nivel A1 necesitas unas 500 palabras, para A2 unas 1000 y para B1 unas 2000 palabras.",
      },
      { 
        title: "Palabras esenciales A1", 
        content: "• Saludos: Hello, Good morning, Good afternoon, Goodbye\n• Pronombres: I, you, he, she, it, we, they\n• Números 1-20\n• Colores: red, blue, green, yellow, black, white\n• Familia: mother, father, sister, brother\n• Días: Monday, Tuesday, Wednesday...\n• Meses: January, February...",
      },
      { 
        title: "Vocabulario A2", 
        content: "• Emotions: happy, sad, angry, tired, excited\n• Clima: sunny, rainy, windy, cloudy\n• Lugares: library, hospital, restaurant, airport\n• Profesiones: doctor, teacher, engineer\n• Compras: price, discount, receipt, cash\n• Transporte: bus stop, subway, departure",
      },
      { 
        title: "Vocabulario B1", 
        content: "• Tecnología: software, hardware, update, password\n• Negocios: meeting, deadline, client, contract\n• Medio ambiente: pollution, recycling, energy\n• Arte: exhibition, sculpture, gallery\n• Noticias: headline, interview, broadcast",
      },
      { 
        title: "Técnicas para aprender palabras", 
        content: "1. flashcards/tarjetas: Escribe la palabra en una tarjeta y repasa\n2. Aprende en contexto: Las palabras en frases se recuerdan mejor\n3. Repaso espaciado: Revisa palabras nuevas cada día\n4. Asociación: Vincula palabras con imágenes o historias\n5. Usala: Intenta usar 3 palabras nuevas al día",
      },
    ],
  },
  {
    category: "Listening",
    icon: Headphones,
    color: "from-pink-500 to-rose-500",
    description: "Mejora tu comprensión auditiva",
    items: [
      { 
        title: "¿Qué es el listening?", 
        content: "El listening es la habilidad de entender lo que escuchas. Es fundamental para la comunicación porque te permite entender a otras personas y responder apropiadamente.",
      },
      { 
        title: "Estrategias para A1", 
        content: "• Escucha frases cortas y simples (3-5 palabras)\n• practica con diálogos de saludos\n• Identifica palabras clave como 'name', 'age', 'from'\n• Mira videos con subtítulos en inglés\n• Repite en voz alta lo que escuchas",
      },
      { 
        title: "Mejorando en A2", 
        content: "• Aumenta la dificultad gradualmente\n• Escucha noticias cortas (1-2 minutos)\n• Identifica ideas principales, no cada palabra\n• Toma notas mientras escuchas\n• Practica con diferentes acentos",
      },
      { 
        title: "Nivel B1", 
        content: "• Entiende conversaciones telefónicas\n• Sigue instrucciones paso a paso\n• Identifica opiniones y sentimientos\n• Escucha podcasts simples\n• Mira películas sin subtítulos",
      },
      { 
        title: "Recursos para practicar", 
        content: "• YouTube: EnglishAddict with MrDuncan, Rachel Learns English\n• Podcasts: ESL Pod, The English We Speak\n• Series con subtítulos: Friends, How I Met Your Mother\n• Canciones: llena los espacios en las letras",
      },
    ],
  },
  {
    category: "Speaking",
    icon: Mic,
    color: "from-cyan-500 to-blue-500",
    description: "Desarrolla tu fluidez verbal",
    items: [
      { 
        title: "¿Qué es el speaking?", 
        content: "El speaking es la habilidad de producir lenguaje oral. Incluye pronunciación, entonación, fluidez y usar las estructuras gramaticales correctas al hablar.",
      },
      { 
        title: "Para principiantes A1", 
        content: "• Presentarte: Hi, I'm [name], I'm from [country]\n• Saludos: Nice to meet you, How are you?\n• Números de teléfono y direcciones\n• Preguntar: What's your name? Where do you live?\n• Comer: I would like... , The bill, please",
      },
      { 
        title: "Conversación básica A2", 
        content: "• Describir tu día: I went to the market...\n• Hacer preguntas: Have you ever...?\n• Expresar opinión: I think..., In my opinion...\n• Dar consejos: You should..., It's better to...\n• Comparar: This is better than...",
      },
      { 
        title: "Expresarte fluidamente B1", 
        content: "• Debatir temas de actualidad\n• Narrar experiencias pasadas\n• Describir planes futuros\n• Expresar probabilidades\n• Usar linker: Moreover, However, Therefore...",
      },
      { 
        title: "克服 el miedo a hablar", 
        content: "1. Habla solo/a frente al espejo\n2. Grábate y escucha\n3. No te preocupes por errores\n4. Pensar en inglés, no traducir\n5. Un error es una oportunidad de aprendizaje",
      },
    ],
  },
  {
    category: "Gramática",
    icon: FileText,
    color: "from-amber-500 to-orange-500",
    description: "Domina las reglas del inglés",
    items: [
      { 
        title: "¿Qué es la gramática?", 
        content: "La gramática son las reglas que determinan cómo combinar palabras para formar oraciones con sentido en un idioma.",
      },
      { 
        title: "Essential A1", 
        content: "VERBO TO BE:\n• I am (I'm)\n• You are (You're)  \n• He/She/It is (He's/She's/It's)\n\nPRESENTE SIMPLE:\n• I work, You work\n• He/She/It works (-s en 3ra persona)\n\nARTÍCULOS:\n• a/an (indefinido)\n• the (definido)\n\nPRONOMBRES POSESIVOS:\n• my, your, his, her, our, their",
      },
      { 
        title: "Gramática A2", 
        content: "PAST SIMPLE:\n• Regular: work > worked (>ed)\n• Irregular: go > went, have > had\n\nPRESENT PERFECT:\n• Have/Has + pasado participle\n• I have worked, She has gone\n\nCONDICIONALES:\n• If + presente, will + verbo\n• If you study, you will pass\n\nCOMPARATIVOS:\n• more + adj (than)\n• adj + er (than)",
      },
      { 
        title: "Gramática B1", 
        content: "PASSIVE VOICE:\n• Sujeto + be + participio\n• The book was written\n\nREPORTED SPEECH:\n• Said/told que señalan cambio de tiempo\n\nRELATIVE CLAUSES:\n• who, which, that\n• The person who called\n\nMODALES AVANZADOS:\n• Must, Could, Might, Would",
      },
      { 
        title: "Errores comunes", 
        content: "✗ I am agree → ✓ I agree\n✗ I don't understand → ✓ I don't understand\n✗ She don't like → ✓ She doesn't like\n✗ He is more tall → ✓ He is taller\n✗ I am tired since yesterday → ✓ I have been tired since yesterday",
      },
    ],
  },
  {
    category: "Escritura",
    icon: GraduationCap,
    color: "from-emerald-500 to-teal-500",
    description: "Aprende a escribir en inglés",
    items: [
      { 
        title: "Escritura básica", 
        content: "Un texto tiene: introducción (presenta el tema), desarrollo (argumentos), conclusión (resumen). Cada párrafo debe tener una idea principal.",
      },
      { 
        title: "Para emails formales", 
        content: "Saludos:\n• Dear Mr./Ms. [apellido]\n• To Whom It May Concern\n\nCierre:\n• Sincerely,\n• Best regards,\n• Kind regards,",
      },
      { 
        title: "Conectores útiles", 
        content: "• Additionally, Moreover (agregar)\n• However, Nevertheless (contrastar)\n• Therefore, Consequently (causa-efecto)\n• In conclusion, To sum up (conclusión)",
      },
      { 
        title: "Escritura creativa", 
        content: "• Usa vocabulario variado\n• Incorpora descripciones\n• Mezcla oraciones cortas y largas\n• Crea diálogos naturales\n• Describe emociones",
      },
    ],
  },
  {
    category: "Pronunciación",
    icon: Globe,
    color: "from-red-500 to-orange-500",
    description: "Mejora tu pronounce",
    items: [
      { 
        title: "Sonidos difíciles", 
        content: "• /θ/ como en 'think' - /s/舌头在齿间\n• /ð/ como en 'this' - /z/舌头在齿间\n• /ʃ/ como en 'ship' - /tʃ/\n• /dʒ/ como en 'jump' - /ŋ/",
      },
      { 
        title: "Enlaces (linking)", 
        content: "• 'nice to meet you' → /naɪs tuː miːt juː/\n• 'kind of' → /kaɪn dəv/\n• 'going to' → /ɡəʊɪŋ tə/\n• 'lot of' → /lɒt əv/",
      },
      { 
        title: "Reducción de sonidos", 
        content: "• 'have to' → hafta\n• 'want to' → wanna\n• 'kind of' → kinda\n• 'sort of' → sorta\n• 'because' → 'cause",
      },
      { 
        title: "Entonación", 
        content: "• ↑ preguntas: Do you like coffee?\n• ↓ afirmaciones: I love it.\n• listas: apples, oranges, bananas...\n• contraste: It's cold BUT nice",
      },
    ],
  },
];

export default function ResourcesPage() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const toggleExpand = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  const currentItems = activeCategory 
    ? resources.filter(r => r.category === activeCategory)
    : resources;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Recursos Educativos
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Todo lo que necesitas para mejorar tu inglés
          </p>
        </motion.div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {resources.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(activeCategory === cat.category ? null : cat.category)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  activeCategory === cat.category 
                    ? `bg-gradient-to-r ${cat.color} text-white` 
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{cat.category}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory || "all"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {(activeCategory ? currentItems : resources).map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.05 }}
              >
                <Card className="overflow-hidden border-0 shadow-lg">
                  {/* Category Header */}
                  <div className={`bg-gradient-to-r ${category.color} p-5 text-white`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                        <category.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">{category.category}</h2>
                        <p className="text-white/80 text-sm">{category.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {category.items.map((item, itemIndex) => {
                      const globalIndex = categoryIndex * 100 + itemIndex;
                      const isExpanded = expanded === globalIndex;
                      
                      return (
                        <div key={itemIndex}>
                          <button
                            onClick={() => toggleExpand(globalIndex)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          >
                            <span className="font-medium text-gray-800 dark:text-gray-200">{item.title}</span>
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5 text-gray-400" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            )}
                          </button>
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="px-5 pb-5">
                                  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                                      {item.content}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA to Courses */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center"
        >
          <Link href="/courses">
            <Button size="lg" className="gap-2">
              <GraduationCap className="w-5 h-5" />
              Comenzar a Aprender
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}