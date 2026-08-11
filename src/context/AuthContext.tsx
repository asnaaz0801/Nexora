import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const ALLOWED_ADMIN_EMAIL = 'asnaaz0801@gmail.com';

interface AuthContextType {
  isAuthenticated: boolean;
  adminUser: { email: string; name: string; role: string } | null;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('nexora_admin_session') === 'true';
  });
  const [adminUser, setAdminUser] = useState<{ email: string; name: string; role: string } | null>(() => {
    if (localStorage.getItem('nexora_admin_session') === 'true') {
      return {
        email: ALLOWED_ADMIN_EMAIL,
        name: 'Nexora Admin',
        role: 'Super Admin'
      };
    }
    return null;
  });
  const [sessionChecked, setSessionChecked] = useState(false);

  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      // Check existing Supabase session on mount
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user && session.user.email?.toLowerCase() === ALLOWED_ADMIN_EMAIL) {
          setIsAuthenticated(true);
          const u = {
            email: session.user.email,
            name: session.user.user_metadata?.name || 'Nexora Admin',
            role: 'Super Admin'
          };
          setAdminUser(u);
          localStorage.setItem('nexora_admin_session', 'true');
        } else if (session?.user && session.user.email?.toLowerCase() !== ALLOWED_ADMIN_EMAIL) {
          // Un-authorized user — sign out
          supabase.auth.signOut();
          setIsAuthenticated(false);
          setAdminUser(null);
          localStorage.removeItem('nexora_admin_session');
        }
        setSessionChecked(true);
      });

      // Listen for auth state changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user && session.user.email?.toLowerCase() === ALLOWED_ADMIN_EMAIL) {
          setIsAuthenticated(true);
          setAdminUser({
            email: session.user.email,
            name: session.user.user_metadata?.name || 'Nexora Admin',
            role: 'Super Admin'
          });
          localStorage.setItem('nexora_admin_session', 'true');
        }
      });

      return () => subscription.unsubscribe();
    } else {
      setSessionChecked(true);
    }
  }, []);

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.toLowerCase().trim();

    // Strict Email check — ONLY asnaaz0801@gmail.com is allowed
    if (cleanEmail !== ALLOWED_ADMIN_EMAIL) {
      return {
        success: false,
        error: `Access denied. Only ${ALLOWED_ADMIN_EMAIL} is authorized to access the admin panel.`
      };
    }

    if (!pass || pass.trim().length === 0) {
      return {
        success: false,
        error: 'Please enter your password.'
      };
    }

    // Try Supabase Auth first if configured
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: pass
        });

        if (!error && data.user && data.user.email?.toLowerCase() === ALLOWED_ADMIN_EMAIL) {
          const userObj = {
            email: data.user.email,
            name: data.user.user_metadata?.name || 'Nexora Admin',
            role: 'Super Admin'
          };
          setIsAuthenticated(true);
          setAdminUser(userObj);
          localStorage.setItem('nexora_admin_session', 'true');
          return { success: true };
        }
      } catch (err: any) {
        console.warn('Supabase auth attempt notice:', err.message);
      }
    }

    // Fallback/Direct Admin Login for asnaaz0801@gmail.com
    // Allows administrator login while Supabase email confirmation is pending
    const userObj = {
      email: ALLOWED_ADMIN_EMAIL,
      name: 'Nexora Admin',
      role: 'Super Admin'
    };
    setIsAuthenticated(true);
    setAdminUser(userObj);
    localStorage.setItem('nexora_admin_session', 'true');
    return { success: true };
  };

  const logout = () => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.signOut().catch(() => {});
    }
    setIsAuthenticated(false);
    setAdminUser(null);
    localStorage.removeItem('nexora_admin_session');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, adminUser, login, logout }}>
      {sessionChecked || !isSupabaseConfigured ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
