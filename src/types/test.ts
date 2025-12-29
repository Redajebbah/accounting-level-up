export type QuestionCategory = 
  | 'accounting_basics' 
  | 'chart_of_accounts' 
  | 'vat' 
  | 'accounting_entries' 
  | 'financial_analysis';

export type DifficultyLevel = 'easy' | 'medium' | 'advanced';

export type CandidateLevel = 'beginner' | 'intermediate' | 'advanced';

export type CandidateStatus = 'new' | 'contacted' | 'enrolled';

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  question_text: string;
  category: QuestionCategory;
  difficulty: DifficultyLevel;
  options: QuestionOption[];
  correct_option_id: string;
}

export interface UserAnswer {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
  points: number;
}

export interface TestResult {
  totalScore: number;
  level: CandidateLevel;
  answers: UserAnswer[];
}

export interface Candidate {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  score: number;
  level: CandidateLevel;
  recommended_training: string;
  status: CandidateStatus;
  answers: UserAnswer[] | null;
  created_at: string;
  updated_at: string;
}

export interface LeadFormData {
  fullName: string;
  email: string;
  phone: string;
}

export const DIFFICULTY_POINTS: Record<DifficultyLevel, number> = {
  easy: 1,
  medium: 2,
  advanced: 3,
};

export const LEVEL_THRESHOLDS = {
  beginner: { min: 0, max: 15 },
  intermediate: { min: 16, max: 30 },
  advanced: { min: 31, max: Infinity },
};

export function calculateLevel(score: number): CandidateLevel {
  if (score <= LEVEL_THRESHOLDS.beginner.max) return 'beginner';
  if (score <= LEVEL_THRESHOLDS.intermediate.max) return 'intermediate';
  return 'advanced';
}

export function getRecommendedTraining(level: CandidateLevel): string {
  switch (level) {
    case 'beginner':
      return 'Fundamentals of Accounting - Complete Beginner Course';
    case 'intermediate':
      return 'Advanced Accounting Techniques - Intermediate Program';
    case 'advanced':
      return 'Expert Financial Analysis - Advanced Masterclass';
  }
}

export const CATEGORY_LABELS: Record<QuestionCategory, string> = {
  accounting_basics: 'Accounting Basics',
  chart_of_accounts: 'Chart of Accounts',
  vat: 'VAT (TVA)',
  accounting_entries: 'Accounting Entries',
  financial_analysis: 'Financial Analysis',
};
