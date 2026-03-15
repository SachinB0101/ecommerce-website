import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { stripePromise } from "@/lib/stripe";
import useGetCustomerId from "@/app/hooks/payment/useGetCustomerId";
import useUpdateCustomerId from "@/app/hooks/payment/useUpdateCustomerId";
import { useUser } from "@clerk/clerk-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type SavedCard = {
  id: string;
  card: {
    brand: string;
    last4: string;
    exp_month: number;
    exp_year: number;
  };
};

// ─── Stripe Element wrapper ───────────────────────────────────────────────────
// Gives each Stripe field the same look as your shadcn <Input> components

const stripeElementStyle = {
  style: {
    base: {
      fontSize: "14px",
      color: "hsl(var(--foreground))",
      "::placeholder": { color: "hsl(var(--muted-foreground))" },
    },
  },
};

const StripeInput = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-within:ring-1 focus-within:ring-ring">
    {children}
  </div>
);

// ─── Add Card Form ────────────────────────────────────────────────────────────

type AddCardFormProps = {
  customerId: string | null;
  onSuccess: (newCustomerId?: string) => void;
  onCancel: () => void;
};

const AddCardForm = ({ customerId, onSuccess, onCancel }: AddCardFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useUser();
  const [cardholderName, setCardholderName] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!stripe || !elements) return;

    const cardNumber = elements.getElement(CardNumberElement);
    if (!cardNumber) return;

    setIsPending(true);
    setError(null);

    try {
      // 1. Get a SetupIntent client secret from the backend
      const res = await fetch(
        "http://localhost:8080/api/payments/setup-intent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerId,
            email: user?.emailAddresses[0].emailAddress,
            name: user?.fullName,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Failed to initialise card setup.");
        return;
      }

      // 2. Confirm the card setup with Stripe
      const { error: stripeError } = await stripe.confirmCardSetup(
        data.clientSecret,
        {
          payment_method: {
            card: cardNumber,
            billing_details: { name: cardholderName },
          },
        },
      );

      if (stripeError) {
        setError(stripeError.message ?? "Something went wrong.");
        return;
      }

      // 3. Bubble up a new customerId if one was just created
      onSuccess(!customerId ? data.customerId : undefined);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-muted/30 space-y-4">
      <p className="text-sm font-medium">New Card</p>

      {/* Cardholder name */}
      <div className="space-y-1.5">
        <Label htmlFor="cardholderName">Name on Card</Label>
        <Input
          id="cardholderName"
          placeholder="John Doe"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
        />
      </div>

      {/* Card number */}
      <div className="space-y-1.5">
        <Label>Card Number</Label>
        <StripeInput>
          <CardNumberElement options={stripeElementStyle} className="w-full" />
        </StripeInput>
      </div>

      {/* Expiry + CVC side by side */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label>Expiry Date</Label>
          <StripeInput>
            <CardExpiryElement
              options={stripeElementStyle}
              className="w-full"
            />
          </StripeInput>
        </div>
        <div className="space-y-1.5">
          <Label>CVC</Label>
          <StripeInput>
            <CardCvcElement options={stripeElementStyle} className="w-full" />
          </StripeInput>
        </div>
      </div>

      {/* Postal code */}
      <div className="space-y-1.5">
        <Label htmlFor="postalCode">Postal Code</Label>
        <Input id="postalCode" placeholder="A1A 1A1" />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex gap-2 pt-1">
        <Button size="sm" onClick={handleSave} disabled={isPending}>
          {isPending ? "Saving..." : "Save Card"}
        </Button>
        <Button variant="outline" size="sm" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

// ─── Cards Inner ──────────────────────────────────────────────────────────────

type CardsInnerProps = {
  customerId: string | null;
  isLoadingCustomerId: boolean;
  onNewCustomerId: (id: string) => void;
};

const CardsInner = ({
  customerId,
  isLoadingCustomerId,
  onNewCustomerId,
}: CardsInnerProps) => {
  const [cards, setCards] = useState<SavedCard[]>([]);
  const [loadingCards, setLoadingCards] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchCards = async (id: string | null) => {
    if (!id) {
      setLoadingCards(false);
      return;
    }
    try {
      const res = await fetch(
        `http://localhost:8080/api/payments/saved-cards?customerId=${id}`,
      );
      const data = await res.json();
      setCards(data.paymentMethods ?? []);
    } catch {
      setCards([]);
    } finally {
      setLoadingCards(false);
    }
  };

  useEffect(() => {
    if (isLoadingCustomerId) return;
    fetchCards(customerId);
  }, [customerId, isLoadingCustomerId]);

  const handleDelete = async (card: SavedCard) => {
    if (!customerId) return;
    setDeletingId(card.id);

    try {
      const res = await fetch("http://localhost:8080/api/payments/card", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerId, paymentMethodId: card.id }),
      });

      const data = await res.json();
      setCards((prev) => prev.filter((c) => c.id !== card.id));

      if (data.wasLastCard) {
        // Stripe deleted the customer — clear it from Supabase if needed
        // updateCustomerId(null)
      }
    } finally {
      setDeletingId(null);
    }
  };

  const handleAddSuccess = (newCustomerId?: string) => {
    if (newCustomerId) onNewCustomerId(newCustomerId);
    setShowAddForm(false);
    setLoadingCards(true);
    fetchCards(newCustomerId ?? customerId);
  };

  const isLoading = isLoadingCustomerId || loadingCards;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Methods
          </CardTitle>
          {!showAddForm && (
            <Button size="sm" onClick={() => setShowAddForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Card
            </Button>
          )}
        </div>
      </CardHeader>

      {isLoading ? (
        <CardContent className="flex items-center justify-center py-8">
          <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </CardContent>
      ) : (
        <CardContent className="space-y-4">
          {/* Add card form */}
          {showAddForm && (
            <AddCardForm
              customerId={customerId}
              onSuccess={handleAddSuccess}
              onCancel={() => setShowAddForm(false)}
            />
          )}

          {/* Empty state */}
          {cards.length === 0 && !showAddForm && (
            <p className="text-sm text-muted-foreground">
              No payment methods saved yet. Add one to speed up checkout.
            </p>
          )}

          {/* Cards list */}
          {cards.length > 0 && (
            <div className="space-y-3">
              {cards.map((card, index) => {
                const isDefault = index === 0;
                const isDeleting = deletingId === card.id;

                return (
                  <div
                    key={card.id}
                    className={`border rounded-lg p-4 flex items-center justify-between ${
                      isDefault ? "border-primary bg-primary/5" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">
                            {card.card.brand.toUpperCase()} ••••{" "}
                            {card.card.last4}
                          </p>
                          {isDefault && (
                            <Badge variant="secondary" className="text-xs">
                              Default
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Expires {card.card.exp_month}/{card.card.exp_year}
                        </p>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={isDeleting}
                      onClick={() => handleDelete(card)}
                      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    >
                      {isDeleting ? (
                        <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};


const Cards = () => {
  const { data: customerId, isLoading: isLoadingCustomerId } =
    useGetCustomerId();
  const { mutate: updateCustomerId } = useUpdateCustomerId();

  return (
    <Elements stripe={stripePromise}>
      <CardsInner
        customerId={customerId ?? null}
        isLoadingCustomerId={isLoadingCustomerId}
        onNewCustomerId={(newId) => updateCustomerId(newId)}
      />
    </Elements>
  );
};

export default Cards;
