"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Volume2, Home, Trophy, CheckCircle, XCircle, Quote, MessageSquare, FileText, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button, Card, LevelBadge } from "@/components/ui";
import { useSpeech } from "@/hooks/useSpeech";
import { useAuth } from "@/contexts/AuthContext";
import { ALL_PHRASES } from "@/data/phrases";
import { GameLevel, Phrase } from "@/types";

function generateQuiz(phrases: Phrase[], count: number = 10): Phrase[] {
  return [...phrases].sort(() => Math.random() - 0.5).slice(0, count);
}

export default function PhrasesPage() {
  const [selectedLevel, setSelectedLevel] = useState<GameLevel | null>(null);
  const [questions, setQuestions] = useState<Phrase[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<"select" | "playing" | "finished">("select");
  const { speak } = useSpeech();
  const { playGame, user } = useAuth();

  const [hasFinishedTriggered, setHasFinishedTriggered] = useState(false);

  const startGame = useCallback((level: GameLevel) => {
    const filtered = ALL_PHRASES.filter((p) => p.level === level);
    const quiz = generateQuiz(filtered, 10);
    setQuestions(quiz);
    setCurrentIndex(0);
    setScore(0);
    setShowTranslation(false);
    setSelectedLevel(level);
    setGameState("playing");
    setHasFinishedTriggered(false);
  }, []);

  const handleKnow = useCallback(() => {
    setScore((s) => s + 10);
    speak(questions[currentIndex].sentence);
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((i) => i + 1);
        setShowTranslation(false);
      } else {
        setGameState("finished");
      }
    }, 500);
  }, [currentIndex, questions, speak]);

  const handleDontKnow = useCallback(() => {
    setShowTranslation(true);
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((i) => i + 1);
        setShowTranslation(false);
      } else {
        setGameState("finished");
      }
    }, 1500);
  }, [currentIndex, questions.length]);

  const finishGame = useCallback(() => {
    if (selectedLevel && !hasFinishedTriggered) {
      setHasFinishedTriggered(true);
      const pointsEarned = score;
      playGame("phrases", score, pointsEarned, selectedLevel);
      
      if (score >= 80 && user) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
    }
  }, [selectedLevel, score, playGame, user, hasFinishedTriggered]);

  useEffect(() => {
    if (gameState === "finished" && !hasFinishedTriggered) {
      finishGame();
    }
  }, [gameState, finishGame, hasFinishedTriggered]);

  if (gameState === "finished") {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-2xl mx-auto py-8 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-8xl mb-6">
            {score >= 80 ? "🎉" : score >= 50 ? "👍" : "💪"}
          </motion.div>
          <h1 className="text-4xl font-bold mb-4">¡Juego Terminado!</h1>
          <Card className="mb-8">
            <div className="flex justify-around">
              <div>
                <p className="text-4xl font-bold text-primary">{score}</p>
                <p className="text-gray-500">Puntos</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-success">{Math.round(score / 10)}/10</p>
                <p className="text-gray-500">Correctas</p>
              </div>
            </div>
          </Card>
          <div className="flex gap-4 justify-center">
            <Link href="/"><Button variant="outline"><Home className="w-4 h-4 mr-2" />Inicio</Button></Link>
            <Button onClick={() => startGame(selectedLevel!)}><Trophy className="w-4 h-4 mr-2" />Jugar de nuevo</Button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === "select") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto py-8"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full mb-4">
              <MessageSquare className="w-5 h-5 text-secondary" />
              <span className="text-sm font-medium text-secondary">Frases</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Quiz de Frases
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              ¿Conoces estas frases?
            </p>
          </div>
          
          <div className="space-y-4">
            {([
              { level: "A1" as GameLevel, icon: Quote, label: "Principiante", desc: "Frases básicas", color: "from-green-500 to-emerald-500" },
              { level: "A2" as GameLevel, icon: MessageSquare, label: "Elemental", desc: "Frases intermedias", color: "from-blue-500 to-cyan-500" },
              { level: "B1" as GameLevel, icon: FileText, label: "Intermedio", desc: "Frases avanzadas", color: "from-purple-500 to-violet-500" },
            ]).map((item, index) => (
              <motion.div
                key={item.level}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  hover 
                  className={`cursor-pointer border-2 border-transparent hover:border-secondary/20 transition-all duration-300`}
                  onClick={() => startGame(item.level)}
                >
                  <div className="flex items-center gap-4 p-2">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <LevelBadge level={item.level} />
                        <span className="text-gray-400">|</span>
                        <span className="text-gray-500 dark:text-gray-400">{item.label}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <LevelBadge level={selectedLevel!} />
            <p className="text-sm text-gray-500 mt-1">Pregunta {currentIndex + 1} de {questions.length}</p>
          </div>
          <div className="text-2xl font-bold text-primary">{score} pts</div>
        </div>

        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-8">
          <div className="bg-secondary h-2 rounded-full transition-all" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
        </div>

        <Card className="mb-8 text-center">
          <p className="text-sm text-gray-500 mb-2">¿Qué significa esta frase?</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 font-mono">{currentQuestion?.sentence}</h2>
          <Button variant="ghost" size="sm" onClick={() => speak(currentQuestion?.sentence || "")}>
            <Volume2 className="w-4 h-4 mr-2" />Escuchar
          </Button>
        </Card>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-secondary/20 to-cyan-500/20 rounded-xl p-6 text-center mb-8"
        >
          <p className="text-xl md:text-2xl font-medium">
            {showTranslation ? currentQuestion?.translation : "¿Sabes la respuesta?"}
          </p>
        </motion.div>

        <div className="flex gap-4">
          <Button variant="error" size="lg" className="flex-1" onClick={handleDontKnow}>
            <XCircle className="w-5 h-5 mr-2" />
            No sé
          </Button>
          <Button variant="success" size="lg" className="flex-1" onClick={handleKnow}>
            <CheckCircle className="w-5 h-5 mr-2" />
            ¡La sé!
          </Button>
        </div>
      </div>
    </div>
  );
}
