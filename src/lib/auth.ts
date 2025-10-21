import { supabase } from "@/integrations/supabase/client";
import type { Session, User } from "@supabase/supabase-js";

export type UserType = 'casal' | 'terapeuta';

export interface SignUpData {
  email: string;
  password: string;
  nome: string;
  tipo_usuario: UserType;
}

export interface AuthResponse {
  user: User | null;
  session: Session | null;
  error: Error | null;
}

export const auth = {
  // Cadastro de novo usuário
  async signUp(data: SignUpData): Promise<AuthResponse> {
    const { error, data: authData } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: {
          nome: data.nome,
          tipo_usuario: data.tipo_usuario,
        },
      },
    });

    return {
      user: authData.user,
      session: authData.session,
      error,
    };
  },

  // Login de usuário existente
  async signIn(email: string, password: string): Promise<AuthResponse> {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return {
      user: data.user,
      session: data.session,
      error,
    };
  },

  // Logout
  async signOut(): Promise<{ error: Error | null }> {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  // Obter sessão atual
  async getSession(): Promise<{ session: Session | null; error: Error | null }> {
    const { data, error } = await supabase.auth.getSession();
    return { session: data.session, error };
  },

  // Observar mudanças de autenticação
  onAuthStateChange(callback: (session: Session | null, user: User | null) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(session, session?.user ?? null);
    });
  },
};
