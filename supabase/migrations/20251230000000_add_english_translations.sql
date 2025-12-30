-- Add English translation fields to questions table
ALTER TABLE public.questions
ADD COLUMN question_text_en TEXT,
ADD COLUMN options_en JSONB;

-- Add comment explaining the new fields
COMMENT ON COLUMN public.questions.question_text_en IS 'English translation of the question text';
COMMENT ON COLUMN public.questions.options_en IS 'English translations for options - Array of {id, text_en}';

-- The options_en field should have the same structure as options but with text_en instead of text
-- Example structure:
-- options: [{"id": "a", "text": "Actif = Passif + Capitaux Propres"}, ...]
-- options_en: [{"id": "a", "text_en": "Assets = Liabilities + Equity"}, ...]
