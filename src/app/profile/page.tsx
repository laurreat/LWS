"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Save, Trophy, Star, Zap } from "lucide-react";
import Link from "next/link";
import { Card, Button } from "@/components/ui";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfilePage() {
  const { user, profile, progress, updateProfile, updateProgress } = useAuth();
  const [name, setName] = useState(profile?.name || "");
  const [username, setUsername] = useState(profile?.username || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="text-center max-w-md">
          <User className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h1 className="text-2xl font-bold mb-4">Mi Perfil</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Inicia sesión para ver tu perfil.
          </p>
          <Link href="/login">
            <Button>Iniciar Sesión</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const handleSaveProfile = async () => {
    setSaving(true);
    await updateProfile({ name, username });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const totalPoints = progress?.total_points ?? 0;
  const streak = progress?.streak ?? 0;
  const gamesPlayed = progress?.games_played ?? 0;
  const achievements = progress?.achievements ?? [];

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">👤 Mi Perfil</h1>

        <Card className="mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{profile?.username || "Usuario"}</h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                <User className="w-4 h-4" /> Nombre completo
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                <Trophy className="w-4 h-4" /> Nombre de usuario
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                placeholder="Nombre de usuario"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                <Mail className="w-4 h-4" /> Correo electrónico
              </label>
              <input
                type="email"
                value={user.email || ""}
                disabled
                className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:border-gray-700 opacity-60"
              />
            </div>

            <Button
              onClick={handleSaveProfile}
              disabled={saving}
              className="w-full"
            >
              {saving ? "Guardando..." : saved ? "✓ Guardado" : "Guardar cambios"}
            </Button>
          </div>
        </Card>

        <h2 className="text-2xl font-bold mb-4">📊 Estadísticas</h2>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="text-center">
            <Star className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <p className="text-2xl font-bold">{totalPoints}</p>
            <p className="text-sm text-gray-500">Puntos</p>
          </Card>
          <Card className="text-center">
            <Zap className="w-8 h-8 mx-auto mb-2 text-orange-500" />
            <p className="text-2xl font-bold">{streak}</p>
            <p className="text-sm text-gray-500">Días seguidos</p>
          </Card>
          <Card className="text-center">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <p className="text-2xl font-bold">{gamesPlayed}</p>
            <p className="text-sm text-gray-500">Juegos</p>
          </Card>
        </div>

        <Card className="text-center">
          <Trophy className="w-12 h-12 mx-auto mb-2 text-purple-500" />
          <p className="text-lg font-bold">{achievements.length}</p>
          <p className="text-gray-500">Logros desbloqueados</p>
          <Link href="/progress" className="text-primary hover:underline text-sm">
            Ver todos los logros →
          </Link>
        </Card>
      </div>
    </div>
  );
}