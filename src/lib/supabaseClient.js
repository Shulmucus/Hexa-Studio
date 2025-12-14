import { createClient } from '@supabase/supabase-js'

// CRITICAL FIX: Trim whitespace. .env files often have hidden spaces at the end.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim()
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()

// Debugging: Log the URL status (without exposing the full key)
if (!supabaseUrl || !supabaseKey) {
  console.error('CRITICAL ERROR: Supabase keys are missing! Check your .env file.');
} else {
  // Check if URL is valid structure
  try {
    new URL(supabaseUrl);
    console.log('Supabase Config: URL format appears valid.');
  } catch (e) {
    console.error(`CRITICAL ERROR: Your Supabase URL "${supabaseUrl}" is invalid. It causes ERR_NAME_NOT_RESOLVED.`);
    console.error('Make sure it looks like: https://your-project-id.supabase.co');
  }
}

export const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;