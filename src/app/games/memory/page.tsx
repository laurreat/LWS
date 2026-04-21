"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Home, Trophy, RefreshCw, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button, Card, LevelBadge } from "@/components/ui";
import { useAuth } from "@/contexts/AuthContext";
import { A1_WORDS } from "@/data/vocabulary";
import { GameLevel, Word } from "@/types";

interface MemoryCard {
  id: number;
  word: Word;
  isFlipped: boolean;
  isMatched: boolean;
}

function shuffleCards(words: Word[]): MemoryCard[] {
  const selected = words.slice(0, 6);
  const pairs = [...selected, ...selected].map((word, idx) => ({
    id: idx,
    word,
    isFlipped: false,
    isMatched: false,
  }));
  return pairs.sort(() => Math.random() - 0.5);
}

export default function MemoryPage() {
  const [selectedLevel, setSelectedLevel] = useState<GameLevel | null>(null);
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameState, setGameState] = useState<"select" | "playing" | "finished">("select");
  const { playGame, user } = useAuth();

  const [hasFinishedTriggered, setHasFinishedTriggered] = useState(false);

  const startGame = useCallback((level: GameLevel) => {
    const words = A1_WORDS.filter((w) => true).slice(0, 100);
    setCards(shuffleCards(words));
    setFlippedCards([]);
    setScore(0);
    setMoves(0);
    setSelectedLevel(level);
    setGameState("playing");
    setHasFinishedTriggered(false);
  }, []);

  const handleCardClick = useCallback((cardId: number) => {
    if (flippedCards.length >= 2) return;
    
    const cardIndex = cards.findIndex((c) => c.id === cardId);
    if (cards[cardIndex].isMatched || cards[cardIndex].isFlipped) return;

    const newCards = [...cards];
    newCards[cardIndex] = { ...newCards[cardIndex], isFlipped: true };
    setCards(newCards);
    setFlippedCards([...flippedCards, cardId]);
  }, [cards, flippedCards]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstId, secondId] = flippedCards;
      const firstIndex = cards.findIndex((c) => c.id === firstId);
      const secondIndex = cards.findIndex((c) => c.id === secondId);
      
      const card1 = cards[firstIndex];
      const card2 = cards[secondIndex];
      
      setMoves((m) => m + 1);

      if (card1.word.id === card2.word.id) {
        setCards((prev) => {
          const newCards = [...prev];
          newCards[firstIndex] = { ...newCards[firstIndex], isMatched: true };
          newCards[secondIndex] = { ...newCards[secondIndex], isMatched: true };
          return newCards;
        });
        setScore((s) => s + 20);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setCards((prev) => {
            const newCards = [...prev];
            const idx1 = newCards.findIndex((c) => c.id === firstId);
            const idx2 = newCards.findIndex((c) => c.id === secondId);
            if (idx1 !== -1) newCards[idx1] = { ...newCards[idx1], isFlipped: false };
            if (idx2 !== -1) newCards[idx2] = { ...newCards[idx2], isFlipped: false };
            return newCards;
          });
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    if (cards.length > 0 && cards.every((c) => c.isMatched)) {
      setTimeout(() => {
        setGameState("finished");
      }, 500);
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

  if (gameState === "finished") {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-2xl mx-auto py-8 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-8xl mb-6">🎉</motion.div>
          <h1 className="text-4xl font-bold mb-4">¡Completado!</h1>
          <Card className="mb-8">
            <div className="flex justify-around">
              <div><p className="text-4xl font-bold text-primary">{Math.max(0, 120 - moves * 5)}</p><p className="text-gray-500">Puntos</p></div>
              <div><p className="text-4xl font-bold text-secondary">{moves}</p><p className="text-gray-500">Movimientos</p></div>
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
          <h1 className="text-3xl font-bold text-center mb-8">🧠 Memory Game</h1>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8">Encuentra las parejas de palabras</p>
          <div className="space-y-4">
            {(["A1", "A2", "B1"] as GameLevel[]).map((level) => (
              <Card key={level} hover className="cursor-pointer" onClick={() => startGame(level)}>
                <div className="flex items-center justify-between">
                  <div><LevelBadge level={level} /><p className="text-gray-600 dark:text-gray-300 mt-2">Encuentra las 6 parejas</p></div>
                  <span className="text-4xl">🧠</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <div><LevelBadge level={selectedLevel!} /></div>
          <div className="flex gap-4">
            <div className="text-center"><p className="text-2xl font-bold text-primary">{Math.max(0, 120 - moves * 5)}</p><p className="text-xs text-gray-500">Puntos</p></div>
            <div className="text-center"><p className="text-2xl font-bold text-secondary">{moves}</p><p className="text-xs text-gray-500">Movimientos</p></div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCardClick(card.id)}
              className={`aspect-square cursor-pointer rounded-xl flex items-center justify-center text-xl font-bold transition-all ${
                card.isMatched
                  ? "bg-success text-white"
                  : card.isFlipped
                  ? "bg-primary text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              {card.isFlipped || card.isMatched ? (
                <div className="text-center p-2">
                  <p className="font-mono">{card.word.word}</p>
                  {card.isMatched && <CheckCircle className="w-6 h-6 mx-auto mt-1" />}
                </div>
              ) : (
                <span className="text-4xl">?</span>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button variant="outline" onClick={() => startGame(selectedLevel!)}>
            <RefreshCw className="w-4 h-4 mr-2" />Reiniciar
          </Button>
        </div>
      </div>
    </div>
  );
}
