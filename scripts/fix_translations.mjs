import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wapoozvgqllnqtkjewby.supabase.co';
const SUPABASE_KEY = 'sb_publishable_IbD3K4lioOjiwDponb7OAQ_1fqX9lyT';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Complete translations
const translations = {
  "What type of account is \"Cash\"?": "Quel type de compte est « Trésorerie » ?",
  "When a company pays off a loan, which side is credited?": "Lorsqu'une entreprise rembourse un prêt, quel côté est crédité ?",
  "A debit entry increases which of the following?": "Une écriture au débit augmente lequel des éléments suivants ?",
  "What is the fundamental accounting equation?": "Quelle est l'équation comptable fondamentale ?",
  "Which account class typically has numbers starting with 1?": "Quelle classe de comptes a généralement des numéros commençant par 1 ?",
  "Accounts Receivable belongs to which category?": "Les créances clients appartiennent à quelle catégorie ?",
  "Which account would you use to record office supplies purchased?": "Quel compte utiliseriez-vous pour enregistrer l'achat de fournitures de bureau ?",
  "What is the typical account number range for equity accounts?": "Quelle est la plage de numéros typique pour les comptes de capitaux propres ?",
  "What does VAT stand for?": "Que signifie TVA ?",
  "If input VAT is €500 and output VAT is €800, what is the VAT payable?": "Si la TVA déductible est de 500€ et la TVA collectée de 800€, quelle est la TVA à payer ?",
  "Which of these is typically VAT exempt?": "Lequel de ces éléments est généralement exonéré de TVA ?",
  "When is VAT typically due to tax authorities?": "Quand la TVA est-elle généralement due aux autorités fiscales ?",
  "What is the journal entry for a cash sale of €1000?": "Quelle est l'écriture comptable pour une vente au comptant de 1000€ ?",
  "When recording depreciation, which account is credited?": "Lors de l'enregistrement de l'amortissement, quel compte est crédité ?",
  "How do you record prepaid rent of €6000?": "Comment enregistrez-vous un loyer payé d'avance de 6000€ ?",
  "What entry records bad debt expense using the allowance method?": "Quelle écriture enregistre la charge pour créances douteuses selon la méthode de provision ?",
  "What does the current ratio measure?": "Que mesure le ratio de liquidité générale ?",
  "A company has current assets of €50,000 and current liabilities of €25,000. What is its current ratio?": "Une entreprise a un actif courant de 50 000€ et un passif courant de 25 000€. Quel est son ratio de liquidité générale ?",
  "Which ratio is calculated as Net Income / Shareholders Equity?": "Quel ratio est calculé comme Résultat Net / Capitaux Propres ?",
  "What does a debt-to-equity ratio of 2.0 indicate?": "Qu'indique un ratio d'endettement de 2,0 ?",
  
  // Options
  "Asset": "Actif",
  "Liability": "Passif",
  "Equity": "Capitaux Propres",
  "Revenue": "Produits",
  "Cash": "Trésorerie",
  "Loan Payable": "Emprunt à payer",
  "Interest Expense": "Charge d'intérêts",
  "Retained Earnings": "Bénéfices non distribués",
  "Liabilities": "Passifs",
  "Assets": "Actifs",
  "Expense": "Charges",
  "Assets = Liabilities + Equity": "Actif = Passif + Capitaux Propres",
  "Revenue - Expenses = Profit": "Produits - Charges = Bénéfice",
  "Assets + Liabilities = Equity": "Actif + Passif = Capitaux Propres",
  "Debit = Credit": "Débit = Crédit",
  "Current Assets": "Actif Courant",
  "Current Liabilities": "Passif Courant",
  "Long-term Assets": "Actif à Long Terme",
  "Long-term Liabilities": "Passif à Long Terme",
  "Office Supplies": "Fournitures de Bureau",
  "Office Expense": "Charges de Bureau",
  "Inventory": "Stock",
  "Cost of Goods Sold": "Coût des Marchandises Vendues",
  "100-199": "100-199",
  "200-299": "200-299",
  "300-399": "300-399",
  "400-499": "400-499",
  "Value Added Tax": "Taxe sur la Valeur Ajoutée",
  "Verified Account Total": "Total de Compte Vérifié",
  "Variable Annual Tax": "Taxe Annuelle Variable",
  "Voluntary Audit Transaction": "Transaction d'Audit Volontaire",
  "€300": "300€",
  "€500": "500€",
  "€800": "800€",
  "€1300": "1300€",
  "Electronics": "Électronique",
  "Medical services": "Services médicaux",
  "Restaurant meals": "Repas au restaurant",
  "Clothing": "Vêtements",
  "When invoice is issued": "Lorsque la facture est émise",
  "When payment is received": "Lorsque le paiement est reçu",
  "Depends on VAT scheme": "Dépend du régime de TVA",
  "End of financial year": "Fin de l'exercice comptable",
  "Dr. Cash €1000, Cr. Revenue €1000": "Débit Trésorerie 1000€, Crédit Produits 1000€",
  "Dr. Revenue €1000, Cr. Cash €1000": "Débit Produits 1000€, Crédit Trésorerie 1000€",
  "Dr. Cash €1000, Cr. Liability €1000": "Débit Trésorerie 1000€, Crédit Passif 1000€",
  "Dr. Expense €1000, Cr. Cash €1000": "Débit Charges 1000€, Crédit Trésorerie 1000€",
  "Depreciation Expense": "Charge d'Amortissement",
  "Accumulated Depreciation": "Amortissements Cumulés",
  "Fixed Assets": "Immobilisations",
  "Dr. Prepaid Rent €6000, Cr. Cash €6000": "Débit Loyer Payé d'Avance 6000€, Crédit Trésorerie 6000€",
  "Dr. Cash €6000, Cr. Prepaid Rent €6000": "Débit Trésorerie 6000€, Crédit Loyer Payé d'Avance 6000€",
  "Dr. Rent Expense €6000, Cr. Cash €6000": "Débit Charge de Loyer 6000€, Crédit Trésorerie 6000€",
  "Dr. Cash €6000, Cr. Rent Revenue €6000": "Débit Trésorerie 6000€, Crédit Produits de Loyer 6000€",
  "Dr. Bad Debt Expense, Cr. Allowance for Doubtful Accounts": "Débit Charge pour Créances Douteuses, Crédit Provision pour Créances Douteuses",
  "Dr. Accounts Receivable, Cr. Bad Debt Expense": "Débit Créances Clients, Crédit Charge pour Créances Douteuses",
  "Dr. Allowance for Doubtful Accounts, Cr. Accounts Receivable": "Débit Provision pour Créances Douteuses, Crédit Créances Clients",
  "Dr. Bad Debt Expense, Cr. Accounts Receivable": "Débit Charge pour Créances Douteuses, Crédit Créances Clients",
  "Profitability": "Rentabilité",
  "Liquidity": "Liquidité",
  "Leverage": "Levier Financier",
  "Efficiency": "Efficacité",
  "0.5": "0,5",
  "1.0": "1,0",
  "2.0": "2,0",
  "25,000": "25 000",
  "Return on Equity": "Rentabilité des Capitaux Propres",
  "Return on Assets": "Rentabilité des Actifs",
  "Profit Margin": "Marge Bénéficiaire",
  "Gross Profit Ratio": "Ratio de Marge Brute",
  "Company has twice as much equity as debt": "L'entreprise a deux fois plus de capitaux propres que de dettes",
  "Company has twice as much debt as equity": "L'entreprise a deux fois plus de dettes que de capitaux propres",
  "Company has no debt": "L'entreprise n'a pas de dettes",
  "Company is profitable": "L'entreprise est rentable",
};

function translate(text) {
  return translations[text] || text;
}

async function fixTranslations() {
  console.log('🔧 Fixing database translations...\n');
  
  const { data: questions, error } = await supabase
    .from('questions')
    .select('*')
    .order('created_at');

  if (error) {
    console.error('Error fetching:', error);
    return;
  }

  console.log(`Found ${questions.length} questions\n`);

  for (const q of questions) {
    const englishQuestion = q.question_text;
    const frenchQuestion = translate(englishQuestion);
    
    // Translate options properly
    const newOptions = q.options.map(opt => {
      const englishText = opt.text;
      const frenchText = translate(englishText);
      return {
        id: opt.id,
        text: frenchText,
        text_en: englishText
      };
    });

    console.log(`Updating: "${englishQuestion.substring(0, 50)}..."`);
    console.log(`       → "${frenchQuestion.substring(0, 50)}..."`);

    const { error: updateError } = await supabase
      .from('questions')
      .update({
        question_text: frenchQuestion,
        question_text_en: englishQuestion,
        options: newOptions
      })
      .eq('id', q.id);

    if (updateError) {
      console.error(`  ❌ Error:`, updateError.message);
    } else {
      console.log(`  ✅ Updated\n`);
    }
  }

  console.log('\n✨ Done! Refresh your app to see French questions.\n');
}

fixTranslations();
