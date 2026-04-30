"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  BookOpen, Gamepad2, Trophy, Star, Zap, Target, Mic, 
  AlertCircle, PenTool, GraduationCap, Sparkles, BarChart3, Globe, Play, Award
} from "lucide-react";
import { Card, Button, LevelBadge } from "@/components/ui";
import { Modal } from "@/components/ui/Modal";
import { useAuth } from "@/contexts/AuthContext";

// Moved outside component to prevent recreation on each render (react-best-practices)
const games = [
  { id: "vocabulary", name: "Vocabulary", icon: BookOpen, color: "from-violet-500 to-purple-500", description: "Aprende palabras nuevas", levels: ["A1", "A2", "B1"] },
  { id: "phrases", name: "Phrases", icon: Target, color: "from-cyan-500 to-blue-500", description: "Frases completas", levels: ["A1", "A2", "B1"] },
  { id: "grammar", name: "Grammar", icon: Zap, color: "from-amber-500 to-orange-500", description: "Gramática en inglés", levels: ["A1", "A2", "B1"] },
  { id: "sentence", name: "Sentence", icon: PenTool, color: "from-emerald-500 to-teal-500", description: "Organiza oraciones", levels: ["A1", "A2", "B1"] },
  { id: "listening", name: "Listening", icon: Mic, color: "from-pink-500 to-rose-500", description: "Practica tu oído", levels: ["A1", "A2", "B1"] },
  { id: "speaking", name: "Speaking", icon: Mic, color: "from-indigo-500 to-violet-500", description: "Habla en inglés", levels: ["A1", "A2", "B1"] },
  { id: "spelling", name: "Spelling", icon: PenTool, color: "from-green-500 to-emerald-500", description: "Practica spelling", levels: ["A1", "A2", "B1"] },
  { id: "memory", name: "Memory", icon: Gamepad2, color: "from-yellow-500 to-amber-500", description: "Juego de memoria", levels: ["A1", "A2", "B1"] },
];

export default function HomePage() {
  const { user, progress, loading } = useAuth();
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const totalPoints = progress?.total_points ?? 0;
  const streak = progress?.streak ?? 0;
  const gamesPlayed = progress?.games_played ?? 0;

  if (loading) {
    return (
      <div className="min-h-screen max-w-7xl mx-auto px-4 py-16">
        <div className="animate-pulse space-y-8">
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className="h-40 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
            ))}
          </div>
             </div>
      </div>
    );
  }
  
   return (
    <div className="min-h-screen">
      <Modal isOpen={showErrorModal} onClose={() => setShowErrorModal(false)} title="Enlace Expirado">
        <div className="flex flex-col items-center text-center p-4">
          <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
          <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
            {errorMessage}
          </p>
          <div className="w-full">
            <Link href="/login" onClick={() => setShowErrorModal(false)}>
              <Button className="w-full">Ir a Iniciar Sesión</Button>
            </Link>
          </div>
        </div>
      </Modal>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-purple-600 to-secondary py-20 px-4">
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute top-10 left-10"><BookOpen className="w-20 h-20 text-white" /></div>
          <div className="absolute top-20 right-20"><PenTool className="w-16 h-16 text-white" /></div>
          <div className="absolute bottom-10 left-1/4"><GraduationCap className="w-20 h-20 text-white" /></div>
          <div className="absolute bottom-20 right-1/3"><Sparkles className="w-14 h-14 text-white" /></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            SpeakRush
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
        <div className="flex items-center justify-center gap-3 mb-12">
          <Gamepad2 className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold">¡Elige tu juego!</h2>
        </div>
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
                    <p className="text-sm text-white/80 mb-3">{game.description}</p>
                    <div className="flex justify-center gap-1.5 flex-wrap">
                      {game.levels?.map((level) => (
                        <span key={level} className="text-xs bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
                          {level}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-center gap-3 mb-12">
          <BarChart3 className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold">Tu Progreso</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {(["A1", "A2", "B1"] as const).map((level) => {
            const levelData = progress?.level_progress?.[level];
            const total = level === "A1" ? 300 : level === "A2" ? 400 : 500;
            const completed = levelData?.completed ?? 0;
            const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
            return (
              <Card key={level} className="text-center">
                <div className="mb-4">
                  {level === "A1" ? <Globe className="w-12 h-12 mx-auto text-green-500" /> : 
                   level === "A2" ? <BookOpen className="w-12 h-12 mx-auto text-blue-500" /> : 
                   <Award className="w-12 h-12 mx-auto text-purple-500" />}
                </div>
                <h3 className="text-xl font-bold mb-2">Nivel {level}</h3>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${level === "A1" ? "bg-green-500" : level === "A2" ? "bg-blue-500" : "bg-purple-500"}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <p className="text-sm text-gray-500">{completed}/{total} palabras</p>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Play className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">¿Listo para empezar?</h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            ¡Practica todos los días y conviértete en un experto del inglés!
          </p>
          <Link href="/games/vocabulary">
            <Button size="lg" className="text-lg px-8 py-4">
              ¡Comenzar ahora! <Gamepad2 className="w-5 h-5 inline" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
