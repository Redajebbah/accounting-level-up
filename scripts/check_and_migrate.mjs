import { supabase } from '../src/integrations/supabase/client.ts';

async function applyMigration() {
  console.log('🚀 Checking database schema and applying migration...\n');

  try {
    // First, check if the columns already exist
    console.log('🔍 Checking current database schema...');
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
      console.log('✅ English translation columns already exist!');
      console.log('✨ Your database is ready for bilingual content.\n');
      console.log('📝 Next steps:');
      console.log('   1. Run: node scripts/add_sample_questions.mjs');
      console.log('   2. Or use: scripts/sample_bilingual_questions.sql');
      console.log('   3. Start adding English translations to your questions\n');
      return;
    }

    // If columns don't exist, we need to add them
    console.log('⚠️  English translation columns not found.');
    console.log('\n📋 To add them, please run this SQL in Supabase Dashboard:\n');
    console.log('─'.repeat(70));
    console.log(`
-- Add English translation column to questions table
ALTER TABLE public.questions
ADD COLUMN IF NOT EXISTS question_text_en TEXT;

-- Add comment
COMMENT ON COLUMN public.questions.question_text_en IS 'English translation of the question text';

-- Verify
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'questions' 
AND column_name LIKE '%_en';
`);
    console.log('─'.repeat(70));
    console.log('\n🔗 Quick link to SQL Editor:');
    console.log('   https://supabase.com/dashboard/project/wapoozvgqllnqtkjewby/sql/new\n');
    console.log('After running the SQL, run this script again to verify.\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n💡 Manual migration steps:');
    console.log('   1. Go to Supabase Dashboard > SQL Editor');
    console.log('   2. Copy the migration from: supabase/migrations/20251230000000_add_english_translations.sql');
    console.log('   3. Execute the SQL');
    console.log('   4. Verify in Table Editor that question_text_en column exists\n');
  }
}

console.log('🌍 Language Support Migration Tool\n');
applyMigration();
