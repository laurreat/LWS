"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen, HelpCircle, ArrowRight, ArrowLeft, CheckCircle, Clock, Play, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCourses } from "@/hooks/useCourses";
import { Button, Card } from "@/components/ui";
import { createClient } from "@/lib/supabase";
import type { Module, Lesson } from "@/types";

export default function ModulePage() {
  const params = useParams();
  const router = useRouter();
  const { lessons, loading, fetchLessonsByModule } = useCourses();
  const [module, setModule] = useState<Module | null>(null);
  const supabase = createClient();

  const moduleId = params.moduleId as string;
  const level = params.level as string;

  useEffect(() => {
    if (!moduleId) return;

    // Fetch module info
    supabase
      .from("modules")
      .select("*")
      .eq("id", moduleId)
      .limit(1)
      .then(({ data }) => {
        if (data && data.length > 0) setModule(data[0]);
      });

    // Fetch lessons
    fetchLessonsByModule(moduleId);
  }, [moduleId]);

  const handleStart = () => {
    const firstLesson = lessons.find((l) => l.lesson_type === "theory") || lessons[0];
    if (firstLesson) {
      router.push(`/courses/${level}/${moduleId}/lesson/${firstLesson.id}`);
    }
  };

  const theoryLessons = lessons.filter((l) => l.lesson_type === "theory");
  const quizLessons = lessons.filter((l) => l.lesson_type === "quiz");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/courses"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a cursos
          </Link>

          {/* Badge de nivel */}
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-3 uppercase tracking-wide">
            Nivel {level.toUpperCase()}
          </span>

          {/* Título real del módulo */}
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {module?.title || "Cargando módulo..."}
          </h1>
          {module?.description && (
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {module.description}
            </p>
          )}
        </motion.div>

        {/* Tarjeta de resumen */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-8 mb-6">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Contenido del módulo</p>
                <div className="flex gap-4 mt-1">
                  <span className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <BookOpen className="w-4 h-4 text-primary" />
                    {theoryLessons.length} {theoryLessons.length === 1 ? "lección" : "lecciones"}
                  </span>
                  {quizLessons.length > 0 && (
                    <span className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <HelpCircle className="w-4 h-4 text-accent" />
                      {quizLessons.length} quiz final
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Lista de lecciones */}
            {lessons.length > 0 ? (
              <div className="space-y-3 mb-8">
                {lessons.map((lesson, i) => (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.05 }}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors group"
                    onClick={() =>
                      router.push(`/courses/${level}/${moduleId}/lesson/${lesson.id}`)
                    }
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      lesson.lesson_type === "quiz"
                        ? "bg-accent/10 text-accent"
                        : "bg-primary/10 text-primary"
                    }`}>
                      {lesson.lesson_type === "quiz" ? (
                        <HelpCircle className="w-4 h-4" />
                      ) : (
                        <BookOpen className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors">
                        {lesson.title}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {lesson.lesson_type === "quiz" ? "Quiz final" : "Teoría"}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <Clock className="w-12 h-12 mx-auto mb-3 opacity-40" />
                <p className="font-medium">Contenido en preparación</p>
                <p className="text-sm">Este módulo estará disponible pronto.</p>
              </div>
            )}

            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={handleStart}
              disabled={lessons.length === 0}
            >
              {lessons.length > 0 ? "Comenzar Módulo" : "Sin contenido aún"}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}