-- Add 'rejected' value to candidate_status enum
ALTER TYPE public.candidate_status ADD VALUE IF NOT EXISTS 'rejected';

-- Add notes field for admin comments
ALTER TABLE public.candidates ADD COLUMN IF NOT EXISTS notes TEXT;