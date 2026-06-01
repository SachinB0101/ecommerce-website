import { useQuery } from "@tanstack/react-query";
import useGetCustomerId from "./useGetCustomerId";
import type { StripePaymentMethod } from "@/types";

const fetchPaymentMethods = async (
  customerId: string,
): Promise<StripePaymentMethod[]> => {
  const api_url = import.meta.env.VITE_SERVER_API_URL;
  
  if (!api_url) {
    console.warn("Backend API URL is not configured. Returning empty payment methods.");
    return [];
  }
  
  const res = await fetch(
    `${api_url}/api/payments/saved-cards?customerId=${customerId}`,
  );

  if (!res.ok) throw new Error("Failed to fetch payment methods");

  const data = await res.json();
  return data.paymentMethods ?? [];
};

const useGetPaymentMethods = () => {
  const { data: customerId } = useGetCustomerId();

  const query = useQuery({
    queryKey: ["paymentMethods", customerId],
    queryFn: () => fetchPaymentMethods(customerId!),
    enabled: !!customerId,
  });

  const allCards = query.data ?? [];
  const defaultCard = allCards[0] ?? null;

  return {
    ...query,
    allCards,
    defaultCard,
    hasPayment: allCards.length > 0,
  };
};

export default useGetPaymentMethods;
