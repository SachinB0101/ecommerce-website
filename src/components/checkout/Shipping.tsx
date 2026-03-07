import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, AlertCircle, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useGetAddresses } from "@/app/hooks/address/useGetAddresses";

const Shipping = () => {
  const { data: addresses, isLoading, isError } = useGetAddresses();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading addresses</p>;

  const handleDeleteAddress = (id: string) => {
    console.log(id);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Shipping Address
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {addresses?.length === 0 ? (
          <div className="border border-dashed rounded-lg p-6 text-center">
            <AlertCircle className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-3">
              No saved addresses. Add one to continue.
            </p>
            <Button asChild size="sm">
              <Link to="/profile">Add Address</Link>
            </Button>
          </div>
        ) : (
          <>
            {addresses?.map((address) => (
              <div
                key={address.id}
                className="border rounded-lg p-4 border-primary bg-primary/5"
              >
                <div className="flex items-start justify-between">
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
                  Edit Address
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/30"
                onClick={() => handleDeleteAddress(addresses![0].id)}
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

export default Shipping;
