"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserProgress, GameLevel, GameId } from "@/types";
import { defaultProgress } from "./defaultProgress";

interface ProgressStore extends UserProgress {
  addPoints: (points: number) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  incrementGamesPlayed: () => void;
  updateGameStats: (gameId: GameId, score: number) => void;
  unlockAchievement: (achievementId: string) => void;
  updateLevelProgress: (level: GameLevel, completed: number, points: number) => void;
  updateSettings: (settings: Partial<UserProgress["settings"]>) => void;
  resetProgress: () => void;
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      ...defaultProgress,

      addPoints: (points: number) =>
        set((state) => ({
          total_points: state.total_points + points,
        })),

      incrementStreak: () =>
        set((state) => ({
          streak: state.streak + 1,
        })),

      resetStreak: () =>
        set({ streak: 0 }),

      incrementGamesPlayed: () =>
        set((state) => ({
          games_played: state.games_played + 1,
        })),

      updateGameStats: (gameId: GameId, score: number) =>
        set((state) => {
          const currentStats = state.game_stats[gameId] || { timesPlayed: 0, bestScore: 0 };
          return {
            game_stats: {
              ...state.game_stats,
              [gameId]: {
                timesPlayed: currentStats.timesPlayed + 1,
                bestScore: Math.max(currentStats.bestScore, score),
              },
            },
          };
        }),

      unlockAchievement: (achievementId: string) =>
        set((state) => {
          if (state.achievements.includes(achievementId)) return state;
          return {
            achievements: [...state.achievements, achievementId],
            total_points: state.total_points + 50,
          };
        }),

      updateLevelProgress: (level: GameLevel, completed: number, points: number) =>
        set((state) => ({
          level_progress: {
            ...state.level_progress,
            [level]: {
              ...state.level_progress[level],
              completed: Math.max(state.level_progress[level].completed, completed),
              points: state.level_progress[level].points + points,
            },
          },
        })),

      updateSettings: (settings: Partial<UserProgress["settings"]>) =>
        set((state) => ({
          settings: { ...state.settings, ...settings },
        })),

      resetProgress: () => set(defaultProgress),
    }),
    {
      name: "lws-progress",
    }
  )
);
