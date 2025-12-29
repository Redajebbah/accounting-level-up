-- Create enum for question categories
CREATE TYPE question_category AS ENUM ('accounting_basics', 'chart_of_accounts', 'vat', 'accounting_entries', 'financial_analysis');

-- Create enum for difficulty levels
CREATE TYPE difficulty_level AS ENUM ('easy', 'medium', 'advanced');

-- Create enum for candidate levels
CREATE TYPE candidate_level AS ENUM ('beginner', 'intermediate', 'advanced');

-- Create enum for candidate status
CREATE TYPE candidate_status AS ENUM ('new', 'contacted', 'enrolled');

-- Create enum for app roles
CREATE TYPE app_role AS ENUM ('admin', 'user');

-- Create questions table
CREATE TABLE public.questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_text TEXT NOT NULL,
  category question_category NOT NULL,
  difficulty difficulty_level NOT NULL,
  options JSONB NOT NULL, -- Array of {id, text}
  correct_option_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create candidates table
CREATE TABLE public.candidates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  score INTEGER NOT NULL,
  level candidate_level NOT NULL,
  recommended_training TEXT NOT NULL,
  status candidate_status DEFAULT 'new',
  answers JSONB, -- Store their answers for reference
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_roles table for admin access
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- Enable RLS on all tables
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Questions policies: public read, admin write
CREATE POLICY "Anyone can read questions"
ON public.questions FOR SELECT
USING (true);

CREATE POLICY "Admins can insert questions"
ON public.questions FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update questions"
ON public.questions FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete questions"
ON public.questions FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Candidates policies: public insert (for lead form), admin read/update
CREATE POLICY "Anyone can insert candidates"
ON public.candidates FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can read candidates"
ON public.candidates FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update candidates"
ON public.candidates FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- User roles policies
CREATE POLICY "Users can read own role"
ON public.user_roles FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Admins can manage roles"
ON public.user_roles FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Function to update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for candidates updated_at
CREATE TRIGGER update_candidates_updated_at
BEFORE UPDATE ON public.candidates
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert 20 real accounting questions
INSERT INTO public.questions (question_text, category, difficulty, options, correct_option_id) VALUES
-- Accounting Basics (Debit/Credit)
('What type of account is "Cash"?', 'accounting_basics', 'easy', '[{"id": "a", "text": "Asset"}, {"id": "b", "text": "Liability"}, {"id": "c", "text": "Equity"}, {"id": "d", "text": "Revenue"}]', 'a'),
('When a company pays off a loan, which side is credited?', 'accounting_basics', 'easy', '[{"id": "a", "text": "Cash"}, {"id": "b", "text": "Loan Payable"}, {"id": "c", "text": "Interest Expense"}, {"id": "d", "text": "Retained Earnings"}]', 'a'),
('A debit entry increases which of the following?', 'accounting_basics', 'medium', '[{"id": "a", "text": "Liabilities"}, {"id": "b", "text": "Revenue"}, {"id": "c", "text": "Assets"}, {"id": "d", "text": "Equity"}]', 'c'),
('What is the fundamental accounting equation?', 'accounting_basics', 'easy', '[{"id": "a", "text": "Assets = Liabilities + Equity"}, {"id": "b", "text": "Revenue - Expenses = Profit"}, {"id": "c", "text": "Assets + Liabilities = Equity"}, {"id": "d", "text": "Debit = Credit"}]', 'a'),

-- Chart of Accounts
('Which account class typically has numbers starting with 1?', 'chart_of_accounts', 'easy', '[{"id": "a", "text": "Liabilities"}, {"id": "b", "text": "Assets"}, {"id": "c", "text": "Equity"}, {"id": "d", "text": "Expenses"}]', 'b'),
('Accounts Receivable belongs to which category?', 'chart_of_accounts', 'easy', '[{"id": "a", "text": "Current Assets"}, {"id": "b", "text": "Fixed Assets"}, {"id": "c", "text": "Current Liabilities"}, {"id": "d", "text": "Long-term Liabilities"}]', 'a'),
('Which account would you use to record office supplies purchased?', 'chart_of_accounts', 'medium', '[{"id": "a", "text": "Fixed Assets"}, {"id": "b", "text": "Operating Expenses"}, {"id": "c", "text": "Cost of Goods Sold"}, {"id": "d", "text": "Administrative Expenses"}]', 'b'),
('What is the typical account number range for equity accounts?', 'chart_of_accounts', 'medium', '[{"id": "a", "text": "100-199"}, {"id": "b", "text": "200-299"}, {"id": "c", "text": "300-399"}, {"id": "d", "text": "400-499"}]', 'c'),

-- VAT (TVA)
('What does VAT stand for?', 'vat', 'easy', '[{"id": "a", "text": "Variable Asset Tax"}, {"id": "b", "text": "Value Added Tax"}, {"id": "c", "text": "Verified Account Total"}, {"id": "d", "text": "Virtual Asset Transfer"}]', 'b'),
('If input VAT is €500 and output VAT is €800, what is the VAT payable?', 'vat', 'medium', '[{"id": "a", "text": "€300"}, {"id": "b", "text": "€500"}, {"id": "c", "text": "€800"}, {"id": "d", "text": "€1300"}]', 'a'),
('Which of these is typically VAT exempt?', 'vat', 'medium', '[{"id": "a", "text": "Electronics"}, {"id": "b", "text": "Medical services"}, {"id": "c", "text": "Restaurant meals"}, {"id": "d", "text": "Clothing"}]', 'b'),
('When is VAT typically due to tax authorities?', 'vat', 'advanced', '[{"id": "a", "text": "When invoice is issued"}, {"id": "b", "text": "When payment is received"}, {"id": "c", "text": "Depends on VAT scheme"}, {"id": "d", "text": "End of financial year"}]', 'c'),

-- Accounting Entries
('What is the journal entry for a cash sale of €1000?', 'accounting_entries', 'medium', '[{"id": "a", "text": "Debit Cash, Credit Sales"}, {"id": "b", "text": "Debit Sales, Credit Cash"}, {"id": "c", "text": "Debit Inventory, Credit Cash"}, {"id": "d", "text": "Debit Cash, Credit Inventory"}]', 'a'),
('When recording depreciation, which account is credited?', 'accounting_entries', 'medium', '[{"id": "a", "text": "Depreciation Expense"}, {"id": "b", "text": "Fixed Assets"}, {"id": "c", "text": "Accumulated Depreciation"}, {"id": "d", "text": "Cash"}]', 'c'),
('How do you record prepaid rent of €6000?', 'accounting_entries', 'advanced', '[{"id": "a", "text": "Debit Rent Expense €6000, Credit Cash €6000"}, {"id": "b", "text": "Debit Prepaid Rent €6000, Credit Cash €6000"}, {"id": "c", "text": "Debit Cash €6000, Credit Rent Revenue €6000"}, {"id": "d", "text": "Debit Accounts Payable €6000, Credit Cash €6000"}]', 'b'),
('What entry records bad debt expense using the allowance method?', 'accounting_entries', 'advanced', '[{"id": "a", "text": "Debit Bad Debt Expense, Credit Accounts Receivable"}, {"id": "b", "text": "Debit Bad Debt Expense, Credit Allowance for Doubtful Accounts"}, {"id": "c", "text": "Debit Allowance for Doubtful Accounts, Credit Cash"}, {"id": "d", "text": "Debit Cash, Credit Bad Debt Expense"}]', 'b'),

-- Financial Analysis
('What does the current ratio measure?', 'financial_analysis', 'medium', '[{"id": "a", "text": "Profitability"}, {"id": "b", "text": "Liquidity"}, {"id": "c", "text": "Leverage"}, {"id": "d", "text": "Efficiency"}]', 'b'),
('A company has current assets of €50,000 and current liabilities of €25,000. What is its current ratio?', 'financial_analysis', 'easy', '[{"id": "a", "text": "0.5"}, {"id": "b", "text": "1.0"}, {"id": "c", "text": "2.0"}, {"id": "d", "text": "25,000"}]', 'c'),
('Which ratio is calculated as Net Income / Shareholders Equity?', 'financial_analysis', 'advanced', '[{"id": "a", "text": "Return on Assets"}, {"id": "b", "text": "Return on Equity"}, {"id": "c", "text": "Profit Margin"}, {"id": "d", "text": "Asset Turnover"}]', 'b'),
('What does a debt-to-equity ratio of 2.0 indicate?', 'financial_analysis', 'advanced', '[{"id": "a", "text": "Company has twice as much equity as debt"}, {"id": "b", "text": "Company has twice as much debt as equity"}, {"id": "c", "text": "Company has no debt"}, {"id": "d", "text": "Company is profitable"}]', 'b');