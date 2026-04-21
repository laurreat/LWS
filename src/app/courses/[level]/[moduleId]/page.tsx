"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen, FileText, CheckCircle, HelpCircle, ArrowRight, ArrowLeft, Trophy } from "lucide-react";
import Link from "next/link";
import { useCourses } from "@/hooks/useCourses";
import { Button, Card } from "@/components/ui";
import type { Module, Lesson } from "@/types";

export default function ModulePage() {
  const params = useParams();
  const router = useRouter();
  const { lessons, loading, error, fetchLessonsByModule } = useCourses();

  const moduleId = params.moduleId as string;
  const level = params.level as string;

  useEffect(() => {
    if (moduleId) {
      fetchLessonsByModule(moduleId);
    }
  }, [moduleId, fetchLessonsByModule]);

  const handleStart = () => {
    if (lessons.length > 0) {
      router.push(`/courses/${level}/${moduleId}/lesson/${lessons[0].id}`);
    }
  };

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
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a cursos
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Módulo de Aprendizaje
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {lessons.length} {lessons.length === 1 ? 'lección disponible' : 'lecciones disponibles'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-primary" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              ¡Comencemos tu aventura!
            </h2>
            
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              En este módulo profundizarás en tus habilidades de inglés. 
              Completa todas las lecciones y supera el quiz final para avanzar.
            </p>

            <div className="space-y-4">
              <Button 
                variant="primary" 
                size="lg" 
                className="w-full sm:w-auto px-12"
                onClick={handleStart}
                disabled={lessons.length === 0}
              >
                {lessons.length > 0 ? "Comenzar Lección 1" : "No hay lecciones aún"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}