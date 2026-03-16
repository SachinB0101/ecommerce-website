import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Loader2, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import useGetPaymentMethods from "@/app/hooks/payment/useGetPaymentMethods";
import { useEffect } from "react";

type PaymentProps = {
  setHasPayment: (value: boolean) => void;
};

const PaymentMethod = ({ setHasPayment }: PaymentProps) => {
  const { defaultCard, hasPayment, isLoading } = useGetPaymentMethods();

  useEffect(() => {
    setHasPayment(hasPayment);
  }, [hasPayment, setHasPayment]); // ✅ runs after render, not during

  const handleDelete = async () => {
    console.log("handleDelete clicked");
  };

  if (isLoading) {
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
        {defaultCard ? (
          <>
            <div className="border rounded-lg p-4 border-primary bg-primary/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">
                        {defaultCard.card.brand.toUpperCase()} ••••{" "}
                        {defaultCard.card.last4}
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        Default
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Expires {defaultCard.card.exp_month}/
                      {defaultCard.card.exp_year}
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
