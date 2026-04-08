"use client";

import { createContext, useContext, useEffect, useState, useCallback, useMemo, type ReactNode } from "react";
import { createClient } from "@/lib/supabase";
import type { User, Session } from "@supabase/supabase-js";
import { ACHIEVEMENTS } from "@/lib/achievements";

interface Profile {
  id: string;
  username: string | null;
  name: string | null;
  created_at: string;
  updated_at: string;
}

interface UserProgress {
  total_points: number;
  streak: number;
  last_played: string | null;
  games_played: number;
  achievements: string[];
  settings: {
    theme: "light" | "dark" | "system";
    soundEnabled: boolean;
    speechRate: number;
  };
  level_progress: {
    A1: { completed: number; total: number; points: number };
    A2: { completed: number; total: number; points: number };
    B1: { completed: number; total: number; points: number };
  };
  game_stats: Record<string, { timesPlayed: number; bestScore: number }>;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  progress: UserProgress | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, name: string, username: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  updateProgress: (updates: Partial<UserProgress>) => Promise<void>;
  playGame: (gameId: string, score: number, pointsEarned: number) => Promise<boolean>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
        fetchProgress(session.user.id);
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
        fetchProgress(session.user.id);
      } else {
        setProfile(null);
        setProgress(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchProfile(userId: string) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (!error && data) {
      setProfile(data);
    }
  }

  async function fetchProgress(userId: string) {
    const { data, error } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (!error && data) {
      setProgress({
        total_points: data.total_points,
        streak: data.streak,
        last_played: data.last_played,
        games_played: data.games_played,
        achievements: data.achievements,
        settings: data.settings,
        level_progress: data.level_progress,
        game_stats: data.game_stats,
      });
    }
    setLoading(false);
  }

  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  }

  async function signUp(email: string, password: string, name: string, username: string) {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name, username } },
    });
    return { error };
  }

  async function signOut() {
    await supabase.auth.signOut();
    setProfile(null);
    setProgress(null);
  }

  async function updateProgress(updates: Partial<UserProgress>) {
    if (!user) return;

    const { error } = await supabase
      .from("user_progress")
      .update(updates)
      .eq("user_id", user.id);

    if (!error && progress) {
      setProgress({ ...progress, ...updates });
    }
  }

  async function updateProfile(updates: Partial<Profile>) {
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", user.id);

    if (!error && profile) {
      setProfile({ ...profile, ...updates });
    }
  }

  const checkAchievements = useCallback(async () => {
    if (!progress || !user) return;

    for (const achievement of ACHIEVEMENTS) {
      if (
        !progress.achievements.includes(achievement.id) &&
        achievement.condition(progress as any)
      ) {
        const newAchievements = [...progress.achievements, achievement.id];
        const newPoints = progress.total_points + achievement.points;

        await supabase
          .from("user_progress")
          .update({
            achievements: newAchievements,
            total_points: newPoints,
          })
          .eq("user_id", user.id);

        setProgress((prev) =>
          prev
            ? {
                ...prev,
                achievements: newAchievements,
                total_points: newPoints,
              }
            : null
        );
      }
    }
  }, [progress, user, supabase]);

  const updateStreak = useCallback(async () => {
    if (!user || !progress) return;

    const today = new Date().toISOString().split("T")[0];
    let newStreak = progress.streak;

    if (progress.last_played) {
      const lastDate = new Date(progress.last_played);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (lastDate.toISOString().split("T")[0] === yesterday.toISOString().split("T")[0]) {
        newStreak = progress.streak + 1;
      } else if (progress.last_played !== today) {
        newStreak = 0;
      }
    }

    await supabase
      .from("user_progress")
      .update({ last_played: today, streak: newStreak })
      .eq("user_id", user.id);

    setProgress((prev) =>
      prev
        ? {
            ...prev,
            last_played: today,
            streak: newStreak,
          }
        : null
    );
  }, [user, progress, supabase]);

  async function playGame(gameId: string, score: number, pointsEarned: number): Promise<boolean> {
    if (!user || !progress) return false;

    const currentStats = progress.game_stats[gameId] || { timesPlayed: 0, bestScore: 0 };
    const newGameStats = {
      ...progress.game_stats,
      [gameId]: {
        timesPlayed: currentStats.timesPlayed + 1,
        bestScore: Math.max(currentStats.bestScore, score),
      },
    };

    await supabase
      .from("user_progress")
      .update({
        game_stats: newGameStats,
        total_points: progress.total_points + pointsEarned,
        games_played: progress.games_played + 1,
      })
      .eq("user_id", user.id);

    setProgress((prev) =>
      prev
        ? {
            ...prev,
            game_stats: newGameStats,
            total_points: prev.total_points + pointsEarned,
            games_played: prev.games_played + 1,
          }
        : null
    );

    await updateStreak();
    await checkAchievements();
    return true;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        progress,
        loading,
        signIn,
        signUp,
        signOut,
        updateProgress,
        playGame,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}