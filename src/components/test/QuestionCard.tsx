import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Question, CATEGORY_LABELS, DIFFICULTY_LABELS } from '@/types/test';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (optionId: string) => void;
}

export function QuestionCard({ 
  question, 
  questionNumber, 
  totalQuestions, 
  onAnswer 
}: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelect = (optionId: string) => {
    if (isSubmitting) return;
    setSelectedOption(optionId);
  };

  const handleSubmit = () => {
    if (!selectedOption || isSubmitting) return;
    setIsSubmitting(true);
    
    // Brief delay for visual feedback
    setTimeout(() => {
      onAnswer(selectedOption);
      setSelectedOption(null);
      setIsSubmitting(false);
    }, 300);
  };

  const difficultyColors = {
    easy: 'bg-green-100 text-green-700 border-green-200',
    medium: 'bg-amber-100 text-amber-700 border-amber-200',
    advanced: 'bg-red-100 text-red-700 border-red-200',
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-scale-in">
      {/* Header with category and difficulty */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm font-medium text-muted-foreground">
          {CATEGORY_LABELS[question.category]}
        </span>
        <span className={cn(
          'px-3 py-1 rounded-full text-xs font-medium border',
          difficultyColors[question.difficulty]
        )}>
          {DIFFICULTY_LABELS[question.difficulty]}
        </span>
      </div>

      {/* Question */}
      <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-sm">
        <p className="text-sm text-muted-foreground mb-2">
          Question {questionNumber} sur {totalQuestions}
        </p>
        
        <h2 className="font-serif text-xl md:text-2xl text-foreground mb-8">
          {question.question_text}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              disabled={isSubmitting}
              className={cn(
                'w-full text-left p-4 rounded-lg border-2 transition-all duration-200',
                'hover:border-accent hover:bg-accent/5',
                selectedOption === option.id
                  ? 'border-accent bg-accent/10'
                  : 'border-border bg-background',
                isSubmitting && 'opacity-50 cursor-not-allowed'
              )}
            >
              <div className="flex items-center gap-3">
                <span className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors',
                  selectedOption === option.id
                    ? 'border-accent bg-accent text-accent-foreground'
                    : 'border-border text-muted-foreground'
                )}>
                  {selectedOption === option.id ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    option.id.toUpperCase()
                  )}
                </span>
                <span className="text-foreground font-medium">{option.text}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <Button
            variant="gold"
            size="lg"
            className="w-full"
            onClick={handleSubmit}
            disabled={!selectedOption || isSubmitting}
          >
            {questionNumber === totalQuestions ? 'Terminer le Test' : 'Question Suivante'}
          </Button>
        </div>
      </div>
    </div>
  );
}
