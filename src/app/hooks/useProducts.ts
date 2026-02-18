import { useQuery } from "@tanstack/react-query";
import type { Product } from "@/types";
import { supabase } from "@/supabaseClient";

export const useProducts = (category?: string) => {
  return useQuery({
    queryKey: ["products", category],
    queryFn: async (): Promise<Product[]> => {
      let query = supabase.from("ProductsTable").select("*");

      if (category) {
        query = query.eq("category", category.toLocaleLowerCase());
      }

      const { data, error } = await query;

      if (error) {
        throw new Error(error.message);
      }

      return data ?? [];
    },
  });
};
