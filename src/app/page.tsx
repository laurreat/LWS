"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Trophy, Star, Zap, Target, Mic } from "lucide-react";
import { Card, Button } from "@/components/ui";
import { useAuth } from "@/contexts/AuthContext";

const games = [
  { id: "vocabulary", name: "Vocabulary", icon: BookOpen, color: "from-violet-500 to-purple-500", description: "Aprende palabras nuevas" },
  { id: "phrases", name: "Phrases", icon: Target, color: "from-cyan-500 to-blue-500", description: "Frases completas" },
  { id: "grammar", name: "Grammar", icon: Zap, color: "from-amber-500 to-orange-500", description: "Gramática en inglés" },
  { id: "sentence", name: "Sentence", icon: Star, color: "from-emerald-500 to-teal-500", description: "Organiza oraciones" },
  { id: "listening", name: "Listening", icon: Mic, color: "from-pink-500 to-rose-500", description: "Practica tu oído" },
  { id: "speaking", name: "Speaking", icon: Mic, color: "from-indigo-500 to-violet-500", description: "Habla en inglés" },
  { id: "spelling", name: "Spelling", icon: Star, color: "from-green-500 to-emerald-500", description: "Practica spelling" },
  { id: "memory", name: "Memory", icon: Trophy, color: "from-yellow-500 to-amber-500", description: "Juego de memoria" },
];

export default function HomePage() {
  const { user, progress } = useAuth();
  const totalPoints = progress?.total_points ?? 0;
  const streak = progress?.streak ?? 0;
  const gamesPlayed = progress?.games_played ?? 0;

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-purple-600 to-secondary py-20 px-4">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl">📚</div>
          <div className="absolute top-20 right-20 text-6xl">✏️</div>
          <div className="absolute bottom-10 left-1/4 text-7xl">🎓</div>
          <div className="absolute bottom-20 right-1/3 text-5xl">🌟</div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            Learn With Sena
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl text-white/90 mb-8"
          >
            ¡Aprende inglés jugando!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <div className="bg-white/20 backdrop-blur rounded-xl px-6 py-3 flex items-center gap-2">
              <Star className="w-6 h-6 text-accent" />
              <span className="text-white font-bold text-xl">{totalPoints}</span>
              <span className="text-white/80">puntos</span>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-xl px-6 py-3 flex items-center gap-2">
              <Zap className="w-6 h-6 text-orange-400" />
              <span className="text-white font-bold text-xl">{streak}</span>
              <span className="text-white/80">días</span>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-xl px-6 py-3 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <span className="text-white font-bold text-xl">{gamesPlayed}</span>
              <span className="text-white/80">juegos</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">🎮 ¡Elige tu juego!</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={`/games/${game.id}`}>
                <Card hover className={`bg-gradient-to-br ${game.color} border-0 h-full`}>
                  <div className="text-center text-white">
                    <game.icon className="w-12 h-12 mx-auto mb-3" />
                    <h3 className="text-xl font-bold mb-1">{game.name}</h3>
                    <p className="text-sm text-white/80">{game.description}</p>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">📊 Tu Progreso</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="text-center">
            <div className="text-5xl mb-4">🌍</div>
            <h3 className="text-xl font-bold mb-2">Nivel A1</h3>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
              <div 
                className="bg-green-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${0}%` }}
              />
            </div>
            <p className="text-sm text-gray-500">0/100 palabras</p>
          </Card>
          <Card className="text-center">
            <div className="text-5xl mb-4">📖</div>
            <h3 className="text-xl font-bold mb-2">Nivel A2</h3>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
              <div 
                className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${0}%` }}
              />
            </div>
            <p className="text-sm text-gray-500">0/100 palabras</p>
          </Card>
          <Card className="text-center">
            <div className="text-5xl mb-4">🏅</div>
            <h3 className="text-xl font-bold mb-2">Nivel B1</h3>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
              <div 
                className="bg-purple-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${0}%` }}
              />
            </div>
            <p className="text-sm text-gray-500">0/100 palabras</p>
          </Card>
        </div>
      </section>

      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">🚀 ¿Listo para empezar?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            ¡Practica todos los días y conviértete en un experto del inglés!
          </p>
          <Link href="/games/vocabulary">
            <Button size="lg" className="text-lg px-8 py-4">
              ¡Comenzar ahora! 🎮
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
