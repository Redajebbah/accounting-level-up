import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Target, Award } from 'lucide-react';

interface HeroProps {
  onStartTest: () => void;
}

export function Hero({ onStartTest }: HeroProps) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-gradient-subtle">
      {/* Badge */}
      <div className="animate-fade-in mb-8">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
          <Award className="w-4 h-4 text-accent" />
          Professional Accounting Assessment
        </span>
      </div>

      {/* Main Heading */}
      <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-center max-w-4xl mb-6 animate-slide-up text-foreground">
        Discover Your{' '}
        <span className="text-gradient-gold">Accounting Level</span>{' '}
        in Minutes
      </h1>

      {/* Subheading */}
      <p className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        Take our comprehensive assessment to evaluate your accounting knowledge 
        and get personalized training recommendations tailored to your skill level.
      </p>

      {/* CTA Button */}
      <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <Button 
          variant="hero-gold" 
          size="xl" 
          onClick={onStartTest}
          className="group"
        >
          Start the Accounting Level Test
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl w-full animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <FeatureCard 
          icon={<Target className="w-6 h-6 text-accent" />}
          title="20 Expert Questions"
          description="Carefully crafted to assess all accounting competencies"
        />
        <FeatureCard 
          icon={<CheckCircle className="w-6 h-6 text-accent" />}
          title="Instant Results"
          description="Get your level and recommendations immediately"
        />
        <FeatureCard 
          icon={<Award className="w-6 h-6 text-accent" />}
          title="Personalized Path"
          description="Receive training tailored to your current level"
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
