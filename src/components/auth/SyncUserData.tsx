import { useGetUser } from "@/app/hooks/useGetUser";
import ErrorPage from "@/pages/ErrorPage";
import type { ReactNode } from "react";
import InitializingScreen from "../loading/InitializingScreen";
import { useAuth } from "@clerk/clerk-react";

const SyncUserData = ({ children }: { children: ReactNode }) => {
  const { isSignedIn } = useAuth();
  const { data: userId, isLoading, isError } = useGetUser();

  if (isSignedIn && isLoading) return <InitializingScreen />;

  if (isError) {
    return <ErrorPage />;
  }

  return <>{children}</>;
};

export default SyncUserData;
