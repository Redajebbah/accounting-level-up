import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Target, Award } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';

interface HeroProps {
  onStartTest: () => void;
}

export function Hero({ onStartTest }: HeroProps) {
  const t = useTranslations();
  
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-gradient-subtle">
      {/* Badge */}
      <div className="animate-fade-in mb-8">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
          <Award className="w-4 h-4 text-accent" />
          {t.hero.badge}
        </span>
      </div>

      {/* Main Heading */}
      <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-center max-w-4xl mb-6 animate-slide-up text-foreground">
        {t.hero.title}{' '}
        <span className="text-gradient-gold">{t.hero.titleHighlight}</span>{' '}
        {t.hero.titleSuffix}
      </h1>

      {/* Subheading */}
      <p className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        {t.hero.subtitle}
      </p>

      {/* CTA Button */}
      <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <Button 
          variant="hero-gold" 
          size="xl" 
          onClick={onStartTest}
          className="group"
        >
          {t.hero.cta}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl w-full animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <FeatureCard 
          icon={<Target className="w-6 h-6 text-accent" />}
          title={t.hero.feature1Title}
          description={t.hero.feature1Description}
        />
        <FeatureCard 
          icon={<CheckCircle className="w-6 h-6 text-accent" />}
          title={t.hero.feature2Title}
          description={t.hero.feature2Description}
        />
        <FeatureCard 
          icon={<Award className="w-6 h-6 text-accent" />}
          title={t.hero.feature3Title}
          description={t.hero.feature3Description}
        />
      </div>
    </section>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
