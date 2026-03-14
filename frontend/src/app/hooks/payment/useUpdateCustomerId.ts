import { supabase } from "@/supabaseClient";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";

const updateCustomerId = async (
  clerkUserId: string,
  customerId: string,
): Promise<void> => {
  const { error } = await supabase
    .from("UsersTable")
    .update({ customerId })
    .eq("clerk_user_id", clerkUserId);

  if (error) throw new Error(error.message);
};

export const useUpdateCustomerId = () => {
  const { user } = useUser();

  return useMutation({
    mutationFn: (customerId: string) => updateCustomerId(user!.id, customerId),
  });
};

export default useUpdateCustomerId;
