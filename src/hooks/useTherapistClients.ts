import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export const useTherapistClients = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["therapist_clients", user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error("User not authenticated");
      
      const { data, error } = await supabase
        .from("therapist_couples")
        .select(`
          *,
          profiles!therapist_couples_casal_id_fkey (
            id,
            nome,
            email,
            avatar_url,
            pontos,
            nivel
          )
        `)
        .eq("terapeuta_id", user.id)
        .eq("ativo", true);

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });
};
