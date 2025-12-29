import { Button } from '@/components/ui/button';
import { TestResult, getRecommendedTraining, CandidateLevel, LEVEL_LABELS } from '@/types/test';
import { Trophy, Star, TrendingUp, Calendar, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResultCardProps {
  result: TestResult;
  candidateName: string;
}

export function ResultCard({ result, candidateName }: ResultCardProps) {
  const training = getRecommendedTraining(result.level);
  
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
      title: 'Niveau Débutant',
      description: 'Vous êtes au début de votre parcours comptable. Notre formation fondamentale vous permettra de construire des bases solides pour votre carrière.',
    },
    intermediate: {
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Niveau Intermédiaire',
      description: 'Vous maîtrisez les bases de la comptabilité. Notre programme avancé vous aidera à maîtriser les situations comptables complexes.',
    },
    advanced: {
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      icon: <Trophy className="w-8 h-8" />,
      title: 'Niveau Avancé',
      description: 'Excellent ! Vous démontrez de solides connaissances comptables. Notre masterclass perfectionnera votre expertise au niveau expert.',
    },
  };

  const config = levelConfig[result.level];

  const correctAnswers = result.answers.filter(a => a.isCorrect).length;
  const totalAnswers = result.answers.length;
  const accuracy = Math.round((correctAnswers / totalAnswers) * 100);

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
          Félicitations, {candidateName.split(' ')[0]} !
        </h1>
        <p className="text-muted-foreground">
          Vous avez terminé l'évaluation comptable
        </p>
      </div>

      {/* Score Card */}
      <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-lg mb-6">
        {/* Score Display */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 pb-8 border-b border-border">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground mb-1">Votre Score</p>
            <p className="text-5xl font-bold text-foreground">{result.totalScore}</p>
            <p className="text-sm text-muted-foreground">points</p>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Votre Niveau</p>
            <span className={cn(
              'inline-block px-4 py-2 rounded-full font-semibold',
              config.bgColor, config.color
            )}>
              {config.title}
            </span>
          </div>

          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground mb-1">Précision</p>
            <p className="text-3xl font-bold text-foreground">{accuracy}%</p>
            <p className="text-sm text-muted-foreground">
              {correctAnswers}/{totalAnswers} correctes
            </p>
          </div>
        </div>

        {/* Level Description */}
        <div className="mb-8">
          <h3 className="font-semibold text-foreground mb-2">Ce que cela signifie :</h3>
          <p className="text-muted-foreground">{config.description}</p>
        </div>

        {/* Recommended Training */}
        <div className="bg-secondary/50 rounded-lg p-6">
          <h3 className="font-semibold text-foreground mb-3">
            Formation Recommandée pour Vous :
          </h3>
          <p className="text-lg font-serif text-foreground mb-4">{training}</p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="hero-gold" size="lg" className="flex-1 group">
              <Calendar className="w-5 h-5 mr-2" />
              Réserver un Appel Gratuit
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="flex-1">
              S'inscrire à Cette Formation
            </Button>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <p className="text-center text-sm text-muted-foreground">
        Des questions ? Notre équipe vous contactera prochainement pour discuter de votre parcours d'apprentissage.
      </p>
    </div>
  );
}
