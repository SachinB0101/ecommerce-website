import { useAuth, SignIn } from "@clerk/clerk-react";
import { Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="container py-12 text-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex justify-center py-12">
        <SignIn routing="hash" />
      </div>
    );
  }

  return <Outlet />;
}
