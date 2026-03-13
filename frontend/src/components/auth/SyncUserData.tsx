import { useUserDataSync } from "@/app/hooks/useUserDataSync";
import type { ReactNode } from "react";
import InitializingScreen from "../loading/InitializingScreen";
import ErrorPage from "@/pages/ErrorPage";

const SyncUserData = ({ children }: { children: ReactNode }) => {
  const {isError, isLoading} = useUserDataSync();

  if (isLoading) return <InitializingScreen />;

  if(isError) return <ErrorPage/>

  return <>{children}</>;
};

export default SyncUserData;
