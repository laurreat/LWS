"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import confetti from "canvas-confetti";
import { Volume2, Home, Trophy, CheckCircle } from "lucide-react";
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
  const { playGame } = useAuth();

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
    if (selectedLevel) {
      playGame("sentence", score, score);
      if (score >= 80) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
    }
  }, [selectedLevel, score, playGame]);

  const handleReorder = (newOrder: string[]) => {
    if (isCorrect === null) {
      setShuffledWords(newOrder);
    }
  };

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
          <h1 className="text-3xl font-bold text-center mb-8">🧩 Organize the Sentence</h1>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8">Ordena las palabras para formar una oración</p>
          <div className="space-y-4">
            {(["A1", "A2", "B1"] as GameLevel[]).map((level) => (
              <Card key={level} hover className="cursor-pointer" onClick={() => startGame(level)}>
                <div className="flex items-center justify-between">
                  <div>
                    <LevelBadge level={level} />
                    <p className="text-gray-600 dark:text-gray-300 mt-2">Oraciones {level === "A1" ? "simples" : level === "A2" ? "intermedias" : "avanzadas"}</p>
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
