import { supabase, isSupabaseConfigured } from "@/supabaseClient";
import { useUser } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createCustomer = async (
  clerkUserId: string,
  email: string,
  name: string,
): Promise<string> => {
  const api_url = import.meta.env.VITE_SERVER_API_URL;
  
  if (!api_url) {
    throw new Error("Backend API URL is not configured. Please set VITE_SERVER_API_URL in .env");
  }
  
  console.log("API URL:", api_url);
  const res = await fetch(`${api_url}/api/payments/create-customer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      name,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to create Stripe customer");
  }

  const data = await res.json();
  const customerId = data.customerId;

  if (!isSupabaseConfigured || !supabase) {
    console.warn("Supabase not configured. Skipping customerId update.");
    return customerId;
  }

  const { error } = await supabase
    .from("UsersTable")
    .update({ customerId })
    .eq("clerk_user_id", clerkUserId);

  if (error) {
    console.error("Error updating customer ID:", error.message);
  }

  return customerId;
};

export const useCreateCustomer = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!user) {
        throw new Error("User not loaded");
      }

      const email = user.primaryEmailAddress?.emailAddress;
      const name = user.fullName ?? "Customer";

      if (!email) {
        throw new Error("User email not found");
      }

      return createCustomer(user.id, email, name);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customerId", user?.id] });
    },
  });
};

export default useCreateCustomer;
