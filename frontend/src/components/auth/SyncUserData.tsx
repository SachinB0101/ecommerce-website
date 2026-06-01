import { useUserDataSync } from "@/app/hooks/useUserDataSync";
import type { ReactNode } from "react";
import InitializingScreen from "../loading/InitializingScreen";
import { isSupabaseConfigured } from "@/supabaseClient";

const SyncUserData = ({ children }: { children: ReactNode }) => {
  const {isError, isLoading} = useUserDataSync();

  if (isLoading) return <InitializingScreen />;

  // If Supabase is not configured, show warning but still render children
  if (isError && isSupabaseConfigured) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-red-50">
        <div className="text-center p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Connection Error</h1>
          <p className="text-gray-700 mb-4">Unable to connect to the database. Please check your connection and try again.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // If Supabase is not configured at all, show setup notice but allow browsing
  if (!isSupabaseConfigured) {
    console.warn("Supabase is not configured. Some features will be limited.");
  }

  return <>{children}</>;
};

export default SyncUserData;
