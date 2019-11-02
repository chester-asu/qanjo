import { DTC } from "../../dtc";
import { Dispatch, Action } from "redux";
import { client } from "../util/client";

export type LoginAction = Action<ActionType> & { user: DTC.User; error: any };
export type RegisterAction = Action<ActionType> & {
  user: DTC.User;
  error: any;
};

export enum ActionType {
  // login
  LOGIN_SUBMIT = "LOGIN_SUBMIT",
  LOGIN_COMMIT = "LOGIN_COMMIT",
  LOGIN_ROLLBACK = "LOGIN_ROLLBACK",

  // register
  REGISTER_SUBMIT = "REGISTER_SUBMIT",
  REGISTER_COMMIT = "REGISTER_COMMIT",
  REGISTER_ROLLBACK = "REGISTER_ROLLBACK"
}

export function loginUser(login: DTC.Login) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.LOGIN_SUBMIT
    });
    client
      .post("/login", login)
      .then(res => {
        console.log(res);
        dispatch({
          type: ActionType.LOGIN_COMMIT,
          user: res.data
        });
      })
      .catch(error => {
        dispatch({
          error,
          type: ActionType.LOGIN_ROLLBACK
        });
      });
  };
}

export function registerUser(register: DTC.Register) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.REGISTER_SUBMIT
    });
    client
      .post("/register", register)
      .then(res => {
        console.log(res);
        dispatch({
          type: ActionType.REGISTER_COMMIT,
          user: res.data
        });
      })
      .catch(error => {
        dispatch({
          error,
          type: ActionType.REGISTER_ROLLBACK
        });
      });
  };
}
