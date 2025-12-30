import { Button } from '@/components/ui/button';
import { TestResult, getRecommendedTraining, CandidateLevel } from '@/types/test';
import { Trophy, Star, TrendingUp, Calendar, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from '@/hooks/useTranslations';
import { formatString } from '@/i18n/translations';
import { useLanguage } from '@/contexts/LanguageContext';

interface ResultCardProps {
  result: TestResult;
  candidateName: string;
  candidateEmail: string;
}

export function ResultCard({ result, candidateName, candidateEmail }: ResultCardProps) {
  const t = useTranslations();
  const { language } = useLanguage();
  
  const levelConfig: Record<CandidateLevel, { 
    color: string; 
    bgColor: string; 
    icon: React.ReactNode;
    title: string;
    description: string;
  }> = {
    beginner: {
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      icon: <Star className="w-8 h-8" />,
      title: t.resultCard.levelBeginner,
      description: t.resultCard.descriptionBeginner,
    },
    intermediate: {
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
      icon: <TrendingUp className="w-8 h-8" />,
      title: t.resultCard.levelIntermediate,
      description: t.resultCard.descriptionIntermediate,
    },
    advanced: {
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      icon: <Trophy className="w-8 h-8" />,
      title: t.resultCard.levelAdvanced,
      description: t.resultCard.descriptionAdvanced,
    },
  };

  const config = levelConfig[result.level];

  const correctAnswers = result.answers.filter(a => a.isCorrect).length;
  const totalAnswers = result.answers.length;
  const accuracy = Math.round((correctAnswers / totalAnswers) * 100);

  // Get localized training recommendation
  const training = result.level === 'beginner' ? t.resultCard.trainingBeginner :
                   result.level === 'intermediate' ? t.resultCard.trainingIntermediate :
                   t.resultCard.trainingAdvanced;

  // Generate WhatsApp message
  const whatsappPhone = '212661889056';
  const whatsappMessageText = formatString(t.resultCard.whatsappMessage, {
    name: candidateName,
    email: candidateEmail,
    level: config.title,
    score: String(result.totalScore),
  });
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(whatsappMessageText)}`;

  return (
    <div className="w-full max-w-2xl mx-auto animate-scale-in">
      {/* Congratulations Header */}
      <div className="text-center mb-8">
        <div className={cn(
          'w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4',
          config.bgColor, config.color
        )}>
          {config.icon}
        </div>
        <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-2">
          {formatString(t.resultCard.congratulations, { name: candidateName.split(' ')[0] })}
        </h1>
        <p className="text-muted-foreground">
          {t.resultCard.completedTest}
        </p>
      </div>

      {/* Score Card */}
      <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-lg mb-6">
        {/* Score Display */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 pb-8 border-b border-border">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground mb-1">{t.resultCard.yourScore}</p>
            <p className="text-5xl font-bold text-foreground">{result.totalScore}</p>
            <p className="text-sm text-muted-foreground">{t.resultCard.points}</p>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">{t.resultCard.yourLevel}</p>
            <span className={cn(
              'inline-block px-4 py-2 rounded-full font-semibold',
              config.bgColor, config.color
            )}>
              {config.title}
            </span>
          </div>

          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground mb-1">{t.resultCard.accuracy}</p>
            <p className="text-3xl font-bold text-foreground">{accuracy}%</p>
            <p className="text-sm text-muted-foreground">
              {formatString(t.resultCard.correct, { correct: String(correctAnswers), total: String(totalAnswers) })}
            </p>
          </div>
        </div>

        {/* Level Description */}
        <div className="mb-8">
          <h3 className="font-semibold text-foreground mb-2">{t.resultCard.whatItMeans}</h3>
          <p className="text-muted-foreground">{config.description}</p>
        </div>

        {/* Recommended Training */}
        <div className="bg-secondary/50 rounded-lg p-6">
          <h3 className="font-semibold text-foreground mb-3">
            {t.resultCard.recommendedTraining}
          </h3>
          <p className="text-lg font-serif text-foreground mb-4">{training}</p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              variant="hero-gold" 
              size="lg" 
              className="flex-1 group"
              onClick={() => window.open(whatsappUrl, '_blank')}
            >
              <Calendar className="w-5 h-5 mr-2" />
              {t.resultCard.bookCall}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="flex-1">
              {t.resultCard.enroll}
            </Button>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <p className="text-center text-sm text-muted-foreground">
        {t.resultCard.contactNote}
      </p>
    </div>
  );
}
