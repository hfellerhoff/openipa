"use client";

import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
} from "react";

import { Session, User } from "@supabase/supabase-js";

import supabase from "../lib/supabase";

export const AuthContext = createContext<{
  user: User | null;
  session: Session | null;
} | null>(null);

type Props = {
  children: ReactNode;
};

const AuthProvider = (props: Props) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getInitialSession = async () => {
      const session = await supabase.auth.getSession();

      if (session.data.session) {
        setSession(session.data.session);
        if (session.data.session.user) {
          setUser(session.data.session.user ?? null);
        }
      }
    };

    getInitialSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const value = {
    session,
    user,
  };
  return <AuthContext.Provider value={value} {...props} />;
};
export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error(`useAuth must be used within a AuthContextProvider.`);
  }
  return context;
};
