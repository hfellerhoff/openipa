import { useEffect, useState } from 'react';

import { Session } from '@supabase/supabase-js';

import supabase from '../lib/supabase';

export default function useSession() {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(supabase.auth.session());
    setIsLoading(false);

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return { session, isLoadingSession: isLoading };
}
