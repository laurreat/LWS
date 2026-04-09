export type GameLevel = "A1" | "A2" | "B1";

export interface Word {
  id: number;
  word: string;
  translation: string;
  image?: string;
  audio?: string;
}

export interface Phrase {
  id: number;
  sentence: string;
  translation: string;
  audio?: string;
  level: GameLevel;
}

export interface GrammarQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  level: GameLevel;
}

export interface Sentence {
  id: number;
  sentence: string;
  words: string[];
  level: GameLevel;
  audio?: string;
}

export interface LevelProgress {
  completed: number;
  total: number;
  points: number;
}

export interface GameStats {
  timesPlayed: number;
  bestScore: number;
}

export interface UserProgress {
  total_points: number;
  streak: number;
  last_played: string | null;
  games_played: number;
  level_progress: {
    A1: LevelProgress;
    A2: LevelProgress;
    B1: LevelProgress;
  };
  game_stats: Record<string, GameStats>;
  achievements: string[];
  settings: {
    theme: "light" | "dark" | "system";
    soundEnabled: boolean;
    speechRate: number;
  };
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
  condition: (progress: UserProgress) => boolean;
}

export type GameId = "vocabulary" | "phrases" | "grammar" | "sentence" | "listening" | "speaking" | "spelling" | "memory";

export interface Game {
  id: GameId;
  name: string;
  description: string;
  icon: string;
  levels: GameLevel[];
  color: string;
}
