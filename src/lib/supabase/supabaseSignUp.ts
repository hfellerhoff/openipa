import { SupabaseClient } from '@supabase/supabase-js';

const supabaseSignUp = async (
  supabase: SupabaseClient,
  email: string,
  password: string
) => {
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error(error);
  } else {
    console.log(user);
    return user;
  }
};

export default supabaseSignUp;
