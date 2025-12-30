-- Sample bilingual questions for the accounting quiz
-- Copy and paste this into Supabase SQL Editor to add these questions

-- Question 1: Fundamental Accounting Equation
INSERT INTO questions (
  question_text,
  question_text_en,
  category,
  difficulty,
  options,
  correct_option_id
) VALUES (
  'Quelle est l''équation comptable fondamentale?',
  'What is the fundamental accounting equation?',
  'accounting_basics',
  'easy',
  '[
    {"id": "a", "text": "Actif = Passif + Capitaux Propres", "text_en": "Assets = Liabilities + Equity"},
    {"id": "b", "text": "Actif = Passif - Capitaux Propres", "text_en": "Assets = Liabilities - Equity"},
    {"id": "c", "text": "Actif + Passif = Capitaux Propres", "text_en": "Assets + Liabilities = Equity"},
    {"id": "d", "text": "Actif - Capitaux Propres = Passif", "text_en": "Assets - Equity = Liabilities"}
  ]'::jsonb,
  'a'
);

-- Question 2: Balance Sheet
INSERT INTO questions (
  question_text,
  question_text_en,
  category,
  difficulty,
  options,
  correct_option_id
) VALUES (
  'Quel document présente la situation financière à un instant T?',
  'Which document presents the financial position at a specific point in time?',
  'financial_analysis',
  'easy',
  '[
    {"id": "a", "text": "Le compte de résultat", "text_en": "The income statement"},
    {"id": "b", "text": "Le bilan", "text_en": "The balance sheet"},
    {"id": "c", "text": "Le tableau de flux de trésorerie", "text_en": "The cash flow statement"},
    {"id": "d", "text": "L''annexe", "text_en": "The notes"}
  ]'::jsonb,
  'b'
);

-- Question 3: VAT Rate
INSERT INTO questions (
  question_text,
  question_text_en,
  category,
  difficulty,
  options,
  correct_option_id
) VALUES (
  'Quel est le taux normal de TVA en France?',
  'What is the standard VAT rate in France?',
  'vat',
  'easy',
  '[
    {"id": "a", "text": "5,5%", "text_en": "5.5%"},
    {"id": "b", "text": "10%", "text_en": "10%"},
    {"id": "c", "text": "20%", "text_en": "20%"},
    {"id": "d", "text": "25%", "text_en": "25%"}
  ]'::jsonb,
  'c'
);

-- Question 4: Chart of Accounts Class 6
INSERT INTO questions (
  question_text,
  question_text_en,
  category,
  difficulty,
  options,
  correct_option_id
) VALUES (
  'Les comptes de la classe 6 du plan comptable représentent:',
  'Class 6 accounts in the chart of accounts represent:',
  'chart_of_accounts',
  'medium',
  '[
    {"id": "a", "text": "Les produits", "text_en": "Revenues"},
    {"id": "b", "text": "Les charges", "text_en": "Expenses"},
    {"id": "c", "text": "Les actifs", "text_en": "Assets"},
    {"id": "d", "text": "Les passifs", "text_en": "Liabilities"}
  ]'::jsonb,
  'b'
);

-- Question 5: Fixed Asset Acquisition
INSERT INTO questions (
  question_text,
  question_text_en,
  category,
  difficulty,
  options,
  correct_option_id
) VALUES (
  'Comment enregistrer l''acquisition d''une immobilisation à crédit?',
  'How to record the acquisition of a fixed asset on credit?',
  'accounting_entries',
  'medium',
  '[
    {"id": "a", "text": "Débit: Immobilisation / Crédit: Banque", "text_en": "Debit: Fixed Asset / Credit: Bank"},
    {"id": "b", "text": "Débit: Immobilisation / Crédit: Fournisseur d''immobilisation", "text_en": "Debit: Fixed Asset / Credit: Fixed Asset Supplier"},
    {"id": "c", "text": "Débit: Charge / Crédit: Fournisseur", "text_en": "Debit: Expense / Credit: Supplier"},
    {"id": "d", "text": "Débit: Stock / Crédit: Fournisseur", "text_en": "Debit: Inventory / Credit: Supplier"}
  ]'::jsonb,
  'b'
);

-- Question 6: Depreciation
INSERT INTO questions (
  question_text,
  question_text_en,
  category,
  difficulty,
  options,
  correct_option_id
) VALUES (
  'Qu''est-ce que l''amortissement d''une immobilisation?',
  'What is depreciation of a fixed asset?',
  'accounting_basics',
  'medium',
  '[
    {"id": "a", "text": "La répartition systématique de son coût sur sa durée d''utilité", "text_en": "The systematic allocation of its cost over its useful life"},
    {"id": "b", "text": "Sa valeur de revente actuelle", "text_en": "Its current resale value"},
    {"id": "c", "text": "Son coût d''acquisition initial", "text_en": "Its initial acquisition cost"},
    {"id": "d", "text": "Le montant des réparations nécessaires", "text_en": "The amount of necessary repairs"}
  ]'::jsonb,
  'a'
);

-- Question 7: Debit/Credit
INSERT INTO questions (
  question_text,
  question_text_en,
  category,
  difficulty,
  options,
  correct_option_id
) VALUES (
  'Une augmentation d''un compte d''actif se traduit par:',
  'An increase in an asset account is recorded as:',
  'accounting_entries',
  'easy',
  '[
    {"id": "a", "text": "Un débit", "text_en": "A debit"},
    {"id": "b", "text": "Un crédit", "text_en": "A credit"},
    {"id": "c", "text": "Ni débit ni crédit", "text_en": "Neither debit nor credit"},
    {"id": "d", "text": "Un débit et un crédit simultanés", "text_en": "A simultaneous debit and credit"}
  ]'::jsonb,
  'a'
);

-- Question 8: Working Capital
INSERT INTO questions (
  question_text,
  question_text_en,
  category,
  difficulty,
  options,
  correct_option_id
) VALUES (
  'Le fonds de roulement (FR) se calcule par:',
  'Working capital is calculated as:',
  'financial_analysis',
  'advanced',
  '[
    {"id": "a", "text": "Actif circulant - Passif circulant", "text_en": "Current Assets - Current Liabilities"},
    {"id": "b", "text": "Capitaux permanents - Actif immobilisé", "text_en": "Permanent Capital - Fixed Assets"},
    {"id": "c", "text": "Trésorerie + Stocks", "text_en": "Cash + Inventory"},
    {"id": "d", "text": "Chiffre d''affaires - Charges", "text_en": "Revenue - Expenses"}
  ]'::jsonb,
  'b'
);

-- Verify insertion
SELECT 
  question_text,
  question_text_en,
  category,
  difficulty
FROM questions
ORDER BY created_at DESC
LIMIT 10;
