import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const login = async (email, password) =>
    await supabase.auth.signInWithPassword({ email, password });

  const signup = async (email, password) =>
    await supabase.auth.signUp({ email, password });

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return { user, login, signup, logout };
};
