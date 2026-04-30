"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Volume2, Home, Trophy, CheckCircle, XCircle, RotateCcw, ChevronRight, PenTool, Brain, GraduationCap, Award } from "lucide-react";
import Link from "next/link";
import { Button, Card, LevelBadge } from "@/components/ui";
import { useSpeech } from "@/hooks/useSpeech";
import { useAuth } from "@/contexts/AuthContext";
import { ALL_PHRASES } from "@/data/phrases";
import { GameLevel, Phrase } from "@/types";

function generateQuiz(phrases: Phrase[], count: number = 10): Phrase[] {
  return [...phrases].sort(() => Math.random() - 0.5).slice(0, count);
}

function isCorrectSpelling(input: string, correct: string): boolean {
  const clean = (s: string) => s.toLowerCase().replace(/[.,!?]/g, "").replace(/\s+/g, " ").trim();
  
  const i = clean(input);
  const c = clean(correct);
  if (i === c) return true;

  const formatInput = (s: string) => s
    .replace(/\bdont\b/g, "don't")
    .replace(/\bdoesnt\b/g, "doesn't")
    .replace(/\bdidnt\b/g, "didn't")
    .replace(/\bcant\b/g, "can't")
    .replace(/\bwont\b/g, "won't")
    .replace(/\bisnt\b/g, "isn't")
    .replace(/\barent\b/g, "aren't")
    .replace(/\bwasnt\b/g, "wasn't")
    .replace(/\bwerent\b/g, "weren't")
    .replace(/\bhavent\b/g, "haven't")
    .replace(/\bhasnt\b/g, "hasn't")
    .replace(/\bhadnt\b/g, "hadn't")
    .replace(/\bwouldnt\b/g, "wouldn't")
    .replace(/\bshouldnt\b/g, "shouldn't")
    .replace(/\bcouldnt\b/g, "couldn't")
    .replace(/\bmustnt\b/g, "mustn't")
    .replace(/\bim\b/g, "i'm")
    .replace(/\bive\b/g, "i've");

  const expand = (s: string) => s
    .replace(/\bwon't\b/g, "will not")
    .replace(/\bcan't\b/g, "can not")
    .replace(/\bcannot\b/g, "can not")
    .replace(/n't\b/g, " not")
    .replace(/'m\b/g, " am")
    .replace(/'re\b/g, " are")
    .replace(/'ve\b/g, " have")
    .replace(/'ll\b/g, " will")
    .replace(/\blet's\b/g, "let us")
    .replace(/\s+/g, " ")
    .trim();

  const iExp = expand(formatInput(i));
  const cExp = expand(c);

  if (iExp === cExp) return true;

  const expandIs = (s: string) => s.replace(/'s\b/g, " is").replace(/'d\b/g, " would");
  if (expandIs(iExp) === expandIs(cExp)) return true;

  const expandHas = (s: string) => s.replace(/'s\b/g, " has").replace(/'d\b/g, " had");
  if (expandHas(iExp) === expandHas(cExp)) return true;

  return false;
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
    const correctPhrase = questions[currentIndex].sentence;
    const isCorrect = isCorrectSpelling(input, correctPhrase);
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
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto py-8"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 rounded-full mb-4">
              <PenTool className="w-5 h-5 text-orange-500" />
              <span className="text-sm font-medium text-orange-600">Ortografía</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Practica tu Ortografía
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Escucha y escribe la frase correctamente
            </p>
          </div>
          
          <div className="space-y-4">
            {([
              { level: "A1" as GameLevel, icon: PenTool, label: "Principiante", desc: "Frases básicas", color: "from-green-500 to-emerald-500" },
              { level: "A2" as GameLevel, icon: PenTool, label: "Elemental", desc: "Frases intermedias", color: "from-blue-500 to-cyan-500" },
              { level: "B1" as GameLevel, icon: PenTool, label: "Intermedio", desc: "Frases avanzadas", color: "from-purple-500 to-violet-500" },
            ]).map((item, index) => (
              <motion.div
                key={item.level}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  hover 
                  className={`cursor-pointer border-2 border-transparent hover:border-orange-500/20 transition-all duration-300`}
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
