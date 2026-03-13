import { useUser } from "@clerk/clerk-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";
import Addresses from "@/components/checkout/Addresses";

export default function ProfilePage() {
  const { user } = useUser();

  return (
    <div className="container py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold mb-2 flex items-center gap-3">
          <User className="h-8 w-8" />
          My Profile
        </h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              {user?.imageUrl && (
                <img
                  src={user.imageUrl}
                  alt={user.fullName || "User"}
                  className="h-16 w-16 rounded-full"
                />
              )}
              <div>
                <p className="font-semibold">{user?.fullName}</p>
                <p className="text-sm text-muted-foreground">
                  {user?.primaryEmailAddress?.emailAddress}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Addresses */}
        <Addresses />
      </div>
    </div>
  );
}
