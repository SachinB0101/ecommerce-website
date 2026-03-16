import { useQuery } from "@tanstack/react-query";
import useGetCustomerId from "./useGetCustomerId";
import type { StripePaymentMethod } from "@/types";

const fetchPaymentMethods = async (
  customerId: string,
): Promise<StripePaymentMethod[]> => {
  const res = await fetch(
    `http://localhost:8080/api/payments/saved-cards?customerId=${customerId}`,
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
