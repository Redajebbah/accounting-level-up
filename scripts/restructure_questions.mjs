import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wapoozvgqllnqtkjewby.supabase.co';
const SUPABASE_KEY = 'sb_publishable_IbD3K4lioOjiwDponb7OAQ_1fqX9lyT';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Comprehensive French translations for accounting terms
const translations = {
  // Questions
  "What is the fundamental accounting equation?": "Quelle est l'équation comptable fondamentale ?",
  "Which financial statement shows a company's financial position at a specific point in time?": "Quel état financier montre la situation financière d'une entreprise à un moment précis ?",
  "What is the normal balance of an asset account?": "Quel est le solde normal d'un compte d'actif ?",
  "What is depreciation?": "Qu'est-ce que l'amortissement ?",
  "What does the term 'GAAP' stand for?": "Que signifie le terme 'PCGR' ?",
  "Which of these is a current asset?": "Lequel de ces éléments est un actif courant ?",
  "What is double-entry bookkeeping?": "Qu'est-ce que la comptabilité en partie double ?",
  "What is the purpose of a trial balance?": "Quel est l'objectif d'une balance de vérification ?",
  "What is revenue recognition?": "Qu'est-ce que la constatation des produits ?",
  "Which account is increased with a credit?": "Quel compte augmente avec un crédit ?",
  "What is the accounting period concept?": "Qu'est-ce que le principe de la période comptable ?",
  "What is a journal entry?": "Qu'est-ce qu'une écriture de journal ?",
  "What is the matching principle?": "Qu'est-ce que le principe de rattachement ?",
  "What is an adjusting entry?": "Qu'est-ce qu'une écriture de régularisation ?",
  "What is working capital?": "Qu'est-ce que le fonds de roulement ?",
  "What is the difference between cash basis and accrual basis accounting?": "Quelle est la différence entre la comptabilité de caisse et la comptabilité d'exercice ?",
  "What is a contra account?": "Qu'est-ce qu'un compte de contrepartie ?",
  "What is the purpose of closing entries?": "Quel est l'objectif des écritures de clôture ?",
  "What is a chart of accounts?": "Qu'est-ce qu'un plan comptable ?",
  "What is the accounting equation after recording a transaction?": "Quelle est l'équation comptable après l'enregistrement d'une transaction ?",

  // Common answers
  "Assets = Liabilities + Equity": "Actif = Passif + Capitaux Propres",
  "Assets = Liabilities - Equity": "Actif = Passif - Capitaux Propres",
  "Assets + Liabilities = Equity": "Actif + Passif = Capitaux Propres",
  "Assets - Equity = Liabilities": "Actif - Capitaux Propres = Passif",
  
  "Balance Sheet": "Bilan",
  "Income Statement": "Compte de résultat",
  "Cash Flow Statement": "Tableau des flux de trésorerie",
  "Statement of Changes in Equity": "État des variations des capitaux propres",
  
  "Debit": "Débit",
  "Credit": "Crédit",
  "Neither debit nor credit": "Ni débit ni crédit",
  "It depends on the account type": "Cela dépend du type de compte",
  
  "Systematic allocation of asset cost over useful life": "Répartition systématique du coût d'un actif sur sa durée d'utilité",
  "The decrease in asset value": "La diminution de la valeur de l'actif",
  "An expense that reduces profit": "Une charge qui réduit le bénéfice",
  "All of the above": "Toutes ces réponses",
  
  "Generally Accepted Accounting Principles": "Principes Comptables Généralement Reconnus",
  "Government Accounting and Auditing Procedures": "Procédures Gouvernementales de Comptabilité et d'Audit",
  "General Accounting Application Protocol": "Protocole d'Application Comptable Général",
  "Global Accounting Assessment Program": "Programme d'Évaluation Comptable Mondial",
  
  "Cash": "Trésorerie",
  "Inventory": "Stock",
  "Accounts Receivable": "Créances clients",
  "Building": "Immeuble",
  "Equipment": "Équipement",
  "Land": "Terrain",
  "Machinery": "Machines",
  
  "A system where every transaction affects at least two accounts": "Un système où chaque transaction affecte au moins deux comptes",
  "Recording transactions twice for accuracy": "Enregistrer les transactions deux fois pour plus de précision",
  "Using two accountants to verify entries": "Utiliser deux comptables pour vérifier les écritures",
  "Keeping two sets of books": "Tenir deux jeux de livres",
  
  "To ensure debits equal credits": "Pour s'assurer que les débits égalent les crédits",
  "To calculate profit": "Pour calculer le bénéfice",
  "To prepare tax returns": "Pour préparer les déclarations fiscales",
  "To audit the company": "Pour auditer l'entreprise",
  
  "Recording revenue when earned, not when cash is received": "Enregistrer les produits lorsqu'ils sont acquis, pas lorsque l'argent est reçu",
  "Recording revenue when cash is received": "Enregistrer les produits lorsque l'argent est reçu",
  "Recording revenue at year-end": "Enregistrer les produits en fin d'année",
  "Recording revenue monthly": "Enregistrer les produits mensuellement",
  
  "Revenue": "Produits",
  "Liability": "Passif",
  "Asset": "Actif",
  "Expense": "Charge",
  
  "Business activities are divided into time periods": "Les activités commerciales sont divisées en périodes temporelles",
  "Accounting is done periodically": "La comptabilité est faite périodiquement",
  "Financial statements are prepared monthly": "Les états financiers sont préparés mensuellement",
  "The accounting cycle repeats": "Le cycle comptable se répète",
  
  "A record of a transaction in the accounting system": "Un enregistrement d'une transaction dans le système comptable",
  "A daily summary of accounts": "Un résumé quotidien des comptes",
  "A type of financial statement": "Un type d'état financier",
  "A book where transactions are recorded": "Un livre où les transactions sont enregistrées",
  
  "Expenses should be recorded in the same period as related revenues": "Les charges doivent être enregistrées dans la même période que les produits correspondants",
  "Expenses should match the budget": "Les charges doivent correspondre au budget",
  "Revenue and expenses should be equal": "Les produits et les charges doivent être égaux",
  "All expenses should be matched with cash payments": "Toutes les charges doivent correspondre aux paiements en espèces",
  
  "An entry made at the end of the period to update accounts": "Une écriture effectuée en fin de période pour mettre à jour les comptes",
  "An entry to correct errors": "Une écriture pour corriger les erreurs",
  "An entry to close accounts": "Une écriture pour clôturer les comptes",
  "An entry to record new transactions": "Une écriture pour enregistrer de nouvelles transactions",
  
  "Current Assets - Current Liabilities": "Actif Courant - Passif Courant",
  "Total Assets - Total Liabilities": "Total Actif - Total Passif",
  "Cash + Inventory": "Trésorerie + Stock",
  "Revenue - Expenses": "Produits - Charges",
  
  "Cash basis records when cash is received/paid; accrual records when earned/incurred": "La comptabilité de caisse enregistre lors de la réception/du paiement; la comptabilité d'exercice enregistre lors de l'acquisition/de l'engagement",
  "They are the same thing": "C'est la même chose",
  "Cash basis is for small businesses only": "La comptabilité de caisse est seulement pour les petites entreprises",
  "Accrual basis is simpler": "La comptabilité d'exercice est plus simple",
  
  "An account with a balance opposite to the normal balance of its related account": "Un compte avec un solde opposé au solde normal de son compte associé",
  "An account that contradicts another account": "Un compte qui contredit un autre compte",
  "A backup account": "Un compte de sauvegarde",
  "A temporary account": "Un compte temporaire",
  
  "To transfer temporary account balances to retained earnings": "Pour transférer les soldes des comptes temporaires aux bénéfices non distribués",
  "To close the business": "Pour fermer l'entreprise",
  "To prepare for an audit": "Pour préparer un audit",
  "To reconcile bank statements": "Pour rapprocher les relevés bancaires",
  
  "A systematic listing of all accounts used by a company": "Une liste systématique de tous les comptes utilisés par une entreprise",
  "A graph showing account relationships": "Un graphique montrant les relations entre les comptes",
  "A map of accounting procedures": "Une carte des procédures comptables",
  "A chart showing profits": "Un graphique montrant les bénéfices",
  
  "It remains balanced": "Elle reste équilibrée",
  "It becomes unbalanced": "Elle devient déséquilibrée",
  "It doubles": "Elle double",
  "It resets to zero": "Elle revient à zéro",
};

// Function to translate text
function translateToFrench(text) {
  // Direct match
  if (translations[text]) {
    return translations[text];
  }
  
  // Try to find partial matches for longer texts
  for (const [eng, fr] of Object.entries(translations)) {
    if (text.includes(eng)) {
      return text.replace(eng, fr);
    }
  }
  
  // If no translation found, return original with a note
  console.log(`⚠️  No translation for: "${text}"`);
  return text;
}

async function restructureQuestions() {
  console.log('🔄 Restructuring questions: English → French (primary) + English translation\n');
  console.log('═'.repeat(70));
  
  try {
    // Fetch all existing questions
    console.log('\n📥 Fetching existing questions...');
    const { data: questions, error: fetchError } = await supabase
      .from('questions')
      .select('*')
      .order('created_at');

    if (fetchError) throw fetchError;

    console.log(`✅ Found ${questions.length} questions\n`);

    // Process each question
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      console.log(`\n[${i + 1}/${questions.length}] Processing question...`);
      console.log(`   Original (EN): ${q.question_text.substring(0, 60)}...`);

      // Translate question text
      const frenchQuestion = translateToFrench(q.question_text);
      console.log(`   French (FR): ${frenchQuestion.substring(0, 60)}...`);

      // Translate options
      const frenchOptions = q.options.map(opt => ({
        id: opt.id,
        text: translateToFrench(opt.text),
        text_en: opt.text // Store original English
      }));

      // Update the question
      const { error: updateError } = await supabase
        .from('questions')
        .update({
          question_text: frenchQuestion,
          question_text_en: q.question_text,
          options: frenchOptions
        })
        .eq('id', q.id);

      if (updateError) {
        console.log(`   ❌ Error: ${updateError.message}`);
      } else {
        console.log(`   ✅ Updated successfully`);
      }
    }

    console.log('\n' + '═'.repeat(70));
    console.log('✨ All questions restructured!\n');
    console.log('📊 Summary:');
    console.log(`   • ${questions.length} questions processed`);
    console.log(`   • French set as primary language`);
    console.log(`   • English saved in _en fields`);
    console.log('\n🚀 Your app is ready! Test the language switcher now!\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
  }
}

restructureQuestions();
