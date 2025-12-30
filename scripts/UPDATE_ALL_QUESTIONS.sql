-- Update all questions to have French as primary and English as translation
-- Run this in Supabase Dashboard > SQL Editor

-- Question 1
UPDATE questions 
SET 
  question_text = 'Quel type de compte est « Trésorerie » ?',
  question_text_en = 'What type of account is "Cash"?',
  options = '[
    {"id": "a", "text": "Actif", "text_en": "Asset"},
    {"id": "b", "text": "Passif", "text_en": "Liability"},
    {"id": "c", "text": "Capitaux Propres", "text_en": "Equity"},
    {"id": "d", "text": "Produits", "text_en": "Revenue"}
  ]'::jsonb
WHERE question_text = 'What type of account is "Cash"?';

-- Question 2
UPDATE questions 
SET 
  question_text = 'Lorsqu''une entreprise rembourse un prêt, quel côté est crédité ?',
  question_text_en = 'When a company pays off a loan, which side is credited?',
  options = '[
    {"id": "a", "text": "Trésorerie", "text_en": "Cash"},
    {"id": "b", "text": "Emprunt à payer", "text_en": "Loan Payable"},
    {"id": "c", "text": "Charge d''intérêts", "text_en": "Interest Expense"},
    {"id": "d", "text": "Bénéfices non distribués", "text_en": "Retained Earnings"}
  ]'::jsonb
WHERE question_text = 'When a company pays off a loan, which side is credited?';

-- Question 3
UPDATE questions 
SET 
  question_text = 'Une écriture au débit augmente lequel des éléments suivants ?',
  question_text_en = 'A debit entry increases which of the following?',
  options = '[
    {"id": "a", "text": "Passifs", "text_en": "Liabilities"},
    {"id": "b", "text": "Produits", "text_en": "Revenue"},
    {"id": "c", "text": "Actifs", "text_en": "Assets"},
    {"id": "d", "text": "Capitaux Propres", "text_en": "Equity"}
  ]'::jsonb
WHERE question_text = 'A debit entry increases which of the following?';

-- Question 4
UPDATE questions 
SET 
  question_text = 'Quelle est l''équation comptable fondamentale ?',
  question_text_en = 'What is the fundamental accounting equation?',
  options = '[
    {"id": "a", "text": "Actif = Passif + Capitaux Propres", "text_en": "Assets = Liabilities + Equity"},
    {"id": "b", "text": "Produits - Charges = Bénéfice", "text_en": "Revenue - Expenses = Profit"},
    {"id": "c", "text": "Actif + Passif = Capitaux Propres", "text_en": "Assets + Liabilities = Equity"},
    {"id": "d", "text": "Débit = Crédit", "text_en": "Debit = Credit"}
  ]'::jsonb
WHERE question_text = 'What is the fundamental accounting equation?';

-- Question 5
UPDATE questions 
SET 
  question_text = 'Quelle classe de comptes a généralement des numéros commençant par 1 ?',
  question_text_en = 'Which account class typically has numbers starting with 1?',
  options = '[
    {"id": "a", "text": "Actifs", "text_en": "Assets"},
    {"id": "b", "text": "Passifs", "text_en": "Liabilities"},
    {"id": "c", "text": "Capitaux Propres", "text_en": "Equity"},
    {"id": "d", "text": "Produits", "text_en": "Revenue"}
  ]'::jsonb
WHERE question_text = 'Which account class typically has numbers starting with 1?';

-- Question 6
UPDATE questions 
SET 
  question_text = 'Les créances clients appartiennent à quelle catégorie ?',
  question_text_en = 'Accounts Receivable belongs to which category?',
  options = '[
    {"id": "a", "text": "Actif Courant", "text_en": "Current Assets"},
    {"id": "b", "text": "Passif Courant", "text_en": "Current Liabilities"},
    {"id": "c", "text": "Actif à Long Terme", "text_en": "Long-term Assets"},
    {"id": "d", "text": "Passif à Long Terme", "text_en": "Long-term Liabilities"}
  ]'::jsonb
WHERE question_text = 'Accounts Receivable belongs to which category?';

-- Question 7
UPDATE questions 
SET 
  question_text = 'Quel compte utiliseriez-vous pour enregistrer l''achat de fournitures de bureau ?',
  question_text_en = 'Which account would you use to record office supplies purchased?',
  options = '[
    {"id": "a", "text": "Fournitures de Bureau", "text_en": "Office Supplies"},
    {"id": "b", "text": "Charges de Bureau", "text_en": "Office Expense"},
    {"id": "c", "text": "Stock", "text_en": "Inventory"},
    {"id": "d", "text": "Coût des Marchandises Vendues", "text_en": "Cost of Goods Sold"}
  ]'::jsonb
WHERE question_text = 'Which account would you use to record office supplies purchased?';

-- Question 8
UPDATE questions 
SET 
  question_text = 'Quelle est la plage de numéros typique pour les comptes de capitaux propres ?',
  question_text_en = 'What is the typical account number range for equity accounts?',
  options = '[
    {"id": "a", "text": "100-199", "text_en": "100-199"},
    {"id": "b", "text": "200-299", "text_en": "200-299"},
    {"id": "c", "text": "300-399", "text_en": "300-399"},
    {"id": "d", "text": "400-499", "text_en": "400-499"}
  ]'::jsonb
WHERE question_text = 'What is the typical account number range for equity accounts?';

-- Question 9
UPDATE questions 
SET 
  question_text = 'Que signifie TVA ?',
  question_text_en = 'What does VAT stand for?',
  options = '[
    {"id": "a", "text": "Taxe sur la Valeur Ajoutée", "text_en": "Value Added Tax"},
    {"id": "b", "text": "Total de Compte Vérifié", "text_en": "Verified Account Total"},
    {"id": "c", "text": "Taxe Annuelle Variable", "text_en": "Variable Annual Tax"},
    {"id": "d", "text": "Transaction d''Audit Volontaire", "text_en": "Voluntary Audit Transaction"}
  ]'::jsonb
WHERE question_text = 'What does VAT stand for?';

-- Question 10
UPDATE questions 
SET 
  question_text = 'Si la TVA déductible est de 500€ et la TVA collectée de 800€, quelle est la TVA à payer ?',
  question_text_en = 'If input VAT is €500 and output VAT is €800, what is the VAT payable?',
  options = '[
    {"id": "a", "text": "300€", "text_en": "€300"},
    {"id": "b", "text": "500€", "text_en": "€500"},
    {"id": "c", "text": "800€", "text_en": "€800"},
    {"id": "d", "text": "1300€", "text_en": "€1300"}
  ]'::jsonb
WHERE question_text = 'If input VAT is €500 and output VAT is €800, what is the VAT payable?';

-- Question 11
UPDATE questions 
SET 
  question_text = 'Lequel de ces éléments est généralement exonéré de TVA ?',
  question_text_en = 'Which of these is typically VAT exempt?',
  options = '[
    {"id": "a", "text": "Électronique", "text_en": "Electronics"},
    {"id": "b", "text": "Services médicaux", "text_en": "Medical services"},
    {"id": "c", "text": "Repas au restaurant", "text_en": "Restaurant meals"},
    {"id": "d", "text": "Vêtements", "text_en": "Clothing"}
  ]'::jsonb
WHERE question_text = 'Which of these is typically VAT exempt?';

-- Question 12
UPDATE questions 
SET 
  question_text = 'Quand la TVA est-elle généralement due aux autorités fiscales ?',
  question_text_en = 'When is VAT typically due to tax authorities?',
  options = '[
    {"id": "a", "text": "Lorsque la facture est émise", "text_en": "When invoice is issued"},
    {"id": "b", "text": "Lorsque le paiement est reçu", "text_en": "When payment is received"},
    {"id": "c", "text": "Dépend du régime de TVA", "text_en": "Depends on VAT scheme"},
    {"id": "d", "text": "Fin de l''exercice comptable", "text_en": "End of financial year"}
  ]'::jsonb
WHERE question_text = 'When is VAT typically due to tax authorities?';

-- Question 13
UPDATE questions 
SET 
  question_text = 'Quelle est l''écriture comptable pour une vente au comptant de 1000€ ?',
  question_text_en = 'What is the journal entry for a cash sale of €1000?',
  options = '[
    {"id": "a", "text": "Débit Trésorerie 1000€, Crédit Produits 1000€", "text_en": "Dr. Cash €1000, Cr. Revenue €1000"},
    {"id": "b", "text": "Débit Produits 1000€, Crédit Trésorerie 1000€", "text_en": "Dr. Revenue €1000, Cr. Cash €1000"},
    {"id": "c", "text": "Débit Trésorerie 1000€, Crédit Passif 1000€", "text_en": "Dr. Cash €1000, Cr. Liability €1000"},
    {"id": "d", "text": "Débit Charges 1000€, Crédit Trésorerie 1000€", "text_en": "Dr. Expense €1000, Cr. Cash €1000"}
  ]'::jsonb
WHERE question_text = 'What is the journal entry for a cash sale of €1000?';

-- Question 14
UPDATE questions 
SET 
  question_text = 'Lors de l''enregistrement de l''amortissement, quel compte est crédité ?',
  question_text_en = 'When recording depreciation, which account is credited?',
  options = '[
    {"id": "a", "text": "Charge d''Amortissement", "text_en": "Depreciation Expense"},
    {"id": "b", "text": "Amortissements Cumulés", "text_en": "Accumulated Depreciation"},
    {"id": "c", "text": "Immobilisations", "text_en": "Fixed Assets"},
    {"id": "d", "text": "Trésorerie", "text_en": "Cash"}
  ]'::jsonb
WHERE question_text = 'When recording depreciation, which account is credited?';

-- Question 15
UPDATE questions 
SET 
  question_text = 'Comment enregistrez-vous un loyer payé d''avance de 6000€ ?',
  question_text_en = 'How do you record prepaid rent of €6000?',
  options = '[
    {"id": "a", "text": "Débit Loyer Payé d''Avance 6000€, Crédit Trésorerie 6000€", "text_en": "Dr. Prepaid Rent €6000, Cr. Cash €6000"},
    {"id": "b", "text": "Débit Trésorerie 6000€, Crédit Loyer Payé d''Avance 6000€", "text_en": "Dr. Cash €6000, Cr. Prepaid Rent €6000"},
    {"id": "c", "text": "Débit Charge de Loyer 6000€, Crédit Trésorerie 6000€", "text_en": "Dr. Rent Expense €6000, Cr. Cash €6000"},
    {"id": "d", "text": "Débit Trésorerie 6000€, Crédit Produits de Loyer 6000€", "text_en": "Dr. Cash €6000, Cr. Rent Revenue €6000"}
  ]'::jsonb
WHERE question_text = 'How do you record prepaid rent of €6000?';

-- Question 16
UPDATE questions 
SET 
  question_text = 'Quelle écriture enregistre la charge pour créances douteuses selon la méthode de provision ?',
  question_text_en = 'What entry records bad debt expense using the allowance method?',
  options = '[
    {"id": "a", "text": "Débit Charge pour Créances Douteuses, Crédit Provision pour Créances Douteuses", "text_en": "Dr. Bad Debt Expense, Cr. Allowance for Doubtful Accounts"},
    {"id": "b", "text": "Débit Créances Clients, Crédit Charge pour Créances Douteuses", "text_en": "Dr. Accounts Receivable, Cr. Bad Debt Expense"},
    {"id": "c", "text": "Débit Provision pour Créances Douteuses, Crédit Créances Clients", "text_en": "Dr. Allowance for Doubtful Accounts, Cr. Accounts Receivable"},
    {"id": "d", "text": "Débit Charge pour Créances Douteuses, Crédit Créances Clients", "text_en": "Dr. Bad Debt Expense, Cr. Accounts Receivable"}
  ]'::jsonb
WHERE question_text = 'What entry records bad debt expense using the allowance method?';

-- Question 17
UPDATE questions 
SET 
  question_text = 'Que mesure le ratio de liquidité générale ?',
  question_text_en = 'What does the current ratio measure?',
  options = '[
    {"id": "a", "text": "Rentabilité", "text_en": "Profitability"},
    {"id": "b", "text": "Liquidité", "text_en": "Liquidity"},
    {"id": "c", "text": "Levier Financier", "text_en": "Leverage"},
    {"id": "d", "text": "Efficacité", "text_en": "Efficiency"}
  ]'::jsonb
WHERE question_text = 'What does the current ratio measure?';

-- Question 18
UPDATE questions 
SET 
  question_text = 'Une entreprise a un actif courant de 50 000€ et un passif courant de 25 000€. Quel est son ratio de liquidité générale ?',
  question_text_en = 'A company has current assets of €50,000 and current liabilities of €25,000. What is its current ratio?',
  options = '[
    {"id": "a", "text": "0,5", "text_en": "0.5"},
    {"id": "b", "text": "1,0", "text_en": "1.0"},
    {"id": "c", "text": "2,0", "text_en": "2.0"},
    {"id": "d", "text": "25 000", "text_en": "25,000"}
  ]'::jsonb
WHERE question_text = 'A company has current assets of €50,000 and current liabilities of €25,000. What is its current ratio?';

-- Question 19
UPDATE questions 
SET 
  question_text = 'Quel ratio est calculé comme Résultat Net / Capitaux Propres ?',
  question_text_en = 'Which ratio is calculated as Net Income / Shareholders Equity?',
  options = '[
    {"id": "a", "text": "Rentabilité des Capitaux Propres", "text_en": "Return on Equity"},
    {"id": "b", "text": "Rentabilité des Actifs", "text_en": "Return on Assets"},
    {"id": "c", "text": "Marge Bénéficiaire", "text_en": "Profit Margin"},
    {"id": "d", "text": "Ratio de Marge Brute", "text_en": "Gross Profit Ratio"}
  ]'::jsonb
WHERE question_text = 'Which ratio is calculated as Net Income / Shareholders Equity?';

-- Question 20
UPDATE questions 
SET 
  question_text = 'Qu''indique un ratio d''endettement de 2,0 ?',
  question_text_en = 'What does a debt-to-equity ratio of 2.0 indicate?',
  options = '[
    {"id": "a", "text": "L''entreprise a deux fois plus de capitaux propres que de dettes", "text_en": "Company has twice as much equity as debt"},
    {"id": "b", "text": "L''entreprise a deux fois plus de dettes que de capitaux propres", "text_en": "Company has twice as much debt as equity"},
    {"id": "c", "text": "L''entreprise n''a pas de dettes", "text_en": "Company has no debt"},
    {"id": "d", "text": "L''entreprise est rentable", "text_en": "Company is profitable"}
  ]'::jsonb
WHERE question_text = 'What does a debt-to-equity ratio of 2.0 indicate?';

-- Verify updates
SELECT id, LEFT(question_text, 50) as question_fr, LEFT(question_text_en, 50) as question_en
FROM questions
ORDER BY created_at
LIMIT 5;
