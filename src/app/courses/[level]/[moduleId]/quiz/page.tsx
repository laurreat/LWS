"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Clock, Trophy, ArrowRight, RefreshCw, Loader2 } from "lucide-react";
import Link from "next/link";
import { useCourses } from "@/hooks/useCourses";
import { Button, Card } from "@/components/ui";
import type { Exercise } from "@/types";

// Generate questions based on level - more questions for higher levels
function generateLevelQuestions(level: string): Exercise[] {
  const baseQuestions: Exercise[] = [
    {
      id: `gen-1-${level}`,
      lesson_id: "",
      question: "What is the correct translation of 'Hola, soy María'?",
      correct_answer: "Hello, I'm María",
      options: ["Hello, I'm María", "Hi María", "Good morning María", "What's up María"],
      exercise_type: "multiple_choice",
      points: 10,
    },
    {
      id: `gen-2-${level}`,
      lesson_id: "",
      question: "Choose the correct article: '___ apple'",
      correct_answer: "an",
      options: ["a", "an", "the", "some"],
      exercise_type: "multiple_choice",
      points: 10,
    },
    {
      id: `gen-3-${level}`,
      lesson_id: "",
      question: "Complete: 'I ___ a student'",
      correct_answer: "am",
      options: ["is", "are", "am", "be"],
      exercise_type: "multiple_choice",
      points: 10,
    },
  ];

  if (level === "A1") {
    // A1: 5 questions (basic)
    return [
      ...baseQuestions,
      {
        id: `gen-4-${level}`,
        lesson_id: "",
        question: "What is 'libro' in English?",
        correct_answer: "book",
        options: ["book", "laptop", "notebook", "library"],
        exercise_type: "multiple_choice",
        points: 10,
      },
      {
        id: `gen-5-${level}`,
        lesson_id: "",
        question: "How do you say 'good morning'?",
        correct_answer: "Buenos días",
        options: ["Buenos días", "Buenas tardes", "Buenas noches", "Hola"],
        exercise_type: "multiple_choice",
        points: 10,
      },
    ];
  }

  if (level === "A2") {
    // A2: 8 questions (intermediate)
    return [
      ...baseQuestions,
      {
        id: `gen-4-${level}`,
        lesson_id: "",
        question: "Select the correct past form: 'She ___ to the store yesterday'",
        correct_answer: "went",
        options: ["goes", "went", "gone", "going"],
        exercise_type: "multiple_choice",
        points: 15,
      },
      {
        id: `gen-5-${level}`,
        lesson_id: "",
        question: "Which is the comparative? 'This book is ___ than that one'",
        correct_answer: "more interesting",
        options: ["interesting", "more interesting", "most interesting", "interestinger"],
        exercise_type: "multiple_choice",
        points: 15,
      },
      {
        id: `gen-6-${level}`,
        lesson_id: "",
        question: "Complete: 'I have ___ to Paris three times'",
        correct_answer: "been",
        options: ["gone", "been", "went", "go"],
        exercise_type: "multiple_choice",
        points: 15,
      },
      {
        id: `gen-7-${level}`,
        lesson_id: "",
        question: "Which modal expresses ability?",
        correct_answer: "can",
        options: ["can", "must", "should", "will"],
        exercise_type: "multiple_choice",
        points: 15,
      },
      {
        id: `gen-8-${level}`,
        lesson_id: "",
        question: "Select: 'They ___ playing football now'",
        correct_answer: "are",
        options: ["is", "are", "was", "were"],
        exercise_type: "multiple_choice",
        points: 15,
      },
    ];
  }

  // B1: 12 questions (more challenging)
  return [
    ...baseQuestions,
    {
      id: `gen-4-${level}`,
      lesson_id: "",
      question: "Select the correct form: 'If I ___ rich, I would travel the world'",
      correct_answer: "were",
      options: ["am", "was", "were", "be"],
      exercise_type: "multiple_choice",
      points: 20,
    },
    {
      id: `gen-5-${level}`,
      lesson_id: "",
      question: "Choose the correct passive voice: 'The book ___ by millions'",
      correct_answer: "has been read",
      options: ["read", "is read", "has been read", "was reading"],
      exercise_type: "multiple_choice",
      points: 20,
    },
    {
      id: `gen-6-${level}`,
      lesson_id: "",
      question: "Complete: 'I wish I ___ harder for the exam'",
      correct_answer: "had studied",
      options: ["studied", "had studied", "have studied", "would study"],
      exercise_type: "multiple_choice",
      points: 20,
    },
    {
      id: `gen-7-${level}`,
      lesson_id: "",
      question: "Which sentence is correct?",
      correct_answer: "He suggested going to the cinema",
      options: ["He suggested to go to the cinema", "He suggested going to the cinema", "He suggested go to the cinema", "He suggested that go to the cinema"],
      exercise_type: "multiple_choice",
      points: 20,
    },
    {
      id: `gen-8-${level}`,
      lesson_id: "",
      question: "Select the correct third conditional: 'If I ___ you, I would have come'",
      correct_answer: "had been",
      options: ["was", "were", "had been", "would be"],
      exercise_type: "multiple_choice",
      points: 20,
    },
    {
      id: `gen-9-${level}`,
      lesson_id: "",
      question: "Choose the correct causative: 'I ___ my car washed'",
      correct_answer: "had",
      options: ["made", "got", "had", "let"],
      exercise_type: "multiple_choice",
      points: 20,
    },
    {
      id: `gen-10-${level}`,
      lesson_id: "",
      question: "Which is an inversion?",
      correct_answer: "Never have I seen such a thing",
      options: ["I have never seen such a thing", "Never have I seen such a thing", "Never I have seen such a thing", "I never have seen such a thing"],
      exercise_type: "multiple_choice",
      points: 20,
    },
    {
      id: `gen-11-${level}`,
      lesson_id: "",
      question: "Complete: 'By the time we arrive, they ___ already left'",
      correct_answer: "will have",
      options: ["will", "will have", "would have", "have"],
      exercise_type: "multiple_choice",
      points: 20,
    },
    {
      id: `gen-12-${level}`,
      lesson_id: "",
      question: "Select the correct reported speech: 'He said he ___ coming'",
      correct_answer: "was",
      options: ["is", "was", "has been", "had been"],
      exercise_type: "multiple_choice",
      points: 20,
    },
  ];
}

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const { submitQuiz, fetchExercisesByModule } = useCourses();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<{ score: number; passed: boolean; correct: number; total: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loadingExercises, setLoadingExercises] = useState(true);

  const moduleId = params.moduleId as string;
  const level = params.level as string;

  // Fetch exercises for this module
  useEffect(() => {
    const loadExercises = async () => {
      setLoadingExercises(true);
      const data = await fetchExercisesByModule(moduleId);
      if (data && data.length > 0) {
        setExercises(data);
      } else {
        // Fallback: generate level-appropriate questions if no exercises in DB
        setExercises(generateLevelQuestions(level));
      }
      setLoadingExercises(false);
    };
    loadExercises();
  }, [moduleId, level, fetchExercisesByModule]);

  const question = exercises[currentQuestion];

  // Show loading state
  if (loadingExercises) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-gray-600 dark:text-gray-400">Cargando preguntas...</p>
        </div>
      </div>
    );
  }

  // No questions available
  if (!exercises || exercises.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="text-center p-8 max-w-md">
          <p className="text-gray-600 dark:text-gray-400 mb-4">No hay preguntas disponibles para este módulo.</p>
          <Link href="/courses">
            <Button>Volver a cursos</Button>
          </Link>
        </Card>
      </div>
    );
  }

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

    // Check if exercises are generated (not from DB)
    const isGenerated = exercises.some(e => e.id.includes('gen-'));

    // Pass exercises to submitQuiz if they're generated
    const quizResult = await submitQuiz(
      moduleId, 
      answersArray,
      isGenerated ? exercises : undefined
    );
    
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
            {(() => {
              const progress = ((currentQuestion + 1) / exercises.length) * 100;
              return (
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              );
            })()}
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