# Language Support Implementation Guide

## Overview

The application now supports **French (FR)** and **English (EN)** languages with a smooth, instant language switch that:
- ✅ Does NOT reload the page
- ✅ Does NOT reset quiz progress
- ✅ Preserves selected answers
- ✅ Updates all content instantly
- ✅ Maintains UI/UX consistency

## Architecture

### 1. Language Context (`src/contexts/LanguageContext.tsx`)
Global state management for the current language:
```tsx
const { language, setLanguage, toggleLanguage } = useLanguage();
```

### 2. Translations Dictionary (`src/i18n/translations.ts`)
Centralized translations for all UI labels, buttons, messages:
- Hero section
- Progress bar
- Question cards
- Lead form
- Result card
- Error messages
- Categories, difficulty levels, etc.

### 3. Language Switcher Component (`src/components/LanguageSwitcher.tsx`)
Professional toggle button showing FR/EN with globe icon.

### 4. Translation Hook (`src/hooks/useTranslations.ts`)
Helper hook to access translations and localize question content:
```tsx
const t = useTranslations();
const localizedQuestion = getLocalizedQuestion(question, language);
```

## Database Schema

### Questions Table Structure

```sql
questions (
  id UUID PRIMARY KEY,
  question_text TEXT NOT NULL,         -- French question
  question_text_en TEXT,                -- English question
  options JSONB NOT NULL,               -- French options
  options_en JSONB,                     -- English options (optional)
  category question_category,
  difficulty difficulty_level,
  correct_option_id TEXT
)
```

### Options Structure

**French options:**
```json
[
  {"id": "a", "text": "Actif = Passif + Capitaux Propres"},
  {"id": "b", "text": "Actif = Passif - Capitaux Propres"},
  {"id": "c", "text": "Actif + Passif = Capitaux Propres"}
]
```

**English options (in options_en):**
```json
[
  {"id": "a", "text_en": "Assets = Liabilities + Equity"},
  {"id": "b", "text_en": "Assets = Liabilities - Equity"},
  {"id": "c", "text_en": "Assets + Liabilities = Equity"}
]
```

## How to Add Bilingual Questions

### Method 1: Via Supabase SQL Editor

```sql
INSERT INTO questions (
  question_text,
  question_text_en,
  category,
  difficulty,
  options,
  options_en,
  correct_option_id
) VALUES (
  'Quelle est l''équation comptable fondamentale?',
  'What is the fundamental accounting equation?',
  'accounting_basics',
  'easy',
  '[
    {"id": "a", "text": "Actif = Passif + Capitaux Propres"},
    {"id": "b", "text": "Actif = Passif - Capitaux Propres"},
    {"id": "c", "text": "Actif + Passif = Capitaux Propres"}
  ]'::jsonb,
  '[
    {"id": "a", "text_en": "Assets = Liabilities + Equity"},
    {"id": "b", "text_en": "Assets = Liabilities - Equity"},
    {"id": "c", "text_en": "Assets + Liabilities = Equity"}
  ]'::jsonb,
  'a'
);
```

### Method 2: Via TypeScript/JavaScript

```typescript
await supabase.from('questions').insert({
  question_text: "Quelle est l'équation comptable fondamentale?",
  question_text_en: "What is the fundamental accounting equation?",
  category: 'accounting_basics',
  difficulty: 'easy',
  options: [
    { id: "a", text: "Actif = Passif + Capitaux Propres" },
    { id: "b", text: "Actif = Passif - Capitaux Propres" },
    { id: "c", text: "Actif + Passif = Capitaux Propres" }
  ],
  options_en: [
    { id: "a", text_en: "Assets = Liabilities + Equity" },
    { id: "b", text_en: "Assets = Liabilities - Equity" },
    { id: "c", text_en: "Assets + Liabilities = Equity" }
  ],
  correct_option_id: 'a'
});
```

## Component Usage Examples

### Using translations in a component:
```tsx
import { useTranslations } from '@/hooks/useTranslations';

function MyComponent() {
  const t = useTranslations();
  
  return (
    <div>
      <h1>{t.hero.title}</h1>
      <button>{t.questionCard.nextQuestion}</button>
    </div>
  );
}
```

### Displaying localized question content:
```tsx
import { useLanguage } from '@/contexts/LanguageContext';
import { getLocalizedQuestion, getLocalizedOption } from '@/hooks/useTranslations';

function QuestionDisplay({ question }) {
  const { language } = useLanguage();
  
  return (
    <div>
      <h2>{getLocalizedQuestion(question, language)}</h2>
      {question.options.map(option => (
        <div key={option.id}>
          {getLocalizedOption(option, language)}
        </div>
      ))}
    </div>
  );
}
```

### Using the language switcher:
```tsx
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

function Header() {
  return (
    <header>
      <LanguageSwitcher />
    </header>
  );
}
```

## How It Works

1. **Language State**: Global context stores current language (FR/EN)
2. **Component Rendering**: Components subscribe to language context via `useLanguage()` or `useTranslations()`
3. **Instant Updates**: When language changes, all components re-render with new translations
4. **Question Localization**: 
   - If English is selected and `question_text_en` exists → show English
   - Otherwise → show French (default)
   - Same logic for options with `text_en` field
5. **No State Loss**: Quiz progress, answers, and position are preserved in separate state

## Fallback Behavior

If English translations are missing:
- Falls back to French text automatically
- No errors or blank content
- Allows gradual content translation

## Migration

To apply the database changes:

```bash
# If using Supabase CLI
supabase db push

# Or apply manually in Supabase Dashboard > SQL Editor
```

Then run the migration:
```
supabase/migrations/20251230000000_add_english_translations.sql
```

## Testing Checklist

- [ ] Language switch appears on landing page (top-right)
- [ ] Language switch appears during quiz (top-right)
- [ ] Clicking FR/EN switches all visible text instantly
- [ ] Quiz progress is NOT reset when switching languages
- [ ] Selected answer is NOT lost when switching languages
- [ ] Question number stays the same
- [ ] Progress bar maintains position
- [ ] All buttons update (Next Question / Finish Test / etc.)
- [ ] Lead form labels and placeholders update
- [ ] Result card shows localized level descriptions
- [ ] Hero page features update
- [ ] Error messages show in correct language
- [ ] No console errors when switching languages

## Future Extensions

To add more languages (e.g., Spanish):

1. Add language to type in `LanguageContext.tsx`:
   ```tsx
   export type Language = 'fr' | 'en' | 'es';
   ```

2. Add translations to `translations.ts`:
   ```tsx
   es: { /* Spanish translations */ }
   ```

3. Add database columns:
   ```sql
   ALTER TABLE questions ADD COLUMN question_text_es TEXT;
   ALTER TABLE questions ADD COLUMN options_es JSONB;
   ```

4. Update `LanguageSwitcher.tsx` to include ES button

## Key Files Modified

- `src/contexts/LanguageContext.tsx` - Language state management
- `src/i18n/translations.ts` - All translations
- `src/hooks/useTranslations.ts` - Translation utilities
- `src/components/LanguageSwitcher.tsx` - Language toggle UI
- `src/types/test.ts` - Added optional English fields
- `src/components/test/*.tsx` - All quiz components updated
- `src/components/landing/Hero.tsx` - Hero section updated
- `src/pages/Index.tsx` - Added language switcher placement
- `src/main.tsx` - Wrapped app with LanguageProvider
- `supabase/migrations/20251230000000_add_english_translations.sql` - Database schema

## Important Notes

⚠️ **NO breaking changes**: Existing functionality remains intact
⚠️ **Backward compatible**: Works with questions that only have French
⚠️ **Progressive enhancement**: Add English translations as needed
⚠️ **Clean architecture**: Language logic separated from business logic
