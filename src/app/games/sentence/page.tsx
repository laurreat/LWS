"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import confetti from "canvas-confetti";
import { Volume2, Home, Trophy, CheckCircle, XCircle, RotateCcw, ChevronRight, Brain, GraduationCap, Award } from "lucide-react";
import Link from "next/link";
import { Button, Card, LevelBadge } from "@/components/ui";
import { useSpeech } from "@/hooks/useSpeech";
import { useAuth } from "@/contexts/AuthContext";
import { ALL_SENTENCES } from "@/data/sentences";
import { GameLevel, Sentence } from "@/types";

function generateQuiz(sentences: Sentence[], count: number = 10): Sentence[] {
  return [...sentences].sort(() => Math.random() - 0.5).slice(0, count);
}

export default function SentencePage() {
  const [selectedLevel, setSelectedLevel] = useState<GameLevel | null>(null);
  const [questions, setQuestions] = useState<Sentence[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gameState, setGameState] = useState<"select" | "playing" | "finished">("select");
  const { speak } = useSpeech();
  const { playGame, user } = useAuth();

  const [hasFinishedTriggered, setHasFinishedTriggered] = useState(false);

  const startGame = useCallback((level: GameLevel) => {
    const filtered = ALL_SENTENCES.filter((s) => s.level === level);
    const quiz = generateQuiz(filtered, 10);
    setQuestions(quiz);
    setCurrentIndex(0);
    setScore(0);
    setIsCorrect(null);
    setSelectedLevel(level);
    
    const firstSentence = quiz[0];
    const shuffled = [...firstSentence.words].sort(() => Math.random() - 0.5);
    setShuffledWords(shuffled);
    setGameState("playing");
    setHasFinishedTriggered(false);
  }, []);

  const checkAnswer = useCallback(() => {
    const current = questions[currentIndex];
    const isCorrectAnswer = shuffledWords.join(" ") === current.sentence;
    setIsCorrect(isCorrectAnswer);
    
    if (isCorrectAnswer) {
      setScore((s) => s + 10);
    }
  }, [shuffledWords, questions, currentIndex]);

  const nextQuestion = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      const next = questions[currentIndex + 1];
      const shuffled = [...next.words].sort(() => Math.random() - 0.5);
      setShuffledWords(shuffled);
      setCurrentIndex((i) => i + 1);
      setIsCorrect(null);
    } else {
      setGameState("finished");
    }
  }, [currentIndex, questions]);

  const finishGame = useCallback(() => {
    if (selectedLevel && !hasFinishedTriggered) {
      setHasFinishedTriggered(true);
      playGame("sentence", score, score, selectedLevel);
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

  const handleReorder = (newOrder: string[]) => {
    if (isCorrect === null) {
      setShuffledWords(newOrder);
    }
  };

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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full mb-4">
              <ListOrdered className="w-5 h-5 text-emerald-500" />
              <span className="text-sm font-medium text-emerald-600">Oraciones</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Organizar Oraciones
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Ordena las palabras para formar una oración
            </p>
          </div>
          
          <div className="space-y-4">
            {([
              { level: "A1" as GameLevel, icon: Brain, label: "Principiante", desc: "Oraciones simples", color: "from-green-500 to-emerald-500" },
              { level: "A2" as GameLevel, icon: GraduationCap, label: "Elemental", desc: "Oraciones intermedias", color: "from-blue-500 to-cyan-500" },
              { level: "B1" as GameLevel, icon: Award, label: "Intermedio", desc: "Oraciones avanzadas", color: "from-purple-500 to-violet-500" },
            ]).map((item, index) => (
              <motion.div
                key={item.level}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  hover 
                  className={`cursor-pointer border-2 border-transparent hover:border-emerald-500/20 transition-all duration-300`}
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
          <div className="bg-emerald-500 h-2 rounded-full transition-all" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
        </div>

        <Card className="mb-8 text-center">
          <p className="text-sm text-gray-500 mb-2">Ordena las palabras:</p>
          <Button variant="ghost" size="sm" onClick={() => speak(currentQuestion?.sentence || "")}>
            <Volume2 className="w-4 h-4 mr-2" />Escuchar oración correcta
          </Button>
        </Card>

         <Reorder.Group axis="y" values={shuffledWords} onReorder={handleReorder} className="space-y-2 mb-8 min-h-[200px]">
           {shuffledWords.map((word) => (
              <Reorder.Item key={word} value={word}>
              <motion.div
                layout
                className={`p-4 rounded-xl cursor-grab active:cursor-grabbing font-medium text-center ${
                  isCorrect === true
                    ? "bg-success text-white"
                    : isCorrect === false
                    ? "bg-error text-white"
                    : "bg-gray-100 dark:bg-gray-800"
                }`}
              >
                {word}
              </motion.div>
            </Reorder.Item>
          ))}
        </Reorder.Group>

        <AnimatePresence>
          {isCorrect !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-center mb-6 p-4 rounded-xl ${isCorrect ? "bg-success/10 text-success" : "bg-error/10 text-error"}`}
            >
              <p className="text-xl font-bold">
                {isCorrect ? "¡Correcto! 🎉" : "Incorrecto. La respuesta era:"}
              </p>
              {!isCorrect && <p className="font-mono mt-2">{currentQuestion?.sentence}</p>}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-4">
          {isCorrect === null ? (
            <Button className="flex-1" onClick={checkAnswer}>
              <CheckCircle className="w-4 h-4 mr-2" />Verificar
            </Button>
          ) : (
            <Button className="flex-1" onClick={nextQuestion}>
              {currentIndex < questions.length - 1 ? "Siguiente" : "Ver resultados"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
