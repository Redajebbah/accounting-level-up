/**
 * Apply English translation columns migration
 * This uses the Supabase REST API to execute SQL
 */

const SUPABASE_URL = "https://wapoozvgqllnqtkjewby.supabase.co";
const SUPABASE_PROJECT_ID = "wapoozvgqllnqtkjewby";

const migrationSQL = `
-- Add English translation fields to questions table
ALTER TABLE public.questions
ADD COLUMN IF NOT EXISTS question_text_en TEXT;

-- Add comment explaining the new field
COMMENT ON COLUMN public.questions.question_text_en IS 'English translation of the question text';
`;

console.log('🚀 Applying database migration...\n');
console.log('⚠️  This requires database admin access via Supabase Dashboard\n');
console.log('📋 Please follow these steps:\n');
console.log('1. Open: https://supabase.com/dashboard/project/' + SUPABASE_PROJECT_ID + '/sql/new');
console.log('\n2. Copy and paste this SQL:\n');
console.log('─'.repeat(60));
console.log(migrationSQL);
console.log('─'.repeat(60));
console.log('\n3. Click "Run" button\n');
console.log('✅ Once complete, your database will support bilingual questions!\n');
console.log('📝 Then you can add English translations using:');
console.log('   - scripts/sample_bilingual_questions.sql (for sample data)');
console.log('   - Supabase Table Editor (manual entry)\n');
