import { MapPin, Plus, Trash2, Pencil } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useState } from "react";
import type { Address } from "@/types";
import { AddressForm } from "./AddressForm";
import {
  useAddAddress,
  useGetAddresses,
  useRemoveAddress,
  useSetDefaultAddress,
  useUpdateAddress,
} from "@/app/hooks/address";

const Addresses = () => {
  const { data: addresses, isLoading: isGettingAddresses } = useGetAddresses();
  const { mutate: setDefaultAddress } = useSetDefaultAddress();
  const { mutate: removeAddress, isPending: isRemoving } = useRemoveAddress();
  const { mutate: addAddress, isPending: isAdding } = useAddAddress();
  const { mutate: updateAddress, isPending: isUpdating } = useUpdateAddress();

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Address>>({});

  const isLoading = isGettingAddresses || isRemoving;
  const isPending = isAdding || isUpdating;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEdit = (address: Address) => {
    setEditingId(address.id);
    setForm(address);
    setShowAddressForm(false);
  };

  const handleCancelForm = () => {
    setShowAddressForm(false);
    setEditingId(null);
    setForm({});
  };

  const handleSave = () => {
    if (editingId) {
      updateAddress({ id: editingId, ...form } as Address, {
        onSuccess: () => {
          setEditingId(null);
          setForm({});
        },
      });
    } else {
      addAddress(form as Omit<Address, "id" | "isDefault">, {
        onSuccess: () => {
          setForm({});
          setShowAddressForm(false);
        },
      });
    }
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
            onClick={() => {
              setShowAddressForm(!showAddressForm);
              setEditingId(null);
              setForm({});
            }}
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
            <AddressForm
              form={form}
              isPending={isPending}
              onChange={handleChange}
              onSave={handleSave}
              onCancel={handleCancelForm}
            />
          )}

          {addresses?.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No addresses saved yet. Add one to speed up checkout.
            </p>
          ) : (
            <div className="space-y-3">
              {addresses?.map((address) => (
                <div key={address.id}>
                  {editingId === address.id ? (
                    <AddressForm
                      isEdit
                      form={form}
                      isPending={isPending}
                      onChange={handleChange}
                      onSave={handleSave}
                      onCancel={handleCancelForm}
                    />
                  ) : (
                    <div className="border rounded-lg p-4 flex items-start justify-between">
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
                      <div className="flex gap-2 items-center">
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
                          onClick={() => handleEdit(address)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeAddress(address.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
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
