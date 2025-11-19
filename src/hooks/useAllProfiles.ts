import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useAllProfiles = () => {
  return useQuery({
    queryKey: ["allProfiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("data_criacao", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
};
