"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Clock, Trophy, ArrowRight, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useCourses } from "@/hooks/useCourses";
import { Button, Card } from "@/components/ui";
import type { Exercise } from "@/types";

// Mock quiz data - in real app this comes from database
const mockExercises: Exercise[] = [
  {
    id: "1",
    lesson_id: "1",
    question: "What is the correct translation of 'Hola, soy María'?",
    correct_answer: "Hello, I'm María",
    options: ["Hello, I'm María", "Hi María", "Good morning María", "What's up María"],
    exercise_type: "multiple_choice",
    points: 10,
  },
  {
    id: "2",
    lesson_id: "1",
    question: "Choose the correct article: '___ apple'",
    correct_answer: "an",
    options: ["a", "an", "the", "some"],
    exercise_type: "multiple_choice",
    points: 10,
  },
  {
    id: "3",
    lesson_id: "1",
    question: "Complete: 'I ___ a student'",
    correct_answer: "am",
    options: ["is", "are", "am", "be"],
    exercise_type: "multiple_choice",
    points: 10,
  },
  {
    id: "4",
    lesson_id: "1",
    question: "What is 'libro' in English?",
    correct_answer: "book",
    options: ["book", "laptop", "notebook", "library"],
    exercise_type: "multiple_choice",
    points: 10,
  },
  {
    id: "5",
    lesson_id: "1",
    question: "Select the correct form: 'She ___ to the store yesterday'",
    correct_answer: "went",
    options: ["goes", "went", "gone", "going"],
    exercise_type: "multiple_choice",
    points: 10,
  },
];

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const { submitQuiz } = useCourses();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<{ score: number; passed: boolean; correct: number; total: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const moduleId = params.moduleId as string;
  const level = params.level as string;
  const exercises = mockExercises;
  const question = exercises[currentQuestion];

  const handleAnswer = async (answer: string) => {
    const newAnswers = { ...answers, [question.id]: answer };
    setAnswers(newAnswers);
    
    // Show immediate feedback
    const correct = answer === question.correct_answer;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    // Wait then move to next question
    setTimeout(() => {
      setShowFeedback(false);
      if (currentQuestion < exercises.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Submit quiz
        finishQuiz(newAnswers);
      }
    }, 1500);
  };

  const finishQuiz = async (finalAnswers: Record<string, string>) => {
    setLoading(true);
    const answersArray = Object.entries(finalAnswers).map(([exerciseId, answer]) => ({
      exerciseId,
      answer,
    }));
    
    const quizResult = await submitQuiz(moduleId, answersArray);
    
    if (quizResult) {
      setResult(quizResult);
    } else {
      // Calculate locally if API fails
      let correct = 0;
      for (const ans of answersArray) {
        const ex = exercises.find(e => e.id === ans.exerciseId);
        if (ex && ex.correct_answer === ans.answer) correct++;
      }
      const score = Math.round((correct / exercises.length) * 100);
      setResult({ score, passed: score >= 70, correct, total: exercises.length });
    }
    
    setShowResult(true);
    setLoading(false);
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setResult(null);
  };

  if (showResult && result) {
    return (
      <div className="min-h-screen flex items-center justify-center py-8 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <Card className="text-center p-8">
            <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${
              result.passed ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"
            }`}>
              {result.passed ? (
                <Trophy className="w-12 h-12 text-green-600" />
              ) : (
                <XCircle className="w-12 h-12 text-red-600" />
              )}
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {result.passed ? "¡Felicidades!" : "Inténtalo de nuevo"}
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {result.passed 
                ? "¡Has completado el módulo exitosamente!" 
                : "Necesitas 70% para aprobar. ¡Sigue estudiando!"}
            </p>

            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6">
              <div className="text-4xl font-bold text-primary mb-2">{result.score}%</div>
              <p className="text-sm text-gray-500">
                {result.correct} de {result.total} respuestas correctas
              </p>
            </div>

            <div className="space-y-3">
              {result.passed ? (
                <Link href="/courses">
                  <Button className="w-full">
                    Continuar al siguiente módulo
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              ) : (
                <Button className="w-full" onClick={handleRetry}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Intentar de nuevo
                </Button>
              )}
              
              <Link href="/courses" className="block">
                <Button variant="ghost" className="w-full">
                  Volver a cursos
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Pregunta {currentQuestion + 1} de {exercises.length}</span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {Object.keys(answers).length} respondidas
            </span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / exercises.length) * 100)}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card className="p-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-purple-500/10 text-purple-500 rounded-full text-sm">
                Quiz
              </span>
              <span className="text-sm text-gray-500">
                +{question.points} puntos
              </span>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              {question.question}
            </h2>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={showFeedback || loading}
                  className={`w-full p-4 rounded-lg text-left transition-all ${
                    showFeedback
                      ? option === question.correct_answer
                        ? "bg-green-100 dark:bg-green-900/30 border-green-500"
                        : answers[question.id] === option
                        ? "bg-red-100 dark:bg-red-900/30 border-red-500"
                        : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-primary hover:bg-primary/5"
                  } border-2`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-medium">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-gray-900 dark:text-white">{option}</span>
                    {showFeedback && option === question.correct_answer && (
                      <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                    )}
                    {showFeedback && answers[question.id] === option && option !== question.correct_answer && (
                      <XCircle className="w-5 h-5 text-red-500 ml-auto" />
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
                  className={`mt-6 p-4 rounded-lg ${
                    isCorrect 
                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                      : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                  }`}
                >
                  {isCorrect ? "¡Correcto! +" + question.points + " puntos" : "Incorrecto. La respuesta correcta era: " + question.correct_answer}
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}