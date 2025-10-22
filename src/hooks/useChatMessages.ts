import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import type { TablesInsert } from "@/integrations/supabase/types";

export const useChatMessages = (destinatarioId?: string) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["chat_messages", user?.id, destinatarioId],
    queryFn: async () => {
      if (!user?.id) throw new Error("User not authenticated");
      
      let query = supabase
        .from("chat_messages")
        .select("*")
        .order("data_envio", { ascending: true });

      if (destinatarioId) {
        // Mensagens entre o usuário atual e o destinatário específico
        query = query.or(
          `and(remetente_id.eq.${user.id},destinatario_id.eq.${destinatarioId}),and(remetente_id.eq.${destinatarioId},destinatario_id.eq.${user.id})`
        );
      } else {
        // Todas as mensagens do usuário
        query = query.or(`remetente_id.eq.${user.id},destinatario_id.eq.${user.id}`);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const sendMutation = useMutation({
    mutationFn: async (message: Omit<TablesInsert<"chat_messages">, "remetente_id" | "remetente_nome">) => {
      if (!user?.id) throw new Error("User not authenticated");
      
      // Buscar nome do usuário
      const { data: profile } = await supabase
        .from("profiles")
        .select("nome")
        .eq("id", user.id)
        .single();
      
      const { data, error } = await supabase
        .from("chat_messages")
        .insert({ 
          ...message, 
          remetente_id: user.id,
          remetente_nome: profile?.nome || "Usuário"
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat_messages"] });
    },
  });

  // Realtime subscription
  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel("chat_messages_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "chat_messages",
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ["chat_messages"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, queryClient]);

  return {
    ...query,
    sendMessage: sendMutation.mutate,
  };
};
