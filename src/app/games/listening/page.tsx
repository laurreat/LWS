"use client";

import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Play, Pause, Volume2, Home, Trophy, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { Button, Card, LevelBadge } from "@/components/ui";
import { useSpeech } from "@/hooks/useSpeech";
import { useProgress } from "@/hooks/useProgress";
import { ALL_PHRASES } from "@/data/phrases";
import { GameLevel, Phrase } from "@/types";

function generateQuiz(phrases: Phrase[], count: number = 10): Phrase[] {
  return [...phrases].sort(() => Math.random() - 0.5).slice(0, count);
}

export default function ListeningPage() {
  const [selectedLevel, setSelectedLevel] = useState<GameLevel | null>(null);
  const [questions, setQuestions] = useState<Phrase[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameState, setGameState] = useState<"select" | "playing" | "finished">("select");
  const { speak, stop } = useSpeech();
  const { playGame } = useProgress();

  const startGame = useCallback((level: GameLevel) => {
    const filtered = ALL_PHRASES.filter((p) => p.level === level);
    const quiz = generateQuiz(filtered, 10);
    setQuestions(quiz);
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setSelectedLevel(level);
    setGameState("playing");
  }, []);

  const playAudio = useCallback(() => {
    if (isPlaying) {
      stop();
      setIsPlaying(false);
    } else {
      const phrase = questions[currentIndex].sentence;
      setIsPlaying(true);
      speak(phrase);
      setTimeout(() => setIsPlaying(false), phrase.length * 200);
    }
  }, [isPlaying, questions, currentIndex, speak, stop]);

  const handleAnswer = useCallback((index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    const isCorrect = index === 0;
    if (isCorrect) setScore((s) => s + 10);
  }, [selectedAnswer]);

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
      playGame("listening", score, score);
      if (score >= 80) confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  }, [selectedLevel, score, playGame]);

  if (gameState === "finished") {
    finishGame();
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-2xl mx-auto py-8 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-8xl mb-6">
            {score >= 80 ? "🎉" : score >= 50 ? "👍" : "💪"}
          </motion.div>
          <h1 className="text-4xl font-bold mb-4">¡Juego Terminado!</h1>
          <Card className="mb-8">
            <div className="flex justify-around">
              <div><p className="text-4xl font-bold text-primary">{score}</p><p className="text-gray-500">Puntos</p></div>
              <div><p className="text-4xl font-bold text-success">{Math.round(score / 10)}/10</p><p className="text-gray-500">Correctas</p></div>
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
          <h1 className="text-3xl font-bold text-center mb-8">👂 Listening Practice</h1>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8">Escucha y selecciona la traducción correcta</p>
          <div className="space-y-4">
            {(["A1", "A2", "B1"] as GameLevel[]).map((level) => (
              <Card key={level} hover className="cursor-pointer" onClick={() => startGame(level)}>
                <div className="flex items-center justify-between">
                  <div><LevelBadge level={level} /><p className="text-gray-600 dark:text-gray-300 mt-2">Frases {level === "A1" ? "básicas" : level === "A2" ? "intermedias" : "avanzadas"}</p></div>
                  <span className="text-4xl">👂</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const options = useMemo(() => {
    const correct = currentQuestion.translation;
    const others = ALL_PHRASES.filter((p) => p.translation !== correct && p.level === selectedLevel).map((p) => p.translation);
    const wrong = others.sort(() => Math.random() - 0.5).slice(0, 3);
    return [correct, ...wrong].sort(() => Math.random() - 0.5);
  }, [currentQuestion, selectedLevel]);

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <div><LevelBadge level={selectedLevel!} /><p className="text-sm text-gray-500 mt-1">Pregunta {currentIndex + 1} de {questions.length}</p></div>
          <div className="text-2xl font-bold text-primary">{score} pts</div>
        </div>

        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-8">
          <div className="bg-pink-500 h-2 rounded-full transition-all" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
        </div>

        <Card className="mb-8 text-center">
          <p className="text-sm text-gray-500 mb-4">Presiona el botón para escuchar</p>
          <Button size="lg" onClick={playAudio} className="rounded-full w-20 h-20">
            {isPlaying ? <Pause className="w-8 h-8" /> : <Volume2 className="w-8 h-8" />}
          </Button>
        </Card>

        <div className="space-y-3">
          {options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === 0;
            const showResult = selectedAnswer !== null;

            return (
              <motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}>
                <button
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 rounded-xl text-left font-medium transition-all flex items-center justify-between ${
                    showResult
                      ? isCorrect ? "bg-success text-white" : isSelected ? "bg-error text-white" : "bg-gray-100 dark:bg-gray-800 opacity-50"
                      : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {option}
                  {showResult && isCorrect && <CheckCircle className="w-5 h-5" />}
                  {showResult && isSelected && !isCorrect && <XCircle className="w-5 h-5" />}
                </button>
              </motion.div>
            );
          })}
        </div>

        {selectedAnswer !== null && (
          <div className="mt-6 text-center">
            <Button onClick={nextQuestion}>{currentIndex < questions.length - 1 ? "Siguiente" : "Ver resultados"}</Button>
          </div>
        )}
      </div>
    </div>
  );
}
