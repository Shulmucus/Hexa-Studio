import { createClient } from '@supabase/supabase-js'

// We keep the trim() to prevent future whitespace errors, 
// but we removed the console.log checks now that it works.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim()
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()

export const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;