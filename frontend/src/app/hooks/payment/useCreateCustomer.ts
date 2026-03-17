import { supabase } from "@/supabaseClient";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";

const createCustomer = async (
  clerkUserId: string,
  email: string,
  name: string,
): Promise<string> => {
  const api_url = import.meta.env.VITE_SERVER_API_URL;
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

  const { error } = await supabase
    .from("UsersTable")
    .update({ customerId })
    .eq("clerk_user_id", clerkUserId);

  if (error) {
    throw new Error(error.message);
  }

  return customerId;
};

export const useCreateCustomer = () => {
  const { user } = useUser();

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
  });
};

export default useCreateCustomer;
