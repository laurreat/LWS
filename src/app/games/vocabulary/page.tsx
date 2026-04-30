"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Volume2, CheckCircle, XCircle, Trophy, Home, BookOpen, Brain, Award, GraduationCap, ChevronRight, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { Button, Card, LevelBadge } from "@/components/ui";
import { useSpeech } from "@/hooks/useSpeech";
import { useAuth } from "@/contexts/AuthContext";
import { A1_WORDS, A2_WORDS, B1_WORDS } from "@/data/vocabulary";
import { GameLevel, Word } from "@/types";

const WORDS_BY_LEVEL: Record<GameLevel, Word[]> = {
  A1: A1_WORDS,
  A2: A2_WORDS,
  B1: B1_WORDS,
};

interface QuizQuestion {
  word: Word;
  options: string[];
  correctIndex: number;
}

function generateQuiz(words: Word[], count: number = 10): QuizQuestion[] {
  const shuffled = [...words].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, count);
   
  return selected.map((word) => {
    const otherWords = words.filter((w) => w.id !== word.id);
    const wrongOptions = [...otherWords]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((w) => w.translation);
     
    const options = [...wrongOptions, word.translation].sort(() => Math.random() - 0.5);
    const correctIndex = options.indexOf(word.translation);
     
    return { word, options, correctIndex };
  });
}

export default function VocabularyPage() {
  const [selectedLevel, setSelectedLevel] = useState<GameLevel | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<"select" | "playing" | "finished">("select");
  const { speak } = useSpeech();
  const { playGame, user } = useAuth();

  const [hasFinishedTriggered, setHasFinishedTriggered] = useState(false);

  const startGame = useCallback((level: GameLevel) => {
    const words = WORDS_BY_LEVEL[level];
    const quiz = generateQuiz(words, 10);
    setQuestions(quiz);
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setSelectedLevel(level);
    setGameState("playing");
    setHasFinishedTriggered(false);
  }, []);

  const handleAnswer = useCallback((index: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(index);
    const isCorrect = index === questions[currentIndex].correctIndex;
    
    if (isCorrect) {
      setScore((s) => s + 10);
      speak(questions[currentIndex].word.word);
    }
  }, [selectedAnswer, questions, currentIndex, speak]);

  const nextQuestion = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
    } else {
      setGameState("finished");
    }
  }, [currentIndex, questions.length]);

  const finishGame = useCallback(() => {
    if (selectedLevel && !hasFinishedTriggered) {
      setHasFinishedTriggered(true);
      const pointsEarned = score;
      playGame("vocabulary", score, pointsEarned, selectedLevel);
      
      if (score >= 80) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    }
  }, [selectedLevel, score, playGame, hasFinishedTriggered]);

  useEffect(() => {
    if (gameState === "finished" && !hasFinishedTriggered) {
      finishGame();
    }
  }, [gameState, finishGame, hasFinishedTriggered]);

  const currentQuestion = questions[currentIndex];

  if (gameState === "select") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto py-8"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">Vocabulario</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Quiz de Vocabulario
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Selecciona tu nivel y pon a prueba tu vocabulario
            </p>
          </div>
          
          <div className="space-y-4">
            {([
              { level: "A1" as GameLevel, icon: Brain, label: "Principiante", desc: "300 palabras básicas", color: "from-green-500 to-emerald-500" },
              { level: "A2" as GameLevel, icon: GraduationCap, label: "Elemental", desc: "400 palabras intermedias", color: "from-blue-500 to-cyan-500" },
              { level: "B1" as GameLevel, icon: Award, label: "Intermedio", desc: "500 palabras avanzadas", color: "from-purple-500 to-violet-500" },
            ]).map((item, index) => (
              <motion.div
                key={item.level}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  hover 
                  className={`cursor-pointer border-2 border-transparent hover:border-primary/20 transition-all duration-300`}
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

  if (gameState === "finished") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto py-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center text-6xl"
            style={{ 
              background: score >= 80 ? "linear-gradient(to br, #10b981, #34d399)" : 
                           score >= 50 ? "linear-gradient(to br, #3b82f6, #60a5fa)" : 
                           "linear-gradient(to br, #ef4444, #f87171)"
            }}
          >
            {score >= 80 ? <Trophy className="w-10 h-10 text-white" /> : 
             score >= 50 ? <span className="text-4xl">👍</span> : 
             <span className="text-4xl">💪</span>}
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            ¡Juego Terminado!
          </h1>
          
          <Card className="border-0 shadow-2xl mb-8">
            <div className="p-6">
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div>
                  <p className="text-4xl font-bold text-primary">{score}</p>
                  <p className="text-sm text-gray-500">Puntos</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-success">{Math.round(score / 10)}/10</p>
                  <p className="text-sm text-gray-500">Correctas</p>
                </div>
                <div>
                  <LevelBadge level={selectedLevel!} size="lg" />
                  <p className="text-sm text-gray-500 mt-1">Nivel</p>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3 mb-4">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${score}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              
              <p className="text-gray-600 dark:text-gray-400">
                {score >= 80 ? "¡Excelente trabajo! Sigue así." : 
                 score >= 50 ? "Buen trabajo, sigue practicando." : 
                 "Necesitas practicar más este nivel."}
              </p>
            </div>
          </Card>

          <div className="flex gap-4 justify-center">
            <Link href="/">
              <Button variant="outline" size="lg">
                <Home className="w-5 h-5 mr-2" />
                Inicio
              </Button>
            </Link>
            <Button onClick={() => startGame(selectedLevel!)} size="lg">
              <RefreshCcw className="w-5 h-5 mr-2" />
              Jugar de nuevo
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <LevelBadge level={selectedLevel!} />
            <p className="text-sm text-gray-500 mt-1">
              Pregunta {currentIndex + 1} de {questions.length}
            </p>
          </div>
          <div className="text-2xl font-bold text-primary">{score} pts</div>
        </div>

        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-8">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>

        <Card className="mb-8 text-center">
          <p className="text-sm text-gray-500 mb-2">¿Cuál es la traducción de?</p>
          <h2 className="text-4xl font-bold mb-4 font-mono">{currentQuestion?.word.word}</h2>
          <Button variant="ghost" size="sm" onClick={() => speak(currentQuestion?.word.word || "")}>
            <Volume2 className="w-4 h-4 mr-2" />
            Escuchar
          </Button>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          {currentQuestion?.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === currentQuestion.correctIndex;
            const showResult = selectedAnswer !== null;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <button
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 rounded-xl text-left font-medium transition-all ${
                    showResult
                      ? isCorrect
                        ? "bg-success text-white"
                        : isSelected
                        ? "bg-error text-white"
                        : "bg-gray-100 dark:bg-gray-800 opacity-50"
                      : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <span className="flex items-center justify-between">
                    {option}
                    {showResult && isCorrect && <CheckCircle className="w-5 h-5" />}
                    {showResult && isSelected && !isCorrect && <XCircle className="w-5 h-5" />}
                  </span>
                </button>
              </motion.div>
            );
          })}
        </div>

        <AnimatePresence>
          {selectedAnswer !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 text-center"
            >
              <p className="text-lg mb-4">
                {selectedAnswer === currentQuestion.correctIndex
                  ? "¡Correcto! 🎉"
                  : `Incorrecto. La respuesta era: ${currentQuestion.options[currentQuestion.correctIndex]}`}
              </p>
              <Button onClick={nextQuestion}>
                {currentIndex < questions.length - 1 ? "Siguiente" : "Ver resultados"}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
