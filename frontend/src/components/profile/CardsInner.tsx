import useGetPaymentMethods from "@/app/hooks/payment/useGetPaymentMethods";
import useSetupCard from "@/app/hooks/payment/useSetupCard";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CreditCard, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { AddCardForm } from "./AddCardForm";
import type { StripePaymentMethod } from "@/types";
import useGetCustomerId from "@/app/hooks/payment/useGetCustomerId";

export const CardsInner = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [cardholderName, setCardholderName] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const { data: customerId, isLoading: isLoadingCustomerId } =
    useGetCustomerId();

  const { allCards, isLoading: isLoadingCards } = useGetPaymentMethods();
  const { mutate: setupCard, isPending, error } = useSetupCard();

  const handleSave = () => {
    if (!customerId) return;

    setupCard(
      { customerId, cardholderName, postalCode },
      {
        onSuccess: () => {
          setShowAddForm(false);
          setCardholderName("");
          setPostalCode("");
        },
      },
    );
  };

  const handleDelete = async (card: StripePaymentMethod) => {
    //Have to work on this...
    console.log(card);
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setCardholderName("");
    setPostalCode("");
  };

  const isLoading = isLoadingCustomerId || isLoadingCards;

  if (isLoading) {
    return (
      <CardContent className="flex items-center justify-center py-8">
        <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </CardContent>
    );
  }

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

      <CardContent className="space-y-4">
        {showAddForm && (
          <AddCardForm
            cardholderName={cardholderName}
            postalCode={postalCode}
            isPending={isPending}
            error={error?.message ?? null}
            onCardholderNameChange={setCardholderName}
            onPostalCodeChange={setPostalCode}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        )}

        {allCards?.length === 0 && !showAddForm && (
          <p className="text-sm text-muted-foreground">
            No payment methods saved yet. Add one to speed up checkout.
          </p>
        )}

        {allCards?.length > 0 && (
          <div className="space-y-3">
            {allCards.map((card) => {
              const isDeleting = false;

              return (
                <div
                  key={card.id}
                  className="border rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">
                        {card.card.brand.toUpperCase()} •••• {card.card.last4}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Expires {card.card.exp_month}/{card.card.exp_year}
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={isDeleting}
                    onClick={() => handleDelete(card)} //have to work on this...
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
    </Card>
  );
};
