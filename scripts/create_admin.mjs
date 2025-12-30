import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

function loadEnv(path = '.env') {
  const text = fs.existsSync(path) ? fs.readFileSync(path, 'utf8') : '';
  const obj = {};
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    let [, key, val] = m;
    val = val.replace(/^"|"$/g, '');
    obj[key] = val;
  }
  return obj;
}

const env = loadEnv();
const SUPABASE_URL = env.VITE_SUPABASE_URL;
const SUPABASE_KEY = env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY in .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const email = process.argv[2] || 'khalid@gmail.com';
const password = process.argv[3] || 'khalid123';

(async () => {
  console.log('Signing up user', email);
  let signData = null;
  let signError = null;

  try {
    const res = await supabase.auth.signUp({ email, password });
    signData = res.data;
    signError = res.error;
    if (signError) {
      console.error('SignUp error:', signError.message || signError);
    } else {
      console.log('SignUp result:', signData);
    }
  } catch (e) {
    console.error('SignUp threw:', e);
  }

  let userId = signData?.user?.id ?? signData?.id;

  if (!userId && signError && /already registered/i.test(signError.message || '')) {
    console.log('User already registered — attempting sign-in to obtain user id.');
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      console.error('SignIn error:', signInError.message || signInError);
      console.warn('Cannot obtain user id without signing in. If the password is different, please run the script with the correct password or use the Supabase dashboard.');
      process.exit(1);
    }
    userId = signInData?.user?.id ?? signInData?.id;
    console.log('Signed in; user id:', userId);
  }

  if (!userId) {
    console.warn('No user id returned. Email confirmation may be required or sign-in failed. Exiting.');
    process.exit(0);
  }

  console.log('Attempting to grant admin role to user id', userId);
  const { data, error } = await supabase.from('user_roles').insert([{ user_id: userId, role: 'admin' }]);
  if (error) {
    console.error('Failed to insert user_roles:', error.message || error);
    process.exit(1);
  }
  console.log('user_roles insert result:', data);
  console.log('Admin account created (or role granted).');
  process.exit(0);
})();