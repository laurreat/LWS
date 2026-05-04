"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Trophy, ArrowRight, BookOpen, Brain } from "lucide-react";
import Link from "next/link";
import { Button, Card, LevelBadge } from "@/components/ui";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase";
import type { GameLevel } from "@/types";
import { A1_WORDS, A2_WORDS, B1_WORDS } from "@/data/vocabulary";
import { A1_PHRASES, A2_PHRASES, B1_PHRASES } from "@/data/phrases";
import { A1_GRAMMAR, A2_GRAMMAR, B1_GRAMMAR } from "@/data/grammar";

interface AssessmentQuestion {
  id: string;
  qLevel: GameLevel;
  question: string;
  correct_answer: string;
  options: string[];
  points: number;
}

function generateQuestions(): AssessmentQuestion[] {
  const q: AssessmentQuestion[] = [];

  // A1 Vocabulary (4 questions)
  const a1Words = A1_WORDS.slice(0, 2);
  a1Words.forEach((w, idx) => {
    const others = A1_WORDS.filter(ow => ow.id !== w.id).slice(0, 3).map(ow => ow.translation);
    q.push({
      id: `a1-vocab-${idx}`,
      qLevel: 'A1',
      question: `What is "${w.word}" in Spanish?`,
      correct_answer: w.translation,
      options: [...others, w.translation].sort(() => Math.random() - 0.5),
      points: 10,
    });
  });

  // A1 Grammar
  q.push({
    id: 'a1-grammar-1',
    qLevel: 'A1',
    question: 'Complete: "I ___ a student"',
    correct_answer: 'am',
    options: ['am', 'is', 'are', 'was'].sort(() => Math.random() - 0.5),
    points: 10,
  });

  // A2 Phrases (4 questions)
  const a2Phrases = A2_PHRASES.slice(0, 2);
  a2Phrases.forEach((p, idx) => {
    // Get wrong translations from other A2 phrases
    const otherTranslations = A2_PHRASES
      .filter(op => op.sentence !== p.sentence)
      .slice(0, 3)
      .map(op => op.translation);
    q.push({
      id: `a2-phrase-${idx}`,
      qLevel: 'A2',
      question: `Translate: "${p.sentence}"`,
      correct_answer: p.translation,
      options: [...otherTranslations, p.translation].sort(() => Math.random() - 0.5),
      points: 15,
    });
  });

  // A2 Grammar - Past tense
  q.push({
    id: 'a2-grammar-1',
    qLevel: 'A2',
    question: 'Past tense of "go":',
    correct_answer: 'went',
    options: ['went', 'go', 'goes', 'going'].sort(() => Math.random() - 0.5),
    points: 15,
  });

  // B1 Grammar (4 questions)
  const b1Grammar = B1_GRAMMAR.slice(0, 2);
  b1Grammar.forEach((g, idx) => {
    q.push({
      id: `b1-grammar-${idx}`,
      qLevel: 'B1',
      question: g.question,
      correct_answer: g.options[g.correctIndex],
      options: g.options,
      points: 20,
    });
  });

  // B1 Conditional
  q.push({
    id: 'b1-grammar-3',
    qLevel: 'B1',
    question: 'Conditional: "If I ___ rich, I would travel"',
    correct_answer: 'were',
    options: ['was', 'were', 'am', 'be'],
    points: 20,
  });

  return q;
}

export default function LevelAssessmentPage() {
  const router = useRouter();
  const { user, progress: userProg } = useAuth();
  const supabase = createClient();

  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showFb, setShowFb] = useState(false);
  const [isCorr, setIsCorr] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [correctByLvl, setCorrectByLvl] = useState<Record<GameLevel, number>>({ A1: 0, A2: 0, B1: 0 });
  const [state, setState] = useState<"select" | "playing" | "finished">("select");
  const [detected, setDetected] = useState<GameLevel | null>(null);
  const [saving, setSaving] = useState(false);

  const totalQ = 12;
  const currQ = questions[currentIdx];

  const start = () => {
    setQuestions(generateQuestions());
    setCurrentIdx(0);
    setSelected(null);
    setShowFb(false);
    setIsCorr(null);
    setScore(0);
    setCorrectByLvl({ A1: 0, A2: 0, B1: 0 });
    setState("playing");
    setDetected(null);
  };

  const check = () => {
    if (!currQ || !selected) return;

    const ok = selected === currQ.correct_answer;
    setIsCorr(ok);
    setShowFb(true);

    if (ok) {
      setScore(s => s + currQ.points);
      setCorrectByLvl(prev => ({ ...prev, [currQ.qLevel]: prev[currQ.qLevel] + 1 }));
    }

    setTimeout(() => {
      setShowFb(false);
      setIsCorr(null);
      setSelected(null);

      if (currentIdx < totalQ - 1) {
        setCurrentIdx(currentIdx + 1);
      } else {
        finish();
      }
    }, 1500);
  };

  const finish = useCallback(async () => {
    let lvl: GameLevel = 'A1';
    if (correctByLvl.B1 >= 2) lvl = 'B1';
    else if (correctByLvl.A2 >= 2) lvl = 'A2';

    setDetected(lvl);
    setState("finished");

    if (user && userProg) {
      setSaving(true);
      try {
        const upd: any = {
          level_progress: {
            ...userProg.level_progress,
            A1: { ...userProg.level_progress.A1, unlocked: true },
          }
        };
        if (lvl === 'A2' || lvl === 'B1') {
          upd.level_progress.A2 = { ...userProg.level_progress.A2, unlocked: true };
        }
        if (lvl === 'B1') {
          upd.level_progress.B1 = { ...userProg.level_progress.B1, unlocked: true };
        }

        await supabase
          .from("user_progress")
          .update(upd)
          .eq("user_id", user.id);
      } catch (e) {
        console.error("Error:", e);
      } finally {
        setSaving(false);
      }
    }
  }, [user, userProg, correctByLvl]);

  if (state === "finished" && detected) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-2xl w-full">
          <Card className="p-8 text-center">
            <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
              detected === 'B1' ? 'bg-purple-100 dark:bg-purple-900/30' :
              detected === 'A2' ? 'bg-blue-100 dark:bg-blue-900/30' :
              'bg-green-100 dark:bg-green-900/30'
            }`}>
              <Trophy className={`w-12 h-12 ${
                detected === 'B1' ? 'text-purple-600' :
                detected === 'A2' ? 'text-blue-600' :
                'text-green-600'
              }`} />
            </div>

            <h2 className="text-2xl font-bold mb-2">¡Nivel Detectado!</h2>

            <div className="flex justify-center mb-4">
              <LevelBadge level={detected} size="lg" />
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {detected === 'A1' && 'Has demostrado un nivel principiante. ¡Comienza con los cursos A1!'}
              {detected === 'A2' && '¡Buen trabajo! Tienes conocimientos de nivel elemental. Desbloqueamos A1 y A2.'}
              {detected === 'B1' && '¡Impresionante! Tienes un nivel intermedio. Tienes acceso a todos los cursos.'}
            </p>

            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-6">
              <div className="text-4xl font-bold text-primary mb-2">{score} puntos</div>
              <p className="text-sm text-gray-500 mb-4">Puntuación total</p>

              <div className="space-y-2 text-left">
                {(['A1', 'A2', 'B1'] as GameLevel[]).map((lv, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <LevelBadge level={lv} size="sm" />
                    <span className={correctByLvl[lv] >= 2 ? 'text-green-600' : 'text-red-600'}>
                      {correctByLvl[lv]}/4 correctas
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Link href="/courses">
                <Button className="w-full">
                  Ver Cursos Disponibles
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>

              <Button variant="ghost" className="w-full" onClick={start}>
                Realizar Examen Nuevamente
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (state === "select") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-2xl w-full">
          <Card className="p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
              <Brain className="w-10 h-10 text-purple-600" />
            </div>

            <h1 className="text-4xl font-bold mb-4">Examen de Nivel Inicial</h1>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Este examen determinará tu nivel de inglés actual y desbloqueará los cursos correspondientes.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-left">
              {[
                { l: 'A1' as GameLevel, n: 6, d: 'Preguntas básicas' },
                { l: 'A2' as GameLevel, n: 4, d: 'Gramática elemental' },
                { l: 'B1' as GameLevel, n: 2, d: 'Retos intermedios' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <LevelBadge level={item.l} size="sm" />
                  <div>
                    <p className="font-medium text-sm">{item.n} preguntas</p>
                    <p className="text-xs text-gray-500">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 justify-center">
              <Link href="/courses">
                <Button variant="outline">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Volver a Cursos
                </Button>
              </Link>
              <Button onClick={start}>
                <Trophy className="w-4 h-4 mr-2" />
                Comenzar Examen
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Playing state
  const prog = ((currentIdx + 1) / totalQ) * 100;

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Examen de Nivel</h1>
            <p className="text-sm text-gray-500">
              Pregunta {currentIdx + 1} de {totalQ}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-amber-500">{score}</p>
            <p className="text-xs text-gray-500">Puntos</p>
          </div>
        </div>

        {/* Progress */}
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-8">
          <motion.div className="h-full bg-primary" initial={{ width: 0 }} animate={{ width: `${prog}%` }} />
        </div>

        {/* Level indicators */}
        <div className="flex gap-2 mb-8">
          {(['A1', 'A2', 'B1'] as GameLevel[]).map((lv, i) => (
            <div key={i} className={`flex-1 h-2 rounded-full ${
              currQ?.qLevel === lv
                ? 'bg-primary'
                : correctByLvl[lv] > 0
                ? 'bg-green-500'
                : 'bg-gray-300 dark:bg-gray-600'
            }`} />
          ))}
        </div>

        {/* Question Card */}
        {currQ && (
          <motion.div key={currentIdx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <Card className="p-8">
              <div className="flex items-center gap-2 mb-4">
                <LevelBadge level={currQ.qLevel} size="sm" />
                <span className="text-sm text-gray-500">+{currQ.points} puntos</span>
              </div>

              <h2 className="text-xl font-semibold mb-6">{currQ.question}</h2>

              <div className="space-y-3 mb-6">
                {currQ.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelected(opt)}
                    disabled={showFb}
                    className={`w-full p-4 rounded-lg text-left transition-all border-2 ${
                      showFb
                        ? opt === currQ.correct_answer
                          ? 'bg-green-100 dark:bg-green-900/30 border-green-500'
                          : selected === opt
                          ? 'bg-red-100 dark:bg-red-900/30 border-red-500'
                          : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                        : selected === opt
                        ? 'bg-primary/10 border-primary'
                        : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-primary'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-medium">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                      {showFb && opt === currQ.correct_answer && (
                        <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Feedback */}
              <AnimatePresence>
                {showFb && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`p-4 rounded-lg ${
                      isCorr
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                    }`}
                  >
                    {isCorr ? `¡Correcto! +${currQ.points} puntos` : `Incorrecto. La respuesta correcta era: ${currQ.correct_answer}`}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Next button */}
              {!showFb && (
                <Button onClick={check} disabled={!selected} className="w-full">
                  Siguiente
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
