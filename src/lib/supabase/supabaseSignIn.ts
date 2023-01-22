import { SupabaseClient } from '@supabase/supabase-js';

const supabaseSignIn = async (
  supabase: SupabaseClient,
  email: string,
  password: string
) => {
  const {
    data: { user },
    error,
  } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
  } else {
    return user;
  }
};

export default supabaseSignIn;
