import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

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

interface AddCardFormProps {
  cardholderName: string;
  postalCode: string;
  isPending: boolean;
  error: string | null;
  onCardholderNameChange: (value: string) => void;
  onPostalCodeChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const AddCardForm = ({
  cardholderName,
  postalCode,
  isPending,
  error,
  onCardholderNameChange,
  onPostalCodeChange,
  onSave,
  onCancel,
}: AddCardFormProps) => (
  <div className="border rounded-lg p-4 bg-muted/30 space-y-4">
    <p className="text-sm font-medium">New Card</p>

    <div className="space-y-1.5">
      <Label htmlFor="cardholderName">Name on Card</Label>
      <Input
        id="cardholderName"
        placeholder="John Doe"
        value={cardholderName}
        onChange={(e) => onCardholderNameChange(e.target.value)}
      />
    </div>

    <div className="space-y-1.5">
      <Label>Card Number</Label>
      <StripeInput>
        <CardNumberElement options={stripeElementStyle} className="w-full" />
      </StripeInput>
    </div>

    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-1.5">
        <Label>Expiry Date</Label>
        <StripeInput>
          <CardExpiryElement options={stripeElementStyle} className="w-full" />
        </StripeInput>
      </div>
      <div className="space-y-1.5">
        <Label>CVC</Label>
        <StripeInput>
          <CardCvcElement options={stripeElementStyle} className="w-full" />
        </StripeInput>
      </div>
    </div>

    <div className="space-y-1.5">
      <Label htmlFor="postalCode">Postal Code</Label>
      <Input
        id="postalCode"
        placeholder="A1A 1A1"
        value={postalCode}
        onChange={(e) => onPostalCodeChange(e.target.value)}
      />
    </div>

    {error && <p className="text-sm text-destructive">{error}</p>}

    <div className="flex gap-2 pt-1">
      <Button size="sm" onClick={onSave} disabled={isPending}>
        {isPending ? "Saving..." : "Save Card"}
      </Button>
      <Button variant="outline" size="sm" onClick={onCancel}>
        Cancel
      </Button>
    </div>
  </div>
);