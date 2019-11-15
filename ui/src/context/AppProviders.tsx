import React from "react";
import { AuthProvider } from "./auth-context";
import { UserProvider } from "./user-context";
import { BandProvider } from "./band-context";

export function AppProviders({ children }: any) {
  return (
    <AuthProvider>
      <UserProvider>
        <BandProvider>{children}</BandProvider>
      </UserProvider>
    </AuthProvider>
  );
}
