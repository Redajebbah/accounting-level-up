import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  Question, 
  UserAnswer, 
  TestResult, 
  DIFFICULTY_POINTS, 
  calculateLevel,
  QuestionOption
} from '@/types/test';

export function useTest() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const { data, error } = await supabase
          .from('questions')
          .select('*')
          .order('category')
          .order('difficulty');

        if (error) throw error;

        // Parse the options from JSONB
        const parsedQuestions: Question[] = (data || []).map(q => ({
          ...q,
          options: q.options as unknown as QuestionOption[],
        }));

        // Shuffle questions for variety
        const shuffled = parsedQuestions.sort(() => Math.random() - 0.5);
        setQuestions(shuffled);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load questions');
      } finally {
        setIsLoading(false);
      }
    }

    fetchQuestions();
  }, []);

  const currentQuestion = questions[currentIndex] || null;
  const totalQuestions = questions.length;
  const progress = totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;
  const isComplete = currentIndex >= totalQuestions && totalQuestions > 0;

  const submitAnswer = useCallback((selectedOptionId: string) => {
    if (!currentQuestion) return;

    const isCorrect = selectedOptionId === currentQuestion.correct_option_id;
    const points = isCorrect ? DIFFICULTY_POINTS[currentQuestion.difficulty] : 0;

    const answer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedOptionId,
      isCorrect,
      points,
    };

    setAnswers(prev => [...prev, answer]);
    
    // Move to next question
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Calculate final result
      const totalScore = answers.reduce((sum, a) => sum + a.points, 0) + points;
      const level = calculateLevel(totalScore);
      
      setTestResult({
        totalScore,
        level,
        answers: [...answers, answer],
      });
      setCurrentIndex(totalQuestions); // Mark as complete
    }
  }, [currentQuestion, currentIndex, totalQuestions, answers]);

  const resetTest = useCallback(() => {
    setCurrentIndex(0);
    setAnswers([]);
    setTestResult(null);
    // Shuffle questions again
    setQuestions(prev => [...prev].sort(() => Math.random() - 0.5));
  }, []);

  return {
    currentQuestion,
    currentIndex,
    totalQuestions,
    progress,
    isLoading,
    error,
    isComplete,
    testResult,
    submitAnswer,
    resetTest,
  };
}
