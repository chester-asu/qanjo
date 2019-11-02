import React from "react";
import { AuthProvider } from "./auth-context";
import { UserProvider } from "./user-context";

export function AppProviders({ children }: any) {
  return (
    <AuthProvider>
      <UserProvider>{children}</UserProvider>
    </AuthProvider>
  );
}
