import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import type { Address } from "@/types";
import { supabase } from "@/supabaseClient";
import type { UserResource } from "@clerk/shared/types";

const getAddresses = async (
  user: UserResource | null | undefined,
): Promise<Address[]> => {
  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from("AddressesTable")
    .select(
      "id, fullName, addressLine1, addressLine2, city, state, zipCode, country, isDefault",
    )
    .eq("user_id", user.id)
    .order("isDefault", { ascending: false });

  if (error) throw new Error(error.message);

  return data ?? [];
};

export const useGetAddresses = () => {
  const { user } = useUser();

  return useQuery<Address[]>({
    queryKey: ["addresses", user?.id],
    queryFn: () => getAddresses(user),
  });
};
