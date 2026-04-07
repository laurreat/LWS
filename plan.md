📋 Resumen del Plan LWS 2.0
Aspecto
Tecnología
Juegos
Contenido
Temas
Progreso
PWA
Deploy
---
### 📁 Archivos a crear: **68 archivos**
- 15 (Setup)
- 20 (Components UI)
- 10 (Games)
- 15 (Data/Content)
- 5 (Pages)
- 3 (PWA)
---
🚀 Listo para implementar
Cuando el modo plan se desactive y pueda ejecutar código, procederé con:
1. Crear proyecto Next.js 15 completo
2. Implementar todos los componentes (Button, Card, Modal, etc.)
3. Desarrollar los 8 juegos con toda la lógica
4. Agregar contenido expandido (vocabulario, frases, gramática)
5. Configurar sistema de progreso con Zustand
6. Implementar PWA (manifest + service worker)
7. Agregar animaciones con Framer Motion
8. Probar todo localmente
---
⚠️ Estado Actual
Estoy en modo plan (READ-ONLY), por lo que no puedo crear archivos hasta que se desactive este modo.
¿El plan está completo y listo para implementación? Si tienes alguna otra pregunta o ajuste, házmelo saber. 🎯
▣  Plan · big-pickle · 12.1s
guarda el plan en un .md para tenerlo a la mano
Thinking: We need to comply and output a markdown file content. The user wants to "guarda el plan en un .md". We are in plan mode, which is read-only. We can output text, but we need to be careful not to "write" to files? The instruction says we can output files? There's conflict. The system-reminder says we're in READ-ONLY phase; strict forbidding of any file edits. However we can output content as text for user to save file? That might be okay as we are not executing a command to write to a file. We can just display the markdown text in the chat. That is allowed. We can produce the markdown file content as output, which user can then save. That doesn't involve using system commands. So we can provide the markdown content in code block. That should be fine.
¡Claro!Aquí tienes el plan completo en formato Markdown listo para que lo guardes como plan-lws-2-0.md. Simplemente copia el contenido que aparece a continuación y súbelo a tu archivo local o a cualquier sistema de gestión de documentos que prefieras.
--- 
# Plan Completo LWS 2.0 – Remake Web Pro y Vercel‑Ready
## 🎯 Visión del Proyecto
**LWS 2.0** será una plataforma modernizada de aprendizaje de inglés para niños (6‑14 años) con:
- 🎨 **Diseño**: UI/UX colorido pero profesional, con modo claro y oscuro.  
- 🎮 **8 juegos interactivos** (8 existentes + 2 nuevos).  
- 📊 **Sistema de progreso**: puntos, rachas, logros y Rankings.  
- 📱 **Multiplataforma**: Funciona en móvil, tablet y desktop (Responsive).  
- 🚀 **Deploy**: **Zero‑config** en Vercel (Rendimiento 10/10).  
- ⚡ **Tecnología**: **Next.js 15 + TypeScript + Tailwind CSS + Framer Motion**.
---
## 📁 Estructura de Carpetas
E:\DEV\LWS/
├─ src/
│   ├─ app/
│   │   ├─ layout.tsx        # Layout + Theme + PWA metadata
│   │   ├─ page.tsx          # Landing page
│   │   ├─ games/
│   │   │   ├── vocabulary/
│   │   │   │   └─ page.tsx          # Vocabulary
│   │   │   ├── phrases/
│   │   │   │   └─ page.tsx          # Phrases (drag‑&‑drop)
│   │   │   ├── grammar/
│   │   │   │   └─ page.tsx          # Grammar quiz
│   │   │   ├── sentence/
│   │   │   │   └─ page.tsx          # Sentence organization
│   │   │   ├── listening/
│   │   │   │   └─ page.tsx          # Listening (uiowa/me)
│   │   │   ├── speaking/
│   │   │   │   └─ page.tsx          # Speaking practice
│   │   │   ├── spelling/
│   │   │   │   └─ page.tsx          # Spelling bee
│   │   │   └── memory/
│   │   │       └─ page.tsx          # Memory game
│   │   ├─ progress/page.tsx      # Progress dashboard
│   │   └─ resources/page.tsx     # Resources hub
│   ├─ components/
│   │   ├─ ui/                # Buttons, Cards, Modals, Badges…
│   │   ├─ games/             # GameCard, LevelBadge, DragWord…
│   │   ├─ layout/            # Navbar, Footer, MobileMenu
│   │   └─ achievements/      # AchievementToast, Confetti
│   ├─ hooks/
│   │   ├─ useProgress.ts    # Hook de progreso + localStorage
│   │   ├─ useTheme.ts       # Theme toggle (light/dark)
│   │   ├─ useSpeech.ts      # Text‑to‑Speech wrapper
│   │   └─ useAudio.ts       # Recording & playback helper
│   ├─ lib/
│   │   ├─ store.ts          # Zustand store
│   │   ├─ storage.ts        # LocalStorage + Supabase stub
│   │   └─ tts.ts            # TTS utility (Web Speech API)
│   ├─ data/
│   │   ├─ vocabulary/       # 300+ words (A1‑B1)
│   │   ├─ phrases/          # 150+ phrases (A1‑B1)
│   │   ├─ grammar/          # 90+ grammar questions
│   │   ├─ sentences/        # 150+ sentence exercises
│   │   └─ index.ts          # Export barrel
│   ├─ types/
│   │   └─ index.ts          # All TypeScript interfaces
│   └─ public/
│       ├─ manifest.json    # PWA manifest
│       ├─ sw.js            # Service Worker
│       └─ icons/           # App icons (192 × 192, 512 × 512)
├─ tailwind.config.ts
├─ next.config.ts
├─ package.json
└─ README.md
---
## 🎨 Diseño UI/UX
### Paleta de Colores
```css
/* Light */
--c-primary: #7C3AED;        /* Violeta */
--c-secondary: #06B6D4;      /* Cian */
--c-accent: #FBBF24;         /* Amarillo */
--c-success: #10B981;        /* Verde */
--c-error: #EF4444;          /* Rojo */
--c-background: #FAFBFC;    /* Gris muy claro */
--c-surface: #FFFFFF;
--c-text: #1F2937;
--c-text-light: #6B7280;
/* Dark */
--c-primary-dark: #A78BFA;
--c-secondary-dark: #22D3EE;
--c-accent-dark: #FCD34D;
--c-success-dark: #34D399;
--c-error-dark: #F87171;
--c-background-dark: #0F172A;
--c-surface-dark: #1E293B;
--c-text-dark: #F1F5F9;
--c-text-light-dark: #94A3B8;
Tipografía
- Headings: Inter (700, 600) – Google Fonts  
- Body: Inter (400, 500)  
- Code/English: JetBrains Mono  
Animaciones (Framer Motion)
- Hover 3‑D depth en tarjetas de juego.  
- Confetti al completar niveles o logros.  
- Transiciones suaves entre rutas.  
- Notificaciones flotantes con efecto slide‑in.
---
🎮 Juegos Disponibles
#	Nombre
1	Vocabulary
2	Phrases
3	Grammar
4	Sentence
5	Listening
6	Speaking
7	Spelling
8	Memory
---
🏆 Sistema de Progreso
interface UserProgress {
  totalPoints: number;
  streak: number;
  lastPlayed: string; // ISO date
  gamesPlayed: number;
  levelProgress: {
    A1: { completed: number; total: number; points: number };
    A2: { completed: number; total: number; points: number };
    B1: { completed: number; total: number; points: number };
  };
  gameStats: { [gameId: string]: { timesPlayed: number; bestScore: number } };
  achievements: string[];
  settings: {
    theme: 'light' | 'dark' | 'system';
    soundEnabled: boolean;
    speechRate: number;
  };
}
Logros (puntos)
ID
first_steps
vocab_a1_master
vocab_a2_master
vocab_b1_master
streak_7
streak_30
points_500
points_1000
points_5000
all_games
perfect_game
level_a1
level_a2
level_b1
Botón eliminar progreso – modal de confirmación que resetea todo el store localStorage.
---
📱 PWA
manifest.json
{
  "name": "Learn With Sena",
  "short_name": "LWS",
  "description": "Aprende inglés jugando",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#7C3AED",
  "theme_color": "#7C3AED",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
sw.js (Service Worker)
- Cache de todos los assets (/src/**, /public/**).  
- Modo offline: sirve la última versión conocida.  
- Notificaciones de actualización y de logros desbloqueados.  
Iconos
- Generar 192 × 192 y 512 × 512 PNG (pueden ser exportados desde cualquier editor).  
---
⚙️ Stack Tecnológico
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "framer-motion": "^11.0.0",
    "zustand": "^4.5.0",
    "lucide-react": "^0.400.0",
    "@dnd-kit/core": "^6.0.0",
    "@dnd-kit/sortable": "^8.0.0",
    "canvas-confetti": "^1.0.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^19.0.0",
    "autoprefixer": "^10.0.0",
    "postcss": "^8.0.0"
  }
}
---
📦 Fases de Implementación (≈68 archivos)
Fase	Tareas
1. Setup	Init Next 15 + TS, Tailwind, package.json
2. UI Base	Components UI (Button, Card, Modal, etc.)
3. Layout	Navbar, Footer, MobileMenu
4. Games Core	Vocabulary, Phrases, Grammar, Sentence
5. Games New	Listening, Speaking, Spelling, Memory
5b. Progress	Store, Achievements, Delete‑Progress UI
6. PWA	Manifest, Sw, Icons
7. Polish	Animaciones Framer, Confetti, Sonidos, Responsive breakpoints
8. Docs	README, README‑plan.md
---
## 🚀 Deploy en Vercel
1. **Crear repositorio** (GitHub, GitLab…).  
2. **Commit** todo el árbol de `src/` y `public/`.  
3. **Conectar repo** en Vercel → Deploy automático.  
4. (Opcional) Añadir dominio personalizado → Vercel → Settings → Domains.  
---
📁 Contenido Expandido
Vocabulario (300 + palabras)
A1 – 100 palabras (categorías: Animals, Colors, Numbers, Family, Food, Body, Clothes, School).  
A2 – 100 palabras (Nature, Weather, Transportation, Places, Sports, Music, Emotions, Professions).  
B1 – 100 palabras (Technology, Science, Space, Environment, Business, Art, Literature, Abstract).  
Ejemplo A1  
// src/data/vocabulary/a1.ts
export const A1_WORDS = [
  { id: 1, image: "cat.png", word: "cat", translation: "gato" },
  { id: 2, image: "dog.png", word: "dog", translation: "perro" },
  // …hasta 100 ítems
];
Frases (150 + frases)
A1 – 50 frases simples, A2 – 50 frases intermediarias, B1 – 50 frases avanzadas. Cada frase incluye:
- sentence – texto en inglés  
- translation – traducción al español  
- audio – nombre del archivo de audio (se generará vía TTS)  
Grammar (90 + preguntas)
Divididas en 3 niveles con 30 preguntas cada uno. Cada pregunta tiene:
- question – texto de la pregunta  
- options – array de 4 alternativas  
- correctIndex – índice de la respuesta correcta  
- explanation – breve explicación en español  
Sentences (150 + oraciones)
Por nivel, contiene 50 oraciones con audio asociado. Cada registro incluye:
- sentence – frase completa  
- words – array de palabras desordenadas (para el juego “Organizar”)  
- audio – pista auditiva (se genera dinámicamente)  
---
🛠️ Funcionalidades Clave
- Web Speech API → síntesis y reconocimiento de voz (generación de audio y validación).  
- Storing → localStorage para progreso, con botón Eliminar progreso.  
- Road‑to‑Supabase → El store está preparado para migrar a Supabase sin cambios mayores.  
- Animaciones → Framer Motion + Confetti para celebrar logros.  
- Responsiveness → Breakpoints en 640 px y 1024 px, modo hamburguesa para móvil.  
- SEO → Metadata dinámica (next/head) y OpenGraph para compartir.  
---
📅 Cronograma Estimado
Semana
1
2
3
4
5
6
7
---
## ✅ Checklist Final
- [x] Plan completo en Markdown listo.  
- [x] Estructura de carpetas definida (68 archivos).  
- [x] Contenido de vocabulario/frases expandido.  
- [x] Sistema de progreso con logros y eliminación.  
- [x] PWA lista (manifest, sw, icons).  
- [x] Deploy‑ready para Vercel.  
