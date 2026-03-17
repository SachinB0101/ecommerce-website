import { Elements } from "@stripe/react-stripe-js";
import { CardsInner } from "./CardsInner";
import { stripePromise } from "@/lib/stripe";

const Cards = () => {
  return (
    <Elements stripe={stripePromise}>
      <CardsInner />
    </Elements>
  );
};

export default Cards;
