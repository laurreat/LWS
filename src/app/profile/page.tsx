"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Save,
  Trophy,
  Star,
  Zap,
  AlertTriangle,
  Lock,
  Eye,
  EyeOff,
  Shield,
  GraduationCap,
  BookOpen,
  CheckCircle,
  XCircle,
  Gamepad2,
  TrendingUp,
  Calendar,
  Award,
  ChevronRight,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { Card, Button, Modal, LevelBadge } from "@/components/ui";
import { useAuth } from "@/contexts/AuthContext";
import type { UserRole, GameLevel } from "@/types";

interface LevelAccess {
  level: GameLevel;
  name: string;
  isUnlocked: boolean;
  progress: number;
  color: string;
}

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
  const [activeTab, setActiveTab] = useState<"profile" | "progress" | "security">("profile");

  const role = (profile?.role as UserRole) || "estudiante";

  const getRoleConfig = (userRole: UserRole) => {
    switch (userRole) {
      case "admin":
        return { label: "Administrador", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400", icon: Shield };
      case "profesor":
        return { label: "Profesor", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400", icon: GraduationCap };
      default:
        return { label: "Estudiante", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400", icon: BookOpen };
    }
  };

  const roleConfig = getRoleConfig(role);
  const RoleIcon = roleConfig.icon;

  // Calculate level access
  const levelAccess = useMemo((): LevelAccess[] => {
    const lp = progress?.level_progress || { A1: { completed: 0, total: 1 }, A2: { completed: 0, total: 1 }, B1: { completed: 0, total: 1 } };

    const a1Progress = lp.A1.total > 0 ? (lp.A1.completed / lp.A1.total) * 100 : 0;
    const a2Progress = lp.A2.total > 0 ? (lp.A2.completed / lp.A2.total) * 100 : 0;

    return [
      {
        level: "A1",
        name: "Beginner",
        isUnlocked: true,
        progress: Math.round(a1Progress),
        color: "from-green-400 to-emerald-500",
      },
      {
        level: "A2",
        name: "Elementary",
        isUnlocked: a1Progress >= 50,
        progress: Math.round(a2Progress),
        color: "from-blue-400 to-cyan-500",
      },
      {
        level: "B1",
        name: "Intermediate",
        isUnlocked: a2Progress >= 50,
        progress: lp.B1.total > 0 ? Math.round((lp.B1.completed / lp.B1.total) * 100) : 0,
        color: "from-purple-400 to-violet-500",
      },
    ];
  }, [progress?.level_progress]);

  const totalPoints = progress?.total_points ?? 0;
  const streak = progress?.streak ?? 0;
  const gamesPlayed = progress?.games_played ?? 0;
  const achievements = progress?.achievements ?? [];

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

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="text-center max-w-md">
            <User className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h1 className="text-3xl font-bold mb-4">Mi Perfil</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Inicia sesión para ver tu perfil.
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
      <div className="max-w-4xl mx-auto py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
        >
          Mi Perfil
        </motion.h1>

        {/* User Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="mb-6 overflow-hidden">
            <div className="bg-gradient-to-r from-primary/10 to-purple-600/10 p-6 -m-6 mb-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg">
                  <User className="w-12 h-12 text-primary" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-bold">{profile?.username || "Usuario"}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">{user.email}</p>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${roleConfig.color}`}>
                    <RoleIcon className="w-4 h-4" />
                    {roleConfig.label}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">{totalPoints}</p>
                    <p className="text-xs text-gray-500">Puntos</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-orange-500">{streak}</p>
                    <p className="text-xs text-gray-500">Racha</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-500">{gamesPlayed}</p>
                    <p className="text-xs text-gray-500">Juegos</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              {[
                { id: "profile", label: "Perfil", icon: User },
                { id: "progress", label: "Progreso", icon: TrendingUp },
                { id: "security", label: "Seguridad", icon: Settings },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as typeof activeTab)}
                  className={`flex items-center gap-2 flex-1 justify-center px-4 py-2 rounded-md text-sm font-medium transition-all ${
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
          </Card>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Información Personal
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                      <User className="w-4 h-4" /> Nombre completo
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 transition-all"
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                      <Trophy className="w-4 h-4" /> Nombre de usuario
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 transition-all"
                      placeholder="Nombre de usuario"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                      <Mail className="w-4 h-4" /> Correo electrónico
                    </label>
                    <input
                      type="email"
                      value={user.email || ""}
                      disabled
                      className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:border-gray-700 opacity-60"
                    />
                  </div>

                  <Button onClick={handleSaveProfile} disabled={saving} className="w-full">
                    {saving ? "Guardando..." : saved ? "✓ Guardado" : "Guardar cambios"}
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === "progress" && (
            <motion.div
              key="progress"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Star, value: totalPoints, label: "Puntos totales", gradient: "from-yellow-400 to-amber-500" },
                  { icon: Zap, value: streak, label: "Días seguidos", gradient: "from-orange-400 to-red-500" },
                  { icon: Gamepad2, value: gamesPlayed, label: "Juegos jugados", gradient: "from-blue-400 to-cyan-500" },
                  { icon: Award, value: achievements.length, label: "Logros", gradient: "from-purple-400 to-pink-500" },
                ].map(({ icon: Icon, value, label, gradient }, index) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`text-center bg-gradient-to-br ${gradient} text-white border-0`}>
                      <Icon className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-3xl font-bold">{value}</p>
                      <p className="text-sm opacity-90">{label}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Level Access */}
              <Card>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Acceso a Niveles
                </h3>
                <div className="space-y-4">
                  {levelAccess.map((level, index) => {
                    const Icon = level.isUnlocked ? CheckCircle : XCircle;
                    return (
                      <motion.div
                        key={level.level}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          level.isUnlocked
                            ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
                            : "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${
                              level.isUnlocked ? "bg-green-100 dark:bg-green-900/30" : "bg-gray-100 dark:bg-gray-700"
                            }`}>
                              <Icon className={`w-5 h-5 ${level.isUnlocked ? "text-green-600" : "text-gray-400"}`} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <LevelBadge level={level.level} />
                                <span className="font-medium">{level.name}</span>
                              </div>
                              <p className="text-sm text-gray-500">
                                {level.isUnlocked ? "Desbloqueado" : "Bloqueado"}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold">{level.progress}%</p>
                            <p className="text-xs text-gray-500">completado</p>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${level.progress}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`h-full rounded-full bg-gradient-to-r ${level.color}`}
                          />
                        </div>
                        {!level.isUnlocked && (
                          <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                            <Lock className="w-3 h-3" />
                            {level.level === "A2"
                              ? "Completa el 50% de A1 para desbloquear"
                              : "Completa el 50% de A2 para desbloquear"}
                          </p>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </Card>

              {/* Quick Links */}
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/progress">
                  <Card className="hover:shadow-lg transition-all cursor-pointer group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                          <Trophy className="w-6 h-6 text-amber-600" />
                        </div>
                        <div>
                          <h4 className="font-bold">Ver todos los logros</h4>
                          <p className="text-sm text-gray-500">{achievements.length} desbloqueados</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </Link>
                <Link href="/courses">
                  <Card className="hover:shadow-lg transition-all cursor-pointer group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                          <BookOpen className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-bold">Ir a cursos</h4>
                          <p className="text-sm text-gray-500">Continúa aprendiendo</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </Link>
              </div>
            </motion.div>
          )}

          {activeTab === "security" && (
            <motion.div
              key="security"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <Card>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary" />
                  Cambiar Contraseña
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Contraseña actual</label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full p-3 pr-10 border rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 transition-all"
                        placeholder="Contraseña actual"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Nueva contraseña</label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full p-3 pr-10 border rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 transition-all"
                        placeholder="Nueva contraseña"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Confirmar contraseña</label>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 transition-all"
                      placeholder="Confirmar contraseña"
                    />
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleChangePassword}
                    disabled={changingPassword || !currentPassword || !newPassword || !confirmPassword}
                    className="w-full"
                  >
                    {changingPassword ? "Cambiando..." : "Cambiar contraseña"}
                  </Button>
                </div>
              </Card>

              <Card className="border-red-200 dark:border-red-800">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-red-600">
                  <AlertTriangle className="w-5 h-5" />
                  Zona de Peligro
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Eliminar tu cuenta es una acción permanente. Se borrarán todos tus datos, progreso y logros.
                </p>
                <Button
                  variant="error"
                  className="w-full"
                  onClick={() => setShowDeleteModal(true)}
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Eliminar mi cuenta
                </Button>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

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