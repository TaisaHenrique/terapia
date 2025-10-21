import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

export const useCoupleProgress = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["couple_progress", user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error("User not authenticated");
      
      const { data, error } = await supabase
        .from("couple_activity_progress")
        .select(`
          *,
          activities (*)
        `)
        .eq("casal_id", user.id);

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const createMutation = useMutation({
    mutationFn: async (progress: Omit<TablesInsert<"couple_activity_progress">, "casal_id">) => {
      if (!user?.id) throw new Error("User not authenticated");
      
      const { data, error } = await supabase
        .from("couple_activity_progress")
        .insert({ ...progress, casal_id: user.id })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["couple_progress", user?.id] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...updates }: TablesUpdate<"couple_activity_progress"> & { id: string }) => {
      const { data, error } = await supabase
        .from("couple_activity_progress")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["couple_progress", user?.id] });
    },
  });

  return {
    ...query,
    createProgress: createMutation.mutate,
    updateProgress: updateMutation.mutate,
  };
};
