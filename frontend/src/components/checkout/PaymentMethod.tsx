import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Loader2, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import useGetCustomerId from "@/app/hooks/payment/useGetCustomerId";

type SavedCard = {
  id: string;
  card: {
    brand: string;
    last4: string;
    exp_month: number;
    exp_year: number;
  };
};

type PaymentProps = {
  setHasPayment: (value: boolean) => void;
};

const PaymentMethod = ({ setHasPayment }: PaymentProps) => {
  const [savedCard, setSavedCard] = useState<SavedCard | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: customerId, isLoading: isLoadingCustomerId } =
    useGetCustomerId();

  useEffect(() => {
    const fetchSavedCard = async () => {
      if (!customerId) {
        setHasPayment(false);
        setLoading(false);
        return;
      }

      const res = await fetch(
        `http://localhost:8080/api/payments/saved-cards?customerId=${customerId}`,
      );
      const data = await res.json();

      // take the first saved card as default
      const first = data.paymentMethods?.[0] ?? null;
      setSavedCard(first);
      setHasPayment(!!first);
      setLoading(false);
    };

    fetchSavedCard();
  }, [customerId]);

  const handleDelete = async () => {
    if (!savedCard || !customerId) return;

    const res = await fetch("http://localhost:5000/api/payments/card", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerId, paymentMethodId: savedCard.id }),
    });

    const data = await res.json();
    setSavedCard(null);
    setHasPayment(false);

    if (data.wasLastCard) {
      // → your Supabase logic to clear stripe_customer_id
    }
  };

  if (loading || isLoadingCustomerId) {
    // return (
    //   <Card>
    //     <CardContent className="py-6">
    //       <p className="text-sm text-muted-foreground">
    //         Loading payment method...
    //       </p>
    //     </CardContent>
    //   </Card>
    // );
    return (
      <div className="container py-12 max-w-4xl">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Payment Method
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {savedCard ? (
          <>
            <div className="border rounded-lg p-4 border-primary bg-primary/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">
                        {savedCard.card.brand.toUpperCase()} ••••{" "}
                        {savedCard.card.last4}
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        Default
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Expires {savedCard.card.exp_month}/
                      {savedCard.card.exp_year}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm" className="gap-1.5">
                <Link to="/profile">
                  <Pencil className="h-3.5 w-3.5" />
                  Edit Payment
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/30"
                onClick={handleDelete}
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </Button>
            </div>
          </>
        ) : (
          // No saved card — prompt user to add one
          <div className="text-center py-4 space-y-3">
            <p className="text-sm text-muted-foreground">
              No saved payment method
            </p>
            <Button asChild variant="outline" size="sm">
              <Link to="/profile">Add Payment Method</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentMethod;
