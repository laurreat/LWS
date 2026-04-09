"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Home, Trophy, CheckCircle, XCircle, Info } from "lucide-react";
import Link from "next/link";
import { Button, Card, LevelBadge } from "@/components/ui";
import { useAuth } from "@/contexts/AuthContext";
import { ALL_GRAMMAR } from "@/data/grammar";
import { GameLevel, GrammarQuestion } from "@/types";

function generateQuiz(questions: GrammarQuestion[], count: number = 10): GrammarQuestion[] {
  return [...questions].sort(() => Math.random() - 0.5).slice(0, count);
}

export default function GrammarPage() {
  const [selectedLevel, setSelectedLevel] = useState<GameLevel | null>(null);
  const [questions, setQuestions] = useState<GrammarQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameState, setGameState] = useState<"select" | "playing" | "finished">("select");
  const { playGame, user } = useAuth();

  const [hasFinishedTriggered, setHasFinishedTriggered] = useState(false);

  const startGame = useCallback((level: GameLevel) => {
    const filtered = ALL_GRAMMAR.filter((q) => q.level === level);
    const quiz = generateQuiz(filtered, 10);
    setQuestions(quiz);
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setSelectedLevel(level);
    setGameState("playing");
    setHasFinishedTriggered(false);
  }, []);

  const handleAnswer = useCallback((index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === questions[currentIndex].correctIndex) {
      setScore((s) => s + 10);
    }
  }, [selectedAnswer, questions, currentIndex]);

  const nextQuestion = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setGameState("finished");
    }
  }, [currentIndex, questions.length]);

  const finishGame = useCallback(() => {
    if (selectedLevel && !hasFinishedTriggered) {
      setHasFinishedTriggered(true);
      playGame("grammar", score, score);
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
      <div className="min-h-screen p-4">
        <div className="max-w-2xl mx-auto py-8">
          <h1 className="text-3xl font-bold text-center mb-8">📝 Grammar Quiz</h1>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8">¿Cuál es la respuesta correcta?</p>
          <div className="space-y-4">
            {(["A1", "A2", "B1"] as GameLevel[]).map((level) => (
              <Card key={level} hover className="cursor-pointer" onClick={() => startGame(level)}>
                <div className="flex items-center justify-between">
                  <div>
                    <LevelBadge level={level} />
                    <p className="text-gray-600 dark:text-gray-300 mt-2">30 preguntas de gramática</p>
                  </div>
                  <span className="text-4xl">{level === "A1" ? "🌟" : level === "A2" ? "⭐" : "🏆"}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
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
          <div className="bg-amber-500 h-2 rounded-full transition-all" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
        </div>

        <Card className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-center">{currentQuestion?.question}</h2>
        </Card>

        <div className="space-y-3">
          {currentQuestion?.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === currentQuestion.correctIndex;
            const showResult = selectedAnswer !== null;

            return (
              <motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}>
                <button
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 rounded-xl text-left font-medium transition-all flex items-center justify-between ${
                    showResult
                      ? isCorrect
                        ? "bg-success text-white"
                        : isSelected
                        ? "bg-error text-white"
                        : "bg-gray-100 dark:bg-gray-800 opacity-50"
                      : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">{String.fromCharCode(65 + index)}</span>
                    {option}
                  </span>
                  {showResult && isCorrect && <CheckCircle className="w-5 h-5" />}
                  {showResult && isSelected && !isCorrect && <XCircle className="w-5 h-5" />}
                </button>
              </motion.div>
            );
          })}
        </div>

        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4"
          >
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <p className="font-medium text-blue-700 dark:text-blue-300">Explicación:</p>
                <p className="text-blue-600 dark:text-blue-400">{currentQuestion?.explanation}</p>
              </div>
            </div>
          </motion.div>
        )}

        {selectedAnswer !== null && (
          <div className="mt-6 text-center">
            <Button onClick={nextQuestion}>
              {currentIndex < questions.length - 1 ? "Siguiente" : "Ver resultados"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
