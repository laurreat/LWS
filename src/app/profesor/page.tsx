"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Plus, Wand2, BookOpen, Gamepad2, Settings, Users, BarChart3, Save, Loader2 } from "lucide-react";
import { useCourses } from "@/hooks/useCourses";
import { Button, Card, Input, Textarea, Select } from "@/components/ui";
import type { AIGame, GameLevel } from "@/types";

interface GameConfig {
  topic: string;
  level: GameLevel;
  gameType: "multiple_choice" | "fill_blank" | "matching" | "ordering";
  numQuestions: number;
  difficulty: "easy" | "medium" | "hard";
  includeAudio: boolean;
  includeImages: boolean;
}

export default function ProfessorPanel() {
  const { isProfessor, fetchCourses } = useCourses();
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [gameConfig, setGameConfig] = useState<GameConfig>({
    topic: "",
    level: "A1",
    gameType: "multiple_choice",
    numQuestions: 10,
    difficulty: "easy",
    includeAudio: false,
    includeImages: false,
  });
  const [generatedGame, setGeneratedGame] = useState<AIGame | null>(null);
  const [activeTab, setActiveTab] = useState<"generar" | "contenido" | "stats">("generar");

  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = async () => {
    const professor = await isProfessor();
    setHasAccess(professor);
    setLoading(false);
  };

  const generateWithAI = async () => {
    if (!gameConfig.topic.trim()) return;
    
    setGenerating(true);
    setGeneratedGame(null);

    try {
      // Prepare prompt for AI
      const prompt = createPrompt(gameConfig);
      
      // Call AI API (OpenAI or compatible)
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, config: gameConfig }),
      });

      if (!response.ok) throw new Error("Error generating content");

      const data = await response.json();
      setGeneratedGame(data.game);
    } catch (error) {
      console.error("Error:", error);
      // Fallback: generate mock data
      setGeneratedGame(generateMockGame(gameConfig));
    } finally {
      setGenerating(false);
    }
  };

  const createPrompt = (config: GameConfig): string => {
    const levelLabels = { A1: "beginner (A1)", A2: "elementary (A2)", B1: "intermediate (B1)" };
    const difficultyHints = {
      easy: "simple vocabulary and basic sentences",
      medium: "mixed vocabulary and some complex structures",
      hard: "advanced vocabulary and complex grammatical structures",
    };

    return `Generate ${config.numQuestions} ${config.gameType.replace("_", " ")} questions for learning English at ${levelLabels[config.level]} level.
    
Topic: ${config.topic}
Difficulty: ${difficultyHints[config.difficulty]}

For each question, provide:
- question: the question text
- correct_answer: the correct answer
- options: 4 multiple choice options (only for multiple_choice type)
- points: point value

Format as JSON array with objects containing: question, correct_answer, options (array), points`;
  };

  const generateMockGame = (config: GameConfig): AIGame => {
    const questions = [];
    const sampleWords = ["book", "house", "car", "water", "food", "friend", "family", "work", "school", "time"];
    const topicLower = config.topic.toLowerCase();

    for (let i = 0; i < config.numQuestions; i++) {
      const word = sampleWords[i % sampleWords.length];
      const translations: Record<string, string> = {
        book: "libro", house: "casa", car: "carro", water: "agua", food: "comida",
        friend: "amigo", family: "familia", work: "trabajo", school: "escuela", time: "tiempo",
      };
      
      questions.push({
        question: `What is the meaning of "${word}"?`,
        correct_answer: translations[word] || word,
        options: [
          translations[word] || word,
          "another word",
          "different word",
          "wrong word",
        ].sort(() => Math.random() - 0.5),
        points: config.difficulty === "easy" ? 10 : config.difficulty === "medium" ? 15 : 20,
      });
    }

    return {
      id: crypto.randomUUID(),
      title: `${config.topic} - ${config.level}`,
      topic: config.topic,
      level: config.level,
      game_type: config.gameType,
      content: { questions },
    };
  };

  const saveGame = async () => {
    if (!generatedGame) return;

    try {
      const { createClient } = await import("@/lib/supabase");
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      const { error } = await supabase.from("ai_games").insert({
        creator_id: user.id,
        title: generatedGame.title,
        topic: generatedGame.topic,
        level: generatedGame.level,
        game_type: generatedGame.game_type,
        content: generatedGame.content,
        is_published: true,
      });

      if (error) throw error;
      alert("Juego guardado exitosamente!");
    } catch (error) {
      console.error("Error saving:", error);
      alert("Error al guardar el juego");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Acceso Restringido
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Solo los profesores y administradores pueden acceder a este panel.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Panel del Profesor
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Crea contenido y juegos con IA para tus estudiantes
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200 dark:border-gray-700">
          {[
            { id: "generar", label: "Generar con IA", icon: Sparkles },
            { id: "contenido", label: "Gestionar Contenido", icon: BookOpen },
            { id: "stats", label: "Estadísticas", icon: BarChart3 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 pb-3 px-2 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "generar" && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Configuration */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-primary" />
                  Configuración del Juego
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Tema *
                    </label>
                    <input
                      type="text"
                      value={gameConfig.topic}
                      onChange={(e) => setGameConfig({ ...gameConfig, topic: e.target.value })}
                      placeholder="Ej: Verbs, Colors, Family members..."
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Nivel
                      </label>
                      <select
                        value={gameConfig.level}
                        onChange={(e) => setGameConfig({ ...gameConfig, level: e.target.value as GameLevel })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                      >
                        <option value="A1">A1 - Principiante</option>
                        <option value="A2">A2 - Elemental</option>
                        <option value="B1">B1 - Intermedio</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Tipo de Juego
                      </label>
                      <select
                        value={gameConfig.gameType}
                        onChange={(e) => setGameConfig({ ...gameConfig, gameType: e.target.value as any })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                      >
                        <option value="multiple_choice">Multiple Choice</option>
                        <option value="fill_blank">Completar</option>
                        <option value="matching">Emparejar</option>
                        <option value="ordering">Ordenar</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        # Preguntas
                      </label>
                      <input
                        type="number"
                        min="5"
                        max="20"
                        value={gameConfig.numQuestions}
                        onChange={(e) => setGameConfig({ ...gameConfig, numQuestions: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Dificultad
                      </label>
                      <select
                        value={gameConfig.difficulty}
                        onChange={(e) => setGameConfig({ ...gameConfig, difficulty: e.target.value as any })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                      >
                        <option value="easy">Fácil</option>
                        <option value="medium">Medio</option>
                        <option value="hard">Difícil</option>
                      </select>
                    </div>
                  </div>

                  <Button
                    onClick={generateWithAI}
                    disabled={generating || !gameConfig.topic.trim()}
                    className="w-full mt-4"
                  >
                    {generating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generando...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generar con IA
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <Gamepad2 className="w-5 h-5 text-primary" />
                  Vista Previa
                </h2>

                {generatedGame ? (
                  <div>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 mb-4">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {generatedGame.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {generatedGame.content.questions?.length || 0} preguntas
                      </p>
                    </div>

                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {(generatedGame.content.questions || []).slice(0, 5).map((q: any, i: number) => (
                        <div key={i} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <p className="text-sm text-gray-900 dark:text-white">
                            {i + 1}. {q.question}
                          </p>
                          <p className="text-xs text-green-500 mt-1">
                            ✓ {q.correct_answer}
                          </p>
                        </div>
                      ))}
                    </div>

                    <Button onClick={saveGame} variant="secondary" className="w-full mt-4">
                      <Save className="w-4 h-4 mr-2" />
                      Guardar Juego
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Configure el juego y presione "Generar con IA"</p>
                  </div>
                )}
              </Card>
            </motion.div>
          </div>
        )}

        {activeTab === "contenido" && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Gestión de Contenido
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Acá podrás gestionar los módulos, lecciones y ejercicios creados.
            </p>
          </Card>
        )}

        {activeTab === "stats" && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Estadísticas de Estudiantes
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Acá podrás ver el progreso de tus estudiantes.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}