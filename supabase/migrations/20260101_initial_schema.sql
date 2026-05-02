-- =============================================
-- 1. INITIAL SCHEMA (Tables + RLS)
-- =============================================

-- Drop existing tables if they exist (fresh start)
DROP TABLE IF EXISTS public.course_progress CASCADE;
DROP TABLE IF EXISTS public.exercises CASCADE;
DROP TABLE IF EXISTS public.lessons CASCADE;
DROP TABLE IF EXISTS public.modules CASCADE;
DROP TABLE IF EXISTS public.courses CASCADE;
DROP TABLE IF EXISTS public.user_progress CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  username TEXT UNIQUE,
  email TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'estudiante' CHECK (role IN ('admin', 'profesor', 'estudiante')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Courses
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  level TEXT NOT NULL CHECK (level IN ('A1', 'A2', 'B1')),
  order_num INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Modules
CREATE TABLE public.modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  order_num INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lessons
CREATE TABLE public.lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID REFERENCES public.modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  order_num INTEGER DEFAULT 0,
  lesson_type TEXT DEFAULT 'theory',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Exercises
CREATE TABLE public.exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  options JSONB,
  exercise_type TEXT DEFAULT 'multiple_choice',
  points INTEGER DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Progress (game progress)
CREATE TABLE public.user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  total_points INTEGER DEFAULT 0,
  streak INTEGER DEFAULT 0,
  last_played TEXT,
  games_played INTEGER DEFAULT 0,
  level_progress JSONB DEFAULT '{"A1": {"completed": 0, "total": 300, "points": 0}, "A2": {"completed": 0, "total": 400, "points": 0}, "B1": {"completed": 0, "total": 500, "points": 0}}'::jsonb,
  game_stats JSONB DEFAULT '{}'::jsonb,
  achievements TEXT[] DEFAULT '{}',
  settings JSONB DEFAULT '{"theme": "system", "soundEnabled": true, "speechRate": 1.0}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Course Progress (lesson tracking)
CREATE TABLE public.course_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  module_id UUID REFERENCES public.modules(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT false,
  score INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- =============================================
-- 2. ROW LEVEL SECURITY
-- =============================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_progress ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Courses policies (public)
CREATE POLICY "Anyone can view courses" ON public.courses
  FOR SELECT USING (true);

-- Modules policies (public)
CREATE POLICY "Anyone can view modules" ON public.modules
  FOR SELECT USING (true);

-- Lessons policies (public)
CREATE POLICY "Anyone can view lessons" ON public.lessons
  FOR SELECT USING (true);

-- Exercises policies (public)
CREATE POLICY "Anyone can view exercises" ON public.exercises
  FOR SELECT USING (true);

-- User progress policies
CREATE POLICY "Users own progress" ON public.user_progress
  FOR ALL USING (auth.uid() = user_id);

-- Course progress policies
CREATE POLICY "Users own course progress" ON public.course_progress
  FOR ALL USING (auth.uid() = user_id);

-- =============================================
-- 3. INSERT COURSES
-- =============================================

INSERT INTO public.courses (id, title, description, level, order_num) VALUES
('f4c2b7bd-a88d-49a5-8ce9-ff613b4d298e', 'A1 - Principiante', 'Nivel basico para principiantes', 'A1', 1),
('545b77ec-b516-4f1a-9184-fcd062bdbe64', 'A2 - Elemental', 'Nivel elemental', 'A2', 2),
('daebe138-e697-4947-b917-fc0ac8660a7c', 'B1 - Intermedio', 'Nivel intermedio', 'B1', 3);
