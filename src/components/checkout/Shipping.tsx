import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, AlertCircle, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useGetAddresses } from "@/app/hooks/address/useGetAddresses";
import { useRemoveAddress } from "@/app/hooks/address/useRemoveAddress";

const Shipping = () => {
  const { data: addresses, isLoading, isError } = useGetAddresses();
  const { mutate: removeAddress } = useRemoveAddress();

  if (isError) return <p>Error loading addresses</p>;

  const defaultAddress = addresses?.find((address) => address.isDefault);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Shipping Address
        </CardTitle>
      </CardHeader>
      {isLoading ? (
        <CardContent className="flex items-center justify-center py-8">
          <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </CardContent>
      ) : (
        <CardContent className="space-y-3">
          {!defaultAddress ? (
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
              <div className="border rounded-lg p-4 border-primary bg-primary/5">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{defaultAddress.fullName}</p>
                      <Badge variant="secondary" className="text-xs">
                        Default
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {defaultAddress.addressLine1}
                      {defaultAddress.addressLine2 &&
                        `, ${defaultAddress.addressLine2}`}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {defaultAddress.city}, {defaultAddress.state}{" "}
                      {defaultAddress.zipCode}
                    </p>
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
                    Edit Address
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/30"
                  onClick={() => removeAddress(defaultAddress.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </Button>
              </div>
            </>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default Shipping;
