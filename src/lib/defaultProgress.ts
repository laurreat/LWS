import type { UserProgress } from "@/types";

export const defaultProgress: UserProgress = {
  totalPoints: 0,
  streak: 0,
  lastPlayed: "",
  gamesPlayed: 0,
  levelProgress: {
    A1: { completed: 0, total: 100, points: 0 },
    A2: { completed: 0, total: 100, points: 0 },
    B1: { completed: 0, total: 100, points: 0 },
  },
  gameStats: {},
  achievements: [],
  settings: {
    theme: "system",
    soundEnabled: true,
    speechRate: 1,
  },
};
