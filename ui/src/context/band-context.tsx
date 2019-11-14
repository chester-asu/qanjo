import React from "react";
import { useAuth } from "./auth-context";
import { DTC } from "../../dtc";

const BandContext = React.createContext({} as DTC.User);

export const useBand = () => React.useContext(BandContext);

export function BandProvider(props: any) {
  return <BandContext.Provider value={{}} {...props} />;
}
