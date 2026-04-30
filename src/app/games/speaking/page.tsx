"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Mic, MicOff, Volume2, Home, Trophy, CheckCircle, XCircle, RefreshCw, ChevronRight, MessageSquare, Brain, GraduationCap, Award } from "lucide-react";
import Link from "next/link";
import { Button, Card, LevelBadge } from "@/components/ui";
import { useSpeech } from "@/hooks/useSpeech";
import { useAuth } from "@/contexts/AuthContext";
import { ALL_PHRASES } from "@/data/phrases";
import { GameLevel, Phrase } from "@/types";

function generateQuiz(phrases: Phrase[], count: number = 10): Phrase[] {
  return [...phrases].sort(() => Math.random() - 0.5).slice(0, count);
}

export default function SpeakingPage() {
  const [selectedLevel, setSelectedLevel] = useState<GameLevel | null>(null);
  const [questions, setQuestions] = useState<Phrase[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [showResult, setShowResult] = useState<boolean | null>(null);
  const [gameState, setGameState] = useState<"select" | "playing" | "finished">("select");
  const { speak } = useSpeech();
  const { playGame, user } = useAuth();
  const recognitionRef = useRef<any>(null);
  const [hasFinishedTriggered, setHasFinishedTriggered] = useState(false);

  const startGame = useCallback((level: GameLevel) => {
    const filtered = ALL_PHRASES.filter((p) => p.level === level);
    const quiz = generateQuiz(filtered, 10);
    setQuestions(quiz);
    setCurrentIndex(0);
    setScore(0);
    setShowResult(null);
    setSelectedLevel(level);
    setGameState("playing");
    setHasFinishedTriggered(false);
  }, []);

  const startRecording = useCallback(() => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Tu navegador no soporta reconocimiento de voz");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => setIsRecording(false);
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      const currentPhrase = questions[currentIndex].sentence.toLowerCase().replace(/[.,!?]/g, "").trim();
      const isCorrect = transcript.includes(currentPhrase.split(" ")[0]) && transcript.includes(currentPhrase.split(" ")[1]);
      
      setShowResult(isCorrect);
      if (isCorrect) setScore((s) => s + 10);
    };

    recognition.onerror = () => {
      setIsRecording(false);
      alert("Error en el reconocimiento de voz. Intenta de nuevo.");
    };

    recognition.start();
  }, [questions, currentIndex]);

  const listenPhrase = useCallback(() => {
    speak(questions[currentIndex].sentence);
  }, [questions, currentIndex, speak]);

  const nextQuestion = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setShowResult(null);
    } else {
      setGameState("finished");
    }
  }, [currentIndex, questions.length]);

  const finishGame = useCallback(() => {
    if (selectedLevel && !hasFinishedTriggered) {
      setHasFinishedTriggered(true);
      playGame("speaking", score, score, selectedLevel);
      if (score >= 80 && user) confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  }, [selectedLevel, score, playGame, user, hasFinishedTriggered]);

  useEffect(() => {
    if (gameState === "finished" && !hasFinishedTriggered) {
      finishGame();
    }
  }, [gameState, finishGame, hasFinishedTriggered]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) recognitionRef.current.abort();
    };
  }, []);

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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 rounded-full mb-4">
              <MessageSquare className="w-5 h-5 text-indigo-500" />
              <span className="text-sm font-medium text-indigo-600">Habla</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Práctica tu Pronunciación
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Escucha y repite la frase en inglés
            </p>
          </div>
          
          <div className="space-y-4">
            {([
              { level: "A1" as GameLevel, icon: Brain, label: "Principiante", desc: "Frases básicas", color: "from-green-500 to-emerald-500" },
              { level: "A2" as GameLevel, icon: GraduationCap, label: "Elemental", desc: "Frases intermedias", color: "from-blue-500 to-cyan-500" },
              { level: "B1" as GameLevel, icon: Award, label: "Intermedio", desc: "Frases avanzadas", color: "from-purple-500 to-violet-500" },
            ]).map((item, index) => (
              <motion.div
                key={item.level}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  hover 
                  className={`cursor-pointer border-2 border-transparent hover:border-indigo-500/20 transition-all duration-300`}
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
          <div className="bg-indigo-500 h-2 rounded-full transition-all" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
        </div>

        <Card className="mb-8 text-center">
          <p className="text-sm text-gray-500 mb-2">Traducción:</p>
          <p className="text-xl mb-4">{currentQuestion?.translation}</p>
          <div className="flex gap-2 justify-center">
            <Button variant="outline" onClick={listenPhrase}><Volume2 className="w-4 h-4 mr-2" />Escuchar</Button>
          </div>
        </Card>

        <Card className="mb-8 text-center bg-gradient-to-br from-indigo-500 to-violet-500 text-white">
          <p className="text-2xl md:text-3xl font-bold font-mono">{currentQuestion?.sentence}</p>
        </Card>

        <div className="flex flex-col items-center gap-4 mb-8">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={startRecording}
            disabled={isRecording}
            className={`rounded-full w-24 h-24 flex items-center justify-center transition-all ${
              isRecording ? "bg-red-500 animate-pulse" : "bg-indigo-500 hover:bg-indigo-600"
            }`}
          >
            {isRecording ? <MicOff className="w-10 h-10 text-white" /> : <Mic className="w-10 h-10 text-white" />}
          </motion.button>
          <p className="text-gray-500">{isRecording ? "Escuchando..." : "Presiona para hablar"}</p>
        </div>

        {showResult !== null && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
            <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl ${showResult ? "bg-success/10 text-success" : "bg-error/10 text-error"}`}>
              {showResult ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
              <span className="text-xl font-bold">{showResult ? "¡Excelente!" : "Intenta de nuevo"}</span>
            </div>
          </motion.div>
        )}

        {showResult !== null && (
          <div className="text-center">
            <Button onClick={nextQuestion}>{currentIndex < questions.length - 1 ? "Siguiente" : "Ver resultados"}</Button>
          </div>
        )}
      </div>
    </div>
  );
}
