"use client";

import { useCallback, useMemo } from "react";
import { useProgressStore } from "@/lib/store";
import { ACHIEVEMENTS } from "@/lib/achievements";
import { GameId } from "@/types";

export function useProgress() {
  const store = useProgressStore(
    useMemo(() => (state) => ({
      achievements: state.achievements,
      streak: state.streak,
      totalPoints: state.total_points,
      gamesPlayed: state.games_played,
      settings: state.settings,
      levelProgress: state.level_progress,
      lastPlayed: state.last_played,
      gameStats: state.game_stats,
    }), [])
  );

  const checkAchievements = useCallback(() => {
    const state = useProgressStore.getState();
    ACHIEVEMENTS.forEach((achievement) => {
      if (!state.achievements.includes(achievement.id) && achievement.condition(state)) {
        useProgressStore.getState().unlockAchievement(achievement.id);
      }
    });
  }, []);

  const updateStreak = useCallback(() => {
    const today = new Date().toDateString();
    if (store.lastPlayed) {
      const lastDate = new Date(store.lastPlayed);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (lastDate.toDateString() === yesterday.toDateString()) {
        useProgressStore.getState().incrementStreak();
      } else if (lastDate.toDateString() !== today) {
        useProgressStore.getState().resetStreak();
      }
    }
    useProgressStore.setState({ last_played: today });
  }, [store.lastPlayed]);

  const playGame = useCallback((gameId: string, score: number, pointsEarned: number, level?: string) => {
    const state = useProgressStore.getState();
    state.updateGameStats(gameId as GameId, score);
    state.addPoints(pointsEarned);
    state.incrementGamesPlayed();
    if (level) {
      const correctAnswers = Math.round(score / 10);
      state.updateLevelProgress(level as "A1" | "A2" | "B1", correctAnswers, pointsEarned);
    }
    updateStreak();
    checkAchievements();
  }, [updateStreak, checkAchievements]);

  return {
    progress: store,
    playGame,
    checkAchievements,
  };
}
