import React from "react";
import { DTC } from "../../dtc";
import { AppState, QDispatchProp } from "../redux/store";
import { registerUser, loginUser, logoutUser } from "../redux/actions";
import { connect, DispatchProp, MapStateToPropsParam } from "react-redux";
import { selectUser } from "../redux/selectors";

interface AuthContext {
  user: DTC.User;
  login: (login: DTC.Login) => void;
  logout: () => void;
  register: (register: DTC.Register) => void;
}

const AuthContext = React.createContext({} as AuthContext);

interface StateProps {
  user: DTC.User;
}

const mapStateToProps: MapStateToPropsParam<
  StateProps,
  any,
  AppState
> = function(state) {
  return {
    user: selectUser(state)
  };
};

type Props = StateProps & { dispatch: QDispatchProp };

function _AuthProvider({ user, dispatch, ...props }: Props) {
  function register(register: DTC.Register) {
    dispatch(registerUser(register));
  }

  function login(login: DTC.Login) {
    dispatch(loginUser(login));
  }

  function logout() {
    dispatch(logoutUser());
  }

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

export const AuthProvider = connect<StateProps, DispatchProp, any, AppState>(
  mapStateToProps
)(_AuthProvider);

export const useAuth = () => React.useContext(AuthContext);
