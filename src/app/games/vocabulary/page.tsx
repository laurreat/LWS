"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Volume2, CheckCircle, XCircle, Trophy, Home } from "lucide-react";
import Link from "next/link";
import { Button, Card, LevelBadge } from "@/components/ui";
import { useSpeech } from "@/hooks/useSpeech";
import { useProgress } from "@/hooks/useProgress";
import { A1_WORDS, A2_WORDS, B1_WORDS } from "@/data/vocabulary";
import { GameLevel, Word } from "@/types";

const WORDS_BY_LEVEL = {
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
  const { playGame } = useProgress();

  const startGame = useCallback((level: GameLevel) => {
    const words = WORDS_BY_LEVEL[level];
    const quiz = generateQuiz(words, 10);
    setQuestions(quiz);
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setSelectedLevel(level);
    setGameState("playing");
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
    if (selectedLevel) {
      const pointsEarned = score;
      playGame("vocabulary", score, pointsEarned);
      
      if (score >= 80) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    }
  }, [selectedLevel, score, playGame]);

  useEffect(() => {
    if (gameState === "finished") {
      finishGame();
    }
  }, [gameState, finishGame]);

  const currentQuestion = questions[currentIndex];

  if (gameState === "select") {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-2xl mx-auto py-8">
          <h1 className="text-3xl font-bold text-center mb-8">📚 Vocabulary Quiz</h1>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
            Selecciona tu nivel y pon a prueba tu vocabulario
          </p>
          
          <div className="space-y-4">
            <Card hover className="cursor-pointer" onClick={() => startGame("A1")}>
              <div className="flex items-center justify-between">
                <div>
                  <LevelBadge level="A1" />
                  <p className="text-gray-600 dark:text-gray-300 mt-2">100 palabras básicas</p>
                </div>
                <span className="text-4xl">🌟</span>
              </div>
            </Card>
            
            <Card hover className="cursor-pointer" onClick={() => startGame("A2")}>
              <div className="flex items-center justify-between">
                <div>
                  <LevelBadge level="A2" />
                  <p className="text-gray-600 dark:text-gray-300 mt-2">100 palabras intermedias</p>
                </div>
                <span className="text-4xl">⭐</span>
              </div>
            </Card>
            
            <Card hover className="cursor-pointer" onClick={() => startGame("B1")}>
              <div className="flex items-center justify-between">
                <div>
                  <LevelBadge level="B1" />
                  <p className="text-gray-600 dark:text-gray-300 mt-2">100 palabras avanzadas</p>
                </div>
                <span className="text-4xl">🏆</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === "finished") {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-2xl mx-auto py-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-8xl mb-6"
          >
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
              <div>
                <p className="text-4xl font-bold text-secondary">{selectedLevel}</p>
                <p className="text-gray-500">Nivel</p>
              </div>
            </div>
          </Card>

          <div className="flex gap-4 justify-center">
            <Link href="/">
              <Button variant="outline">
                <Home className="w-4 h-4 mr-2" />
                Inicio
              </Button>
            </Link>
            <Button onClick={() => startGame(selectedLevel!)}>
              <Trophy className="w-4 h-4 mr-2" />
              Jugar de nuevo
            </Button>
          </div>
        </div>
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
