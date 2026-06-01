import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  useStripe,
  useElements,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import { useUser } from "@clerk/clerk-react"; // adjust to your auth import

interface SetupCardVariables {
  customerId: string;
  cardholderName: string;
  postalCode: string;
}

const useSetupCard = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      customerId,
      cardholderName,
      postalCode,
    }: SetupCardVariables) => {
      const api_url = import.meta.env.VITE_SERVER_API_URL;
      
      if (!api_url) {
        throw new Error("Backend API URL is not configured. Please set VITE_SERVER_API_URL in .env");
      }

      if (!stripe || !elements) throw new Error("Stripe is not initialised.");

      const cardNumber = elements.getElement(CardNumberElement);
      if (!cardNumber) throw new Error("Card element not found.");

      const res = await fetch(`${api_url}/api/payments/setup-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId,
          email: user?.emailAddresses[0].emailAddress,
          name: user?.fullName,
        }),
      });

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error ?? "Failed to initialise card setup.");

      const { error: stripeError } = await stripe.confirmCardSetup(
        data.clientSecret,
        {
          payment_method: {
            card: cardNumber,
            billing_details: {
              name: cardholderName,
              email: user?.emailAddresses[0].emailAddress,
              address: { postal_code: postalCode },
            },
          },
        },
      );

      if (stripeError)
        throw new Error(stripeError.message ?? "Something went wrong.");
    },

    onSuccess: (_data, { customerId }) => {
      queryClient.invalidateQueries({
        queryKey: ["paymentMethods", customerId],
      });
    },
  });
};

export default useSetupCard;
