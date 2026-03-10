import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";

type PaymentProps = {
  setHasPayment: (value: boolean) => void;
};

const DUMMY_DEFAULT_PAYMENT = {
  id: "pm_demo_4242",
  cardType: "Visa",
  lastFour: "4242",
  expiryMonth: "12",
  expiryYear: "2027",
  isDefault: true,
};

const Payment = ({ setHasPayment }: PaymentProps) => {
  const defaultPayment = DUMMY_DEFAULT_PAYMENT;
  useEffect(() => {
    if (defaultPayment) {
      setHasPayment(true);
    } else {
      setHasPayment(false);
    }
  }, [defaultPayment, setHasPayment]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Payment Method
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="border rounded-lg p-4 border-primary bg-primary/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium">
                    {defaultPayment.cardType} •••• {defaultPayment.lastFour}
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    Default
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Expires {defaultPayment.expiryMonth}/
                  {defaultPayment.expiryYear}
                </p>
              </div>
            </div>
            <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-white" />
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
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Payment;
