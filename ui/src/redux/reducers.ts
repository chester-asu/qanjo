import { combineReducers } from "redux";
import { ActionType, LoginAction } from "./actions";

function token(
  state = localStorage.getItem("token") || "",
  action: LoginAction
) {
  switch (action.type) {
    case ActionType.REGISTER_SUBMIT:
    case ActionType.REGISTER_ROLLBACK:
    case ActionType.LOGOUT:
    case ActionType.LOGIN_SUBMIT:
    case ActionType.LOGIN_ROLLBACK: {
      return "";
    }
    case ActionType.REGISTER_COMMIT:
    case ActionType.LOGIN_COMMIT: {
      return action.token;
    }
    default: {
      return state;
    }
  }
}

export const reducers = combineReducers({ token });
