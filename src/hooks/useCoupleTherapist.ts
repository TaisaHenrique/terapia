import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export const useCoupleTherapist = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["couple_therapist", user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error("User not authenticated");
      
      const { data, error } = await supabase
        .from("therapist_couples")
        .select("terapeuta_id")
        .eq("casal_id", user.id)
        .eq("ativo", true)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });
};
