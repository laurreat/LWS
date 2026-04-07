import { UserProgress } from "@/types";

export const ACHIEVEMENTS: Array<{
  id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
  condition: (p: UserProgress) => boolean;
}> = [
  {
    id: "first_steps",
    name: "Primeros Pasos",
    description: "Completa tu primer juego",
    icon: "👣",
    points: 50,
    condition: (p) => p.gamesPlayed >= 1,
  },
  {
    id: "vocab_a1_master",
    name: "Vocabulary A1",
    description: "Domina 50 palabras A1",
    icon: "📚",
    points: 100,
    condition: (p) => (p.levelProgress.A1?.completed || 0) >= 50,
  },
  {
    id: "streak_7",
    name: "Racha de 7 días",
    description: "Juega 7 días seguidos",
    icon: "🔥",
    points: 150,
    condition: (p) => p.streak >= 7,
  },
  {
    id: "streak_30",
    name: "Racha de 30 días",
    description: "Juega 30 días seguidos",
    icon: "⭐",
    points: 500,
    condition: (p) => p.streak >= 30,
  },
  {
    id: "points_500",
    name: "500 Puntos",
    description: "Alcanza 500 puntos totales",
    icon: "🎯",
    points: 50,
    condition: (p) => p.totalPoints >= 500,
  },
  {
    id: "points_1000",
    name: "1000 Puntos",
    description: "Alcanza 1000 puntos totales",
    icon: "🏆",
    points: 100,
    condition: (p) => p.totalPoints >= 1000,
  },
  {
    id: "points_5000",
    name: "5000 Puntos",
    description: "Alcanza 5000 puntos totales",
    icon: "👑",
    points: 500,
    condition: (p) => p.totalPoints >= 5000,
  },
  {
    id: "all_games",
    name: "Explorador",
    description: "Juega todos los juegos",
    icon: "🗺️",
    points: 200,
    condition: (p) => Object.keys(p.gameStats).length >= 8,
  },
  {
    id: "perfect_game",
    name: "Perfección",
    description: "Obtén 100% en un juego",
    icon: "💯",
    points: 150,
    condition: (p) => Object.values(p.gameStats).some((g) => g.bestScore === 100),
  },
  {
    id: "level_a1",
    name: "Nivel A1",
    description: "Completa el nivel A1",
    icon: "🎓",
    points: 300,
    condition: (p) => (p.levelProgress.A1?.completed || 0) >= 100,
  },
  {
    id: "level_a2",
    name: "Nivel A2",
    description: "Completa el nivel A2",
    icon: "📖",
    points: 400,
    condition: (p) => (p.levelProgress.A2?.completed || 0) >= 100,
  },
  {
    id: "level_b1",
    name: "Nivel B1",
    description: "Completa el nivel B1",
    icon: "🏅",
    points: 500,
    condition: (p) => (p.levelProgress.B1?.completed || 0) >= 100,
  },
];
