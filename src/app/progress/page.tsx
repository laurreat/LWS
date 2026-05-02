"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Star,
  Zap,
  Target,
  Award,
  Lock,
  TrendingUp,
  BarChart3,
  Calendar,
  Flame,
  BookOpen,
  Clock,
  Sparkles,
  ChevronRight,
  Activity,
} from "lucide-react";
import Link from "next/link";
import { Card, Button, LevelBadge } from "@/components/ui";
import { useAuth } from "@/contexts/AuthContext";
import { ACHIEVEMENTS } from "@/lib/achievements";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  value: number | string;
  label: string;
  gradient: string;
  delay?: number;
}

function StatCard({ icon: Icon, value, label, gradient, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <Card className={`text-center bg-gradient-to-br ${gradient} text-white border-0 shadow-lg hover:shadow-xl transition-shadow`}>
        <Icon className="w-8 h-8 mx-auto mb-2" />
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-sm opacity-90">{label}</p>
      </Card>
    </motion.div>
  );
}

interface AchievementCardProps {
  achievement: {
    id: string;
    name: string;
    description: string;
    icon: LucideIcon;
    points: number;
  };
  unlocked: boolean;
  index: number;
}

function AchievementCard({ achievement, unlocked, index }: AchievementCardProps) {
  const IconComponent = achievement.icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className={`rounded-xl p-4 text-center transition-all ${
        unlocked
          ? "bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 shadow-md"
          : "bg-gray-100 dark:bg-gray-800 opacity-50"
      }`}
    >
      <div className={`mb-2 flex justify-center ${unlocked ? "" : "grayscale"}`}>
        <IconComponent size={32} className={unlocked ? "text-amber-600" : "text-gray-400"} />
      </div>
      <h3 className="font-bold text-sm mb-1">{achievement.name}</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400">{achievement.description}</p>
      <p className={`text-xs mt-1 font-medium ${unlocked ? "text-amber-600" : "text-gray-400"}`}>
        +{achievement.points} pts
      </p>
    </motion.div>
  );
}

export default function ProgressPage() {
  const { user, progress, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<"overview" | "achievements" | "reports">("overview");

  const totalPoints = progress?.total_points ?? 0;
  const streak = progress?.streak ?? 0;
  const gamesPlayed = progress?.games_played ?? 0;
  const achievementsList = progress?.achievements ?? [];
  const levelProgress = progress?.level_progress ?? {
    A1: { completed: 0, total: 0, points: 0 },
    A2: { completed: 0, total: 0, points: 0 },
    B1: { completed: 0, total: 0, points: 0 },
  };

  const unlockedAchievements = useMemo(
    () => ACHIEVEMENTS.filter((a) => achievementsList.includes(a.id)),
    [achievementsList]
  );
  const lockedAchievements = useMemo(
    () => ACHIEVEMENTS.filter((a) => !achievementsList.includes(a.id)),
    [achievementsList]
  );

  // Calculate learning stats
  const totalGamesPlayed = gamesPlayed;
  const avgScore = useMemo(() => {
    if (!progress?.game_stats) return 0;
    const scores = Object.values(progress.game_stats).map((g) => g.bestScore);
    return scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  }, [progress?.game_stats]);

  const favoriteGame = useMemo(() => {
    if (!progress?.game_stats) return null;
    const games = Object.entries(progress.game_stats);
    if (games.length === 0) return null;
    const [gameId, stats] = games.reduce((max, curr) =>
      (curr[1].timesPlayed > max[1].timesPlayed) ? curr : max
    );
    return { gameId, ...stats };
  }, [progress?.game_stats]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-12 w-12 border-b-2 border-primary"
        />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="text-center max-w-md">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h1 className="text-3xl font-bold mb-4">Tu Progreso</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Inicia sesión para ver tu progreso y logros.
            </p>
            <Link href="/login">
              <Button size="lg">Iniciar Sesión</Button>
            </Link>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
        >
          📊 Tu Progreso de Aprendizaje
        </motion.h1>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1 flex gap-1">
            {[
              { id: "overview", label: "Resumen", icon: BarChart3 },
              { id: "achievements", label: "Logros", icon: Award },
              { id: "reports", label: "Reportes", icon: TrendingUp },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === id
                    ? "bg-white dark:bg-gray-700 text-primary shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <StatCard icon={Star} value={totalPoints} label="Puntos totales" gradient="from-yellow-400 to-amber-500" delay={0.1} />
                <StatCard icon={Flame} value={streak} label="Días seguidos" gradient="from-orange-400 to-red-500" delay={0.2} />
                <StatCard icon={Target} value={gamesPlayed} label="Juegos jugados" gradient="from-blue-400 to-cyan-500" delay={0.3} />
                <StatCard icon={Award} value={achievementsList.length} label="Logros" gradient="from-purple-400 to-pink-500" delay={0.4} />
              </div>

              {/* Level Progress */}
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-primary" />
                Progreso por Nivel
              </h2>
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {(["A1", "A2", "B1"] as const).map((level, index) => {
                  const lvlProgress = levelProgress[level];
                  const percentage = lvlProgress.total > 0 ? Math.round((lvlProgress.completed / lvlProgress.total) * 100) : 0;
                  const colors = {
                    A1: { bar: "bg-green-500", from: "from-green-400", to: "to-emerald-500" },
                    A2: { bar: "bg-blue-500", from: "from-blue-400", to: "to-cyan-500" },
                    B1: { bar: "bg-purple-500", from: "from-purple-400", to: "to-violet-500" },
                  }[level];

                  return (
                    <motion.div
                      key={level}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                          <LevelBadge level={level} />
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            {lvlProgress.completed}/{lvlProgress.total}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-3 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`h-full rounded-full bg-gradient-to-r ${colors.from} ${colors.to} shadow-sm`}
                          />
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">{percentage}% completado</span>
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            {lvlProgress.points} pts
                          </span>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              {/* Quick Stats */}
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Activity className="w-6 h-6 text-primary" />
                Estadísticas de Aprendizaje
              </h2>
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <Card>
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Target className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Puntuación promedio</p>
                      <p className="text-2xl font-bold">{avgScore}%</p>
                    </div>
                  </div>
                </Card>
                <Card>
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <Clock className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Juegos jugados</p>
                      <p className="text-2xl font-bold">{totalGamesPlayed}</p>
                    </div>
                  </div>
                </Card>
                <Card>
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <Sparkles className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Juego favorito</p>
                      <p className="text-lg font-bold">
                        {favoriteGame ? favoriteGame.gameId : "Ninguno aún"}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          )}

          {activeTab === "achievements" && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <Award className="w-6 h-6 text-amber-500" />
                  Logros Desbloqueados ({unlockedAchievements.length})
                </h2>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                  <div
                    className="bg-gradient-to-r from-amber-400 to-yellow-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(unlockedAchievements.length / ACHIEVEMENTS.length) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-gray-500">
                  {Math.round((unlockedAchievements.length / ACHIEVEMENTS.length) * 100)}% completado
                </p>
              </div>

              {unlockedAchievements.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                  {unlockedAchievements.map((achievement, index) => (
                    <AchievementCard
                      key={achievement.id}
                      achievement={achievement}
                      unlocked={true}
                      index={index}
                    />
                  ))}
                </div>
              )}

              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Lock className="w-6 h-6 text-gray-400" />
                Logros Disponibles ({lockedAchievements.length})
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {lockedAchievements.map((achievement, index) => (
                  <AchievementCard
                    key={achievement.id}
                    achievement={achievement}
                    unlocked={false}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "reports" && (
            <motion.div
              key="reports"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-primary" />
                Reportes de Aprendizaje
              </h2>

              {/* Game Performance Report */}
              <Card className="mb-6">
                <h3 className="text-xl font-bold mb-4">Rendimiento por Juego</h3>
                {progress?.game_stats && Object.keys(progress.game_stats).length > 0 ? (
                  <div className="space-y-4">
                    {Object.entries(progress.game_stats).map(([gameId, stats]) => (
                      <div key={gameId} className="border-b dark:border-gray-700 pb-4 last:border-0">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">{gameId}</h4>
                          <span className="text-sm text-gray-500">
                            {stats.timesPlayed} veces jugado
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-blue-400 to-cyan-500 h-2 rounded-full"
                                style={{ width: `${stats.bestScore}%` }}
                              />
                            </div>
                          </div>
                          <span className="text-sm font-bold">{stats.bestScore}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    No hay datos de juegos aún. ¡Juega para ver tu rendimiento!
                  </p>
                )}
              </Card>

              {/* Learning Summary */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-orange-500" />
                    Resumen Semanal
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Racha actual</span>
                      <span className="font-bold">{streak} días</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Puntos esta semana</span>
                      <span className="font-bold">{totalPoints} pts</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Juegos esta semana</span>
                      <span className="font-bold">{gamesPlayed}</span>
                    </div>
                  </div>
                </Card>

                <Card>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-500" />
                    Análisis de Progreso
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Nivel promedio</span>
                      <span className="font-bold">
                        {(() => {
                          const levels = Object.values(levelProgress);
                          const total = levels.reduce((acc, l) => acc + l.completed, 0);
                          const max = levels.reduce((acc, l) => acc + l.total, 0);
                          return max > 0 ? Math.round((total / max) * 100) : 0;
                        })()}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Logros completados</span>
                      <span className="font-bold">{unlockedAchievements.length}/{ACHIEVEMENTS.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Eficiencia</span>
                      <span className="font-bold">{avgScore}%</span>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
