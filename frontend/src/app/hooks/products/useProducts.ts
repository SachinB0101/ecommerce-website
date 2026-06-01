import { useQuery } from "@tanstack/react-query";
import type { Product } from "@/types";
import { supabase, isSupabaseConfigured } from "@/supabaseClient";
import { getMockProducts } from "@/lib/mockData";

export const useProducts = (category?: string) => {
  return useQuery({
    queryKey: ["products", category],
    queryFn: async (): Promise<Product[]> => {
      try {
        if (!isSupabaseConfigured || !supabase) {
          console.warn("Supabase is not configured. Using mock product data.");
          return getMockProducts(category) as Product[];
        }

        let query = supabase.from("ProductsTable").select("*");

        if (category) {
          query = query.eq("category", category.toLocaleLowerCase());
        }

        const { data, error } = await query;

        if (error) {
          console.error("Supabase error fetching products:", error.message);
          console.warn("Falling back to mock data.");
          return getMockProducts(category) as Product[];
        }

        return data ?? [];
      } catch (err) {
        console.error("Exception fetching products:", err);
        console.warn("Falling back to mock data.");
        return getMockProducts(category) as Product[];
      }
    },
    retry: 1,
  });
};
