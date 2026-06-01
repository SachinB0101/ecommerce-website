import { supabase, isSupabaseConfigured } from "@/supabaseClient";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";

const getCustomerId = async (clerkUserId: string): Promise<string | null> => {
  if (!isSupabaseConfigured || !supabase) {
    console.warn("Supabase is not configured. Returning null for customerId.");
    return null;
  }

  const { data, error } = await supabase
    .from("UsersTable")
    .select("customerId")
    .eq("clerk_user_id", clerkUserId)
    .single();

  if (error) {
    console.error("Error fetching customer ID:", error.message);
    return null;
  }

  return data?.customerId || null;
};

export const useGetCustomerId = () => {
  const { user } = useUser();

  return useQuery({
    queryKey: ["customerId", user?.id],
    queryFn: () => getCustomerId(user!.id),
    enabled: !!user,
  });
};

export default useGetCustomerId;
