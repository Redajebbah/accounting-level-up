/**
 * Apply database migration to add English translation columns
 */
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  console.error('   Required: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function applyMigration() {
  console.log('🚀 Applying database migration for English translations...\n');

  try {
    // Read the migration SQL file
    const migrationPath = join(__dirname, '..', 'supabase', 'migrations', '20251230000000_add_english_translations.sql');
    const migrationSQL = readFileSync(migrationPath, 'utf8');

    // Remove comments for cleaner execution
    const sqlStatements = migrationSQL
      .split('\n')
      .filter(line => !line.trim().startsWith('--'))
      .join('\n')
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);

    console.log(`📄 Found ${sqlStatements.length} SQL statements to execute\n`);

    // Execute ALTER TABLE statements
    for (const statement of sqlStatements) {
      if (statement.includes('ALTER TABLE')) {
        console.log('Executing:', statement.substring(0, 80) + '...');
        
        const { error } = await supabase.rpc('exec_sql', { 
          sql_query: statement 
        });

        if (error) {
          // Try direct approach with supabase-js (limited but might work)
          console.log('⚠️  RPC not available, using direct SQL execution...');
          
          // For ALTER TABLE, we need admin access - let's use a different approach
          // We'll check if columns already exist
          const { data: columns, error: checkError } = await supabase
            .from('questions')
            .select('*')
            .limit(1);

          if (!checkError && columns && columns.length > 0) {
            const firstQuestion = columns[0];
            if ('question_text_en' in firstQuestion) {
              console.log('✅ Column question_text_en already exists');
            } else {
              console.log('⚠️  Cannot add columns via client SDK - requires admin access');
              console.log('   Please run the migration using one of these methods:');
              console.log('   1. Supabase Dashboard > SQL Editor');
              console.log('   2. Install Supabase CLI: npm install -g supabase');
              console.log('   3. Copy the SQL from: supabase/migrations/20251230000000_add_english_translations.sql');
              process.exit(1);
            }
          }
        } else {
          console.log('✅ Success\n');
        }
      }
    }

    // Verify the migration
    console.log('\n🔍 Verifying migration...');
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .limit(1);

    if (error) {
      throw error;
    }

    if (data && data.length > 0) {
      const hasEnglishField = 'question_text_en' in data[0];
      if (hasEnglishField) {
        console.log('✅ Migration verified! English translation columns are available.');
        console.log('\n📝 Next steps:');
        console.log('   1. Add English translations to your questions');
        console.log('   2. Use scripts/sample_bilingual_questions.sql for examples');
        console.log('   3. Test the language switcher in your app');
      } else {
        console.log('⚠️  Migration may not have been applied.');
        console.log('   Please apply manually using Supabase Dashboard SQL Editor');
      }
    }

  } catch (err) {
    console.error('❌ Error applying migration:', err);
    console.log('\n💡 Manual migration required:');
    console.log('   1. Open Supabase Dashboard > SQL Editor');
    console.log('   2. Copy content from: supabase/migrations/20251230000000_add_english_translations.sql');
    console.log('   3. Execute the SQL');
    process.exit(1);
  }
}

applyMigration();
