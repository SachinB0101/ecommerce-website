import { useAuth } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";


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
    return <Navigate to="/" replace />;
  }

  return <Outlet/>
}
