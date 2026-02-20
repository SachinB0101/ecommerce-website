import { supabase } from "@/supabaseClient";
import { useQuery } from "@tanstack/react-query";

const getOrCreateCart = async (userId: string): Promise<string> => {
  const { data, error } = await supabase
    .from("CartTable")
    .select("id")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;

  if (!data) {
    const { data: newCart, error: insertError } = await supabase
      .from("CartTable")
      .insert({
        user_id: userId,
      })
      .select("id")
      .single();
    if (insertError) throw insertError;
    return newCart.id;
  }
  return data.id;
};

export const useGetOrCreateCart = (userId: string, options = {}) => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: () => getOrCreateCart(userId),
    ...options,
  });
};
