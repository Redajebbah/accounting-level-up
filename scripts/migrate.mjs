import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wapoozvgqllnqtkjewby.supabase.co';
const SUPABASE_KEY = 'sb_publishable_IbD3K4lioOjiwDponb7OAQ_1fqX9lyT';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function applyMigration() {
  console.log('🌍 Bilingual Migration Tool');
  console.log('═'.repeat(70));
  console.log('\n🔍 Checking database schema...\n');

  try {
    // Check current schema
    const { data: questions, error: fetchError } = await supabase
      .from('questions')
      .select('*')
      .limit(1);

    if (fetchError) {
      throw fetchError;
    }

    // Check if English columns exist
    const hasEnglishColumn = questions && questions.length > 0 && 
                             'question_text_en' in questions[0];

    if (hasEnglishColumn) {
      console.log('✅ SUCCESS! English translation columns already exist!');
      console.log('✨ Your database is ready for bilingual content.\n');
      console.log('📝 Next steps:');
      console.log('   1. Add English translations to your questions');
      console.log('   2. Use sample data: node scripts/add_sample_questions.mjs');
      console.log('   3. Or SQL: scripts/sample_bilingual_questions.sql\n');
      console.log('🚀 Start your app and test the language switcher!\n');
      return true;
    }

    // Columns don't exist - provide SQL to run
    console.log('⚠️  Migration needed: English columns not found.\n');
    console.log('📋 Please execute this SQL in Supabase Dashboard:\n');
    console.log('─'.repeat(70));
    
    const migrationSQL = `-- Add English translation column
ALTER TABLE public.questions
ADD COLUMN IF NOT EXISTS question_text_en TEXT;

-- Add helpful comment
COMMENT ON COLUMN public.questions.question_text_en 
IS 'English translation of the question text';

-- Verify the column was added
SELECT 
  column_name, 
  data_type,
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'questions' 
  AND column_name = 'question_text_en';`;

    console.log(migrationSQL);
    console.log('─'.repeat(70));
    console.log('\n🔗 Direct link to SQL Editor:');
    console.log('   https://supabase.com/dashboard/project/wapoozvgqllnqtkjewby/sql/new\n');
    
    console.log('📌 Quick Steps:');
    console.log('   1. Click the link above');
    console.log('   2. Copy/paste the SQL');
    console.log('   3. Click "Run" button');
    console.log('   4. Run this script again to verify\n');
    
    return false;

  } catch (error) {
    console.error('\n❌ Error checking database:', error.message);
    console.log('\n💡 Alternative: Manual Migration');
    console.log('   File: supabase/migrations/20251230000000_add_english_translations.sql');
    console.log('   Copy its contents to Supabase Dashboard > SQL Editor\n');
    return false;
  }
}

console.log('');
applyMigration().then(success => {
  if (success) {
    process.exit(0);
  } else {
    console.log('⏸️  Waiting for manual migration...\n');
    process.exit(1);
  }
});
