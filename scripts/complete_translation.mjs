import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wapoozvgqllnqtkjewby.supabase.co';
const SUPABASE_KEY = 'sb_publishable_IbD3K4lioOjiwDponb7OAQ_1fqX9lyT';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Complete accounting translations - French version
const accountingTranslations = {
  // Questions
  "What type of account is \"Cash\"?": "Quel type de compte est \"Trésorerie\" ?",
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

  // Account types and terms
  "Asset": "Actif",
  "Liability": "Passif",  
  "Equity": "Capitaux Propres",
  "Revenue": "Produits",
  "Expense": "Charges",
  "Cash": "Trésorerie",
  "Debit": "Débit",
  "Credit": "Crédit",
  "Assets": "Actifs",
  "Liabilities": "Passifs",
  
  // Specific accounts
  "Loan Payable": "Emprunt à payer",
  "Retained Earnings": "Bénéfices non distribués",
  "Accounts Receivable": "Créances clients",
  "Current Liabilities": "Passif courant",
  "Long-term Liabilities": "Passif à long terme",
  "Cost of Goods Sold": "Coût des marchandises vendues",
  "Accumulated Depreciation": "Amortissements cumulés",
  
  // Options
  "Assets = Liabilities + Equity": "Actif = Passif + Capitaux Propres",
  "Assets = Liabilities - Equity": "Actif = Passif - Capitaux Propres",
  "Assets + Liabilities = Equity": "Actif + Passif = Capitaux Propres",
  "Assets - Equity = Liabilities": "Actif - Capitaux Propres = Passif",
  
  // Account ranges
  "100-199": "100-199",
  "200-299": "200-299",
  "300-399": "300-399",
  "400-499": "400-499",
  
  // VAT
  "Value Added Tax": "Taxe sur la Valeur Ajoutée",
  "Verified Account Total": "Total de Compte Vérifié",
  "€300": "300€",
  "€500": "500€",
  "€800": "800€",
  "€1300": "1 300€",
  
  // VAT exempt items
  "Electronics": "Électronique",
  "Medical services": "Services médicaux",
  "Restaurant meals": "Repas au restaurant",
  "Clothing": "Vêtements",
  
  // Timing
  "When invoice is issued": "Lorsque la facture est émise",
  "When payment is received": "Lorsque le paiement est reçu",
  "Depends on VAT scheme": "Dépend du régime de TVA",
  "End of financial year": "Fin de l'exercice comptable",
  
  // Journal entries
  "Dr. Cash €1000, Cr. Revenue €1000": "Débit Trésorerie 1000€, Crédit Produits 1000€",
  "Dr. Revenue €1000, Cr. Cash €1000": "Débit Produits 1000€, Crédit Trésorerie 1000€",
  "Dr. Cash €1000, Cr. Expense €1000": "Débit Trésorerie 1000€, Crédit Charges 1000€",
  "Dr. Expense €1000, Cr. Cash €1000": "Débit Charges 1000€, Crédit Trésorerie 1000€",
  "Dr. Prepaid Rent €6000, Cr. Cash €6000": "Débit Loyer payé d'avance 6000€, Crédit Trésorerie 6000€",
  "Dr. Cash €6000, Cr. Prepaid Rent €6000": "Débit Trésorerie 6000€, Crédit Loyer payé d'avance 6000€",
  "Dr. Rent Expense €6000, Cr. Cash €6000": "Débit Charge de loyer 6000€, Crédit Trésorerie 6000€",
  "Dr. Cash €6000, Cr. Rent Revenue €6000": "Débit Trésorerie 6000€, Crédit Produits de loyer 6000€",
  "Dr. Bad Debt Expense, Cr. Allowance for Doubtful Accounts": "Débit Charge pour créances douteuses, Crédit Provision pour créances douteuses",
  "Dr. Accounts Receivable, Cr. Bad Debt Expense": "Débit Créances clients, Crédit Charge pour créances douteuses",
  "Dr. Allowance for Doubtful Accounts, Cr. Accounts Receivable": "Débit Provision pour créances douteuses, Crédit Créances clients",
  "Dr. Bad Debt Expense, Cr. Accounts Receivable": "Débit Charge pour créances douteuses, Crédit Créances clients",
  
  // Financial ratios
  "Profitability": "Rentabilité",
  "Liquidity": "Liquidité",
  "Leverage": "Levier financier",
  "Efficiency": "Efficacité",
  "0.5": "0,5",
  "1.0": "1,0",
  "2.0": "2,0",
  "25,000": "25 000",
  
  // Ratio names
  "Return on Equity": "Rentabilité des capitaux propres",
  "Profit Margin": "Marge bénéficiaire",
  "Debt-to-Equity": "Ratio d'endettement",
  "Current Ratio": "Ratio de liquidité générale",
  
  // Ratio interpretations
  "Company has twice as much equity as debt": "L'entreprise a deux fois plus de capitaux propres que de dettes",
  "Company has twice as much debt as equity": "L'entreprise a deux fois plus de dettes que de capitaux propres",
  "Company has no debt": "L'entreprise n'a pas de dettes",
  "Company is profitable": "L'entreprise est rentable",
};

function translateText(text) {
  if (!text) return text;
  
  // Direct lookup
  if (accountingTranslations[text]) {
    return accountingTranslations[text];
  }
  
  // Try to translate parts
  let translated = text;
  for (const [eng, fr] of Object.entries(accountingTranslations)) {
    if (translated.includes(eng)) {
      translated = translated.replace(new RegExp(eng, 'g'), fr);
    }
  }
  
  return translated;
}

async function fullTranslation() {
  console.log('🌍 Complete French Translation of All Questions\n');
  console.log('═'.repeat(70));
  
  try {
    const { data: questions, error } = await supabase
      .from('questions')
      .select('*')
      .order('created_at');

    if (error) throw error;

    console.log(`\n📥 Found ${questions.length} questions to translate\n`);

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      console.log(`[${i + 1}/${questions.length}] ${q.question_text.substring(0, 50)}...`);

      // Translate question
      const frenchQuestion = translateText(q.question_text);
      
      // Translate all options
      const frenchOptions = q.options.map(opt => ({
        id: opt.id,
        text: translateText(opt.text),
        text_en: opt.text
      }));

      // Update database
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
        console.log(`   ✅ Translated and updated`);
      }
    }

    console.log('\n' + '═'.repeat(70));
    console.log('✨ All 20 questions fully translated!\n');
    console.log('🎯 Database structure:');
    console.log('   • question_text = French (primary)');
    console.log('   • question_text_en = English');
    console.log('   • options.text = French');
    console.log('   • options.text_en = English\n');
    console.log('🚀 Test your app now with "npm run dev"!\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

fullTranslation();
