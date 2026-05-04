"use client";

import { useState, useCallback, useEffect } from "react";
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

interface LevelQuestion {
  id: string;
  level: GameLevel;
  question: string;
  correct_answer: string;
  options: string[];
  points: number;
}

function generateLevelAssessment(): LevelQuestion[] {
  const questions: LevelQuestion[] = [];
  
  // A1 Questions (5)
  const a1Sample = A1_WORDS.slice(0, 3);
  a1Sample.forEach((w, idx) => {
    const others = A1_WORDS.filter(ow => ow.id !== w.id);
    const wrong = others.slice(0, 3).map(ow => ow.translation);
    questions.push({
      id: `a1-vocab-${idx}`,
      level: 'A1',
      question: `What is "${w.word}" in Spanish?`,
      correct_answer: w.translation,
      options: [...wrong, w.translation].sort(() => Math.random() - 0.5),
      points: 10,
    });
  });

  // A1 Grammar
  questions.push({
    id: 'a1-grammar-1',
    level: 'A1',
    question: 'Complete: "I ___ a student"',
    correct_answer: 'am',
    options: ['am', 'is', 'are', 'be'],
    points: 10,
  });

  // A2 Questions (5)
  const a2Sample = A2_PHRASES.slice(0, 2);
  a2Sample.forEach((p, idx) => {
    questions.push({
      id: `a2-phrase-${idx}`,
      level: 'A2',
      question: `Select correct translation: "${p.sentence}"`,
      correct_answer: p.translation,
      options: [p.translation, 'Wrong 1', 'Wrong 2', 'Wrong 3'].sort(() => Math.random() - 0.5),
      points: 15,
    });
  });

  // A2 Grammar
  questions.push({
    id: 'a2-grammar-1',
    level: 'A2',
    question: 'Past of "go":',
    correct_answer: 'went',
    options: ['went', 'goed', 'gone', 'goes'],
    points: 15,
  });

  // B1 Questions (5)
  const b1Grammar = B1_GRAMMAR.slice(0, 2);
  b1Grammar.forEach((g, idx) => {
    questions.push({
      id: `b1-grammar-${idx}`,
      level: 'B1',
      question: g.question,
      correct_answer: g.options[g.correctIndex],
      options: g.options,
      points: 20,
    });
  });

  // B1 Grammar
  questions.push({
    id: 'b1-grammar-3',
    level: 'B1',
    question: 'Conditional: "If I ___ rich, I would travel"',
    correct_answer: 'were',
    options: ['was', 'were', 'am', 'be'],
    points: 20,
  });

  return questions;
}

export default function LevelAssessmentPage() {
  const router = useRouter();
  const { user, progress } = useAuth();
  const supabase = createClient();
  
  const [questions, setQuestions] = useState<LevelQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [levelsCorrect, setLevelsCorrect] = useState<Record<GameLevel, number>>({
    A1: 0,
    A2: 0,
    B1: 0,
  });
  const [examState, setExamState] = useState<"select" | "playing" | "finished">("select");
  const [detectedLevel, setDetectedLevel] = useState<GameLevel | null>(null);
  const [saving, setSaving] = useState(false);

  const totalQuestions = 12;
  const currentQuestion = questions[currentIndex];

  const startExam = () => {
    setQuestions(generateLevelAssessment());
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsCorrect(null);
    setScore(0);
    setLevelsCorrect({ A1: 0, A2: 0, B1: 0 });
    setExamState("playing");
    setDetectedLevel(null);
  };

  const checkAnswer = () => {
    if (!currentQuestion || !selectedAnswer) return;
    
    const correct = selectedAnswer === currentQuestion.correct_answer;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      setScore(prev => prev + currentQuestion.points);
      setLevelsCorrect(prev => ({
        ...prev,
        [currentQuestion.level]: prev[currentQuestion.level] + 1,
      }));
    }
    
    setTimeout(() => {
      setShowFeedback(false);
      setIsCorrect(null);
      setSelectedAnswer(null);
      
      if (currentIndex < totalQuestions - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        finishExam();
      }
    }, 1500);
  };

  const finishExam = useCallback(async () => {
    // Determine level based on correct answers per level
    let detected: GameLevel = 'A1';
    
    if (levelsCorrect.B1 >= 2) {
      detected = 'B1';
    } else if (levelsCorrect.A2 >= 2) {
      detected = 'A2';
    }
    
    setDetectedLevel(detected);
    setExamState("finished");
    
    // Save to database
    if (user) {
      setSaving(true);
      try {
        // Update level_progress to unlock courses up to detected level
        const updates: any = {
          level_progress: {
            ...progress?.level_progress,
            A1: { ...progress?.level_progress?.A1, unlocked: true },
          },
        };
        
        if (detected === 'A2' || detected === 'B1') {
          updates.level_progress.A2 = { ...progress?.level_progress?.A2, unlocked: true };
        }
        
        if (detected === 'B1') {
          updates.level_progress.B1 = { ...progress?.level_progress?.B1, unlocked: true };
        }
        
        const { error } = await supabase
          .from("user_progress")
          .update(updates)
          .eq("user_id", user.id);
        
        if (error) {
          console.error("Error saving level:", error.message);
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setSaving(false);
      }
    }
  }, [user, progress, levelsCorrect]);

  if (examState === "finished" && detectedLevel) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-2xl w-full"
        >
          <Card className="p-8 text-center">
            <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
              detectedLevel === 'B1' ? 'bg-purple-100 dark:bg-purple-900/30' :
              detectedLevel === 'A2' ? 'bg-blue-100 dark:bg-blue-900/30' :
              'bg-green-100 dark:bg-green-900/30'
            }`}>
              <Trophy className={`w-12 h-12 ${
                detectedLevel === 'B1' ? 'text-purple-600' :
                detectedLevel === 'A2' ? 'text-blue-600' :
                'text-green-600'
              }`} />
            </div>
            
            <h2 className="text-2xl font-bold mb-2">
              ¡Nivel Detectado!
            </h2>
            
            <div className="flex justify-center mb-4">
              <LevelBadge level={detectedLevel} size="lg" />
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {detectedLevel === 'A1' && 'Has demostrado un nivel principiante. ¡Comienza con los cursos A1!'}
              {detectedLevel === 'A2' && '¡Buen trabajo! Tienes conocimientos de nivel elemental. Desbloqueamos A1 y A2.'}
              {detectedLevel === 'B1' && '¡Impresionante! Tienes un nivel intermedio. Tienes acceso a todos los cursos.'}
            </p>
            
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-6">
              <div className="text-4xl font-bold text-primary mb-2">{score} puntos</div>
              <p className="text-sm text-gray-500 mb-4">Puntuación total</p>
              
              <div className="space-y-2 text-left">
                {[
                  { level: 'A1' as GameLevel, score: levelsCorrect.A1, total: 6 },
                  { level: 'A2' as GameLevel, score: levelsCorrect.A2, total: 4 },
                  { level: 'B1' as GameLevel, score: levelsCorrect.B1, total: 2 },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <LevelBadge level={item.level} size="sm" />
                    <span className={item.score >= 2 ? 'text-green-600' : 'text-red-600'}>
                      {item.score}/{item.total} correctas
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
              
              <Button variant="ghost" className="w-full" onClick={startExam}>
                Realizar Examen Nuevamente
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (examState === "select") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-2xl w-full"
        >
          <Card className="p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
              <Brain className="w-10 h-10 text-purple-600" />
            </div>
            
            <h1 className="text-4xl font-bold mb-4">Examen de Nivel Inicial</h1>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Este examen determinará tu nivel de inglés actual y desbloqueará los cursos correspondientes.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8 text-left">
              {[
                { level: 'A1' as GameLevel, count: 6, desc: 'Preguntas básicas' },
                { level: 'A2' as GameLevel, count: 4, desc: 'Gramática elemental' },
                { level: 'B1' as GameLevel, count: 2, desc: 'Retos intermedios' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <LevelBadge level={item.level} size="sm" />
                  <div>
                    <p className="font-medium text-sm">{item.count} preguntas</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
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
              <Button onClick={startExam}>
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
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Examen de Nivel</h1>
            <p className="text-sm text-gray-500">
              Pregunta {currentIndex + 1} de {totalQuestions}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-amber-500">{score}</p>
            <p className="text-xs text-gray-500">Puntos</p>
          </div>
        </div>
        
        {/* Progress */}
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-8">
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Level indicators */}
        <div className="flex gap-2 mb-8">
          {(['A1', 'A2', 'B1'] as GameLevel[]).map((level, idx) => (
            <div 
              key={level}
              className={`flex-1 h-2 rounded-full ${
                currentQuestion?.level === level
                  ? 'bg-primary'
                  : levelsCorrect[level] > 0
                  ? 'bg-green-500'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
        
        {/* Question Card */}
        {currentQuestion && (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="p-8">
              <div className="flex items-center gap-2 mb-4">
                <LevelBadge level={currentQuestion.level} size="sm" />
                <span className="text-sm text-gray-500">
                  +{currentQuestion.points} puntos
                </span>
              </div>
              
              <h2 className="text-xl font-semibold mb-6">{currentQuestion.question}</h2>
              
              <div className="space-y-3 mb-6">
                {currentQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedAnswer(option)}
                    disabled={showFeedback}
                    className={`w-full p-4 rounded-lg text-left transition-all border-2 ${
                      showFeedback
                        ? option === currentQuestion.correct_answer
                          ? 'bg-green-100 dark:bg-green-900/30 border-green-500'
                          : selectedAnswer === option
                          ? 'bg-red-100 dark:bg-red-900/30 border-red-500'
                          : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                        : selectedAnswer === option
                        ? 'bg-primary/10 border-primary'
                        : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-primary'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-medium">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                      {showFeedback && option === currentQuestion.correct_answer && (
                        <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Feedback */}
              <AnimatePresence>
                {showFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`p-4 rounded-lg ${
                      isCorrect 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                    }`}
                  >
                    {isCorrect ? '¡Correcto! +' + currentQuestion.points + ' puntos' : 'Incorrecto. La respuesta correcta era: ' + currentQuestion.correct_answer}
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Submit button */}
              {!showFeedback && (
                <Button 
                  onClick={checkAnswer}
                  disabled={!selectedAnswer}
                  className="w-full"
                >
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
