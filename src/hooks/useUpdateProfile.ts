import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface UpdateProfileParams {
  userId: string;
  ativo: boolean;
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, ativo }: UpdateProfileParams) => {
      const { data, error } = await supabase
        .from("profiles")
        .update({ ativo })
        .eq("id", userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allProfiles"] });
    },
  });
};
