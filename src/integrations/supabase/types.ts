export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      activities: {
        Row: {
          categoria: string
          data_criacao: string | null
          descricao: string
          duracao_estimada: number | null
          icone: string | null
          id: string
          nivel_dificuldade: number | null
          pontos_recompensa: number
          titulo: string
        }
        Insert: {
          categoria: string
          data_criacao?: string | null
          descricao: string
          duracao_estimada?: number | null
          icone?: string | null
          id?: string
          nivel_dificuldade?: number | null
          pontos_recompensa?: number
          titulo: string
        }
        Update: {
          categoria?: string
          data_criacao?: string | null
          descricao?: string
          duracao_estimada?: number | null
          icone?: string | null
          id?: string
          nivel_dificuldade?: number | null
          pontos_recompensa?: number
          titulo?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          data_envio: string | null
          destinatario_id: string
          id: string
          lida: boolean | null
          mensagem: string
          remetente_id: string
        }
        Insert: {
          data_envio?: string | null
          destinatario_id: string
          id?: string
          lida?: boolean | null
          mensagem: string
          remetente_id: string
        }
        Update: {
          data_envio?: string | null
          destinatario_id?: string
          id?: string
          lida?: boolean | null
          mensagem?: string
          remetente_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_destinatario_id_fkey"
            columns: ["destinatario_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_messages_remetente_id_fkey"
            columns: ["remetente_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      couple_activity_progress: {
        Row: {
          atividade_id: string
          casal_id: string
          data_conclusao: string | null
          data_inicio: string | null
          feedback: string | null
          id: string
          progresso: number | null
          status: Database["public"]["Enums"]["activity_status"] | null
        }
        Insert: {
          atividade_id: string
          casal_id: string
          data_conclusao?: string | null
          data_inicio?: string | null
          feedback?: string | null
          id?: string
          progresso?: number | null
          status?: Database["public"]["Enums"]["activity_status"] | null
        }
        Update: {
          atividade_id?: string
          casal_id?: string
          data_conclusao?: string | null
          data_inicio?: string | null
          feedback?: string | null
          id?: string
          progresso?: number | null
          status?: Database["public"]["Enums"]["activity_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "couple_activity_progress_atividade_id_fkey"
            columns: ["atividade_id"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "couple_activity_progress_casal_id_fkey"
            columns: ["casal_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      mood_entries: {
        Row: {
          data_registro: string | null
          id: string
          nivel_humor: Database["public"]["Enums"]["mood_level"]
          nota: string | null
          usuario_id: string
        }
        Insert: {
          data_registro?: string | null
          id?: string
          nivel_humor: Database["public"]["Enums"]["mood_level"]
          nota?: string | null
          usuario_id: string
        }
        Update: {
          data_registro?: string | null
          id?: string
          nivel_humor?: Database["public"]["Enums"]["mood_level"]
          nota?: string | null
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mood_entries_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          data_criacao: string | null
          email: string
          id: string
          nivel: number | null
          nome: string
          pontos: number | null
          tipo_usuario: Database["public"]["Enums"]["user_type"]
          ultima_atualizacao: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          data_criacao?: string | null
          email: string
          id: string
          nivel?: number | null
          nome: string
          pontos?: number | null
          tipo_usuario: Database["public"]["Enums"]["user_type"]
          ultima_atualizacao?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          data_criacao?: string | null
          email?: string
          id?: string
          nivel?: number | null
          nome?: string
          pontos?: number | null
          tipo_usuario?: Database["public"]["Enums"]["user_type"]
          ultima_atualizacao?: string | null
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          assunto: string
          data_atualizacao: string | null
          data_criacao: string | null
          id: string
          mensagem: string
          prioridade: string | null
          status: Database["public"]["Enums"]["ticket_status"] | null
          usuario_id: string
        }
        Insert: {
          assunto: string
          data_atualizacao?: string | null
          data_criacao?: string | null
          id?: string
          mensagem: string
          prioridade?: string | null
          status?: Database["public"]["Enums"]["ticket_status"] | null
          usuario_id: string
        }
        Update: {
          assunto?: string
          data_atualizacao?: string | null
          data_criacao?: string | null
          id?: string
          mensagem?: string
          prioridade?: string | null
          status?: Database["public"]["Enums"]["ticket_status"] | null
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      therapist_couples: {
        Row: {
          ativo: boolean | null
          casal_id: string
          data_inicio: string | null
          id: string
          terapeuta_id: string
        }
        Insert: {
          ativo?: boolean | null
          casal_id: string
          data_inicio?: string | null
          id?: string
          terapeuta_id: string
        }
        Update: {
          ativo?: boolean | null
          casal_id?: string
          data_inicio?: string | null
          id?: string
          terapeuta_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "therapist_couples_casal_id_fkey"
            columns: ["casal_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "therapist_couples_terapeuta_id_fkey"
            columns: ["terapeuta_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calcular_nivel: {
        Args: { pontos_atuais: number }
        Returns: number
      }
    }
    Enums: {
      activity_status: "nao_iniciada" | "em_progresso" | "concluida"
      mood_level: "muito_triste" | "triste" | "neutro" | "feliz" | "muito_feliz"
      ticket_status: "aberto" | "em_andamento" | "resolvido" | "fechado"
      user_type: "casal" | "terapeuta"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      activity_status: ["nao_iniciada", "em_progresso", "concluida"],
      mood_level: ["muito_triste", "triste", "neutro", "feliz", "muito_feliz"],
      ticket_status: ["aberto", "em_andamento", "resolvido", "fechado"],
      user_type: ["casal", "terapeuta"],
    },
  },
} as const
