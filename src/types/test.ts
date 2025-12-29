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
      return 'Les Fondamentaux de la Comptabilité - Formation Débutant';
    case 'intermediate':
      return 'Techniques Comptables Avancées - Programme Intermédiaire';
    case 'advanced':
      return 'Analyse Financière Expert - Masterclass Avancée';
  }
}

export const CATEGORY_LABELS: Record<QuestionCategory, string> = {
  accounting_basics: 'Bases Comptables',
  chart_of_accounts: 'Plan Comptable',
  vat: 'TVA',
  accounting_entries: 'Écritures Comptables',
  financial_analysis: 'Analyse Financière',
};

export const DIFFICULTY_LABELS: Record<DifficultyLevel, string> = {
  easy: 'Facile',
  medium: 'Moyen',
  advanced: 'Avancé',
};

export const LEVEL_LABELS: Record<CandidateLevel, string> = {
  beginner: 'Débutant',
  intermediate: 'Intermédiaire',
  advanced: 'Avancé',
};

export const STATUS_LABELS: Record<CandidateStatus, string> = {
  new: 'Nouveau',
  contacted: 'Contacté',
  enrolled: 'Inscrit',
};
