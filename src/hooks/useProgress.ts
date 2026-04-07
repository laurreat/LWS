"use client";

import { useCallback } from "react";
import { useProgressStore } from "@/lib/store";
import { ACHIEVEMENTS } from "@/lib/achievements";

export function useProgress() {
  const store = useProgressStore();

  const checkAchievements = useCallback(() => {
    ACHIEVEMENTS.forEach((achievement) => {
      if (!store.achievements.includes(achievement.id) && achievement.condition(store)) {
        store.unlockAchievement(achievement.id);
      }
    });
  }, [store]);

  const updateStreak = useCallback(() => {
    const today = new Date().toDateString();
    const lastPlayed = store.lastPlayed;

    if (lastPlayed) {
      const lastDate = new Date(lastPlayed);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (lastDate.toDateString() === yesterday.toDateString()) {
        store.incrementStreak();
      } else if (lastDate.toDateString() !== today) {
        store.resetStreak();
      }
    }

    store.lastPlayed = today;
  }, [store]);

  const playGame = useCallback((gameId: string, score: number, pointsEarned: number) => {
    store.updateGameStats(gameId as any, score);
    store.addPoints(pointsEarned);
    store.incrementGamesPlayed();
    updateStreak();
    checkAchievements();
  }, [store, updateStreak, checkAchievements]);

  return {
    progress: store,
    playGame,
    checkAchievements,
  };
}
