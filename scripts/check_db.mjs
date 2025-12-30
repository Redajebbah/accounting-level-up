import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wapoozvgqllnqtkjewby.supabase.co';
const SUPABASE_KEY = 'sb_publishable_IbD3K4lioOjiwDponb7OAQ_1fqX9lyT';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function checkDatabase() {
  console.log('🔍 Checking database content...\n');
  
  const { data: questions, error } = await supabase
    .from('questions')
    .select('*')
    .limit(3);

  if (error) {
    console.error('Error:', error);
    return;
  }

  questions.forEach((q, i) => {
    console.log(`\n━━━ Question ${i + 1} ━━━`);
    console.log('ID:', q.id);
    console.log('question_text (should be FR):', q.question_text);
    console.log('question_text_en (should be EN):', q.question_text_en);
    console.log('\nOptions:');
    q.options.forEach(opt => {
      console.log(`  ${opt.id}) text: "${opt.text}"`);
      console.log(`     text_en: "${opt.text_en}"`);
    });
  });
}

checkDatabase();
