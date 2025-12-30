/**
 * Sample script to add bilingual questions to the database
 * 
 * This is an EXAMPLE showing how to structure and insert bilingual questions.
 * Adapt this to your actual questions and content needs.
 */

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

// Sample bilingual questions
const bilingualQuestions = [
  {
    question_text: "Quelle est l'équation comptable fondamentale?",
    question_text_en: "What is the fundamental accounting equation?",
    category: 'accounting_basics',
    difficulty: 'easy',
    options: [
      { id: "a", text: "Actif = Passif + Capitaux Propres" },
      { id: "b", text: "Actif = Passif - Capitaux Propres" },
      { id: "c", text: "Actif + Passif = Capitaux Propres" },
      { id: "d", text: "Actif - Capitaux Propres = Passif" }
    ],
    options_en: [
      { id: "a", text_en: "Assets = Liabilities + Equity" },
      { id: "b", text_en: "Assets = Liabilities - Equity" },
      { id: "c", text_en: "Assets + Liabilities = Equity" },
      { id: "d", text_en: "Assets - Equity = Liabilities" }
    ],
    correct_option_id: 'a'
  },
  {
    question_text: "Quel document présente la situation financière à un instant T?",
    question_text_en: "Which document presents the financial position at a specific point in time?",
    category: 'financial_analysis',
    difficulty: 'easy',
    options: [
      { id: "a", text: "Le compte de résultat" },
      { id: "b", text: "Le bilan" },
      { id: "c", text: "Le tableau de flux de trésorerie" },
      { id: "d", text: "L'annexe" }
    ],
    options_en: [
      { id: "a", text_en: "The income statement" },
      { id: "b", text_en: "The balance sheet" },
      { id: "c", text_en: "The cash flow statement" },
      { id: "d", text_en: "The notes" }
    ],
    correct_option_id: 'b'
  },
  {
    question_text: "Quel est le taux normal de TVA en France?",
    question_text_en: "What is the standard VAT rate in France?",
    category: 'vat',
    difficulty: 'easy',
    options: [
      { id: "a", text: "5,5%" },
      { id: "b", text: "10%" },
      { id: "c", text: "20%" },
      { id: "d", text: "25%" }
    ],
    options_en: [
      { id: "a", text_en: "5.5%" },
      { id: "b", text_en: "10%" },
      { id: "c", text_en: "20%" },
      { id: "d", text_en: "25%" }
    ],
    correct_option_id: 'c'
  },
  {
    question_text: "Les comptes de la classe 6 du plan comptable représentent:",
    question_text_en: "Class 6 accounts in the chart of accounts represent:",
    category: 'chart_of_accounts',
    difficulty: 'medium',
    options: [
      { id: "a", text: "Les produits" },
      { id: "b", text: "Les charges" },
      { id: "c", text: "Les actifs" },
      { id: "d", text: "Les passifs" }
    ],
    options_en: [
      { id: "a", text_en: "Revenues" },
      { id: "b", text_en: "Expenses" },
      { id: "c", text_en: "Assets" },
      { id: "d", text_en: "Liabilities" }
    ],
    correct_option_id: 'b'
  },
  {
    question_text: "Comment enregistrer l'acquisition d'une immobilisation à crédit?",
    question_text_en: "How to record the acquisition of a fixed asset on credit?",
    category: 'accounting_entries',
    difficulty: 'medium',
    options: [
      { id: "a", text: "Débit: Immobilisation / Crédit: Banque" },
      { id: "b", text: "Débit: Immobilisation / Crédit: Fournisseur d'immobilisation" },
      { id: "c", text: "Débit: Charge / Crédit: Fournisseur" },
      { id: "d", text: "Débit: Stock / Crédit: Fournisseur" }
    ],
    options_en: [
      { id: "a", text_en: "Debit: Fixed Asset / Credit: Bank" },
      { id: "b", text_en: "Debit: Fixed Asset / Credit: Fixed Asset Supplier" },
      { id: "c", text_en: "Debit: Expense / Credit: Supplier" },
      { id: "d", text_en: "Debit: Inventory / Credit: Supplier" }
    ],
    correct_option_id: 'b'
  }
];

async function insertBilingualQuestions() {
  console.log('Starting to insert bilingual questions...\n');

  for (const question of bilingualQuestions) {
    try {
      const { data, error } = await supabase
        .from('questions')
        .insert([question])
        .select();

      if (error) {
        console.error(`❌ Error inserting question: ${question.question_text}`);
        console.error(error);
      } else {
        console.log(`✅ Successfully inserted: ${question.question_text}`);
        console.log(`   English: ${question.question_text_en}\n`);
      }
    } catch (err) {
      console.error(`❌ Exception inserting question:`, err);
    }
  }

  console.log('\n✨ Finished inserting questions!');
}

// Run the script
insertBilingualQuestions();

/**
 * To run this script:
 * 
 * 1. Install dependencies:
 *    npm install @supabase/supabase-js dotenv
 * 
 * 2. Create a .env file with:
 *    SUPABASE_URL=your_supabase_url
 *    SUPABASE_ANON_KEY=your_supabase_anon_key
 * 
 * 3. Run:
 *    node scripts/add_bilingual_questions.mjs
 * 
 * OR use the Supabase SQL Editor with the equivalent SQL INSERT statements.
 */
