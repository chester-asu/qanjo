import React from "react";
import { useAuth } from "./auth-context";
import { DTC } from "../../dtc";

const UserContext = React.createContext({} as DTC.User);

export const useUser = () => React.useContext(UserContext);

export function UserProvider(props: any) {
  return <UserContext.Provider value={useAuth().user} {...props} />;
}
