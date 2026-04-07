"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { useProgressStore } from "@/lib/store";
import { ACHIEVEMENTS } from "@/lib/achievements";

export function AchievementToast() {
  const [showToast, setShowToast] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState<typeof ACHIEVEMENTS[0] | null>(null);
  const achievements = useProgressStore((s) => s.achievements);
  const [previousLength, setPreviousLength] = useState(achievements.length);

  useEffect(() => {
    if (achievements.length > previousLength) {
      const newAchievementId = achievements[achievements.length - 1];
      const achievement = ACHIEVEMENTS.find((a) => a.id === newAchievementId);
      if (achievement) {
        setCurrentAchievement(achievement);
        setShowToast(true);
        
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });

        setTimeout(() => {
          setShowToast(false);
        }, 5000);
      }
    }
    setPreviousLength(achievements.length);
  }, [achievements, previousLength]);

  return (
    <AnimatePresence>
      {showToast && currentAchievement && (
        <motion.div
          initial={{ opacity: 0, y: 100, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 100, x: "-50%" }}
          className="fixed bottom-6 left-1/2 z-50"
        >
          <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4">
            <span className="text-4xl">{currentAchievement.icon}</span>
            <div>
              <p className="font-bold text-sm">¡Nuevo Logro Desbloqueado!</p>
              <p className="text-lg font-bold">{currentAchievement.name}</p>
              <p className="text-sm opacity-80">+{currentAchievement.points} puntos</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
