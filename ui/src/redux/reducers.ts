import { combineReducers, Action } from "redux";
import { ActionType, LoginAction } from "./actions";
import { DTC } from "../../dtc";

interface IMeta {
  loaded: boolean;
  loading: boolean;
  error: any;
}

const initalUser: IMeta & { user: DTC.User | null } = {
  loaded: false,
  loading: false,
  error: null,
  user: null
};

function user(state = initalUser, action: LoginAction) {
  switch (action.type) {
    case ActionType.LOGIN_SUBMIT: {
      return {
        loaded: false,
        loading: true,
        error: null,
        user: null
      };
    }
    case ActionType.LOGIN_COMMIT: {
      return {
        loaded: false,
        loading: true,
        error: null,
        user: action.user
      };
    }
    case ActionType.LOGIN_ROLLBACK: {
      return {
        loaded: false,
        loading: true,
        user: null,
        error: action.error
      };
    }
    default: {
      return state;
    }
  }
}

export const reducers = combineReducers({ user });
