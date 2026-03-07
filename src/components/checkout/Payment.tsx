import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CreditCard, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useGetPaymentMethods } from "@/app/hooks/paymentMethods/useGetPaymentMethods";

const Payment = () => {
  const { data: paymentMethods, isLoading, isError } = useGetPaymentMethods();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading paymentMethods</p>;

  const handleDeletePaymentMethod = (id: string) => {
    console.log(id);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Payment Method
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {paymentMethods?.length === 0 ? (
          <div className="border border-dashed rounded-lg p-6 text-center">
            <AlertCircle className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-3">
              No saved payment methods. Add one to continue.
            </p>
            <Button asChild size="sm">
              <Link to="/profile">Add Payment Method</Link>
            </Button>
          </div>
        ) : (
          <>
            {paymentMethods?.map((pm) => (
              <div
                key={pm.id}
                className="border rounded-lg p-4 border-primary bg-primary/5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">
                          {pm.cardType} •••• {pm.lastFour}
                        </p>
                        {pm.isDefault && (
                          <Badge variant="secondary" className="text-xs">
                            Default
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Expires {pm.expiryMonth}/{pm.expiryYear}
                      </p>
                    </div>
                  </div>
                  <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-white" />
                  </div>
                </div>
              </div>
            ))}
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
                onClick={() => handleDeletePaymentMethod(paymentMethods![0].id)}
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
export default Payment;
