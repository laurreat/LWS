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

-- =============================================
-- 4. INSERT A1 MODULES
-- =============================================

INSERT INTO public.modules (id, course_id, title, description, order_num) VALUES
('7f851801-3f51-4198-a141-2288ca60f184', 'f4c2b7bd-a88d-49a5-8ce9-ff613b4d298e', 'Saludos y Presentaciones', 'Aprende a saludar y presentarte', 1),
('c7af74e5-d2f9-45fc-b425-c688067239a9', 'f4c2b7bd-a88d-49a5-8ce9-ff613b4d298e', 'El Verbo To Be', 'El verbo ser/estar', 2),
('78f965f3-efd5-4b1e-8e88-b21f80720b65', 'f4c2b7bd-a88d-49a5-8ce9-ff613b4d298e', 'Articulos', 'Articulos a, an, the', 3),
('a9aca475-280b-4ec1-a446-ad0d2f9673b8', 'f4c2b7bd-a88d-49a5-8ce9-ff613b4d298e', 'This/That/These/Those', 'Demostrativos', 4),
('4724a72f-85f1-44e4-a278-1838ee44d2e4', 'f4c2b7bd-a88d-49a5-8ce9-ff613b4d298e', 'Numeros 1-10', 'Los numeros basicos', 5),
('dfa13cda-d31c-40be-8c7d-0ed469ecb16f', 'f4c2b7bd-a88d-49a5-8ce9-ff613b4d298e', 'Los Colores', 'Los colores en ingles', 6),
('a2674aa2-5eb3-4783-a73f-3eecd79a12b1', 'f4c2b7bd-a88d-49a5-8ce9-ff613b4d298e', 'La Familia', 'Miembros de la familia', 7),
('d5dbaa66-bac7-4888-96dd-0458dcef2720', 'f4c2b7bd-a88d-49a5-8ce9-ff613b4d298e', 'Comida y Bebidas', 'Vocabulario de alimentos', 8),
('026b82b3-da65-4d79-96ad-2edb91e91a59', 'f4c2b7bd-a88d-49a5-8ce9-ff613b4d298e', 'Rutinas Diarias', 'Actividades cotidianas', 9),
('4cff1c1d-078f-4731-8af4-e084ecbdfa0e', 'f4c2b7bd-a88d-49a5-8ce9-ff613b4d298e', 'Preguntas Si/No', 'Yes/No Questions', 10),
('ddcecc39-d7f7-4636-b122-aa5eae6a160f', 'f4c2b7bd-a88d-49a5-8ce9-ff613b4d298e', 'Preguntas Wh', 'Wh- Questions', 11),
('6935807d-f99e-40c1-9a6e-f473db3ae723', 'f4c2b7bd-a88d-49a5-8ce9-ff613b4d298e', 'El Alfabeto', 'El alfabeto ingles', 12);

-- =============================================
-- 5. INSERT A2 MODULES
-- =============================================

INSERT INTO public.modules (id, course_id, title, description, order_num) VALUES
('ff0baace-f07f-444d-9942-c46cfb9ca9df', '545b77ec-b516-4f1a-9184-fcd062bdbe64', 'Past Simple Regular', 'Verbos regulares en pasado', 1),
('730e5fe7-5ad5-4554-9d48-bf871d4a6a3b', '545b77ec-b516-4f1a-9184-fcd062bdbe64', 'Past Simple Irregular', 'Verbos irregulares', 2),
('18fd0ea8-231d-48d8-bb2f-0d9638bc49f4', '545b77ec-b516-4f1a-9184-fcd062bdbe64', 'Comparativos', 'Comparative adjectives', 3),
('5d7fab44-e643-4342-a5e2-f06cc72ec106', '545b77ec-b516-4f1a-9184-fcd062bdbe64', 'Superlativos', 'Superlative adjectives', 4),
('681c91ed-d66e-4da5-810c-2a09cb14a600', '545b77ec-b516-4f1a-9184-fcd062bdbe64', 'Present Perfect', 'Perfecto presente', 5),
('fa9639ec-950b-4bcd-812c-4fcacf985a93', '545b77ec-b516-4f1a-9184-fcd062bdbe64', 'Modales de Habilidad', 'Can, Could, Be able To', 6),
('efd093d2-20dd-4815-ae3a-3cce556dd06d', '545b77ec-b516-4f1a-9184-fcd062bdbe64', 'Condicional Tipo 1', 'First Conditional', 7),
('1fbfe140-e1bc-4b08-8407-6a150ffdca8b', '545b77ec-b516-4f1a-9184-fcd062bdbe64', 'Adverbs of Frequency', 'Adverbs of frequency', 8),
('4e679eef-2d76-4a3f-b216-78f70cf889e1', '545b77ec-b516-4f1a-9184-fcd062bdbe64', 'Past Continuous', 'Pasado continuo', 9),
('3b82ba7b-a1e0-443c-b036-6c2b571d4b1b', '545b77ec-b516-4f1a-9184-fcd062bdbe64', 'Relative Clauses', 'Clausulas relativas', 10),
('9a606585-b685-456a-ba03-be7d5541591d', '545b77ec-b516-4f1a-9184-fcd062bdbe64', 'Used To', 'Habitos pasados', 11),
('d15f49cb-7add-4e1e-98be-37bb9f00e8b7', '545b77ec-b516-4f1a-9184-fcd062bdbe64', 'Too/Enough', 'Too y Enough', 12);

-- =============================================
-- 6. INSERT B1 MODULES
-- =============================================

INSERT INTO public.modules (id, course_id, title, description, order_num) VALUES
('8bac8e2a-6bca-4b93-861a-244e1ac4cd60', 'daebe138-e697-4947-b917-fc0ac8660a7c', 'Present Tenses Review', 'Repaso de presentes', 1),
('11721179-d8a9-4d96-9250-34e6731287a7', 'daebe138-e697-4947-b917-fc0ac8660a7c', 'Past Tenses Review', 'Repaso de pasados', 2),
('0f0cd0e0-2ee1-4051-91ba-7c78e3caa29d', 'daebe138-e697-4947-b917-fc0ac8660a7c', 'Future Tenses', 'Tiempos futuros', 3),
('f05e0d37-ccfc-4014-ac45-79c778818f17', 'daebe138-e697-4947-b917-fc0ac8660a7c', 'Passive Voice', 'Voz pasiva', 4),
('31e12d00-1589-4637-a516-2818949db9f7', 'daebe138-e697-4947-b917-fc0ac8660a7c', 'Reported Speech', 'Discurso reportado', 5),
('c24d012b-d629-49a6-890f-7ecf9e7a8e94', 'daebe138-e697-4947-b917-fc0ac8660a7c', 'Third Conditional', 'Condicional tipo 3', 6),
('117f83e0-a250-4f5a-9909-1e67bffe8f4f', 'daebe138-e697-4947-b917-fc0ac8660a7c', 'Mixed Conditionals', 'Condicionales mixtos', 7),
('37ce5759-d809-4b9b-8717-db8321ad031e', 'daebe138-e697-4947-b917-fc0ac8660a7c', 'Wish Expressions', 'Expresiones con Wish', 8),
('95cbccf7-d6ed-4a24-85d2-45873f505dc3', 'daebe138-e697-4947-b917-fc0ac8660a7c', 'Modals Advanced', 'Modales avanzados', 9),
('3a53766f-8b5f-4cf9-bf9f-a088b8b27a8a', 'daebe138-e697-4947-b917-fc0ac8660a7c', 'Causative Have', 'Causativo Have', 10),
('9c925db7-e916-4d20-82b4-df4871c4961b', 'daebe138-e697-4947-b917-fc0ac8660a7c', 'Inversions', 'Inversiones', 11),
('d47c360d-a026-4f64-b744-332839ab0b76', 'daebe138-e697-4947-b917-fc0ac8660a7c', 'Emphasizing', 'Enfasis', 12);

-- =============================================
-- VERIFICATION
-- =============================================

SELECT 'Courses created:' || COUNT(*) FROM public.courses;
SELECT 'Modules created:' || COUNT(*) FROM public.modules;
SELECT 'A1 modules:' || COUNT(*) FROM public.modules m JOIN public.courses c ON m.course_id = c.id WHERE c.level = 'A1';
SELECT 'A2 modules:' || COUNT(*) FROM public.modules m JOIN public.courses c ON m.course_id = c.id WHERE c.level = 'A2';
SELECT 'B1 modules:' || COUNT(*) FROM public.modules m JOIN public.courses c ON m.course_id = c.id WHERE c.level = 'B1';
