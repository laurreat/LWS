import type { UserProgress } from "@/types";

export const defaultProgress: UserProgress = {
  total_points: 0,
  streak: 0,
  last_played: "",
  games_played: 0,
  level_progress: {
    A1: { completed: 0, total: 100, points: 0 },
    A2: { completed: 0, total: 100, points: 0 },
    B1: { completed: 0, total: 100, points: 0 },
  },
  game_stats: {},
  achievements: [],
  settings: {
    theme: "system",
    soundEnabled: true,
    speechRate: 1,
  },
};
