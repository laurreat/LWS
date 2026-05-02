"use client";

import { createContext, useContext, useEffect, useState, useCallback, useMemo, type ReactNode } from "react";
import { createClient } from "@/lib/supabase";
import type { User, Session } from "@supabase/supabase-js";
import { ACHIEVEMENTS } from "@/lib/achievements";
import type { UserProgress, Profile } from "@/types";
import { defaultProgress } from "@/lib/defaultProgress";





interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  progress: UserProgress | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, name: string, username: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ error: Error | null }>;
  updateProgress: (updates: Partial<UserProgress>) => Promise<void>;
  playGame: (gameId: string, score: number, pointsEarned: number, level?: string) => Promise<boolean>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  requestAccountDeletion: () => Promise<{ error: Error | null }>;
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

  // Real-time subscription for progress updates
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel(`user_progress:${user.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_progress',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.new) {
            setProgress((prev) => ({
              ...defaultProgress,
              ...prev,
              ...payload.new,
            }));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, supabase]);

  // Real-time subscription for profile updates
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel(`profiles:${user.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles',
          filter: `id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.new) {
            setProfile((prev) => ({
              ...prev,
              ...payload.new,
            }) as Profile);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, supabase]);

  async function fetchProfile(userId: string) {
    const { data: records, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .limit(1);

    const data = records?.[0];

    if (error) {
      console.error("Error fetching profile:", error.message);
    }

    if (!error && data) {
      setProfile(data);
    } else if (!error && !data) {
      // Profile doesn't exist - create one from user metadata
      console.warn("No profile found for user:", userId);
      
      // Get user metadata to extract name and username
      const { data: { user } } = await supabase.auth.getUser();
      const name = user?.user_metadata?.name || user?.email?.split('@')[0] || "Usuario";
      const username = user?.user_metadata?.username || user?.email?.split('@')[0] || "user";
      
      // Create profile
      const { data: newProfile, error: createError } = await supabase
        .from("profiles")
        .insert({ id: userId, name, username })
        .select()
        .single();
      
      if (createError) {
        console.error("Error creating profile:", createError.message);
      } else if (newProfile) {
        setProfile(newProfile);
      }
    }
  }

  async function fetchProgress(userId: string) {
    const { data: records, error } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", userId)
      .limit(1);

    const data = records?.[0];

    if (!error && data) {
      setProgress({
        ...defaultProgress,
        ...data,
      });
    } else if (!error && !data && userId) {
      // Record not found - fallback for new users without progress yet
      setProgress(defaultProgress);
    }
    setLoading(false);
  }

  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  }

  async function signUp(email: string, password: string, name: string, username: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name, username } },
    });

    // If signup successful and we have a user, create profile in database
    if (!error && data.user) {
      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: data.user.id,
          name,
          username,
        });

      if (profileError) {
        console.error("Error creating profile:", profileError.message);
      }
    }

    return { error };
  }

  async function signOut() {
    await supabase.auth.signOut();
    setProfile(null);
    setProgress(null);
  }

  async function changePassword(currentPassword: string, newPassword: string) {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  }

  async function requestAccountDeletion() {
    if (!user) return { error: new Error("No user logged in") };

    try {
      const response = await fetch("/api/delete-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: new Error(data.error) };
      }

      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setProfile(null);
      setProgress(null);

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
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
        achievement.condition(progress)
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

  async function playGame(gameId: string, score: number, pointsEarned: number, level?: string): Promise<boolean> {
    if (!user || !progress) return false;

    const currentStats = progress.game_stats[gameId] || { timesPlayed: 0, bestScore: 0 };
    const newGameStats = {
      ...progress.game_stats,
      [gameId]: {
        timesPlayed: currentStats.timesPlayed + 1,
        bestScore: Math.max(currentStats.bestScore, score),
      },
    };

    const newLevelProgress = level ? { ...progress.level_progress } : progress.level_progress;
    if (level && newLevelProgress[level as keyof typeof newLevelProgress]) {
      const correctAnswers = Math.round(score / 10);
      newLevelProgress[level as keyof typeof newLevelProgress] = {
        ...newLevelProgress[level as keyof typeof newLevelProgress],
        completed: Math.min(
          newLevelProgress[level as keyof typeof newLevelProgress].completed + correctAnswers,
          newLevelProgress[level as keyof typeof newLevelProgress].total
        ),
        points: newLevelProgress[level as keyof typeof newLevelProgress].points + pointsEarned,
      };
    }

    await supabase
      .from("user_progress")
      .update({
        game_stats: newGameStats,
        total_points: progress.total_points + pointsEarned,
        games_played: progress.games_played + 1,
        level_progress: newLevelProgress,
      })
      .eq("user_id", user.id);

    setProgress((prev) =>
      prev
        ? {
            ...prev,
            game_stats: newGameStats,
            total_points: prev.total_points + pointsEarned,
            games_played: prev.games_played + 1,
            level_progress: newLevelProgress,
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
        changePassword,
        updateProgress,
        playGame,
        updateProfile,
        requestAccountDeletion,
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