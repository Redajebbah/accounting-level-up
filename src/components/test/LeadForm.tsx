import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LeadFormData } from '@/types/test';
import { User, Mail, Phone, Lock } from 'lucide-react';
import { z } from 'zod';
import { useTranslations } from '@/hooks/useTranslations';

interface LeadFormProps {
  onSubmit: (data: LeadFormData) => void;
  isSubmitting: boolean;
}

export function LeadForm({ onSubmit, isSubmitting }: LeadFormProps) {
  const t = useTranslations();
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({});

  const leadSchema = z.object({
    fullName: z.string().trim().min(2, t.leadForm.errors.nameMin).max(100, t.leadForm.errors.nameTooLong),
    email: z.string().trim().email(t.leadForm.errors.emailInvalid).max(255, t.leadForm.errors.emailTooLong),
    phone: z.string().trim().min(8, t.leadForm.errors.phoneMin).max(20, t.leadForm.errors.phoneTooLong),
  });

  const handleChange = (field: keyof LeadFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = leadSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof LeadFormData, string>> = {};
      result.error.errors.forEach(err => {
        const field = err.path[0] as keyof LeadFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    onSubmit(result.data as LeadFormData);
  };

  return (
    <div className="w-full max-w-md mx-auto animate-scale-in">
      <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-accent" />
          </div>
          <h2 className="font-serif text-2xl text-foreground mb-2">
            {t.leadForm.title}
          </h2>
          <p className="text-muted-foreground">
            {t.leadForm.subtitle}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-foreground font-medium">
              {t.leadForm.fullName}
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="fullName"
                type="text"
                placeholder={t.leadForm.fullNamePlaceholder}
                value={formData.fullName}
                onChange={handleChange('fullName')}
                className="pl-10"
                disabled={isSubmitting}
              />
            </div>
            {errors.fullName && (
              <p className="text-sm text-destructive">{errors.fullName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground font-medium">
              {t.leadForm.email}
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder={t.leadForm.emailPlaceholder}
                value={formData.email}
                onChange={handleChange('email')}
                className="pl-10"
                disabled={isSubmitting}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-foreground font-medium">
              {t.leadForm.phone}
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                placeholder={t.leadForm.phonePlaceholder}
                value={formData.phone}
                onChange={handleChange('phone')}
                className="pl-10"
                disabled={isSubmitting}
              />
            </div>
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="gold"
            size="lg"
            className="w-full mt-6"
            disabled={isSubmitting}
          >
            {t.leadForm.submit}
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-6">
          {t.leadForm.privacyNote}
        </p>
      </div>
    </div>
  );
}
