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

export interface Profile {
  id: string;
  name: string;
  username: string;
  avatar_url?: string;
  updated_at?: string;
  role?: UserRole;
}

export interface ProfileWithRole extends Profile {
  role: UserRole;
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

// Tipos para el sistema de cursos
export type UserRole = "admin" | "profesor" | "estudiante";

export interface Course {
  id: string;
  title: string;
  description: string;
  level: GameLevel;
  order_num: number;
  is_active: boolean;
  progress?: number; // 0-100
}

export interface Module {
  id: string;
  course_id: string;
  title: string;
  description: string;
  order_num: number;
  is_active: boolean;
  progress?: number;
  lessons_count?: number;
  completed_lessons?: number;
}

export interface Lesson {
  id: string;
  module_id: string;
  title: string;
  content: string;
  order_num: number;
  lesson_type: "theory" | "exercise" | "quiz";
  exercises?: Exercise[];
}

export interface Exercise {
  id: string;
  lesson_id: string;
  question: string;
  correct_answer: string;
  options: string[];
  exercise_type: "multiple_choice" | "fill_blank" | "matching" | "ordering" | "speaking";
  points: number;
}

export interface QuizResult {
  id: string;
  module_id: string;
  score: number;
  total_questions: number;
  passed: boolean;
  attempts: number;
  completed_at: string;
}

export interface AIGame {
  id: string;
  title: string;
  topic: string;
  level: GameLevel;
  game_type: string;
  content: any;
}

// Progreso del usuario en cursos
export interface CourseProgress {
  course_id: string;
  completed_modules: number;
  total_modules: number;
  percentage: number;
  started_at?: string;
  completed_at?: string;
}

// Estado global del curso
export interface CourseState {
  courses: Course[];
  modules: Module[];
  currentLesson: Lesson | null;
  quizResults: QuizResult[];
  loading: boolean;
  error: string | null;
}
