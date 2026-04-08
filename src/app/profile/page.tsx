"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Mail, Save, Trophy, Star, Zap, AlertTriangle, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { Card, Button, Modal } from "@/components/ui";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfilePage() {
  const { user, profile, progress, updateProfile, requestAccountDeletion, changePassword } = useAuth();
  const router = useRouter();
  const [name, setName] = useState(profile?.name || "");
  const [username, setUsername] = useState(profile?.username || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

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

  const handleDeleteAccount = async () => {
    setDeleting(true);
    const { error } = await requestAccountDeletion();
    if (!error) {
      router.push("/");
    } else {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    if (newPassword.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setChangingPassword(true);
    const { error } = await changePassword(currentPassword, newPassword);
    setChangingPassword(false);

    if (error) {
      alert(error.message);
    } else {
      alert("Contraseña cambiada exitosamente");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
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

            <div className="pt-4 border-t dark:border-gray-700">
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4" /> Cambiar contraseña
              </label>
              <div className="space-y-3">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                  placeholder="Contraseña actual"
                />
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                  placeholder="Nueva contraseña"
                />
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                  placeholder="Confirmar contraseña"
                />
                <Button
                  variant="outline"
                  onClick={handleChangePassword}
                  disabled={changingPassword || !currentPassword || !newPassword || !confirmPassword}
                  className="w-full"
                >
                  {changingPassword ? "Cambiando..." : "Cambiar contraseña"}
                </Button>
              </div>
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

        <div className="mt-8">
          <Button
            variant="error"
            className="w-full"
            onClick={() => setShowDeleteModal(true)}
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            Eliminar mi cuenta
          </Button>
        </div>

        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title="¿Eliminar cuenta?"
        >
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Esta acción eliminará permanentemente tu cuenta, incluyendo:
          </p>
          <ul className="list-disc list-inside mb-6 text-gray-600 dark:text-gray-300 space-y-1">
            <li>Tu perfil y datos</li>
            <li>Todos tus puntos y logros</li>
            <li>Tu historial de juegos</li>
          </ul>
          <p className="text-red-500 font-medium mb-6">
            Esta acción no se puede deshacer.
          </p>
          <div className="flex gap-4">
            <Button variant="outline" className="flex-1" onClick={() => setShowDeleteModal(false)}>
              Cancelar
            </Button>
            <Button variant="error" className="flex-1" onClick={handleDeleteAccount} disabled={deleting}>
              {deleting ? "Eliminando..." : "Sí, eliminar"}
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
}