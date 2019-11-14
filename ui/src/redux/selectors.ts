import { createSelector } from "reselect";
import { AppState } from "./store";
import { DTC } from "../../dtc";
import JwtDecode from "jwt-decode";

export const selectUser = createSelector<AppState, any, DTC.User>(
  state => state.token,
  function(token: string) {
    return token ? JwtDecode(token) : ((null as any) as DTC.User);
  }
);
