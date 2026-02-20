import { useQuery } from "@tanstack/react-query";
import type { Product } from "@/types";
import { supabase } from "@/supabaseClient";

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async (): Promise<Product> => {
      const { data, error } = await supabase
        .from("ProductsTable")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data ?? null;
    },
  });
};
