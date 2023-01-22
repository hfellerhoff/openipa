import { createClient } from '@supabase/supabase-js';

import { Database } from '../../schema';

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw Error("Couldn't load Supabase environment variables.");
}

const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
