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
          totalPoints: state.totalPoints + points,
        })),

      incrementStreak: () =>
        set((state) => ({
          streak: state.streak + 1,
        })),

      resetStreak: () =>
        set({ streak: 0 }),

      incrementGamesPlayed: () =>
        set((state) => ({
          gamesPlayed: state.gamesPlayed + 1,
        })),

      updateGameStats: (gameId: GameId, score: number) =>
        set((state) => {
          const currentStats = state.gameStats[gameId] || { timesPlayed: 0, bestScore: 0 };
          return {
            gameStats: {
              ...state.gameStats,
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
            totalPoints: state.totalPoints + 50,
          };
        }),

      updateLevelProgress: (level: GameLevel, completed: number, points: number) =>
        set((state) => ({
          levelProgress: {
            ...state.levelProgress,
            [level]: {
              ...state.levelProgress[level],
              completed: Math.max(state.levelProgress[level].completed, completed),
              points: state.levelProgress[level].points + points,
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
