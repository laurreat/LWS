"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft, BookOpen, CheckCircle, Lock,
  Play, ChevronRight, Clock, GraduationCap, Award, Brain
} from "lucide-react";
import Link from "next/link";
import { useCourses } from "@/hooks/useCourses";
import { Card, Button } from "@/components/ui";

const levelMeta: Record<string, {
  label: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  accent: string;
  bg: string;
}> = {
  A1: {
    label: "Principiante",
    description: "Aprende lo fundamental del inglés desde cero: saludos, números, artículos y más.",
    icon: Brain,
    gradient: "from-green-500 to-emerald-600",
    accent: "text-green-600 dark:text-green-400",
    bg: "from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30",
  },
  A2: {
    label: "Elemental",
    description: "Construye sobre lo básico: tiempos pasados, comparativos, modales y más.",
    icon: GraduationCap,
    gradient: "from-blue-500 to-cyan-600",
    accent: "text-blue-600 dark:text-blue-400",
    bg: "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30",
  },
  B1: {
    label: "Intermedio",
    description: "Domina estructuras complejas: voz pasiva, condicionales, reported speech y más.",
    icon: Award,
    gradient: "from-purple-500 to-violet-600",
    accent: "text-purple-600 dark:text-purple-400",
    bg: "from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30",
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } },
};

export default function LevelPage() {
  const params  = useParams();
  const router  = useRouter();
  const level   = (params.level as string).toUpperCase();

  const { courses, modules, loading, fetchCourses, fetchModules } = useCourses();

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  useEffect(() => {
    if (courses.length > 0) {
      const course = courses.find(c => c.level?.toUpperCase() === level);
      if (course) fetchModules(course.id);
    }
  }, [courses, level, fetchModules]);

  const meta   = levelMeta[level] ?? levelMeta["A1"];
  const Icon   = meta.icon;
  const course = courses.find(c => c.level?.toUpperCase() === level);

  if (loading && modules.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400 text-sm">Cargando módulos de {level}...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">

      {/* Header hero */}
      <div className={`bg-gradient-to-r ${meta.gradient} py-12 px-4`}>
        <div className="max-w-4xl mx-auto">
          <Link
            href="/courses"
            className="inline-flex items-center text-white/80 hover:text-white mb-6 text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Todos los cursos
          </Link>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                  {level}
                </span>
                <span className="text-white/80 text-sm">{meta.label}</span>
              </div>
              <h1 className="text-3xl font-bold text-white">
                Inglés {meta.label}
              </h1>
            </div>
          </div>

          <p className="text-white/80 mt-3 max-w-2xl text-sm leading-relaxed">
            {meta.description}
          </p>

          <div className="flex items-center gap-6 mt-5">
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <BookOpen className="w-4 h-4" />
              <span>{modules.length} módulos</span>
            </div>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <Clock className="w-4 h-4" />
              <span>{modules.length * 2} lecciones</span>
            </div>
          </div>
        </div>
      </div>

      {/* Module list */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Módulos del curso
        </h2>

        {modules.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p>No hay módulos disponibles aún.</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            {modules.map((module, index) => (
              <motion.div key={module.id} variants={itemVariants}>
                <Link href={`/courses/${level.toLowerCase()}/${module.id}`}>
                  <Card className="group p-5 hover:shadow-md transition-all duration-200 cursor-pointer border border-transparent hover:border-primary/20">
                    <div className="flex items-center gap-4">
                      {/* Order number */}
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 bg-gradient-to-br ${meta.gradient} text-white`}>
                        {(module.order_num ?? index + 1).toString().padStart(2, "0")}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors truncate">
                          {module.title}
                        </h3>
                        {module.description && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                            {module.description}
                          </p>
                        )}
                      </div>

                      {/* Arrow */}
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* CTA */}
        {modules.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <Button
              variant="primary"
              onClick={() => router.push(`/courses/${level.toLowerCase()}/${modules[0].id}`)}
              className="px-8"
            >
              <Play className="w-4 h-4 mr-2" />
              Comenzar desde el primer módulo
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
