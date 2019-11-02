import React from "react";
import JwtDecode from "jwt-decode";
import { DTC } from "../../dtc";
import { store } from "../redux/store";
import { registerUser, loginUser } from "../redux/actions";

interface AuthContext {
  user: DTC.User;
  login: (login: DTC.Login) => void;
  logout: () => void;
  register: (register: DTC.Register) => void;
}

const AuthContext = React.createContext({} as AuthContext);

export const useAuth = () => React.useContext(AuthContext);

export function AuthProvider(props: any) {
  function login(login: DTC.Login) {
    store.dispatch(loginUser(login));
  }

  function register(register: DTC.Register) {
    store.dispatch(registerUser(register));
  }

  function logout() {
    localStorage.removeItem("access_token");
  }

  const access_token = localStorage.getItem("access_token");
  const user: DTC.User | null = access_token ? JwtDecode(access_token) : null;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register
      }}
      {...props}
    />
  );
}
