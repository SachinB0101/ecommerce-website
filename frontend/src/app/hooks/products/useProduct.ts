import { useQuery } from "@tanstack/react-query";
import type { Product } from "@/types";
import { supabase, isSupabaseConfigured } from "@/supabaseClient";
import { getMockProductById } from "@/lib/mockData";

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async (): Promise<Product> => {
      if (!isSupabaseConfigured || !supabase) {
        console.warn("Supabase is not configured. Using mock product data.");
        const mockProduct = getMockProductById(Number(id));
        if (!mockProduct) throw new Error("Product not found");
        return mockProduct as Product;
      }

      const { data, error } = await supabase
        .from("ProductsTable")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching product:", error.message);
        console.warn("Falling back to mock data.");
        const mockProduct = getMockProductById(Number(id));
        if (!mockProduct) throw new Error("Product not found");
        return mockProduct as Product;
      }

      return data ?? null;
    },
  });
};
