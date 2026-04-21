import { UserProgress } from "@/types";

export const ACHIEVEMENTS: Array<{
  id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
  condition: (p: UserProgress) => boolean;
}> = [
  // JUEGOS JUGADOS
  {
    id: "first_steps",
    name: "Primeros Pasos",
    description: "Completa tu primer juego",
    icon: "👣",
    points: 50,
    condition: (p) => p.games_played >= 1,
  },
  {
    id: "frequent_player",
    name: "Estudiante Constante",
    description: "Juega 10 veces",
    icon: "🏃",
    points: 100,
    condition: (p) => p.games_played >= 10,
  },
  {
    id: "addict_player",
    name: "Máquina de Aprender",
    description: "Juega 50 veces",
    icon: "🤖",
    points: 300,
    condition: (p) => p.games_played >= 50,
  },
  {
    id: "super_fan",
    name: "Juego Favorito",
    description: "Juega el mismo juego 20 veces",
    icon: "❤️",
    points: 200,
    condition: (p) => Object.values(p.game_stats || {}).some((g) => g.timesPlayed >= 20),
  },

  // RACHAS
  {
    id: "streak_3",
    name: "Racha de 3 días",
    description: "Juega 3 días seguidos",
    icon: "🌱",
    points: 100,
    condition: (p) => p.streak >= 3,
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
    id: "streak_14",
    name: "Racha de 14 días",
    description: "Juega 14 días seguidos",
    icon: "🚀",
    points: 300,
    condition: (p) => p.streak >= 14,
  },
  {
    id: "streak_30",
    name: "Racha de 30 días",
    description: "Juega 30 días seguidos",
    icon: "⭐",
    points: 500,
    condition: (p) => p.streak >= 30,
  },

  // PUNTOS
  {
    id: "points_500",
    name: "500 Puntos",
    description: "Alcanza 500 puntos totales",
    icon: "🎯",
    points: 50,
    condition: (p) => p.total_points >= 500,
  },
  {
    id: "points_1000",
    name: "1000 Puntos",
    description: "Alcanza 1000 puntos totales",
    icon: "🏆",
    points: 100,
    condition: (p) => p.total_points >= 1000,
  },
  {
    id: "points_5000",
    name: "5000 Puntos",
    description: "Alcanza 5000 puntos totales",
    icon: "👑",
    points: 500,
    condition: (p) => p.total_points >= 5000,
  },
  {
    id: "points_10000",
    name: "Leyenda del Inglés",
    description: "Alcanza 10000 puntos totales",
    icon: "💎",
    points: 1000,
    condition: (p) => p.total_points >= 10000,
  },

  // EXPLORACIÓN Y RENDIMIENTO
  {
    id: "all_games",
    name: "Explorador",
    description: "Juega todos los juegos",
    icon: "🗺️",
    points: 200,
    condition: (p) => Object.keys(p.game_stats || {}).length >= 8,
  },
  {
    id: "perfect_game",
    name: "Perfección",
    description: "Obtén 100% en un juego",
    icon: "💯",
    points: 150,
    condition: (p) => Object.values(p.game_stats || {}).some((g) => g.bestScore === 100),
  },
  {
    id: "five_perfect_games",
    name: "Maestro Impecable",
    description: "Obtén 100% en 5 juegos diferentes",
    icon: "🌟",
    points: 400,
    condition: (p) => Object.values(p.game_stats || {}).filter((g) => g.bestScore === 100).length >= 5,
  },

  // NIVELES
  {
    id: "vocab_a1_master",
    name: "Vocabulary A1",
    description: "Completa el 50% de A1",
    icon: "📚",
    points: 100,
    condition: (p) => (p.level_progress?.A1?.completed || 0) >= 50,
  },
  {
    id: "level_a1",
    name: "Nivel A1",
    description: "Completa el nivel A1",
    icon: "🎓",
    points: 300,
    condition: (p) => (p.level_progress?.A1?.completed || 0) >= 100,
  },
  {
    id: "level_a2",
    name: "Nivel A2",
    description: "Completa el nivel A2",
    icon: "📖",
    points: 400,
    condition: (p) => (p.level_progress?.A2?.completed || 0) >= 100,
  },
  {
    id: "level_b1",
    name: "Nivel B1",
    description: "Completa el nivel B1",
    icon: "🏅",
    points: 500,
    condition: (p) => (p.level_progress?.B1?.completed || 0) >= 100,
  },
];
