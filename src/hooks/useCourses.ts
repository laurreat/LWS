"use client";

import { createClient } from "@/lib/supabase";
import type { Course, Module, Lesson, QuizResult, CourseProgress, UserRole } from "@/types";
import { useState, useCallback, useEffect } from "react";

export function useCourses() {
  const supabase = createClient();
  const [courses, setCourses] = useState<Course[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("is_active", true)
        .order("order_num");

      if (error) throw error;
      setCourses(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error fetching courses");
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  const fetchModules = useCallback(async (courseId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("modules")
        .select("*, lessons(lessons:count())")
        .eq("course_id", courseId)
        .eq("is_active", true)
        .order("order_num");

      if (error) throw error;
      setModules(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error fetching modules");
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  const fetchLesson = useCallback(async (lessonId: string) => {
    setLoading(true);
    try {
      // Fetch lesson with exercises
      const { data: lesson, error: lessonError } = await supabase
        .from("lessons")
        .select("*, exercises(*)")
        .eq("id", lessonId)
        .single();

      if (lessonError) throw lessonError;
      setCurrentLesson(lesson);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error fetching lesson");
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  const completeLesson = useCallback(async (lessonId: string, score?: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("user_progress")
        .upsert({
          user_id: user.id,
          lesson_id: lessonId,
          completed: true,
          score: score || 0,
          completed_at: new Date().toISOString(),
        }, { onConflict: "user_id,lesson_id" });

      if (error) throw error;
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error completing lesson");
      return false;
    }
  }, [supabase]);

  const submitQuiz = useCallback(async (moduleId: string, answers: { exerciseId: string; answer: string }[]) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Calculate score
      let correct = 0;
      for (const answer of answers) {
        const { data: exercise } = await supabase
          .from("exercises")
          .select("correct_answer")
          .eq("id", answer.exerciseId)
          .single();
        
        if (exercise && exercise.correct_answer === answer.answer) {
          correct++;
        }
      }

      const score = Math.round((correct / answers.length) * 100);
      const passed = score >= 70; // 70% to pass

      // Save result
      const { error } = await supabase
        .from("quiz_results")
        .insert({
          user_id: user.id,
          module_id: moduleId,
          score,
          total_questions: answers.length,
          passed,
        });

      if (error) throw error;

      return { score, passed, correct, total: answers.length };
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error submitting quiz");
      return null;
    }
  }, [supabase]);

  const getCourseProgress = useCallback(async (courseId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      // Get total modules in course
      const { data: totalModules } = await supabase
        .from("modules")
        .select("id", { count: "exact" })
        .eq("course_id", courseId);

      // Get completed lessons
      const { data: completedLessons } = await supabase
        .from("user_progress")
        .select("lesson_id, modules!inner(id)")
        .eq("user_id", user.id)
        .eq("modules.course_id", courseId)
        .eq("completed", true);

      const total = totalModules?.length || 0;
      const completed = completedLessons?.length || 0;
      const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

      return { completed, total, percentage, course_id: courseId } as unknown as CourseProgress;
    } catch (err) {
      return null;
    }
  }, [supabase]);

  const getUserRole = useCallback(async (): Promise<UserRole> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return "estudiante";

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      return (profile?.role as UserRole) || "estudiante";
    } catch {
      return "estudiante";
    }
  }, [supabase]);

  const isProfessor = useCallback(async () => {
    const role = await getUserRole();
    return role === "profesor" || role === "admin";
  }, [getUserRole]);

  const isAdmin = useCallback(async () => {
    const role = await getUserRole();
    return role === "admin";
  }, [getUserRole]);

  return {
    courses,
    modules,
    currentLesson,
    loading,
    error,
    fetchCourses,
    fetchModules,
    fetchLesson,
    completeLesson,
    submitQuiz,
    getCourseProgress,
    getUserRole,
    isProfessor,
    isAdmin,
  };
}