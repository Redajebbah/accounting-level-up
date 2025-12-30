import { useState } from 'react';
import { Hero } from '@/components/landing/Hero';
import { QuestionCard } from '@/components/test/QuestionCard';
import { ProgressBar } from '@/components/test/ProgressBar';
import { LeadForm } from '@/components/test/LeadForm';
import { ResultCard } from '@/components/test/ResultCard';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useTest } from '@/hooks/useTest';
import { supabase } from '@/integrations/supabase/client';
import { LeadFormData, getRecommendedTraining } from '@/types/test';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';

type TestPhase = 'landing' | 'test' | 'lead-form' | 'result';

const Index = () => {
  const [phase, setPhase] = useState<TestPhase>('landing');
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const { toast } = useToast();
  const t = useTranslations();

  const {
    currentQuestion,
    currentIndex,
    totalQuestions,
    progress,
    isLoading,
    error,
    testResult,
    submitAnswer,
  } = useTest();

  const handleStartTest = () => {
    setPhase('test');
  };

  const handleAnswer = (optionId: string) => {
    submitAnswer(optionId);
    
    // Check if test is complete after this answer
    if (currentIndex === totalQuestions - 1) {
      setTimeout(() => setPhase('lead-form'), 500);
    }
  };

  const handleLeadSubmit = async (data: LeadFormData) => {
    if (!testResult) return;

    setIsSubmittingLead(true);
    setCandidateName(data.fullName);
    setCandidateEmail(data.email);

    try {
      const { error } = await supabase
        .from('candidates')
        .insert([{
          full_name: data.fullName,
          email: data.email,
          phone: data.phone,
          score: testResult.totalScore,
          level: testResult.level,
          recommended_training: getRecommendedTraining(testResult.level),
          answers: JSON.parse(JSON.stringify(testResult.answers)),
        }]);

      if (error) throw error;

      setPhase('result');
    } catch (err) {
      toast({
        title: 'Erreur',
        description: err instanceof Error ? err.message : 'Impossible de sauvegarder vos informations',
        variant: 'destructive',
      });
    } finally {
      setIsSubmittingLead(false);
    }
  };

  // Loading state
  if (phase === 'test' && isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-subtle">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto mb-4" />
          <p className="text-muted-foreground">{t.common.loading}</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-subtle">
        <div className="text-center">
          <p className="text-destructive mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="text-accent hover:underline"
          >
            {t.common.retry}
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-subtle">
      {/* SEO */}
      <title>Test de Niveau Comptable | Évaluez Vos Compétences</title>
      <meta name="description" content="Passez notre évaluation comptable professionnelle pour mesurer vos connaissances et obtenir des recommandations de formation personnalisées." />

      {phase === 'landing' && (
        <>
          <div className="fixed top-4 right-4 z-50">
            <LanguageSwitcher />
          </div>
          <Hero onStartTest={handleStartTest} />
        </>
      )}

      {phase === 'test' && currentQuestion && (
        <div className="min-h-screen py-8 px-4">
          {/* Language Switcher - Top Right */}
          <div className="max-w-2xl mx-auto mb-4 flex justify-end">
            <LanguageSwitcher />
          </div>
          <div className="max-w-2xl mx-auto">
            <ProgressBar 
              progress={progress}
              currentQuestion={currentIndex + 1}
              totalQuestions={totalQuestions}
            />
            <QuestionCard
              question={currentQuestion}
              questionNumber={currentIndex + 1}
              totalQuestions={totalQuestions}
              onAnswer={handleAnswer}
            />
          </div>
        </div>
      )}

      {phase === 'lead-form' && (
        <div className="min-h-screen py-12 px-4 flex items-center">
          <LeadForm onSubmit={handleLeadSubmit} isSubmitting={isSubmittingLead} />
        </div>
      )}

      {phase === 'result' && testResult && (
        <div className="min-h-screen py-12 px-4">
          <ResultCard result={testResult} candidateName={candidateName} candidateEmail={candidateEmail} />
        </div>
      )}
    </main>
  );
};

export default Index;
