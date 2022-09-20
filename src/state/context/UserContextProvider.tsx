import React, { useEffect, useState, createContext, useContext } from 'react';

import { Session, User } from '@supabase/supabase-js';

import supabase from '../../lib/supabase';

export const UserContext = createContext<{
  user: User | null;
  session: Session | null;
}>({
  user: null,
  session: null,
});

type Props = {
  children: JSX.Element;
};

export const UserContextProvider = (props: Props) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const session = supabase.auth.session();
    setSession(session);
    setUser(session?.user ?? null);
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    session,
    user,
  };
  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`);
  }
  return context;
};
