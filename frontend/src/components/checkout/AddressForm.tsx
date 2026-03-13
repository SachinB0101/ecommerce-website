import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import type { Address } from "@/types";

interface AddressFormProps {
  isEdit?: boolean;
  form: Partial<Address>;
  isPending: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const AddressForm = ({
  isEdit = false,
  form,
  isPending,
  onChange,
  onSave,
  onCancel,
}: AddressFormProps) => (
  <div className="border rounded-lg p-4 bg-muted/30 space-y-3">
    <p className="text-sm font-medium">
      {isEdit ? "Edit Address" : "New Address"}
    </p>
    <div className="grid grid-cols-1 gap-3">
      <div className="space-y-1">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          name="fullName"
          value={form.fullName ?? ""}
          onChange={onChange}
          placeholder="John Doe"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="addressLine1">Address Line 1</Label>
        <Input
          id="addressLine1"
          name="addressLine1"
          value={form.addressLine1 ?? ""}
          onChange={onChange}
          placeholder="123 Main St"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="addressLine2">Address Line 2 (optional)</Label>
        <Input
          id="addressLine2"
          name="addressLine2"
          value={form.addressLine2 ?? ""}
          onChange={onChange}
          placeholder="Apt 4B"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            value={form.city ?? ""}
            onChange={onChange}
            placeholder="New York"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            name="state"
            value={form.state ?? ""}
            onChange={onChange}
            placeholder="NY"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label htmlFor="zipCode">Zip Code</Label>
          <Input
            id="zipCode"
            name="zipCode"
            value={form.zipCode ?? ""}
            onChange={onChange}
            placeholder="10001"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            name="country"
            value={form.country ?? ""}
            onChange={onChange}
            placeholder="US"
          />
        </div>
      </div>
    </div>
    <div className="flex gap-2 pt-1">
      <Button onClick={onSave} disabled={isPending}>
        {isPending ? "Saving..." : isEdit ? "Update Address" : "Save Address"}
      </Button>
      <Button variant="outline" onClick={onCancel}>
        Cancel
      </Button>
    </div>
  </div>
);
