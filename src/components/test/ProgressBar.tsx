import { cn } from '@/lib/utils';

interface ProgressBarProps {
  progress: number;
  currentQuestion: number;
  totalQuestions: number;
}

export function ProgressBar({ progress, currentQuestion, totalQuestions }: ProgressBarProps) {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-muted-foreground">
          Progression
        </span>
        <span className="text-sm font-medium text-foreground">
          {currentQuestion} / {totalQuestions}
        </span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div 
          className={cn(
            'h-full bg-accent rounded-full transition-all duration-500 ease-out'
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
