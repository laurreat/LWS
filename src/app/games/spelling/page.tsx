"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Volume2, Home, Trophy, CheckCircle, XCircle, RotateCcw } from "lucide-react";
import Link from "next/link";
import { Button, Card, LevelBadge } from "@/components/ui";
import { useSpeech } from "@/hooks/useSpeech";
import { useAuth } from "@/contexts/AuthContext";
import { ALL_PHRASES } from "@/data/phrases";
import { GameLevel, Phrase } from "@/types";

function generateQuiz(phrases: Phrase[], count: number = 10): Phrase[] {
  return [...phrases].sort(() => Math.random() - 0.5).slice(0, count);
}

export default function SpellingPage() {
  const [selectedLevel, setSelectedLevel] = useState<GameLevel | null>(null);
  const [questions, setQuestions] = useState<Phrase[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState<boolean | null>(null);
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
    setInput("");
    setShowResult(null);
    setSelectedLevel(level);
    setGameState("playing");
    setHasFinishedTriggered(false);
  }, []);

  const checkSpelling = useCallback(() => {
    const correct = questions[currentIndex].sentence.replace(/[.,!?]/g, "").trim().toLowerCase();
    const isCorrect = input.toLowerCase().trim() === correct;
    setShowResult(isCorrect);
    if (isCorrect) setScore((s) => s + 10);
  }, [input, questions, currentIndex]);

  const nextQuestion = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setInput("");
      setShowResult(null);
    } else {
      setGameState("finished");
    }
  }, [currentIndex, questions.length]);

  const finishGame = useCallback(() => {
    if (selectedLevel && !hasFinishedTriggered) {
      setHasFinishedTriggered(true);
      playGame("spelling", score, score, selectedLevel);
      if (score >= 80 && user) confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  }, [selectedLevel, score, playGame, user, hasFinishedTriggered]);

  useEffect(() => {
    if (gameState === "finished" && !hasFinishedTriggered) {
      finishGame();
    }
  }, [gameState, finishGame, hasFinishedTriggered]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && showResult === null) {
      checkSpelling();
    } else if (e.key === "Enter" && showResult !== null) {
      nextQuestion();
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
          <h1 className="text-3xl font-bold text-center mb-8">✏️ Spelling Bee</h1>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8">Escucha y escribe la frase correctamente</p>
          <div className="space-y-4">
            {(["A1", "A2", "B1"] as GameLevel[]).map((level) => (
              <Card key={level} hover className="cursor-pointer" onClick={() => startGame(level)}>
                <div className="flex items-center justify-between">
                  <div><LevelBadge level={level} /><p className="text-gray-600 dark:text-gray-300 mt-2">Frases {level === "A1" ? "básicas" : level === "A2" ? "intermedias" : "avanzadas"}</p></div>
                  <span className="text-4xl">✏️</span>
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
          <div><LevelBadge level={selectedLevel!} /><p className="text-sm text-gray-500 mt-1">Pregunta {currentIndex + 1} de {questions.length}</p></div>
          <div className="text-2xl font-bold text-primary">{score} pts</div>
        </div>

        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-8">
          <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
        </div>

        <Card className="mb-8 text-center">
          <p className="text-sm text-gray-500 mb-2">Escucha la frase y escríbela:</p>
          <p className="text-xl mb-4">{currentQuestion?.translation}</p>
          <div className="flex gap-2 justify-center">
            <Button variant="outline" onClick={() => speak(currentQuestion?.sentence || "")}>
              <Volume2 className="w-4 h-4 mr-2" />Escuchar
            </Button>
            <Button variant="ghost" onClick={() => speak(currentQuestion?.sentence || "")}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </Card>

        <Card className="mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={showResult !== null}
            placeholder="Escribe la frase en inglés..."
            className="w-full p-4 text-xl text-center border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-primary focus:outline-none bg-transparent"
          />
        </Card>

        {showResult !== null && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <div className={`text-center p-4 rounded-xl ${showResult ? "bg-success/10 text-success" : "bg-error/10 text-error"}`}>
              {showResult ? (
                <div><CheckCircle className="w-8 h-8 mx-auto mb-2" /><p className="font-bold">¡Correcto!</p></div>
              ) : (
                <div>
                  <XCircle className="w-8 h-8 mx-auto mb-2" />
                  <p className="font-bold mb-2">Incorrecto. La respuesta era:</p>
                  <p className="font-mono text-lg">{currentQuestion?.sentence}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        <div className="flex gap-4">
          {showResult === null ? (
            <Button className="flex-1" onClick={checkSpelling}>Verificar</Button>
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
