"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Home, Trophy, RefreshCw, CheckCircle, Clock, Star } from "lucide-react";
import Link from "next/link";
import { Button, Card, LevelBadge } from "@/components/ui";
import { useAuth } from "@/contexts/AuthContext";
import { GameLevel, Word } from "@/types";
import { A1_WORDS, A2_WORDS, B1_WORDS } from "@/data/vocabulary";

interface MemoryCard {
  id: string;
  word: Word;
  isFlipped: boolean;
  isMatched: boolean;
}

function getWordsForLevel(level: GameLevel): Word[] {
  switch (level) {
    case "A1": return A1_WORDS;
    case "A2": return A2_WORDS;
    case "B1": return B1_WORDS;
    default: return A1_WORDS;
  }
}

function getPairsForLevel(level: GameLevel): number {
  switch (level) {
    case "A1": return 6;
    case "A2": return 8;
    case "B1": return 10;
    default: return 6;
  }
}

function shuffleCards(words: Word[], pairs: number): MemoryCard[] {
  // Get enough unique words (duplicate if necessary)
  const available = words.length >= pairs 
    ? words.slice(0, pairs) 
    : [...words, ...words].slice(0, pairs);
  
  // Create pairs by duplicating
  const deck = [...available, ...available]
    .sort(() => Math.random() - 0.5);
  
  return deck.map((word, idx) => ({
    id: `card-${idx}-${word.id}`,
    word,
    isFlipped: false,
    isMatched: false,
  }));
}

export default function MemoryPage() {
  const [selectedLevel, setSelectedLevel] = useState<GameLevel | null>(null);
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameState, setGameState] = useState<"select" | "playing" | "finished">("select");
  const [timer, setTimer] = useState(0);
  const [hasFinishedTriggered, setHasFinishedTriggered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { playGame, user } = useAuth();

  const startGame = useCallback((level: GameLevel) => {
    const words = getWordsForLevel(level);
    const pairs = getPairsForLevel(level);
    setCards(shuffleCards(words, pairs));
    setFlippedIds([]);
    setScore(0);
    setMoves(0);
    setSelectedLevel(level);
    setGameState("playing");
    setTimer(0);
    setHasFinishedTriggered(false);
  }, []);

  // Timer effect
  useEffect(() => {
    if (gameState === "playing") {
      timerRef.current = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    } else if (gameState === "finished") {
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [gameState]);

  const handleCardClick = useCallback((cardId: string) => {
    if (flippedIds.length >= 2) return;
    
    setCards(prev => {
      const idx = prev.findIndex(c => c.id === cardId);
      if (idx === -1 || prev[idx].isMatched || prev[idx].isFlipped) return prev;
      
      const newCards = [...prev];
      newCards[idx] = { ...newCards[idx], isFlipped: true };
      return newCards;
    });
    
    setFlippedIds(prev => [...prev, cardId]);
  }, [flippedIds]);

  // Handle card matching
  useEffect(() => {
    if (flippedIds.length === 2) {
      const [firstId, secondId] = flippedIds;
      const firstCard = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);
      
      if (!firstCard || !secondCard) return;
      
      setMoves(prev => prev + 1);
      
      if (firstCard.word.id === secondCard.word.id) {
        // Match found
        setCards(prev => prev.map(c => 
          c.id === firstId || c.id === secondId 
            ? { ...c, isMatched: true }
            : c
        ));
        setScore(prev => prev + 20);
        setFlippedIds([]);
      } else {
        // No match - flip back after delay
        const timeout = setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === firstId || c.id === secondId 
              ? { ...c, isFlipped: false }
              : c
          ));
          setFlippedIds([]);
        }, 1000);
        return () => clearTimeout(timeout);
      }
    }
  }, [flippedIds, cards]);

  // Check game completion
  useEffect(() => {
    if (cards.length > 0 && cards.every(c => c.isMatched)) {
      const timeout = setTimeout(() => {
        setGameState("finished");
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [cards]);

  const finishGame = useCallback(() => {
    if (selectedLevel && !hasFinishedTriggered) {
      setHasFinishedTriggered(true);
      const finalScore = Math.max(0, 120 - moves * 5);
      playGame("memory", finalScore, finalScore, selectedLevel);
      if (user) confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  }, [selectedLevel, moves, playGame, user, hasFinishedTriggered]);

  useEffect(() => {
    if (gameState === "finished" && !hasFinishedTriggered) {
      finishGame();
    }
  }, [gameState, finishGame, hasFinishedTriggered]);

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate stars
  const getStars = () => {
    const pairs = getPairsForLevel(selectedLevel!);
    if (moves <= pairs * 2) return 3;
    if (moves <= pairs * 3) return 2;
    return 1;
  };

  if (gameState === "finished") {
    const stars = getStars();
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-gray-900 dark:to-gray-800">
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full"
        >
          <Card className="text-center p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-8xl mb-6"
            >
              🎉
            </motion.div>
            
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
              ¡Completado!
            </h1>
            
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3].map(i => (
                <Star 
                  key={i} 
                  className={`w-8 h-8 ${i <= stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                <p className="text-3xl font-bold text-primary">{Math.max(0, 120 - moves * 5)}</p>
                <p className="text-sm text-gray-500">Puntos</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                <p className="text-3xl font-bold text-secondary">{moves}</p>
                <p className="text-sm text-gray-500">Movimientos</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                <p className="text-3xl font-bold text-amber-500">{formatTime(timer)}</p>
                <p className="text-sm text-gray-500">Tiempo</p>
              </div>
            </div>
            
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
          </Card>
        </motion.div>
      </div>
    );
  }

  if (gameState === "select") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-lg w-full">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              🧠 Memory Game
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Encuentra las parejas de palabras y mejor tu vocabulario
            </p>
          </motion.div>
          
          <div className="space-y-4">
            {(["A1", "A2", "B1"] as GameLevel[]).map((level, idx) => {
              const pairs = getPairsForLevel(level);
              const colors = {
                "A1": "from-green-400 to-emerald-500",
                "A2": "from-blue-400 to-cyan-500",
                "B1": "from-purple-400 to-pink-500"
              };
              return (
                <motion.div
                  key={level}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card 
                    hover 
                    className={`cursor-pointer bg-gradient-to-r ${colors[level]} border-0 text-white shadow-lg hover:shadow-xl transition-all`}
                    onClick={() => startGame(level)}
                  >
                    <div className="flex items-center justify-between p-2">
                      <div>
                        <LevelBadge level={level} className="bg-white/20 text-white border-0" />
                        <p className="mt-2 font-medium">
                          {pairs} parejas • Nivel {level}
                        </p>
                      </div>
                      <span className="text-4xl">🃏</span>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Playing state
  const gridCols = (() => {
    const pairs = getPairsForLevel(selectedLevel!);
    if (pairs <= 6) return "grid-cols-3";
    if (pairs <= 8) return "grid-cols-4";
    return "grid-cols-5";
  })();

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-wrap items-center justify-between mb-6 gap-4"
        >
          <div className="flex items-center gap-4">
            <LevelBadge level={selectedLevel!} />
            <div className="flex gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{score}</p>
                <p className="text-xs text-gray-500">Puntos</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-secondary">{moves}</p>
                <p className="text-xs text-gray-500">Movimientos</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-amber-500">
                  <Clock className="w-5 h-5 inline mr-1" />
                  {formatTime(timer)}
                </p>
                <p className="text-xs text-gray-500">Tiempo</p>
              </div>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            onClick={() => startGame(selectedLevel!)}
            className="bg-white/50 dark:bg-gray-800/50"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reiniciar
          </Button>
        </motion.div>
        
        {/* Cards Grid */}
        <div className={`grid ${gridCols} gap-4`} role="grid" aria-label="Memory cards">
          <AnimatePresence>
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                layout
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.02 }}
                whileTap={{ scale: 0.95 }}
                className="aspect-square"
              >
                <button
                  onClick={() => handleCardClick(card.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCardClick(card.id);
                    }
                  }}
                  disabled={card.isMatched}
                  aria-pressed={card.isFlipped || card.isMatched}
                  aria-label={`Card ${index + 1}: ${card.isFlipped || card.isMatched ? card.word.word : 'Hidden card'}`}
                  className={`w-full h-full rounded-2xl font-bold transition-all duration-300 transform preserve-3d ${
                    card.isMatched
                      ? "bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-lg cursor-default"
                      : card.isFlipped
                      ? "bg-gradient-to-br from-primary to-secondary text-white shadow-lg rotate-y-180"
                      : "bg-white dark:bg-gray-700 shadow-md hover:shadow-lg hover:-translate-y-1 border-2 border-gray-200 dark:border-gray-600"
                  }`}
                  style={{ minHeight: '80px', minWidth: '80px' }}
                >
                  <div className="flex items-center justify-center h-full p-2">
                    {card.isFlipped || card.isMatched ? (
                      <div className="text-center">
                        <p className="font-mono text-lg md:text-xl font-bold">
                          {card.word.word}
                        </p>
                        {card.isMatched && (
                          <CheckCircle className="w-6 h-6 mx-auto mt-2 text-white/80" />
                        )}
                      </div>
                    ) : (
                      <span className="text-4xl opacity-50">?</span>
                    )}
                  </div>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {/* Progress */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            {cards.filter(c => c.isMatched).length / 2} / {getPairsForLevel(selectedLevel!)} parejas encontradas
          </p>
        </div>
      </div>
    </div>
  );
}
