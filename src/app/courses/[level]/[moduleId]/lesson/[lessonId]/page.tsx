"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, HelpCircle, ArrowRight, ArrowLeft,
  Trophy, CheckCircle, ChevronRight, Volume2, VolumeX
} from "lucide-react";
import Link from "next/link";
import { useCourses } from "@/hooks/useCourses";
import { Button, Card } from "@/components/ui";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const {
    lessons, currentLesson, loading,
    fetchLessonsByModule, fetchLesson, completeLesson
  } = useCourses();

  const moduleId  = params.moduleId as string;
  const lessonId  = params.lessonId as string;
  const level     = params.level as string;

  useEffect(() => {
    if (moduleId) fetchLessonsByModule(moduleId);
    if (lessonId) fetchLesson(lessonId);
  }, [moduleId, lessonId]);

  const currentIndex = lessons.findIndex(l => l.id === lessonId);
  const isLast       = currentIndex === lessons.length - 1;
  const isQuiz       = currentLesson?.lesson_type === "quiz";
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    // Stop any ongoing speech when component unmounts or changes lesson
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [lessonId]);

  const toggleAudio = () => {
    if (!window.speechSynthesis) return;

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    if (currentLesson?.content) {
      // Very basic markdown stripping for TTS
      const plainText = currentLesson.content.replace(/[#*_~`>]/g, "").replace(/\[.*?\]\(.*?\)/g, "");
      const utterance = new SpeechSynthesisUtterance(plainText);
      
      // Determine language based on level or just use default (es-ES / en-US)
      // Since it's an English learning platform, the content might be mixed.
      // We can set it to a standard or let the browser guess.
      utterance.lang = "es-ES"; 
      
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  const handleNext = async () => {
    if (currentLesson) await completeLesson(currentLesson.id);
    const next = lessons[currentIndex + 1];
    if (next) {
      router.push(`/courses/${level}/${moduleId}/lesson/${next.id}`);
      } else {
        router.push(`/courses/${level}/${moduleId}/exam`);
      }
  };

  const handlePrev = () => {
    const prev = lessons[currentIndex - 1];
    if (prev) router.push(`/courses/${level}/${moduleId}/lesson/${prev.id}`);
  };

  if (loading && !currentLesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400 text-sm">Cargando lección...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Progress bar top */}
      <div className="h-1 bg-gray-200 dark:bg-gray-700 sticky top-0 z-10">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-secondary"
          initial={{ width: 0 }}
          animate={{
            width: lessons.length > 0
              ? `${((currentIndex + 1) / lessons.length) * 100}%`
              : "0%"
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      <div className="py-8 px-4">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Link
              href={`/courses/${level.toLowerCase()}/${moduleId}`}
              className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-primary transition-colors mb-4 text-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Volver al módulo
            </Link>

            {/* Step indicator */}
            <div className="flex items-center gap-2 flex-wrap">
              {lessons.map((l, i) => (
                <button
                  key={l.id}
                  onClick={() => router.push(`/courses/${level}/${moduleId}/lesson/${l.id}`)}
                  className={`flex items-center justify-center rounded-full transition-all duration-200 ${
                    i === currentIndex
                      ? "w-8 h-8 bg-primary text-white text-xs font-bold shadow-lg shadow-primary/30"
                      : i < currentIndex
                      ? "w-7 h-7 bg-green-500 text-white"
                      : "w-7 h-7 bg-gray-200 dark:bg-gray-700 text-gray-500 text-xs"
                  }`}
                >
                  {i < currentIndex ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    i + 1
                  )}
                </button>
              ))}
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                {currentIndex + 1} / {lessons.length}
              </span>
            </div>
          </motion.div>

          {/* Main card */}
          <motion.div
            key={lessonId}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden">
              {/* Card header */}
              <div className={`px-8 py-5 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3 ${
                isQuiz
                  ? "bg-amber-50 dark:bg-amber-900/20"
                  : "bg-primary/5 dark:bg-primary/10"
              }`}>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  isQuiz ? "bg-amber-500/20 text-amber-600 dark:text-amber-400" : "bg-primary/20 text-primary"
                }`}>
                  {isQuiz
                    ? <HelpCircle className="w-5 h-5" />
                    : <BookOpen className="w-5 h-5" />
                  }
                </div>
                <div>
                  <span className={`text-xs font-semibold uppercase tracking-widest ${
                    isQuiz ? "text-amber-600 dark:text-amber-400" : "text-primary"
                  }`}>
                    {isQuiz ? "Quiz Final" : "Lección de Teoría"}
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Nivel {level.toUpperCase()} · {currentLesson?.lesson_type === "theory" ? "Inglés" : "Evaluación"}
                  </p>
                </div>
              </div>

              {/* Lesson content */}
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                    {currentLesson?.title || "Cargando..."}
                  </h1>
                  {!isQuiz && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={toggleAudio}
                      className={`flex items-center gap-2 ${isPlayingAudio ? "text-primary border-primary" : ""}`}
                      title={isPlayingAudio ? "Detener lectura" : "Leer en voz alta"}
                    >
                      {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      <span className="hidden sm:inline">{isPlayingAudio ? "Detener" : "Escuchar"}</span>
                    </Button>
                  )}
                </div>

                <div className="prose dark:prose-invert max-w-none
                  prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
                  prose-h1:text-2xl prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3
                  prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2
                  prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed
                  prose-strong:text-primary dark:prose-strong:text-primary-dark
                  prose-a:text-primary dark:prose-a:text-primary-dark
                  prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                  prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:rounded-r-lg prose-blockquote:py-1
                  prose-table:text-sm
                  prose-th:bg-primary/10 prose-th:text-primary dark:prose-th:text-primary-dark
                  prose-tr:border-gray-200 dark:prose-tr:border-gray-700
                ">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {currentLesson?.content || ""}
                  </ReactMarkdown>
                </div>
              </div>

              {/* Navigation footer */}
              <div className="px-8 py-5 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <Button
                  variant="ghost"
                  onClick={handlePrev}
                  disabled={currentIndex <= 0}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Anterior
                </Button>

                <Button
                  variant="primary"
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6"
                >
                  {isLast ? (
                    <>
                      <Trophy className="w-4 h-4" />
                      Ir al Quiz Final
                    </>
                  ) : (
                    <>
                      Siguiente
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </motion.div>

        </div>
      </div>
    </div>
  );
}