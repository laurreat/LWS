"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle, Play, ChevronRight, 
  GraduationCap, Brain, Clock,
  ArrowLeft, Award, FileText
} from "lucide-react";
import Link from "next/link";
import { useCourses } from "@/hooks/useCourses";
import { Card, Button } from "@/components/ui";
import type { Course, Module } from "@/types";

const levelColors = {
  A1: { bg: "from-green-50 to-emerald-50", border: "border-green-200", accent: "text-green-600", gradient: "from-green-500 to-emerald-500" },
  A2: { bg: "from-blue-50 to-cyan-50", border: "border-blue-200", accent: "text-blue-600", gradient: "from-blue-500 to-cyan-500" },
  B1: { bg: "from-purple-50 to-violet-50", border: "border-purple-200", accent: "text-purple-600", gradient: "from-purple-500 to-violet-500" },
};

const levelInfo = {
  A1: { label: "Principiante", icon: Brain, desc: "Aprende lo fundamental del inglés desde cero", duration: "40 horas", lessons: "12 módulos" },
  A2: { label: "Elemental", icon: GraduationCap, desc: "Construye sobre lo básico y expande tu vocabulario", duration: "60 horas", lessons: "14 módulos" },
  B1: { label: "Intermedio", icon: Award, desc: "Domina estructuras más complejas y comunicación fluida", duration: "80 horas", lessons: "16 módulos" },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

export default function CoursesPage() {
  const { courses, modules, loading, error, fetchCourses, fetchModules, getCourseProgress } = useCourses();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courseProgress, setCourseProgress] = useState<Record<string, number>>({});
  const [animatedProgress, setAnimatedProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  useEffect(() => {
    if (selectedCourse) {
      fetchModules(selectedCourse.id);
    }
  }, [selectedCourse, fetchModules]);

  useEffect(() => {
    courses.forEach(async (course) => {
      const progress = await getCourseProgress(course.id);
      if (progress) {
        setCourseProgress((prev) => ({ ...prev, [course.id]: progress.percentage }));
        // Animate progress
        setAnimatedProgress((prev) => {
          const start = prev[course.id] || 0;
          const end = progress.percentage;
          const duration = 1000;
          const startTime = Date.now();
          
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress_ = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress_, 3);
            const current = start + (end - start) * eased;
            setAnimatedProgress((p) => ({ ...p, [course.id]: current }));
            if (progress_ < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          return prev;
        });
      }
    });
  }, [courses, getCourseProgress]);

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
  };

  const handleBack = () => {
    setSelectedCourse(null);
    setModules([]);
  };

  if (loading && !selectedCourse) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <GraduationCap className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">Ruta de Aprendizaje</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {selectedCourse ? selectedCourse.title : "Elige tu Nivel"}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {selectedCourse 
              ? "Selecciona un módulo para comenzar a aprender" 
              : "Comienza tu viaje para dominar el inglés con nuestra ruta estructurada"}
          </p>
        </motion.div>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 mb-6"
          >
            <p className="text-red-600 dark:text-red-400 text-center">{error}</p>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {!selectedCourse ? (
            /* Level Selection */
            <motion.div
              key="levels"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-3 gap-6"
            >
              {courses.map((course, index) => {
                const colors = levelColors[course.level as keyof typeof levelColors];
                const info = levelInfo[course.level as keyof typeof levelInfo];
                const Icon = info.icon;
                const progress = animatedProgress[course.id] || 0;
                
                return (
                  <motion.div key={course.id} variants={itemVariants}>
                    <Card 
                      className={`h-full cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 ${colors.border} bg-white dark:bg-gray-800`}
                      onClick={() => handleCourseSelect(course)}
                    >
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-2xl font-bold ${colors.accent}`}>{course.level}</span>
                        <span className="text-gray-400">|</span>
                        <span className="text-gray-500 dark:text-gray-400">{info.label}</span>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-6">{info.desc}</p>
                      
                      {/* Stats */}
                      <div className="flex gap-4 mb-6 text-sm">
                        <div className="flex items-center gap-1 text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>{info.duration}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <FileText className="w-4 h-4" />
                          <span>{info.lessons}</span>
                        </div>
                      </div>
                      
                      {/* Progress bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-500">Progreso</span>
                          <span className={`font-bold ${colors.accent}`}>{Math.round(progress)}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${colors.gradient}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1, delay: index * 0.2 }}
                          />
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full" 
                        variant={index === 0 ? "primary" : "outline"}
                      >
                        {index === 0 ? "Comenzar" : progress > 0 ? "Continuar" : "Iniciar"}
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            /* Module Selection */
            <motion.div
              key="modules"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Button 
                variant="ghost" 
                onClick={handleBack} 
                className="mb-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver a niveles
              </Button>

              <div className="grid gap-4">
                {modules.map((module, index) => (
                  <ModuleCard
                    key={module.id}
                    module={module}
                    index={index}
                    courseLevel={selectedCourse.level}
                  />
                ))}
              </div>

              {modules.length === 0 && !loading && (
                <div className="text-center py-16">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">
                    No hay módulos disponibles para este nivel.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ModuleCard({
  module,
  index,
  courseLevel,
}: {
  module: Module;
  index: number;
  courseLevel: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const colors = levelColors[courseLevel as keyof typeof levelColors];
  const isCompleted = (module.completed_lessons || 0) >= (module.lessons_count || 1);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={`/courses/${courseLevel.toLowerCase()}/${module.id}`}>
        <Card 
          className={`transition-all duration-200 hover:shadow-lg cursor-pointer ${
            isHovered ? "border-primary" : ""
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex items-center gap-4">
            {/* Status */}
            <motion.div
              className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                isCompleted
                  ? "bg-green-100 dark:bg-green-900/30"
                  : "bg-gray-100 dark:bg-gray-800"
              }`}
              animate={{ scale: isHovered ? 1.1 : 1 }}
            >
              {isCompleted ? (
                <CheckCircle className="w-7 h-7 text-green-600" />
              ) : (
                <span className="text-lg font-bold text-gray-600 dark:text-gray-400">{index + 1}</span>
              )}
            </motion.div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                {module.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {module.description}
              </p>
            </div>

            {/* Progress */}
            <div className="hidden sm:block w-32">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>{module.completed_lessons || 0}/{module.lessons_count || 0}</span>
                <span>{Math.round(((module.completed_lessons || 0) / (module.lessons_count || 1)) * 100)}%</span>
              </div>
              <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${((module.completed_lessons || 0) / (module.lessons_count || 1)) * 100}%` }}
                />
              </div>
            </div>

            <Play className={`w-5 h-5 ${colors.accent}`} />
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}