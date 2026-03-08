import { MapPin, Plus, Trash2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import { useGetAddresses } from "@/app/hooks/address/useGetAddresses";
import { useSetDefaultAddress } from "@/app/hooks/address/useSetDefaultAddress";
import { useRemoveAddress } from "@/app/hooks/address/useRemoveAddress";
import { useAddAddress } from "@/app/hooks/address/useAddAddress";
import type { Address } from "@/types";

const Addresses = () => {
  const { data: addresses, isLoading } = useGetAddresses();
  const { mutate: setDefaultAddress } = useSetDefaultAddress();
  const { mutate: removeAddress } = useRemoveAddress();
  const { mutate: addAddress, isPending } = useAddAddress();
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [form, setForm] = useState<Partial<Address>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddAddress = () => {
    addAddress(form as Omit<Address, "id" | "isDefault">, {
      onSuccess: () => {
        setForm({});
        setShowAddressForm(false);
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Shipping Addresses
          </CardTitle>
          <Button
            size="sm"
            onClick={() => setShowAddressForm(!showAddressForm)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Address
          </Button>
        </div>
      </CardHeader>
      {isLoading ? (
        <CardContent className="flex items-center justify-center py-8">
          <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </CardContent>
      ) : (
        <CardContent className="space-y-4">
          {showAddressForm && (
            <div className="border rounded-lg p-4 bg-muted/30 space-y-3">
              <div className="grid grid-cols-1 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="addressLine1">Address Line 1</Label>
                  <Input
                    id="addressLine1"
                    name="addressLine1"
                    value={form.addressLine1}
                    onChange={handleChange}
                    placeholder="123 Main St"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="addressLine2">
                    Address Line 2 (optional)
                  </Label>
                  <Input
                    id="addressLine2"
                    name="addressLine2"
                    value={form.addressLine2}
                    onChange={handleChange}
                    placeholder="Apt 4B"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="New York"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      name="state"
                      value={form.state}
                      onChange={handleChange}
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
                      value={form.zipCode}
                      onChange={handleChange}
                      placeholder="10001"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      placeholder="US"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-2 pt-1">
                <Button onClick={handleAddAddress} disabled={isPending}>
                  {isPending ? "Saving..." : "Save Address"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddressForm(false);
                    setForm({});
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {addresses?.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No addresses saved yet. Add one to speed up checkout.
            </p>
          ) : (
            <div className="space-y-3">
              {addresses?.map((address) => (
                <div
                  key={address.id}
                  className="border rounded-lg p-4 flex items-start justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{address.fullName}</p>
                      {address.isDefault && (
                        <Badge variant="secondary" className="text-xs">
                          Default
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {address.addressLine1}
                      {address.addressLine2 && `, ${address.addressLine2}`}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {address.city}, {address.state} {address.zipCode}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {address.country}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {!address.isDefault && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDefaultAddress(address.id)}
                      >
                        Set Default
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeAddress(address.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default Addresses;
