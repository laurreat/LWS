"use client";

import { useCallback } from "react";
import { useProgressStore } from "@/lib/store";
import { ACHIEVEMENTS } from "@/lib/achievements";

export function useProgress() {
  const updateGameStats = useProgressStore((s) => s.updateGameStats);
  const addPoints = useProgressStore((s) => s.addPoints);
  const incrementGamesPlayed = useProgressStore((s) => s.incrementGamesPlayed);
  const achievements = useProgressStore((s) => s.achievements);
  const unlockAchievement = useProgressStore((s) => s.unlockAchievement);
  const lastPlayed = useProgressStore((s) => s.lastPlayed);
  const streak = useProgressStore((s) => s.streak);
  const totalPoints = useProgressStore((s) => s.totalPoints);
  const gamesPlayed = useProgressStore((s) => s.gamesPlayed);
  const settings = useProgressStore((s) => s.settings);
  const levelProgress = useProgressStore((s) => s.levelProgress);
  const resetProgress = useProgressStore((s) => s.resetProgress);
  const incrementStreak = useProgressStore((s) => s.incrementStreak);
  const resetStreak = useProgressStore((s) => s.resetStreak);
  const updateLevelProgress = useProgressStore((s) => s.updateLevelProgress);
  const updateSettings = useProgressStore((s) => s.updateSettings);

  const checkAchievements = useCallback(() => {
    ACHIEVEMENTS.forEach((achievement) => {
      if (!achievements.includes(achievement.id) && achievement.condition({ achievements, streak, totalPoints, gamesPlayed, settings, levelProgress })) {
        unlockAchievement(achievement.id);
      }
    });
  }, [achievements, streak, totalPoints, gamesPlayed, settings, levelProgress, unlockAchievement]);

  const updateStreak = useCallback(() => {
    const today = new Date().toDateString();
    if (lastPlayed) {
      const lastDate = new Date(lastPlayed);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (lastDate.toDateString() === yesterday.toDateString()) {
        incrementStreak();
      } else if (lastDate.toDateString() !== today) {
        resetStreak();
      }
    }
    useProgressStore.setState({ lastPlayed: today });
  }, [lastPlayed, incrementStreak, resetStreak]);

  const playGame = useCallback((gameId: string, score: number, pointsEarned: number) => {
    updateGameStats(gameId as any, score);
    addPoints(pointsEarned);
    incrementGamesPlayed();
    updateStreak();
    checkAchievements();
  }, [updateGameStats, addPoints, incrementGamesPlayed, updateStreak, checkAchievements]);

  return {
    progress: {
      achievements,
      streak,
      totalPoints,
      gamesPlayed,
      settings,
      levelProgress,
      resetProgress,
      updateLevelProgress,
      updateSettings,
    },
    playGame,
    checkAchievements,
  };
}
