import { Session, User } from '@supabase/supabase-js';
import { createContext, FC, useEffect, useState } from 'react';
import { useAuthStateChange, useClient } from 'react-supabase';

interface InitialState {
  session: Session | null,
  user: User | null
}

const initialState : InitialState = { session: null, user: null };
export const AuthContext = createContext(initialState);

const AuthProvider : FC = ({ children }) => {
  const client = useClient();
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const session = client.auth.session();
    setState({ session, user: session?.user ?? null });
  }, []);

  useAuthStateChange((_, session) => {
    setState({ session, user: session?.user ?? null });
  });

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
