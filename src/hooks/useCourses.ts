"use client";

import { createClient } from "@/lib/supabase";
import type { Course, Module, Lesson, QuizResult, CourseProgress, UserRole } from "@/types";
import { useState, useCallback, useEffect } from "react";

export function useCourses() {
  const supabase = createClient();
  const [courses, setCourses] = useState<Course[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
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
        .select("*, lessons(count)")
        .eq("course_id", courseId)
        .eq("is_active", true)
        .order("order_num");

      if (error) throw error;
      
      const modulesWithCount = (data || []).map((m: any) => ({
        ...m,
        lessons_count: m.lessons?.[0]?.count || 0
      }));

      setModules(modulesWithCount);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error fetching modules");
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  const fetchLessonsByModule = useCallback(async (moduleId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("lessons")
        .select("*")
        .eq("module_id", moduleId)
        .order("order_num");

      if (error) throw error;
      setLessons(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error fetching lessons");
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  const fetchLesson = useCallback(async (lessonId: string) => {
    setLoading(true);
    try {
      // Fetch lesson with exercises
      const { data: records, error: lessonError } = await supabase
        .from("lessons")
        .select("*, exercises(*)")
        .eq("id", lessonId)
        .limit(1);

      const lesson = records?.[0];

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
      if (!user) return true;

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

      // Calculate score
      let correct = 0;
      for (const answer of answers) {
        const { data: records } = await supabase
          .from("exercises")
          .select("correct_answer")
          .eq("id", answer.exerciseId)
          .limit(1);
        
        const exercise = records?.[0];
        
        if (exercise && exercise.correct_answer === answer.answer) {
          correct++;
        }
      }

      const score = Math.round((correct / answers.length) * 100);
      const passed = score >= 70; // 70% to pass

      // Save result only if authenticated
      if (user) {
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
      }

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

      // Step 1: Get module IDs for this course
      const { data: courseModules, error: modulesError } = await supabase`
        .from("modules")
        .select("id")
        .eq("course_id", courseId);

      if (modulesError) {
        console.error("Error fetching modules for course:", modulesError.message);
        return null;
      }

      if (!courseModules || courseModules.length === 0) {
        return { completed: 0, total: 0, percentage: 0, course_id: courseId } as unknown as CourseProgress;
      }

      const moduleIds = courseModules.map((m: any) => m.id);

      // Step 2: Get total modules count
      const { count: total, error: countError } = await supabase`
        .from("modules")
        .select("*", { count: "exact" })
        .eq("course_id", courseId);

      if (countError) throw countError;

      // Step 3: Get completed lessons for these modules
      const { data: completedLessons, error: progressError } = await supabase`
        .from("course_progress")
        .select("lesson_id")
        .eq("user_id", user.id)
        .in("module_id", moduleIds)
        .eq("completed", true);

      if (progressError) {
        console.error("Error fetching course progress:", progressError.message);
        return null;
      }

      const completed = completedLessons?.length || 0;
      const totalModules = total || 0;
      const percentage = totalModules > 0 ? Math.round((completed / totalModules) * 100) : 0;

      return { completed, total: totalModules, percentage, course_id: courseId } as unknown as CourseProgress;
    } catch (err) {
      console.error("Error in getCourseProgress:", err);
      return null;
    }
  }, [supabase]);

  const getUserRole = useCallback(async (): Promise<UserRole> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return "estudiante";

      const { data: records } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .limit(1);

      const profile = records?.[0];

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
    lessons,
    currentLesson,
    loading,
    error,
    fetchCourses,
    fetchModules,
    fetchLessonsByModule,
    fetchLesson,
    completeLesson,
    submitQuiz,
    getCourseProgress,
    getUserRole,
    isProfessor,
    isAdmin,
  };
}