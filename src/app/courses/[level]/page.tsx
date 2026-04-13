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
  const { modules, currentLesson, loading, error, fetchLesson, completeLesson } = useCourses();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  const moduleId = params.moduleId as string;
  const level = params.level as string;

  useEffect(() => {
    if (moduleId) {
      // Fetch module details - in real app would fetch from course
      fetchAllLessons();
    }
  }, [moduleId]);

  const fetchAllLessons = async () => {
    // This would fetch lessons from Supabase
    // For now using mock data
  };

  const handleStartLesson = (lesson: Lesson) => {
    router.push(`/courses/${level}/${moduleId}/lesson/${lesson.id}`);
  };

  const handleContinue = () => {
    const nextLesson = lessons[currentLessonIndex + 1];
    if (nextLesson) {
      setCurrentLessonIndex(currentLessonIndex + 1);
      handleStartLesson(nextLesson);
    } else {
      // Last lesson - take quiz
      router.push(`/courses/${level}/${moduleId}/quiz`);
    }
  };

  const handleMarkComplete = async () => {
    if (currentLesson) {
      await completeLesson(currentLesson.id);
      handleContinue();
    }
  };

  // Mock data for demonstration
  const mockLessons: Lesson[] = [
    {
      id: "1",
      module_id: moduleId,
      title: "Introducción al tema",
      content: `
        <h2>Bienvenido a este módulo</h2>
        <p>En esta lección aprenderás los conceptos fundamentales...</p>
        <h3>Puntos clave:</h3>
        <ul>
          <li>Concepto 1: Descripción del primer punto</li>
          <li>Concepto 2: Descripción del segundo punto</li>
          <li>Concepto 3: Descripción del tercer punto</li>
        </ul>
      `,
      order_num: 1,
      lesson_type: "theory",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
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
            Volver a módulos
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Lección {currentLessonIndex + 1} de {lessons.length}
          </h1>
        </motion.div>

        {/* Lesson Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-8">
            {/* Title */}
            <div className="flex items-center gap-3 mb-6">
              {currentLesson?.lesson_type === "theory" ? (
                <BookOpen className="w-6 h-6 text-primary" />
              ) : currentLesson?.lesson_type === "exercise" ? (
                <FileText className="w-6 h-6 text-blue-500" />
              ) : (
                <HelpCircle className="w-6 h-6 text-purple-500" />
              )}
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  currentLesson?.lesson_type === "theory"
                    ? "bg-primary/10 text-primary"
                    : currentLesson?.lesson_type === "exercise"
                    ? "bg-blue-500/10 text-blue-500"
                    : "bg-purple-500/10 text-purple-500"
                }`}
              >
                {currentLesson?.lesson_type === "theory"
                  ? "Teoría"
                  : currentLesson?.lesson_type === "exercise"
                  ? "Ejercicio"
                  : "Quiz"}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {currentLesson?.title || "Lección"}
            </h2>

            {/* Content */}
            <div
              className="prose dark:prose-invert max-w-none mb-8"
              dangerouslySetInnerHTML={{
                __html: currentLesson?.content || mockLessons[0]?.content || "",
              }}
            />

            {/* Navigation */}
            <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="ghost"
                onClick={() => setCurrentLessonIndex(Math.max(0, currentLessonIndex - 1))}
                disabled={currentLessonIndex === 0}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Anterior
              </Button>

              <Button variant="primary" onClick={handleMarkComplete}>
                {currentLessonIndex === lessons.length - 1 ? (
                  <>
                    <Trophy className="w-4 h-4 mr-2" />
                    Tomar Quiz Final
                  </>
                ) : (
                  <>
                    Siguiente
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}