import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Languages } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 bg-card border border-border rounded-lg p-1 shadow-sm">
      <Languages className="w-4 h-4 text-muted-foreground ml-1" />
      <button
        onClick={() => setLanguage('fr')}
        className={cn(
          'px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200',
          language === 'fr'
            ? 'bg-accent text-accent-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        FR
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={cn(
          'px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200',
          language === 'en'
            ? 'bg-accent text-accent-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        EN
      </button>
    </div>
  );
}
