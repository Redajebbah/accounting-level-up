import { Language } from '@/contexts/LanguageContext';
import { QuestionCategory, DifficultyLevel, CandidateLevel } from '@/types/test';

export interface Translations {
  // Common
  common: {
    loading: string;
    error: string;
    retry: string;
  };
  
  // Hero
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    titleSuffix: string;
    subtitle: string;
    cta: string;
    feature1Title: string;
    feature1Description: string;
    feature2Title: string;
    feature2Description: string;
    feature3Title: string;
    feature3Description: string;
  };
  
  // Progress Bar
  progressBar: {
    progress: string;
  };
  
  // Question Card
  questionCard: {
    questionOf: string; // "Question {current} sur {total}"
    nextQuestion: string;
    finishTest: string;
  };
  
  // Lead Form
  leadForm: {
    title: string;
    subtitle: string;
    fullName: string;
    fullNamePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    submit: string;
    privacyNote: string;
    errors: {
      nameMin: string;
      nameTooLong: string;
      emailInvalid: string;
      emailTooLong: string;
      phoneMin: string;
      phoneTooLong: string;
    };
  };
  
  // Result Card
  resultCard: {
    congratulations: string; // "Félicitations, {name} !"
    completedTest: string;
    yourScore: string;
    points: string;
    yourLevel: string;
    accuracy: string;
    correct: string; // "{correct}/{total} correctes"
    whatItMeans: string;
    recommendedTraining: string;
    bookCall: string;
    enroll: string;
    contactNote: string;
    
    // Level descriptions
    levelBeginner: string;
    levelIntermediate: string;
    levelAdvanced: string;
    
    descriptionBeginner: string;
    descriptionIntermediate: string;
    descriptionAdvanced: string;
    
    // Training recommendations
    trainingBeginner: string;
    trainingIntermediate: string;
    trainingAdvanced: string;
    
    // WhatsApp message
    whatsappMessage: string;
  };
  
  // Categories
  categories: Record<QuestionCategory, string>;
  
  // Difficulty levels
  difficulty: Record<DifficultyLevel, string>;
  
  // Candidate levels
  levels: Record<CandidateLevel, string>;
}

export const translations: Record<Language, Translations> = {
  fr: {
    common: {
      loading: 'Chargement des questions...',
      error: 'Une erreur est survenue',
      retry: 'Réessayer',
    },
    
    hero: {
      badge: 'Évaluation Comptable Professionnelle',
      title: 'Découvrez Votre',
      titleHighlight: 'Niveau en Comptabilité',
      titleSuffix: 'en Quelques Minutes',
      subtitle: 'Passez notre évaluation complète pour mesurer vos compétences comptables et recevez des recommandations de formation personnalisées selon votre niveau.',
      cta: 'Commencer le Test de Niveau',
      feature1Title: '20 Questions Expert',
      feature1Description: 'Conçues pour évaluer toutes vos compétences comptables',
      feature2Title: 'Résultats Instantanés',
      feature2Description: 'Obtenez votre niveau et recommandations immédiatement',
      feature3Title: 'Parcours Personnalisé',
      feature3Description: 'Recevez une formation adaptée à votre niveau actuel',
    },
    
    progressBar: {
      progress: 'Progression',
    },
    
    questionCard: {
      questionOf: 'Question {current} sur {total}',
      nextQuestion: 'Question Suivante',
      finishTest: 'Terminer le Test',
    },
    
    leadForm: {
      title: 'Vous y êtes presque !',
      subtitle: 'Entrez vos coordonnées pour découvrir vos résultats et obtenir des recommandations personnalisées.',
      fullName: 'Nom complet',
      fullNamePlaceholder: 'Jean Dupont',
      email: 'Adresse email',
      emailPlaceholder: 'jean.dupont@exemple.fr',
      phone: 'Numéro de téléphone',
      phonePlaceholder: '+33 6 12 34 56 78',
      submit: 'Voir Mes Résultats',
      privacyNote: 'Vos informations sont confidentielles et ne seront pas partagées.',
      errors: {
        nameMin: 'Le nom doit contenir au moins 2 caractères',
        nameTooLong: 'Nom trop long',
        emailInvalid: 'Veuillez entrer une adresse email valide',
        emailTooLong: 'Email trop long',
        phoneMin: 'Le numéro doit contenir au moins 8 chiffres',
        phoneTooLong: 'Numéro trop long',
      },
    },
    
    resultCard: {
      congratulations: 'Félicitations, {name} !',
      completedTest: 'Vous avez terminé l\'évaluation comptable',
      yourScore: 'Votre Score',
      points: 'points',
      yourLevel: 'Votre Niveau',
      accuracy: 'Précision',
      correct: '{correct}/{total} correctes',
      whatItMeans: 'Ce que cela signifie :',
      recommendedTraining: 'Formation Recommandée pour Vous :',
      bookCall: 'Réserver un Appel Gratuit',
      enroll: 'S\'inscrire à Cette Formation',
      contactNote: 'Des questions ? Notre équipe vous contactera prochainement pour discuter de votre parcours d\'apprentissage.',
      
      levelBeginner: 'Niveau Débutant',
      levelIntermediate: 'Niveau Intermédiaire',
      levelAdvanced: 'Niveau Avancé',
      
      descriptionBeginner: 'Vous êtes au début de votre parcours comptable. Notre formation fondamentale vous permettra de construire des bases solides pour votre carrière.',
      descriptionIntermediate: 'Vous maîtrisez les bases de la comptabilité. Notre programme avancé vous aidera à maîtriser les situations comptables complexes.',
      descriptionAdvanced: 'Excellent ! Vous démontrez de solides connaissances comptables. Notre masterclass perfectionnera votre expertise au niveau expert.',
      
      trainingBeginner: 'Les Fondamentaux de la Comptabilité - Formation Débutant',
      trainingIntermediate: 'Techniques Comptables Avancées - Programme Intermédiaire',
      trainingAdvanced: 'Analyse Financière Expert - Masterclass Avancée',
      
      whatsappMessage: 'Bonjour,\n\nJe souhaite réserver un appel gratuit pour discuter de ma formation comptable.\n\n📊 Mes informations :\n• Nom : {name}\n• Email : {email}\n• Niveau : {level}\n• Score : {score} points\n\nMerci de me contacter pour planifier notre échange.\n\nCordialement,\n{name}',
    },
    
    categories: {
      accounting_basics: 'Bases Comptables',
      chart_of_accounts: 'Plan Comptable',
      vat: 'TVA',
      accounting_entries: 'Écritures Comptables',
      financial_analysis: 'Analyse Financière',
    },
    
    difficulty: {
      easy: 'Facile',
      medium: 'Moyen',
      advanced: 'Avancé',
    },
    
    levels: {
      beginner: 'Débutant',
      intermediate: 'Intermédiaire',
      advanced: 'Avancé',
    },
  },
  
  en: {
    common: {
      loading: 'Loading questions...',
      error: 'An error occurred',
      retry: 'Retry',
    },
    
    hero: {
      badge: 'Professional Accounting Assessment',
      title: 'Discover Your',
      titleHighlight: 'Accounting Level',
      titleSuffix: 'in Minutes',
      subtitle: 'Take our comprehensive assessment to measure your accounting skills and receive personalized training recommendations based on your level.',
      cta: 'Start the Level Test',
      feature1Title: '20 Expert Questions',
      feature1Description: 'Designed to evaluate all your accounting skills',
      feature2Title: 'Instant Results',
      feature2Description: 'Get your level and recommendations immediately',
      feature3Title: 'Personalized Path',
      feature3Description: 'Receive training adapted to your current level',
    },
    
    progressBar: {
      progress: 'Progress',
    },
    
    questionCard: {
      questionOf: 'Question {current} of {total}',
      nextQuestion: 'Next Question',
      finishTest: 'Finish Test',
    },
    
    leadForm: {
      title: 'Almost there!',
      subtitle: 'Enter your details to discover your results and receive personalized recommendations.',
      fullName: 'Full name',
      fullNamePlaceholder: 'John Doe',
      email: 'Email address',
      emailPlaceholder: 'john.doe@example.com',
      phone: 'Phone number',
      phonePlaceholder: '+1 234 567 8900',
      submit: 'View My Results',
      privacyNote: 'Your information is confidential and will not be shared.',
      errors: {
        nameMin: 'Name must contain at least 2 characters',
        nameTooLong: 'Name too long',
        emailInvalid: 'Please enter a valid email address',
        emailTooLong: 'Email too long',
        phoneMin: 'Number must contain at least 8 digits',
        phoneTooLong: 'Number too long',
      },
    },
    
    resultCard: {
      congratulations: 'Congratulations, {name}!',
      completedTest: 'You completed the accounting assessment',
      yourScore: 'Your Score',
      points: 'points',
      yourLevel: 'Your Level',
      accuracy: 'Accuracy',
      correct: '{correct}/{total} correct',
      whatItMeans: 'What this means:',
      recommendedTraining: 'Recommended Training for You:',
      bookCall: 'Book a Free Call',
      enroll: 'Enroll in This Training',
      contactNote: 'Questions? Our team will contact you soon to discuss your learning path.',
      
      levelBeginner: 'Beginner Level',
      levelIntermediate: 'Intermediate Level',
      levelAdvanced: 'Advanced Level',
      
      descriptionBeginner: 'You are at the beginning of your accounting journey. Our fundamental training will help you build solid foundations for your career.',
      descriptionIntermediate: 'You master the basics of accounting. Our advanced program will help you master complex accounting situations.',
      descriptionAdvanced: 'Excellent! You demonstrate solid accounting knowledge. Our masterclass will perfect your expertise to expert level.',
      
      trainingBeginner: 'Accounting Fundamentals - Beginner Training',
      trainingIntermediate: 'Advanced Accounting Techniques - Intermediate Program',
      trainingAdvanced: 'Expert Financial Analysis - Advanced Masterclass',
      
      whatsappMessage: 'Hello,\n\nI would like to book a free call to discuss my accounting training.\n\n📊 My information:\n• Name: {name}\n• Email: {email}\n• Level: {level}\n• Score: {score} points\n\nThank you for contacting me to schedule our discussion.\n\nBest regards,\n{name}',
    },
    
    categories: {
      accounting_basics: 'Accounting Basics',
      chart_of_accounts: 'Chart of Accounts',
      vat: 'VAT',
      accounting_entries: 'Accounting Entries',
      financial_analysis: 'Financial Analysis',
    },
    
    difficulty: {
      easy: 'Easy',
      medium: 'Medium',
      advanced: 'Advanced',
    },
    
    levels: {
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
    },
  },
};

// Helper function to get translations for current language
export function getTranslations(language: Language): Translations {
  return translations[language];
}

// Helper to format strings with placeholders
export function formatString(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] || ''));
}
