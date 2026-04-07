"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Star, Zap, Target, Trash2, Award } from "lucide-react";
import { Card, Button, Modal, LevelBadge } from "@/components/ui";
import { useProgressStore } from "@/lib/store";
import { ACHIEVEMENTS } from "@/lib/achievements";

export default function ProgressPage() {
  const { totalPoints, streak, gamesPlayed, achievements, levelProgress, resetProgress } = useProgressStore();
  const [showResetModal, setShowResetModal] = useState(false);

  const handleReset = () => {
    resetProgress();
    setShowResetModal(false);
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">📊 Tu Progreso</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center bg-gradient-to-br from-yellow-400 to-amber-500 text-white border-0">
            <Star className="w-8 h-8 mx-auto mb-2" />
            <p className="text-3xl font-bold">{totalPoints}</p>
            <p className="text-sm opacity-80">Puntos totales</p>
          </Card>
          <Card className="text-center bg-gradient-to-br from-orange-400 to-red-500 text-white border-0">
            <Zap className="w-8 h-8 mx-auto mb-2" />
            <p className="text-3xl font-bold">{streak}</p>
            <p className="text-sm opacity-80">Días seguidos</p>
          </Card>
          <Card className="text-center bg-gradient-to-br from-blue-400 to-cyan-500 text-white border-0">
            <Target className="w-8 h-8 mx-auto mb-2" />
            <p className="text-3xl font-bold">{gamesPlayed}</p>
            <p className="text-sm opacity-80">Juegos jugados</p>
          </Card>
          <Card className="text-center bg-gradient-to-br from-purple-400 to-pink-500 text-white border-0">
            <Award className="w-8 h-8 mx-auto mb-2" />
            <p className="text-3xl font-bold">{achievements.length}</p>
            <p className="text-sm opacity-80">Logros</p>
          </Card>
        </div>

        <h2 className="text-2xl font-bold mb-4">🏆 Nivel de Vocabulario</h2>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {(["A1", "A2", "B1"] as const).map((level) => {
            const progress = levelProgress[level];
            const percentage = Math.round((progress.completed / progress.total) * 100);
            return (
              <Card key={level}>
                <div className="flex items-center justify-between mb-2">
                  <LevelBadge level={level} />
                  <span className="text-sm text-gray-500">{progress.completed}/{progress.total}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    className={`h-3 rounded-full ${
                      level === "A1" ? "bg-green-500" : level === "A2" ? "bg-blue-500" : "bg-purple-500"
                    }`}
                  />
                </div>
                <p className="text-sm text-gray-500">{percentage}% completado</p>
                <p className="text-sm font-medium">{progress.points} puntos ganados</p>
              </Card>
            );
          })}
        </div>

        <h2 className="text-2xl font-bold mb-4">🎖️ Logros Desbloqueados</h2>
        {achievements.length === 0 ? (
          <Card className="text-center py-8">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500">¡Completa juegos para desbloquear logros!</p>
          </Card>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {ACHIEVEMENTS.filter((a) => achievements.includes(a.id)).map((achievement) => (
              <motion.div
                key={achievement.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-gradient-to-br from-yellow-100 to-amber-100 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-xl p-4 text-center"
              >
                <span className="text-4xl mb-2 block">{achievement.icon}</span>
                <h3 className="font-bold text-sm">{achievement.name}</h3>
                <p className="text-xs text-gray-500">{achievement.description}</p>
                <p className="text-xs text-amber-600 mt-1">+{achievement.points} pts</p>
              </motion.div>
            ))}
          </div>
        )}

        <h2 className="text-2xl font-bold mb-4">🔓 Logros Disponibles</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {ACHIEVEMENTS.filter((a) => !achievements.includes(a.id)).map((achievement) => (
            <div
              key={achievement.id}
              className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 text-center opacity-50"
            >
              <span className="text-4xl mb-2 block grayscale">{achievement.icon}</span>
              <h3 className="font-bold text-sm">{achievement.name}</h3>
              <p className="text-xs text-gray-500">{achievement.description}</p>
              <p className="text-xs text-gray-400 mt-1">+{achievement.points} pts</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="error" onClick={() => setShowResetModal(true)}>
            <Trash2 className="w-4 h-4 mr-2" />Eliminar Progreso
          </Button>
        </div>

        <Modal
          isOpen={showResetModal}
          onClose={() => setShowResetModal(false)}
          title="¿Eliminar progreso?"
        >
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            Esta acción eliminará todo tu progreso, incluyendo puntos, logros y estadísticas. Esta acción no se puede deshacer.
          </p>
          <div className="flex gap-4">
            <Button variant="outline" className="flex-1" onClick={() => setShowResetModal(false)}>
              Cancelar
            </Button>
            <Button variant="error" className="flex-1" onClick={handleReset}>
              Eliminar
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
