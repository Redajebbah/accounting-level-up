import { useLanguage, Language } from '@/contexts/LanguageContext';
import { getTranslations, Translations } from '@/i18n/translations';
import { Question, QuestionOption } from '@/types/test';

export function useTranslations(): Translations {
  const { language } = useLanguage();
  return getTranslations(language);
}

// Helper to get localized question text
export function getLocalizedQuestion(question: Question, language: Language): string {
  if (language === 'en' && question.question_text_en) {
    return question.question_text_en;
  }
  return question.question_text;
}

// Helper to get localized option text
export function getLocalizedOption(option: QuestionOption, language: Language): string {
  if (language === 'en' && option.text_en) {
    return option.text_en;
  }
  return option.text;
}

// Helper to get localized options array
export function getLocalizedOptions(options: QuestionOption[], language: Language): QuestionOption[] {
  return options.map(option => ({
    ...option,
    text: getLocalizedOption(option, language),
  }));
}
