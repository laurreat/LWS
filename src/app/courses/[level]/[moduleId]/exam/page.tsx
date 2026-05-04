"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Clock, Trophy, ArrowRight, RefreshCw, BookOpen, Volume2, PenTool, MessageSquare, Brain } from "lucide-react";
import Link from "next/link";
import { Button, Card, LevelBadge } from "@/components/ui";
import { useCourses } from "@/hooks/useCourses";
import { useSpeech } from "@/hooks/useSpeech";
import { useAuth } from "@/contexts/AuthContext";
import { GameLevel, Word, Phrase, GrammarQuestion } from "@/types";
import { A1_WORDS, A2_WORDS, B1_WORDS } from "@/data/vocabulary";
import { A1_PHRASES, A2_PHRASES, B1_PHRASES } from "@/data/phrases";
import { A1_GRAMMAR, A2_GRAMMAR, B1_GRAMMAR } from "@/data/grammar";

interface ExamSection {
  id: string;
  title: string;
  description: string;
  icon: any;
  questions: ExamQuestion[];
  currentIndex: number;
  score: number;
  completed: boolean;
}

interface ExamQuestion {
  id: string;
  type: 'vocabulary' | 'grammar' | 'conjugation' | 'writing' | 'listening' | 'speaking';
  question: string;
  correct_answer: string;
  options?: string[];
  points: number;
  userAnswer?: string;
  isCorrect?: boolean;
}

function getWordsForLevel(level: GameLevel): Word[] {
  switch (level) {
    case "A1": return A1_WORDS;
    case "A2": return A2_WORDS;
    case "B1": return B1_WORDS;
    default: return A1_WORDS;
  }
}

function getPhrasesForLevel(level: GameLevel) {
  switch (level) {
    case "A1": return A1_PHRASES;
    case "A2": return A2_PHRASES;
    case "B1": return B1_PHRASES;
    default: return A1_PHRASES;
  }
}

function getGrammarForLevel(level: GameLevel) {
  switch (level) {
    case "A1": return A1_GRAMMAR;
    case "A2": return A2_GRAMMAR;
    case "B1": return B1_GRAMMAR;
    default: return A1_GRAMMAR;
  }
}

function generateExamSections(level: GameLevel): ExamSection[] {
  const words = getWordsForLevel(level);
  const phrases = getPhrasesForLevel(level);
  const grammar = getGrammarForLevel(level);
  
  // Section 1: Vocabulary
  const vocabQuestions: ExamQuestion[] = words.slice(0, 5).map((w, idx) => {
    const otherWords = words.filter((ow: Word) => ow.id !== w.id);
    const wrongOptions = [...otherWords].sort(() => Math.random() - 0.5).slice(0, 3).map((ow: Word) => ow.translation);
    return {
      id: `vocab-${idx}`,
      type: 'vocabulary',
      question: `What is "${w.word}" in Spanish?`,
      correct_answer: w.translation,
      options: [...wrongOptions, w.translation].sort(() => Math.random() - 0.5),
      points: 10,
    };
  });
  
  // Section 2: Grammar
  const grammarQuestions: ExamQuestion[] = grammar.slice(0, 5).map((g: GrammarQuestion, idx) => ({
    id: `grammar-${idx}`,
    type: 'grammar',
    question: g.question,
    correct_answer: g.options[g.correctIndex],
    options: g.options,
    points: 15,
  }));
  
  // Section 3: Conjugation (fill in the blank)
  const conjugationQuestions: ExamQuestion[] = [
    {
      id: 'conj-1',
      type: 'conjugation',
      question: level === 'A1' ? 'Complete: I ___ a student (be)' : 
                       level === 'A2' ? 'Complete: She ___ to school yesterday (go)' :
                       'Complete: If I ___ rich, I would travel (be)',
      correct_answer: level === 'A1' ? 'am' : 
                       level === 'A2' ? 'went' : 
                       'were',
      points: 20,
    },
    {
      id: 'conj-2',
      type: 'conjugation',
      question: level === 'A1' ? 'Complete: They ___ friends (be)' : 
                       level === 'A2' ? 'Complete: They have ___ to Paris (go)' :
                       'Complete: I wish I ___ harder (study)',
      correct_answer: level === 'A1' ? 'are' : 
                       level === 'A2' ? 'gone' : 
                       'had studied',
      points: 20,
    },
  ];
  
  // Section 4: Writing
  const writingQuestions: ExamQuestion[] = phrases.slice(0, 3).map((p: Phrase, idx) => ({
    id: `writing-${idx}`,
    type: 'writing',
    question: `Write this sentence: "${p.sentence}"`,
    correct_answer: p.sentence,
    points: 25,
  }));
  
  // Section 5: Listening
  const listeningQuestions: ExamQuestion[] = phrases.slice(3, 6).map((p: Phrase, idx) => {
    const words = p.sentence.split(' ');
    const blankIndex = Math.floor(Math.random() * words.length);
    const blankWord = words[blankIndex];
    const questionText = words.map((w: string, i: number) => i === blankIndex ? '___' : w).join(' ');
    return {
      id: `listening-${idx}`,
      type: 'listening',
      question: `Listen and fill in the blank: "${questionText}"`,
      correct_answer: blankWord,
      points: 20,
    };
  });
  
  // Section 6: Speaking
  const speakingQuestions: ExamQuestion[] = phrases.slice(6, 9).map((p: Phrase, idx) => ({
    id: `speaking-${idx}`,
    type: 'speaking',
    question: `Pronounce this sentence correctly: "${p.sentence}"`,
    correct_answer: p.sentence,
    points: 30,
  }));
  
  return [
    {
      id: 'vocabulary',
      title: 'Vocabulary',
      description: 'Choose the correct translation',
      icon: BookOpen,
      questions: vocabQuestions,
      currentIndex: 0,
      score: 0,
      completed: false,
    },
    {
      id: 'grammar',
      title: 'Grammar',
      description: 'Select the correct grammar option',
      icon: Brain,
      questions: grammarQuestions,
      currentIndex: 0,
      score: 0,
      completed: false,
    },
    {
      id: 'conjugation',
      title: 'Conjugation',
      description: 'Fill in the correct verb form',
      icon: PenTool,
      questions: conjugationQuestions,
      currentIndex: 0,
      score: 0,
      completed: false,
    },
    {
      id: 'writing',
      title: 'Writing',
      description: 'Write the correct sentence',
      icon: PenTool,
      questions: writingQuestions,
      currentIndex: 0,
      score: 0,
      completed: false,
    },
    {
      id: 'listening',
      title: 'Listening',
      description: 'Listen and complete',
      icon: Volume2,
      questions: listeningQuestions,
      currentIndex: 0,
      score: 0,
      completed: false,
    },
    {
      id: 'speaking',
      title: 'Speaking',
      description: 'Pronounce correctly',
      icon: MessageSquare,
      questions: speakingQuestions,
      currentIndex: 0,
      score: 0,
      completed: false,
    },
  ];
}

export default function ExamPage() {
  const params = useParams();
  const router = useRouter();
  const { submitQuiz } = useCourses();
  const { speak } = useSpeech();
  const { user } = useAuth();
  
  const [sections, setSections] = useState<ExamSection[]>([]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [examState, setExamState] = useState<"select" | "playing" | "finished">("select");
  const [timer, setTimer] = useState(0);
  const [finalResult, setFinalResult] = useState<{ totalScore: number; totalPoints: number; passed: boolean } | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);
  const level = params.level as GameLevel;
  const moduleId = params.moduleId as string;
  
  const currentSection = sections[currentSectionIndex];
  const currentQuestion = currentSection?.questions[currentSection.currentIndex];
  
  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = level === 'A1' ? 'en-US' : 'en-US';
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setTranscript(transcript);
        setCurrentAnswer(transcript);
        setIsRecording(false);
      };
      
      recognitionRef.current.onerror = () => {
        setIsRecording(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [level]);
  
  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      setTranscript('');
      setCurrentAnswer('');
      recognitionRef.current?.start();
      setIsRecording(true);
    }
  };
  
  // Timer
  useEffect(() => {
    if (examState === "playing") {
      timerRef.current = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [examState]);
  
  const startExam = () => {
    setSections(generateExamSections(level));
    setCurrentSectionIndex(0);
    setCurrentAnswer('');
    setShowFeedback(false);
    setIsCorrect(null);
    setExamState("playing");
    setTimer(0);
    setFinalResult(null);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const checkAnswer = () => {
    if (!currentQuestion || !currentAnswer.trim()) return;
    
    let correct = false;
    if (currentQuestion.type === 'writing') {
      // For writing, do a flexible comparison
      const normalize = (s: string) => s.toLowerCase().replace(/[.,!?]/g, '').replace(/\s+/g, ' ').trim();
      correct = normalize(currentAnswer) === normalize(currentQuestion.correct_answer);
    } else {
      correct = currentAnswer.trim().toLowerCase() === currentQuestion.correct_answer.toLowerCase();
    }
    
    setIsCorrect(correct);
    setShowFeedback(true);
    
    // Update section score
    setSections(prev => prev.map((section, idx) => {
      if (idx !== currentSectionIndex) return section;
      return {
        ...section,
        score: section.score + (correct ? currentQuestion.points : 0),
        questions: section.questions.map(q => 
          q.id === currentQuestion.id 
            ? { ...q, userAnswer: currentAnswer, isCorrect: correct }
            : q
        ),
      };
    }));
    
    // Move to next question or section
    setTimeout(() => {
      setShowFeedback(false);
      setIsCorrect(null);
      setCurrentAnswer('');
      
      setSections(prev => prev.map((section, idx) => {
        if (idx !== currentSectionIndex) return section;
        
        if (section.currentIndex < section.questions.length - 1) {
          // Next question in same section
          return { ...section, currentIndex: section.currentIndex + 1 };
        } else {
          // Section completed
          return { ...section, completed: true };
        }
      }));
      
      // Check if we need to move to next section
      if (currentSection.currentIndex >= currentSection.questions.length - 1) {
        if (currentSectionIndex < sections.length - 1) {
          setCurrentSectionIndex(currentSectionIndex + 1);
        } else {
          // Exam finished
          finishExam();
        }
      }
    }, 1500);
  };
  
  const finishExam = () => {
    const totalScore = sections.reduce((sum, s) => sum + s.score, 0);
    const totalPoints = sections.reduce((sum, s) => sum + s.questions.reduce((qSum, q) => qSum + q.points, 0), 0);
    const percentage = Math.round((totalScore / totalPoints) * 100);
    const passed = percentage >= 70;
    
    setFinalResult({ totalScore, totalPoints, passed });
    setExamState("finished");
    
    if (timerRef.current) clearInterval(timerRef.current);
    
    // Submit to database
    submitQuiz(moduleId, sections.flatMap(s => 
      s.questions
        .filter(q => q.userAnswer)
        .map(q => ({ exerciseId: q.id, answer: q.userAnswer! }))
    ));
  };
  
  const handleRetry = () => {
    setCurrentSectionIndex(0);
    setCurrentAnswer('');
    setShowFeedback(false);
    setIsCorrect(null);
    setExamState("select");
    setFinalResult(null);
  };
  
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
              <Trophy className="w-10 h-10 text-purple-600" />
            </div>
            
            <h1 className="text-4xl font-bold mb-4">Examn del Módulo</h1>
            <div className="flex justify-center mb-4">
              <LevelBadge level={level} />
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Examen comprehensivo con múltiples secciones
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8 text-left">
              {[
                { icon: BookOpen, title: 'Vocabulary', desc: '5 questions' },
                { icon: Brain, title: 'Grammar', desc: '5 questions' },
                { icon: PenTool, title: 'Conjugation', desc: '2 questions' },
                { icon: PenTool, title: 'Writing', desc: '3 questions' },
                { icon: Volume2, title: 'Listening', desc: '3 questions' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <item.icon className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex gap-4 justify-center">
              <Link href={`/courses/${level}`}>
                <Button variant="outline">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Volver
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
  
  if (examState === "finished" && finalResult) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-2xl w-full"
        >
          <Card className="p-8 text-center">
            <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
              finalResult.passed ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
            }`}>
              {finalResult.passed ? (
                <Trophy className="w-12 h-12 text-green-600" />
              ) : (
                <XCircle className="w-12 h-12 text-red-600" />
              )}
            </div>
            
            <h2 className="text-2xl font-bold mb-2">
              {finalResult.passed ? '¡Felicidades!' : 'Inténtalo de nuevo'}
            </h2>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {finalResult.passed 
                ? '¡Has aprobado el examen!' 
                : 'Necesitas 70% para aprobar. ¡Sigue estudiando!'}
            </p>
            
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-6">
              <div className="text-4xl font-bold text-primary mb-2">
                {Math.round((finalResult.totalScore / finalResult.totalPoints) * 100)}%
              </div>
              <p className="text-sm text-gray-500 mb-4">
                {finalResult.totalScore} de {finalResult.totalPoints} puntos
              </p>
              
              {/* Section breakdown */}
              <div className="space-y-2 text-left">
                {sections.map(section => {
                  const sectionScore = section.questions.reduce((sum, q) => sum + (q.isCorrect ? q.points : 0), 0);
                  const sectionTotal = section.questions.reduce((sum, q) => sum + q.points, 0);
                  return (
                    <div key={section.id} className="flex justify-between text-sm">
                      <span>{section.title}</span>
                      <span className={sectionScore >= sectionTotal * 0.7 ? 'text-green-600' : 'text-red-600'}>
                        {sectionScore}/{sectionTotal}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="space-y-3">
              {finalResult.passed ? (
                <Link href={`/courses/${level}`}>
                  <Button className="w-full">
                    Continuar
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              ) : (
                <Button className="w-full" onClick={handleRetry}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Intentar de nuevo
                </Button>
              )}
              
              <Link href={`/courses/${level}`} className="block">
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
  
  // Playing state
  const progress = sections.reduce((sum, s) => sum + (s.completed ? s.questions.length : s.currentIndex), 0) / 
                sections.reduce((sum, s) => sum + s.questions.length, 0) * 100;
  
  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Examen - {currentSection?.title}</h1>
            <p className="text-sm text-gray-500">
              Sección {currentSectionIndex + 1} de {sections.length}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-amber-500">
              <Clock className="w-5 h-5 inline mr-1" />
              {formatTime(timer)}
            </p>
          </div>
        </div>
        
        {/* Overall Progress */}
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-8">
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Section Progress */}
        <div className="flex gap-2 mb-8">
          {sections.map((section, idx) => (
            <div 
              key={section.id}
              className={`flex-1 h-2 rounded-full ${
                idx < currentSectionIndex || section.completed
                  ? 'bg-green-500'
                  : idx === currentSectionIndex
                  ? 'bg-primary'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
        
        {/* Question Card */}
        {currentQuestion && (
          <motion.div
            key={`${currentSectionIndex}-${currentSection.currentIndex}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="p-8">
              <div className="flex items-center gap-2 mb-4">
                <currentSection.icon className="w-5 h-5 text-primary" />
                <span className="text-sm text-gray-500">
                  Pregunta {currentSection.currentIndex + 1} de {currentSection.questions.length}
                </span>
                <span className="ml-auto text-sm font-medium text-primary">
                  +{currentQuestion.points} puntos
                </span>
              </div>
              
              <h2 className="text-xl font-semibold mb-6">{currentQuestion.question}</h2>
              
              {/* Listening: Play audio button */}
              {currentQuestion.type === 'listening' && (
                <button
                  onClick={() => speak(currentQuestion.correct_answer)}
                  className="mb-6 px-4 py-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center gap-2 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                >
                  <Volume2 className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-600">Escuchar</span>
                </button>
              )}
              
              {/* Speaking: Microphone button */}
              {currentQuestion.type === 'speaking' && (
                <div className="mb-6">
                  <button
                    onClick={toggleRecording}
                    className={`px-6 py-4 rounded-xl flex items-center gap-3 mx-auto transition-all ${
                      isRecording 
                        ? 'bg-red-100 text-red-600 border-2 border-red-500 animate-pulse' 
                        : 'bg-primary/10 text-primary border-2 border-primary hover:bg-primary/20'
                    }`}
                  >
                    <MessageSquare className={`w-6 h-6 ${isRecording ? 'text-red-600' : 'text-primary'}`} />
                    <span className="font-medium">
                      {isRecording ? 'Grabando...' : 'Presiona para hablar'}
                    </span>
                  </button>
                  {transcript && (
                    <p className="mt-3 text-center text-sm text-gray-600 dark:text-gray-400">
                      Has dicho: "{transcript}"
                    </p>
                  )}
                </div>
              )}
              
              {/* Multiple choice options */}
              {currentQuestion.options && (
                <div className="space-y-3 mb-6">
                  {currentQuestion.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentAnswer(option)}
                      disabled={showFeedback}
                      className={`w-full p-4 rounded-lg text-left transition-all border-2 ${
                        showFeedback
                          ? option === currentQuestion.correct_answer
                            ? 'bg-green-100 dark:bg-green-900/30 border-green-500'
                            : currentAnswer === option
                            ? 'bg-red-100 dark:bg-red-900/30 border-red-500'
                            : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                          : currentAnswer === option
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
              )}
              
              {/* Writing input */}
              {!currentQuestion.options && (
                <div className="mb-6">
                  <textarea
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    placeholder="Escribe tu respuesta..."
                    className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-primary focus:outline-none bg-transparent"
                    rows={3}
                    disabled={showFeedback}
                  />
                </div>
              )}
              
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
                    {isCorrect 
                      ? '¡Correcto! +' + currentQuestion.points + ' puntos'
                      : 'Incorrecto. La respuesta correcta era: ' + currentQuestion.correct_answer}
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Submit button */}
              {!showFeedback && (
                <Button 
                  onClick={checkAnswer}
                  disabled={!currentAnswer.trim()}
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
